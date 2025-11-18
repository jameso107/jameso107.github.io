# Logo Setup for Google Search Results

## Issue
Google search results are not showing the SYZYGY logo because:
1. The structured data references `/logo.png` but the file doesn't exist
2. Google requires an actual image file (not a React component) to display logos

## Solution

You need to create a `logo.png` file and place it in the `public/` folder.

### Logo Requirements for Google:
- **Size**: 112x112 pixels (square, 1:1 aspect ratio)
- **Format**: PNG or SVG (PNG recommended)
- **File location**: `public/logo.png`
- **Accessible URL**: `https://syzygy.services/logo.png`

### Design Guidelines:
The logo should match your three-orb design:
- White orb (left)
- Violet/purple orb (center) 
- Sky blue orb (right)
- Orbs should overlap (60% left, 40% right)
- Dark background (#0b1020) or transparent

### Steps to Fix:

1. **Create the logo image**:
   - Design a 112x112px PNG image with your three orbs
   - Save it as `logo.png` in the `public/` folder
   - Ensure it's high quality and matches your brand

2. **Alternative**: If you have a logo design tool, you can:
   - Export your Logo component as an image
   - Or create a simplified version for search results

3. **After adding the file**:
   - The structured data is already configured correctly
   - Google will need to re-crawl your site (can take days/weeks)
   - You can request re-indexing in Google Search Console

### Testing:
Once the file is added, test it:
- Verify the file is accessible: `https://syzygy.services/logo.png`
- Test structured data: https://search.google.com/test/rich-results
- Submit for re-indexing in Google Search Console

### Note:
The structured data has been updated to use ImageObject format which is the recommended way to specify logos for Google search results.

