# TipTap Rich Text Editor Guide

## Overview

The blog system now uses **TipTap**, a modern WYSIWYG (What You See Is What You Get) rich text editor instead of raw HTML textarea. This provides a much better content creation experience.

## Features

### Text Formatting

- **Bold** - Make text bold
- **Italic** - Italicize text
- **Underline** - Underline text
- **Strikethrough** - Strike through text

### Headings

- **H2** - Main section headings
- **H3** - Subsection headings
- **H4** - Minor headings
- **P** - Regular paragraph text

### Lists

- **Bullet List** - Unordered list with bullets
- **Numbered List** - Ordered list with numbers

### Text Alignment

- **Align Left** - Left-align text
- **Align Center** - Center text
- **Align Right** - Right-align text

### Rich Content

- **Insert Link** - Add hyperlinks
  - Click the link button
  - Enter the URL
  - To remove a link, select it and click the button again, then leave URL empty
- **Insert Image** - Add images
  - Click the image button
  - Enter the image URL
  - Images are automatically responsive

### Other Features

- **Blockquote** - Add quoted text
- **Horizontal Line** - Insert a divider
- **Undo** - Undo last action
- **Redo** - Redo last undone action

## How to Use

### Creating Content

1. **Navigate to Create Post**

   - Go to `/admin/blog`
   - Click "Create New Post"

2. **Use the Toolbar**

   - The toolbar at the top has all formatting options
   - Hover over buttons to see tooltips
   - Active formatting shows with a gray background

3. **Format Text**

   - Type your content
   - Select text to format it
   - Use toolbar buttons to apply formatting

4. **Add Links**

   - Select the text you want to link
   - Click the link button
   - Enter the URL
   - Press Enter

5. **Add Images**
   - Click the image button
   - Enter the image URL
   - Image will be inserted at cursor position

### Editing Content

1. **Navigate to Edit Page**

   - Go to `/admin/blog`
   - Click "Edit" on any post

2. **Editor Loads with Content**

   - Existing content appears formatted
   - All formatting is preserved
   - Edit as needed

3. **Save Changes**
   - Click "Update" to save
   - Content is saved as HTML

## Keyboard Shortcuts

- **Ctrl/Cmd + B** - Bold
- **Ctrl/Cmd + I** - Italic
- **Ctrl/Cmd + U** - Underline
- **Ctrl/Cmd + Z** - Undo
- **Ctrl/Cmd + Shift + Z** - Redo
- **Ctrl/Cmd + K** - Insert link (when text selected)

## Technical Details

### Installed Packages

```json
{
  "@tiptap/react": "latest",
  "@tiptap/starter-kit": "latest",
  "@tiptap/extension-link": "latest",
  "@tiptap/extension-image": "latest",
  "@tiptap/extension-underline": "latest",
  "@tiptap/extension-text-align": "latest",
  "@tiptap/extension-color": "latest",
  "@tiptap/extension-text-style": "latest"
}
```

### Extensions Enabled

1. **StarterKit** - Basic editing functionality

   - Bold, Italic, Strike
   - Headings (H1-H4)
   - Paragraph
   - Bullet and Ordered Lists
   - Blockquote
   - Code and Code Block
   - Hard Break
   - Horizontal Rule

2. **Link** - Hyperlink support

   - Custom link styling
   - Open links in new tab

3. **Image** - Image insertion

   - Responsive images
   - Rounded corners
   - Max width constraints

4. **Underline** - Underline text

5. **TextAlign** - Text alignment

   - Left, Center, Right alignment
   - Works with paragraphs and headings

6. **Color & TextStyle** - Text color support (ready for future use)

### Output Format

The editor outputs **clean HTML** that includes:

- Semantic HTML tags (`<h2>`, `<p>`, `<ul>`, etc.)
- Inline styles for alignment
- CSS classes for links and images
- Proper nesting and structure

### Styling

Custom CSS styles are added to `globals.css`:

- Prose styling for readable content
- Consistent spacing
- Responsive images
- Styled blockquotes
- Code highlighting support
- Link styling

## Best Practices

### Content Writing

1. **Use Headings Hierarchy**

   - Use H2 for main sections
   - Use H3 for subsections
   - Use H4 for minor points
   - Don't skip heading levels

2. **Break Up Text**

   - Use short paragraphs
   - Add headings frequently
   - Use lists for multiple items
   - Add images to break up long text

