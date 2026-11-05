---
title: "How to Automate Manufacturing Quotes Without Automating the Price"
seoTitle: "Automating Quoting and RFQs in Manufacturing | Syzygy"
slug: "automating-quoting-in-manufacturing"
dek: "An estimator's week often goes to reading RFQ packages and copying data off them. AI can take most of that reading, with a source for every field it pulls, while the price and the bid decision stay with people."
description: "Where AI speeds up manufacturing quotes (reading RFQs, specs and terms, finding past jobs), where estimators stay in charge, and how to start this week."
category: "Operations"
keywords: ["RFQ automation manufacturing", "AI quoting for job shops", "manufacturing estimating software", "automate quotes manufacturing", "AI for estimators", "quote turnaround time", "can AI read engineering drawings"]
author: "james-oosterhouse"
order: 11
featured: false
keyTakeaways:
  - "Before you buy anything, log the hands-on minutes and calendar days on your next ten RFQs and re-quotes; in many shops more of the time goes to getting information off the page than to deciding the price."
  - "In published tests, AI models have read the words in an RFQ package (notes, callouts, specs, terms) far more reliably than the geometry on a 2D print, so treat anything a tool says about geometry as a suggestion to check."
  - "Your most useful quoting data is past quotes joined to win or loss and to what each job actually cost; most shops have all three, and few ever compare them."
  - "Write a one-page sheet of your standard positions on terms (payment, price-downs, line-down charges, material validity) so a person or a tool can flag every RFQ that breaks them."
  - "Test any quoting tool on ten of your worst real packages with a field-by-field scorecard written in advance, and fail it if it invents a single value."
faq:
  - q: "Can AI create manufacturing quotes automatically?"
    a: "For repeat parts and simple configured products, rules-based quoting from a price table or configurator can often produce a quote with little human input. For custom work from prints and specifications, AI is most reliable at reading the RFQ package: pulling quantities, materials, finishes, certifications and terms into a structured form with a source for each field, flagging unusual terms and finding similar past jobs. Setting the price, deciding whether to bid and resolving anything the tool flags should stay with an estimator."
  - q: "Can ChatGPT or other AI models read engineering drawings?"
    a: "They read the text on a drawing better than the geometry. In a 2023 MIT study, GPT-4V described a blind hole as a through hole in eight of nine runs, missing the notation that said otherwise, though once told what the part was it pulled every dimension off the drawing. Newer models may do better, so test one on your own prints, treat what it says about geometry as a suggestion to check, and keep NDA or export-controlled drawings out of AI services your shop has not approved."
  - q: "What data does a manufacturer need to automate quoting?"
    a: "Past RFQs with their attachments, the quotes you sent, whether each was won or lost, and the actual cost of the jobs that ran, which most job shop ERPs already track. The data does not need to be clean, only kept. Two short documents help as much as the history: a list of your capabilities (materials, size limits, certifications) and a one-page summary of your standard positions on commercial terms."
  - q: "Should a job shop buy quoting software or build a custom tool?"
    a: "Buy first if you mostly quote machined parts from 3D models, because quoting software built for that already analyzes the part file's geometry. Configure the quoting module in your ERP if it is underused, so quotes and actual job costs live in one place. Build a custom tool when the time goes into long, wordy packages: specifications, quality manuals and commercial terms that need reading and checking against your own standards. Log ten RFQs first, because where the minutes go tells you which."
  - q: "How do you measure whether quoting automation is working?"
    a: "Before starting, log hands-on minutes per RFQ by step, the calendar days from receipt to sent, and the RFQs declined for lack of time. After launch, track the same numbers plus hit rate and quoted versus actual hours on the jobs you win. Hours saved per quote is usually the smallest of these. Check in your own quote history whether faster quotes win more often, since a quote due on a fixed date gains nothing by arriving early."
cta:
  service: "custom-tools"
  heading: "Build an estimating assistant around your own RFQs"
  body: "Syzygy builds tools around how a business runs. For quoting, that's an estimating assistant that reads your RFQ packages, checks them against your terms and past jobs, and works inside the tools your estimators already use, delivered with documentation and training. Each build is scoped and quoted after an AI Audit of how quoting works today, so book an intro call and walk us through your RFQ process."
related: ["ai-for-document-heavy-work", "build-buy-or-configure", "prototype-before-you-commit"]
---

