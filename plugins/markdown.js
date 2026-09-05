// Vite plugin: turns src/content/insights/*.md into JS modules.
//
// Each Markdown file becomes `export default { frontmatter, html, wordCount, file }`
// (plus named exports of the same). Frontmatter is parsed with gray-matter,
// the body is rendered with marked at build time, so neither the client bundle
// nor the SSR bundle ships a Markdown parser.
//
// The plugin never throws for a malformed file: another process writes these
// files while the build may be running, so any of them can be half-written at
// any moment. A file that cannot be parsed exports an empty frontmatter and an
// `error` string; src/data/insights.js then skips it with a console.warn.

import matter from 'gray-matter'
import { Marked } from 'marked'
import { basename } from 'path'

const marked = new Marked({ gfm: true, breaks: false })

// Word count on the rendered text (tags stripped) so headings and list items count.
function countWords(html) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .trim()
  return text ? text.split(/\s+/).length : 0
}

export function parseMarkdown(source, file) {
  try {
    const { data, content } = matter(source)
    const html = marked.parse(content ?? '')
    return { frontmatter: data ?? {}, html, wordCount: countWords(html), file, error: null }
  } catch (err) {
    return { frontmatter: {}, html: '', wordCount: 0, file, error: err?.message || String(err) }
  }
}

export default function markdownPlugin({ include = /\/src\/content\/insights\/[^/]+\.md$/ } = {}) {
  return {
    name: 'syzygy:markdown',
    enforce: 'pre',
    transform(code, id) {
      const clean = id.split('?')[0]
      if (!include.test(clean)) return null
      const parsed = parseMarkdown(code, basename(clean))
      const json = JSON.stringify(parsed)
      return {
        code:
          `const article = ${json};\n` +
          `export const frontmatter = article.frontmatter;\n` +
          `export const html = article.html;\n` +
          `export const wordCount = article.wordCount;\n` +
          `export const file = article.file;\n` +
          `export const error = article.error;\n` +
          `export default article;\n`,
        map: null,
      }
    },
  }
}
