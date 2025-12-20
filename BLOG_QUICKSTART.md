# Blog System Quick Start Guide

## 🚀 Getting Started

Your Next.js law firm website now has a complete blogging system! Here's how to get started:

## ✅ What's Been Implemented

### Admin Features

- ✅ Create, edit, and delete blog posts
- ✅ Draft and publish functionality
- ✅ Category and tag management
- ✅ Rich HTML content support
- ✅ Featured images
- ✅ Author attribution
- ✅ SEO optimization

### Public Features

- ✅ Blog listing page with pagination
- ✅ Individual blog post pages
- ✅ Search functionality
- ✅ Filter by category/tag
- ✅ Related posts
- ✅ Social sharing buttons
- ✅ Mobile responsive design

## 📍 Important URLs

### Public Pages

- **Blog Home:** http://localhost:3040/blog
- **Individual Post:** http://localhost:3040/blog/[slug]

### Admin Pages (Requires Login)

- **Blog Dashboard:** http://localhost:3040/admin/blog
- **Create Post:** http://localhost:3040/admin/blog/new
- **Edit Post:** http://localhost:3040/admin/blog/[id]/edit

## 🎯 Quick Actions

### 1. View Sample Blog Posts

```bash
# Make sure your dev server is running
npm run dev

# Visit the blog page
http://localhost:3040/blog
```

You'll see 5 sample blog posts already created!

### 2. Create Your First Blog Post

1. **Login as Admin**

   - Go to: http://localhost:3040/admin/auth/login
   - Use your admin credentials

2. **Navigate to Blog Dashboard**

   - Go to: http://localhost:3040/admin/blog
   - Click "Create New Post"

3. **Fill in the Form**

   ```
   Title: Your Blog Post Title
   Slug: auto-generated (editable)
   Content: Your blog content (supports HTML)
   Excerpt: Optional summary
   Featured Image: Optional image URL
   Author: Select or enter name
   Categories: Select or create new
   Tags: Select or create new
   ```

4. **Publish**
   - Click "Publish Now" to make it live
   - Or "Save as Draft" to work on it later

### 3. Edit an Existing Post

1. Go to http://localhost:3040/admin/blog
2. Click "Edit" on any post
3. Make your changes
4. Click "Update" to save

### 4. Delete a Post

1. Go to http://localhost:3040/admin/blog
2. Click "Edit" on the post you want to delete
3. Scroll down and click "Delete Post"
4. Confirm deletion

## 🎨 Customization Tips

### Change Blog Title/Description

Edit `app/blog/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Custom Title - Finney Law Firm",
  description: "Your custom description",
};
```

### Change Number of Posts Per Page

Edit `app/blog/page.tsx`:

```typescript
const [{ posts, pagination }, categories, tags] = await Promise.all([
  getPublishedPosts({
    page,
    limit: 12, // Change this number
    categorySlug,
    tagSlug,
    search,
  }),
  // ...
]);
```

### Change Blog Post Card Styling

Edit `app/components/BlogPostCard.tsx` to customize:

- Card layout
- Image sizes
- Text styles
- Colors
- Hover effects

### Add More Categories

```bash
npm run seed:blog
# Or create them through the admin interface
```

## 📊 Database Management

### View Database in Prisma Studio

```bash
npm run prisma:studio
```

Opens visual database editor at http://localhost:5555

### Add More Sample Data

```bash
npm run seed:blog
```

This script is idempotent - it won't duplicate existing data.

### Reset Blog Data

```bash
# WARNING: This deletes all blog data!
npx prisma migrate reset
npm run seed:blog
```

## 🔍 Features Overview

### Search Functionality

- Searches in: title, content, excerpt
- Case-insensitive
- Real-time filtering
- Clears with X button

### Category Filtering

- Click any category name
- Shows post count per category
- Combines with search
- Resets pagination

### Tag Filtering

- Click any tag
- Combines with search
- Shows post count per tag
- Toggle on/off

### Pagination

- Configurable page size
- Smart ellipsis for many pages
- Preserves filters while paginating
- Shows total results

### Author Attribution

Two options:

1. Link to a Professional (from your team)
2. Enter a custom author name

### Reading Time

- Auto-calculated from content
- Based on 200 words per minute
- Displayed on cards and post pages

### View Tracking

- Automatically increments on page view
- Displayed on individual posts
- Shown in admin dashboard

## 🎯 Common Tasks

### How to Format Blog Content

The content field supports HTML. Here are common examples:

```html
<!-- Headings -->
<h2>Main Section</h2>
<h3>Subsection</h3>

<!-- Paragraphs -->
<p>Your paragraph text here.</p>

<!-- Lists -->
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>

<!-- Links -->
<a href="https://example.com">Link text</a>

<!-- Bold and Italic -->
<strong>Bold text</strong>
<em>Italic text</em>

<!-- Images -->
<img src="/images/photo.jpg" alt="Description" />

<!-- Blockquotes -->
<blockquote>
  <p>Quote text here</p>
</blockquote>
```

### How to Add Featured Images

1. Upload image to `public/images/blog/`
2. Use relative path: `/images/blog/your-image.jpg`
3. Or use external URL: `https://example.com/image.jpg`

### How to Create Categories

Two ways:

1. **While creating/editing a post:**

   - Type category name in "New category name" field
   - Click "Add"
   - Automatically selected for current post

2. **Via API (for bulk creation):**
   ```bash
   curl -X POST http://localhost:3040/api/blog/categories \
     -H "Content-Type: application/json" \
     -d '{"name": "New Category"}'
   ```

### How to Create Tags

Same as categories - either:

1. Inline while creating/editing posts
2. Via API for bulk creation

## 🚨 Troubleshooting

### Problem: Can't see blog posts

**Solution:** Check that:

- Posts are marked as "Published"
- publishedAt date is not in the future
- You're viewing the public page, not admin page

### Problem: Images not loading

**Solution:**

- Verify image URL is correct
- Check file exists in public folder
- Use absolute URLs or correct relative paths

### Problem: Search returns no results

**Solution:**

- Ensure posts are published
- Try different search terms
- Check spelling

### Problem: Slug already exists error

**Solution:**

- Edit the slug to make it unique
- Or delete/edit the existing post with that slug

## 📚 Next Steps

1. **Read Full Documentation**

   - See `BLOG_DOCUMENTATION.md` for complete details

2. **Create Your Content**

   - Write blog posts about legal topics
   - Add categories relevant to your practice
   - Tag posts for easy discovery

3. **Customize Design**

   - Match your brand colors
   - Adjust layouts
   - Add custom components

4. **Optimize for SEO**

   - Use descriptive titles
   - Write compelling excerpts
   - Include relevant keywords
   - Add alt text to images

5. **Promote Your Blog**
   - Share on social media
   - Include in newsletters
   - Link from your homepage

## 💡 Pro Tips

1. **Write Consistently**

   - Aim for regular posting schedule
   - Use drafts to prepare content in advance

2. **Use Categories Wisely**

   - 5-10 main categories is ideal
   - Make them broad enough to be reusable

3. **Tag Strategically**

   - Use specific tags
   - Helps users find related content
   - Don't overuse - 3-5 tags per post is good

4. **Optimize Images**

   - Use compressed images
   - Aim for < 200KB per image
   - Proper dimensions: 1200x630px recommended

5. **Write for Your Audience**
   - Use clear, accessible language
   - Break up text with headings
   - Include helpful lists
   - Add relevant examples

## 📧 Support

Need help? Check:

- `BLOG_DOCUMENTATION.md` - Complete reference
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs

---

**Happy Blogging! 📝**

Your blog system is ready to use. Start creating content and engage with your audience!