An RFQ lands at 4:40 on a Tuesday. It's a zip file: three PDF prints, a STEP model, a 40-page supplier quality manual, the customer's terms and conditions, and an email asking for pricing at three annual volumes by Friday. Your estimator will open every file, copy part numbers, materials, finishes and quantities into the quote sheet, and search the shared drive for the last job that looked like this one, between trips to the floor to answer questions about work already running. The quote goes out next Wednesday if the week cooperates.

Most of those hours go to reading and retyping. Not many go to what you pay an estimator for: deciding what the job will cost you and what you want to charge for it. Software can take most of the reading off the estimator's desk. It shouldn't be setting your prices.

## Time the next ten RFQs before you buy anything

A vendor's hours-saved number means nothing until you know where your hours go now, and "a quote takes a couple of days" blends working time with time in the pile. For the next ten RFQs, have whoever quotes keep a log in a shared spreadsheet:

| Step | What to write down |
|---|---|
| Received | When it arrived, when someone opened it, new or re-quote |
| Reading | Minutes on prints, specs, terms and the quality manual |
| Retyping | Minutes copying part data into the quote sheet or ERP |
| Finding past jobs | Minutes searching for similar parts and what they cost |
| Building the cost | Minutes on routing, material, outside processing, margin |
| Writing and review | Minutes on the quote document, exceptions and sign-off |
| Sent and result | Date sent, then won, lost or no answer |

Also have them note every RFQ they declined or let slide for lack of time. Owners almost never see that number. And tell the estimators what the log is for before they start: finding what to take off their desk. People who think they're being graded write down the number they think you want.

Ten RFQs give you a rough picture, and two patterns usually show up. Calendar time dwarfs touch time: a quote with an afternoon of work in it goes out a week later because it waited in line. And the steps that need judgment, building the cost and setting the price, take the smaller share of the hands-on minutes. Reading, retyping and searching take the rest.

If your log says otherwise, believe the log. A shop whose estimators spend most of their time on real costing decisions, and who rarely turn work away, doesn't need a quoting project, from us or anyone else.

## What an estimator's hour costs, and what a missed RFQ is worth

