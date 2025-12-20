# Blog System Documentation

## Overview

A complete, production-ready blogging system has been implemented for the Finney Law Firm website using Next.js 14+ App Router, TypeScript, Prisma, and PostgreSQL.

## Features Implemented

### ✅ Core Functionality

1. **Blog Post Management**

   - Full CRUD operations (Create, Read, Update, Delete)
   - Draft and published status management
   - Rich HTML content support
   - Auto-generated slugs from titles
   - Reading time estimation
   - View tracking
   - Featured images

2. **Content Organization**

   - Categories (many-to-many relationship with posts)
   - Tags (many-to-many relationship with posts)
   - Author attribution (linked to Professionals)
   - Fallback author name for posts without professional authors

3. **Public Pages**

   - Blog listing page with pagination (`/blog`)
   - Individual blog post pages (`/blog/[slug]`)
   - Search functionality
   - Category filtering
   - Tag filtering
   - Responsive design

4. **Admin Dashboard**

   - Blog post list with stats (`/admin/blog`)
   - Create new posts (`/admin/blog/new`)
   - Edit existing posts (`/admin/blog/[id]/edit`)
   - Delete posts
   - Filter by published/draft status
   - Category and tag management

5. **SEO Optimization**
   - Dynamic meta tags for each post
   - Open Graph tags for social sharing
   - Twitter Card support
   - Semantic HTML structure
   - Proper heading hierarchy

## Database Schema

### BlogPost Model

```prisma
model BlogPost {
  id              String         @id @default(cuid())
  title           String
  slug            String         @unique
  content         String         @db.Text
  excerpt         String?        @db.Text
  featuredImage   String?
  published       Boolean        @default(false)
  publishedAt     DateTime?
  readingTime     Int?
  views           Int            @default(0)
  authorId        String?
  author          Professional?
  authorName      String?
  categories      BlogCategory[]
  tags            BlogTag[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}
```

### BlogCategory Model