3. **Use Lists Effectively**

   - Bullet lists for unordered items
   - Numbered lists for steps or rankings
   - Keep list items concise

4. **Add Visual Elements**

   - Include images where relevant
   - Use blockquotes for important quotes
   - Add horizontal lines to separate sections

5. **Link Appropriately**
   - Use descriptive link text
   - Link to relevant resources
   - Don't overuse links

### Image Guidelines

1. **Image URLs**

   - Use absolute URLs (https://...)
   - Or relative URLs (/images/blog/...)
   - Ensure images are accessible

2. **Image Optimization**

   - Compress images before uploading
   - Use appropriate dimensions
   - Recommended: 1200px wide max
   - Keep file size under 200KB

3. **Alt Text** (Future Enhancement)
   - Currently images are inserted without alt text
   - You can edit the HTML output to add alt attributes

## Troubleshooting

### Editor Not Loading

**Problem:** Editor shows "Loading editor..." indefinitely

**Solutions:**

- Refresh the page
- Clear browser cache
- Check browser console for errors
- Ensure JavaScript is enabled

### Content Not Saving

**Problem:** Changes don't persist after saving

**Solutions:**

- Ensure all required fields are filled
- Check network tab for API errors
- Try adding content again
- Contact administrator if issue persists

### Formatting Lost

**Problem:** Formatting disappears after saving

**Solutions:**

- This shouldn't happen - formatting is saved as HTML
- If it does, report the issue
- Try re-applying formatting
- Check if special characters need escaping

### Images Not Displaying

**Problem:** Images show broken icon

**Solutions:**

- Verify image URL is correct
- Ensure image is publicly accessible
- Check image file extension is supported
- Try a different image URL

## Comparison: Before vs After

### Before (Raw HTML)

```html
<h2>Main Heading</h2>
<p>This is a <strong>paragraph</strong> with <em>formatting</em>.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**Issues:**

- Had to write HTML manually
- Error-prone
- Not user-friendly
- No visual feedback

### After (TipTap Editor)

- Visual formatting toolbar
- WYSIWYG editing
- Click to format
- See results immediately
- Outputs clean HTML automatically

## Future Enhancements

### Potential Additions

1. **Table Support**

   - Add table creation
   - Table editing
   - Responsive tables

2. **Color Picker**

   - Text color selection
   - Background color
   - Highlight text

3. **Custom Styles**

   - Pre-defined text styles
   - Call-out boxes
   - Warning/info boxes

4. **Media Upload**

   - Direct image upload
   - File management
   - CDN integration

5. **Video Embeds**

   - YouTube embeds
   - Vimeo embeds
   - Custom video players

6. **Collaboration**

   - Real-time editing
   - Comments
   - Track changes

7. **Templates**
   - Pre-built content templates
   - Quick insertion
   - Custom templates

## Support

### Getting Help

If you encounter issues:

1. Check this documentation
2. Review TipTap docs: https://tiptap.dev/docs
3. Check browser console for errors
4. Contact technical support

### Common Questions

**Q: Can I switch back to HTML editing?**
A: The editor outputs HTML, which you can view in the database. However, the interface is designed for visual editing only.

**Q: What HTML tags are supported?**
A: All semantic HTML tags including headings, paragraphs, lists, blockquotes, links, images, bold, italic, underline, strikethrough, and horizontal rules.

**Q: Can I paste formatted content from Word?**
A: Yes, but formatting may not be perfect. It's recommended to paste as plain text and reformat using the editor.

**Q: Is the content mobile-friendly?**
A: Yes, the editor and output are fully responsive and mobile-optimized.

**Q: Can I undo changes?**
A: Yes, use the undo/redo buttons or keyboard shortcuts (Ctrl/Cmd + Z).

---

## Quick Reference

### Toolbar Layout

```
[B][I][U][S] | [H2][H3][H4][P] | [•][1] | [←][↔][→] | [🔗][🖼] | [""][—] | [↶][↷]
```

- **[B][I][U][S]** - Bold, Italic, Underline, Strikethrough
- **[H2][H3][H4][P]** - Headings and Paragraph
- **[•][1]** - Bullet List, Numbered List
- **[←][↔][→]** - Align Left, Center, Right
- **[🔗][🖼]** - Insert Link, Insert Image
- **[""][—]** - Blockquote, Horizontal Rule
- **[↶][↷]** - Undo, Redo

---

**Happy Writing! ✍️**

The TipTap editor makes creating beautiful, formatted blog content a breeze!