The Bureau of Labor Statistics puts the [median annual wage for cost estimators](https://web.archive.org/web/20261013082635/https://www.bls.gov/ooh/business-and-financial/cost-estimators.htm) at $78,740 (May 2025). Its [June 2026 employer cost survey](https://www.bls.gov/news.release/archives/ecec_09092026.htm) puts benefits at 30% of private employers' compensation costs. Paid leave is part of that, and a salary already covers it; the rest (insurance, retirement, payroll taxes, and extras like overtime premiums and bonuses) adds about 29% to base pay. So $78,740 x 1.29 is roughly $101,600 a year, or about $54 an hour over the roughly 1,880 hours a full-timer works after vacation and holidays. That's a national average, so redo it with your own payroll and benefit bills.

If your log shows an estimator spending 12 hours a week on everything before the costing starts, that's 12 x $54 x 50 weeks, about $32,400 a year. Two estimators, about $65,000.

The bigger number is usually the work you never bid. Say you let four RFQs a month go unanswered, you win one in four of the ones you quote, and a typical award is worth $40,000 a year. That's 48 x 0.25 x $40,000, or $480,000 in sales. What you'd keep is the contribution margin: at 25%, about $120,000, and only if the floor has room to run the work. The RFQs that slide are often the worst fits, so halve the win rate to be safe. That's $60,000, still nearly double what one estimator's 12 hours a week cost. The inputs are made up; use yours.

Before you lean on speed, check whether it wins in your own data. Pull your last 50 to 100 quotes with days from RFQ to sent, and won or lost. If the fast ones win more often, turnaround is your lever. If not, the problem is capacity or price. A quote due on a fixed date through a buyer's portal gains nothing by arriving early.

## Let software read the words in the package

An RFQ package is mostly text, even as a PDF: the buyer's email, notes and callouts on each print, specs, cert requirements, pages of terms. A language model can read it in minutes and produce a structured summary. For one part, a good one looks something like this (a made-up example):

- RFQ 24-118, bracket 4471-220 rev C
- Quantities: 500 / 1,500 / 3,000 EAU (buyer email, paragraph 2)
- Material: 6061-T6 (print sheet 1, title block)
- Finish: black anodize, Type II (print sheet 1, note 3)
- Certs: material certs and C of C with each shipment (quality manual, section 7.2)
- PPAP: Level 3 (buyer email, paragraph 4)
- Delivery: first article in 6 weeks (RFQ cover sheet)
- Conflict: spec section 3.1 says 6061-T651, print says 6061-T6
- Not found: heat treat, packaging spec
- Against your terms: net 75 payment (T&Cs section 4), past your net 45 limit

Every field has a source, so the estimator checks it in seconds instead of re-reading the package. And the tool admits what it can't find or reconcile. One that fills blanks with plausible guesses teaches your estimators to check everything, and they'll be right to.

Keep the field list to about a dozen: part number and revision, quantities, material, finish, heat treat, critical tolerances and GD&T callouts, certs, PPAP or first-article level, delivery, packaging, payment terms, and price-down or line-down language. In [ExtractBench](https://arxiv.org/abs/2602.12247), a February 2026 benchmark from Contextual AI (which sells document AI), accuracy fell as the field count grew: a 13-field schema did best, and a 369-field one got no valid output from any model tested.

A document-grounded assistant we built for a West Michigan manufacturer does this kind of reading, turning prints, specs and past quotes into structured estimates and risks. Its Sales Engineers each got 5 or more hours a week back for customer work.

## Can AI read an engineering drawing?

Researchers in MIT's mechanical engineering department [tested GPT-4V on engineering design tasks in 2023](https://arxiv.org/abs/2311.12668). Asked to describe a simple part drawing, it called a blind hole a through hole in eight of nine runs, missing the notation that said otherwise. The ninth answer ("a cylindrical hole or recess") didn't commit either way. Once told what the part was, it pulled all five dimensions off the drawing every time, though in three of the nine runs it didn't label them all correctly.

Newer models may do better, but what it got wrong is what costs money: a blind hole read as a through hole changes the operation, the tooling and the cycle time. So let software pull the text, and treat anything it says about geometry, features or tolerances as a suggestion the estimator confirms on the print.

Test today's tools yourself in an hour or so. Pick five prints from past jobs where you know every answer: a blind hole, a tapped hole with a thread depth, a GD&T frame, a note only on sheet 2, a scanned print with a handwritten redline. Black out the finish note on one. Run them through a business account your shop has approved for customer drawings, and mark every field: right with a source, wrong, missed or invented. Watch the blacked-out note. Trail, part of the document-processing vendor Nanonets, reports in its [March 2026 IDP Leaderboard](https://trailhq.com/blog/idp-leaderboard-1-5) that on handwritten forms, models "fill in values for fields that are blank on the form."

## Keep the price with people, and give them better history

A price carries things no file holds: how hard this buyer pushed back on last year's increase, which machine opens up in March, whether you want this customer's work at all, how hungry your competitors are this quarter. A model that proposes prices from your past quotes will repeat your past mistakes faster, including the jobs you won because you priced them too low.

What software can do for pricing is find history: what you quoted, whether you won, and what the job actually cost. Most shops have all three, in Epicor or JobBOSS or Global Shop or scattered across folders and email, and few ever compare them. An estimator who opens a new RFQ next to the three most similar past jobs, each showing quoted against actual hours, prices better than one working from memory.

You can start this week without software. Pull your last 20 closed jobs and put quoted hours next to actual hours, by operation if your ERP tracks it, by job if it doesn't. If the gaps run one way on a part family, a material or a machine, you've found a pricing problem no quoting tool would have fixed. Then have your senior estimator write one line per job on why it ran over or under (say, why one bracket family always needs an extra setup), so the next estimator inherits it.

## Write down your standard terms before any tool flags them

A tool can only flag a term as unusual if someone has written down what usual is. Often it lives only in the owner's head or the senior estimator's. Put it on one page, which a new estimator needs anyway. An example, with positions you'd replace with your own:

| Term | Our usual position | Flag it when |
|---|---|---|
| Payment | Net 30 | Anything past net 45 |
| Price reductions | None built in | Automatic annual price-downs |
| Line-down charges | Not accepted | Any mention |
| Warranty | 12 months, repair or replace | Longer, or covers their costs |
| Material pricing | Valid 30 days | Firm price asked for 90+ days |
| PPAP or first article | Priced as its own line | Required with no line for it |

We built a tool like this for a mid-Atlantic manufacturer: a custom AI engine that analyzes specification documents and flags contract exceptions. Its quoting operations became 18% more efficient, with faster turnaround.

## Re-quotes are the quotes you do twice

The log asks "new or re-quote?" for a reason. In the National Association of Manufacturers' [Q3 2026 outlook survey](https://nam.org/wp-content/uploads/2026/09/Q3_2026_Writeup_Final.pdf), 80.8% of the manufacturers it surveyed named rising raw material costs as a top challenge, and they expected input costs to rise 5% over the next year. Tariffs are part of it. Since April 2026, the Section 232 tariffs on steel, aluminum and copper apply to an import's full value, not just its metal content: 50% for articles made entirely or almost entirely of those metals and 25% for derivative products made substantially of them, per the [White House fact sheet](https://www.whitehouse.gov/fact-sheets/2026/04/fact-sheet-president-donald-j-trump-strengthens-tariffs-on-steel-aluminum-and-copper-imports/). A firm annual price on a steel part is a bet on trade policy, and the material row of your terms sheet is where you hedge it.

So material lines go stale fast, and the same estimators re-price quotes they already sent. NAM doesn't count re-quotes, but your log will. If they're a real share of the week, look for a tool that pulls up the old quote, updates material and outside processing, shows what changed, and drafts the revision for the estimator to send.

## Buy, configure or build

Let the log say which bucket you're in (our [build, buy or configure guide](/insights/build-buy-or-configure/) covers the general decision):

- Mostly machined parts quoted from 3D models: start with job-shop quoting software that analyzes the part file's geometry, a different technology from a chat model reading a PDF.
- Mostly hunting for past jobs, or your ERP's quoting module sits unused: configure it first, so quotes, routings and actual costs live in one system.
- Mostly reading long packages (engineered-to-order work, thick specs and quality manuals, automotive or defense terms): price out a custom document assistant, because that reading depends on your terms sheet, capabilities list and past jobs, which no packaged product ships with. It has to live inside the tools you quote in, or it's one more browser tab.
- Re-quotes are a big share: put the first money into refreshing quotes, which can pay before faster first quotes do.
- Mostly costing, and you rarely decline work: leave quoting alone.

A general AI assistant on a business account can help in the meantime, if you're careful what goes in: check each customer's NDA, keep every customer drawing out of personal logins, and keep export-controlled drawings out of general AI services until whoever owns export compliance approves the setup (ITAR's definition of [technical data](https://www.law.cornell.edu/cfr/text/22/120.33) and the EAR's of [technology](https://www.law.cornell.edu/cfr/text/15/772.1) both name drawings). Our guide to [AI governance for owner-led companies](/insights/ai-governance-for-owner-led-companies/) covers how to write the rule down.

Ask any vendor:

- Show me the output landing in my ERP's quote screen, on my version. (An import file the ERP reads is fine. A CSV somebody re-keys isn't.)
- Per seat, per quote or per month, and what do setup and the ERP connection cost?
- Will you run it on ten of my worst packages before I sign?

## Demos run on clean packages

Your hours go to the messy ones, so run whatever you're evaluating on ten real packages from the customer with the 80-page quality manual and prints that contradict the spec.

Set the pass line in numbers first. Ten packages at a dozen fields each is about 120 checks, scored as in the drawing test. A fair bar is at least 19 of every 20 fields right with a source, and not one value invented. Seed one package with a net 90 clause and a line-down charge, and require both flagged. Past accuracy, it passes only if reading time per RFQ at least halves, the output reaches the ERP without retyping, and the estimators would rather keep it than go back. Write down what failing looks like too, so you can [stop without an argument](/insights/prototype-before-you-commit/).

Decide before launch what the freed hours are for. In BCG's [June 2026 AI at Work survey](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools), 66% of frontline employees who use AI regularly said they get limited or no guidance on what to do with the time they save. BCG's frontline employees are "individual white-collar employees with no managerial responsibilities," all at companies with $100 million or more in revenue. We see no reason a 70-person shop would hold on to saved time any better. Name the use: quote the RFQs you used to skip, follow up on open quotes, clear the re-quote pile, train the next estimator. Then keep the log running, and track that work and your hit rate against the [same baseline](/insights/measuring-ai-roi/). If turnaround falls and you're quoting work you used to turn away, it's paying, even if hours per quote barely move.

## The first month, with nobody hired

- **Week 1.** Explain the log to the estimators and start it on every package, re-quotes and declines included.
- **Week 2.** Pull the 20 closed jobs and get the senior estimator's one-line reasons: the part families you've been mispricing, on paper.
- **Week 3.** Write the terms sheet and a capabilities list (materials, size limits, certifications, tolerances you hold comfortably). Have the owner and the senior estimator fill them in separately, then compare. The differences are worth an hour.
- **Week 4.** Total the minutes spent before anyone touched a routing, count the unquoted RFQs and re-quotes, run the cost math, and match the biggest bucket to the list above.

By the end of the month you'll know what to price out first, or that you don't need to. Start the log on whatever RFQ lands next.