```prisma
model BlogCategory {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  posts       BlogPost[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

### BlogTag Model

```prisma
model BlogTag {
  id        String     @id @default(cuid())
  name      String     @unique
  slug      String     @unique
  posts     BlogPost[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

## File Structure

```
app/
├── admin/
│   └── blog/
│       ├── page.tsx                    # Admin blog list page
│       ├── new/
│       │   └── page.tsx               # Create new blog post
│       └── [id]/
│           └── edit/
│               └── page.tsx           # Edit blog post
├── api/
│   └── blog/
│       ├── posts/
│       │   ├── route.ts               # GET all posts, POST create post
│       │   └── [id]/
│       │       └── route.ts           # GET, PUT, DELETE single post
│       ├── categories/
│       │   └── route.ts               # GET all categories, POST create category
│       └── tags/
│           └── route.ts               # GET all tags, POST create tag
├── blog/
│   ├── page.tsx                       # Public blog listing page
│   └── [slug]/
│       └── page.tsx                   # Individual blog post page
└── components/
    ├── BlogPostCard.tsx               # Blog post card component
    ├── BlogSearchBar.tsx              # Search bar component
    └── BlogFilters.tsx                # Category/tag filter component

lib/
└── blog.ts                            # Blog utility functions

prisma/
├── schema.prisma                      # Database schema
└── seed-blog.ts                       # Sample blog data seeder
```

## API Endpoints

### Public Endpoints

These endpoints don't require authentication:

- `GET /api/blog/categories` - Get all categories with post counts
- `GET /api/blog/tags` - Get all tags with post counts

### Admin Endpoints

These endpoints require admin authentication:

- `GET /api/blog/posts` - Get all posts (including drafts)
- `POST /api/blog/posts` - Create a new blog post
- `GET /api/blog/posts/[id]` - Get a single post by ID
- `PUT /api/blog/posts/[id]` - Update a blog post
- `DELETE /api/blog/posts/[id]` - Delete a blog post
- `POST /api/blog/categories` - Create a new category
- `POST /api/blog/tags` - Create a new tag

## Usage Guide

### For Content Creators (Admin Users)

#### Creating a New Blog Post

1. Navigate to `/admin/blog`
2. Click "Create New Post"
3. Fill in the form:
   - **Title** (required) - Auto-generates slug
   - **Slug** - URL-friendly identifier (editable)
   - **Content** (required) - Supports HTML formatting
   - **Excerpt** - Brief summary (auto-generated if empty)
   - **Featured Image** - URL to image
   - **Author** - Select from professionals or enter name
   - **Categories** - Select existing or create new
   - **Tags** - Select existing or create new
4. Choose to:
   - "Save as Draft" - Saves but doesn't publish
   - "Publish Now" - Makes post live immediately

#### Editing a Blog Post

1. Navigate to `/admin/blog`
2. Click "Edit" on any post
3. Make your changes
4. Choose to:
   - "Update" - Save changes to published post
   - "Save Draft" - Save but keep as draft
   - "Publish" - Publish a draft post
   - "Unpublish" - Convert published post to draft

#### Managing Categories and Tags

- Create new categories/tags inline while creating/editing posts
- Categories and tags are automatically linked to posts
- Both are created with auto-generated slugs

### For Visitors (Public)

#### Viewing Blog Posts

1. Navigate to `/blog`
2. Browse all published posts
3. Use search bar to find specific content
4. Filter by category or tag
5. Click on a post to read the full article

#### Individual Blog Post Page

Features:

- Full article content with HTML formatting
- Author information and bio (if available)
- Reading time estimate
- Published date
- View count
- Categories and tags
- Related posts section
- Social sharing buttons
- Back to blog link

## Utility Functions

### Blog Utilities (`lib/blog.ts`)

Key functions available:

```typescript
// Public functions
getPublishedPosts(options?) // Get paginated published posts
getPostBySlug(slug)         // Get single post by slug
getRelatedPosts(postId)     // Get related posts
getAllCategories()          // Get all categories
getAllTags()                // Get all tags

// Admin functions
getAllPostsAdmin(options?)  // Get all posts including drafts
getPostById(id)             // Get post by ID for editing
createBlogPost(data)        // Create new post
updateBlogPost(id, data)    // Update post
deleteBlogPost(id)          // Delete post
getOrCreateCategory(name)   // Get existing or create category
getOrCreateTag(name)        // Get existing or create tag

// Helper functions
generateSlug(title)         // Generate URL-friendly slug
calculateReadingTime(content) // Calculate reading time
generateExcerpt(content)    // Generate excerpt from content
incrementPostViews(postId)  // Increment view count
```

## Sample Data

The system includes a seed script that creates:

### Categories

- Legal Advice
- Case Studies
- Legal News
- Personal Injury

### Tags

- Accident Claims
- Workers Compensation
- Medical Malpractice
- Insurance
- Legal Tips

### Blog Posts

5 comprehensive sample blog posts about:

1. Understanding Your Rights After a Car Accident
2. Workers Compensation: What Every Employee Should Know
3. 5 Signs You May Have a Medical Malpractice Case
4. Dealing with Insurance Companies After an Injury
5. Recent Changes in Ohio Personal Injury Law

### Running the Seed Script

```bash
npm run seed:blog
```

## Technical Details

### Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - ORM for database operations
- **PostgreSQL** - Relational database
- **Tailwind CSS** - Styling framework

### Performance Optimizations

1. **Server-Side Rendering (SSR)**

   - Blog listing page uses SSR for SEO
   - Individual posts use SSR with dynamic metadata

2. **Pagination**

   - Configurable page size (default: 9 for public, 20 for admin)
   - Efficient database queries with skip/take

3. **Caching**

   - Next.js automatically caches static pages
   - Revalidation on updates via router.refresh()

4. **Image Optimization**
   - Next.js Image component for featured images
   - Automatic responsive image loading

### Security Features

1. **Admin Authentication**

   - All admin routes protected by getCurrentAdmin()
   - JWT-based session management
   - Secure cookie-based authentication

2. **Input Validation**

   - Required fields enforced
   - Slug uniqueness validation
   - XSS protection via React's built-in sanitization

3. **CSRF Protection**
   - Next.js built-in CSRF protection
   - Same-origin policy enforced

## SEO Best Practices

### Implemented SEO Features

1. **Meta Tags**

   - Dynamic title for each post
   - Meta descriptions from excerpts
   - Canonical URLs

2. **Open Graph Tags**

   - og:title, og:description
   - og:type set to "article"
   - og:image from featured images
   - Article published time

3. **Twitter Cards**

   - Summary large image card
   - Proper title and description

4. **Structured Data** (Recommended Addition)

   ```json
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": "Post Title",
     "description": "Post excerpt",
     "author": {
       "@type": "Person",
       "name": "Author Name"
     },
     "datePublished": "2024-12-19"
   }
   ```

5. **Semantic HTML**
   - Proper heading hierarchy (h1, h2, h3)
   - Article tags
   - Navigation breadcrumbs

## Future Enhancements (Optional)

### Suggested Features

1. **Rich Text Editor**

   - Integrate TinyMCE or Quill
   - WYSIWYG editing experience
   - Image upload functionality

2. **Comments System**

   - Disqus integration
   - Custom comment system
   - Comment moderation

3. **Email Notifications**

   - Notify subscribers of new posts
   - Admin notifications for comments

4. **Analytics**

   - Track popular posts
   - User engagement metrics
   - Reading completion rates

5. **Advanced Search**

   - Full-text search with Algolia or Meilisearch
   - Search suggestions
   - Advanced filters

6. **RSS Feed**

   - Auto-generated RSS/Atom feed
   - Podcast RSS support

7. **Scheduled Publishing**

   - Set future publish dates
   - Automatic publication
   - Cron job integration

8. **Media Library**

   - Image upload and management
   - CDN integration (Cloudinary, AWS S3)
   - Image optimization

9. **Markdown Support**

   - Alternative to HTML
   - Markdown editor
   - Syntax highlighting for code

10. **Version History**
    - Track post revisions
    - Restore previous versions
    - Compare changes

## Troubleshooting

### Common Issues

#### 1. Posts Not Showing

**Problem:** Published posts don't appear on `/blog`

**Solutions:**

- Verify `published` is set to `true`
- Check `publishedAt` is not in the future
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

#### 2. Slug Conflicts

**Problem:** Error creating post with duplicate slug

**Solutions:**

- Edit the slug to make it unique
- Delete or update the existing post with that slug
- Slugs must be unique across all posts

#### 3. Author Not Displaying

**Problem:** Author shows as "Anonymous"

**Solutions:**

- Link a Professional as author, OR
- Fill in the authorName field
- At least one author method must be provided

#### 4. Images Not Loading

**Problem:** Featured images don't display

**Solutions:**

- Verify image URL is accessible
- Check Next.js Image domains in `next.config.ts`
- Use absolute URLs for images

#### 5. Search Not Working

**Problem:** Search returns no results

**Solutions:**

- Search is case-insensitive
- Searches in title, content, and excerpt
- Check if posts are published
- Try different search terms

### Database Issues

#### Resetting the Blog Database

If you need to start fresh:

```bash
# Remove all blog posts
npx prisma migrate reset

# Re-run migrations
npm run prisma:migrate

# Seed sample data
npm run seed:blog
```

## Maintenance

### Regular Tasks

1. **Database Backups**

   - Regular PostgreSQL backups
   - Export via Prisma: `npx prisma db pull`

2. **Image Cleanup**

   - Remove unused featured images
   - Optimize image sizes

3. **Content Review**

   - Update outdated posts
   - Fix broken links
   - Review and respond to comments (if implemented)

4. **Performance Monitoring**
   - Monitor page load times
   - Check database query performance
   - Review error logs

## Support

### Getting Help

For issues or questions:

1. Check this documentation
2. Review Next.js documentation: https://nextjs.org/docs
3. Check Prisma docs: https://www.prisma.io/docs

### Making Changes

When modifying the blog system:

1. **Database Changes**

   ```bash
   # Update schema.prisma
   npm run prisma:migrate
   npm run prisma:generate
   ```

2. **Code Changes**

   - Test in development first
   - Update types if needed
   - Clear Next.js cache if routes change

3. **Deployment**
   - Build and test: `npm run build`
   - Push to production
   - Run migrations on production database

## Conclusion

This blogging system is production-ready and fully integrated with your law firm website. It includes:

✅ Complete CRUD functionality
✅ Admin dashboard with authentication
✅ Public-facing blog pages
✅ Search and filtering
✅ SEO optimization
✅ Responsive design
✅ Sample data for testing
✅ Comprehensive documentation

The system is scalable, maintainable, and follows Next.js and React best practices.
