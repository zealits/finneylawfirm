import { prisma } from './prisma';
import type { BlogPost, BlogCategory, BlogTag, Professional } from '@prisma/client';

export type BlogPostWithRelations = BlogPost & {
  author?: Professional | null;
  categories: BlogCategory[];
  tags: BlogTag[];
};

// Generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .substring(0, 100); // Limit length
}

// Calculate reading time based on content length
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Extract excerpt from content
export function generateExcerpt(content: string, maxLength: number = 200): string {
  const plainText = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

// Get all published blog posts with pagination
export async function getPublishedPosts(options?: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
}) {
  const page = options?.page || 1;
  const limit = options?.limit || 10;
  const skip = (page - 1) * limit;

  const where: any = {
    published: true,
    publishedAt: { lte: new Date() },
  };

  if (options?.categorySlug) {
    where.categories = {
      some: { slug: options.categorySlug },
    };
  }

  if (options?.tagSlug) {
    where.tags = {
      some: { slug: options.tagSlug },
    };
  }

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: 'insensitive' } },
      { content: { contains: options.search, mode: 'insensitive' } },
      { excerpt: { contains: options.search, mode: 'insensitive' } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        author: true,
        categories: true,
        tags: true,
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}

// Get single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPostWithRelations | null> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });

  return post;
}

// Get related posts based on categories and tags
export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPostWithRelations[]> {
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
    include: { categories: true, tags: true },
  });

  if (!post) return [];

  const categoryIds = post.categories.map((c) => c.id);
  const tagIds = post.tags.map((t) => t.id);

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      AND: [
        { id: { not: postId } },
        { published: true },
        { publishedAt: { lte: new Date() } },
        {
          OR: [
            { categories: { some: { id: { in: categoryIds } } } },
            { tags: { some: { id: { in: tagIds } } } },
          ],
        },
      ],
    },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  });

  return relatedPosts;
}

// Increment post views
export async function incrementPostViews(postId: string): Promise<void> {
  await prisma.blogPost.update({
    where: { id: postId },
    data: { views: { increment: 1 } },
  });
}

// Get all categories with post count
export async function getAllCategories() {
  const categories = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return categories;
}

// Get all tags with post count
export async function getAllTags() {
  const tags = await prisma.blogTag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return tags;
}

// Get or create category
export async function getOrCreateCategory(name: string): Promise<BlogCategory> {
  const slug = generateSlug(name);
  
  let category = await prisma.blogCategory.findUnique({
    where: { slug },
  });

  if (!category) {
    category = await prisma.blogCategory.create({
      data: { name, slug },
    });
  }

  return category;
}

// Get or create tag
export async function getOrCreateTag(name: string): Promise<BlogTag> {
  const slug = generateSlug(name);
  
  let tag = await prisma.blogTag.findUnique({
    where: { slug },
  });

  if (!tag) {
    tag = await prisma.blogTag.create({
      data: { name, slug },
    });
  }

  return tag;
}

// Admin: Get all posts (including drafts)
export async function getAllPostsAdmin(options?: {
  page?: number;
  limit?: number;
  published?: boolean;
}) {
  const page = options?.page || 1;
  const limit = options?.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (options?.published !== undefined) {
    where.published = options.published;
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        author: true,
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Admin: Get post by ID (for editing)
export async function getPostById(id: string): Promise<BlogPostWithRelations | null> {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });
}

// Admin: Create blog post
export async function createBlogPost(data: {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  published?: boolean;
  publishedAt?: Date;
  authorId?: string;
  authorName?: string;
  categoryIds?: string[];
  tagIds?: string[];
}) {
  const slug = data.slug || generateSlug(data.title);
  const readingTime = calculateReadingTime(data.content);
  const excerpt = data.excerpt || generateExcerpt(data.content);

  // Convert empty string to null for authorId
  const authorId = data.authorId && data.authorId.trim() !== '' ? data.authorId : null;

  return prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      excerpt,
      featuredImage: data.featuredImage,
      published: data.published || false,
      publishedAt: data.published ? (data.publishedAt || new Date()) : null,
      readingTime,
      authorId,
      authorName: data.authorName,
      categories: data.categoryIds ? {
        connect: data.categoryIds.map(id => ({ id })),
      } : undefined,
      tags: data.tagIds ? {
        connect: data.tagIds.map(id => ({ id })),
      } : undefined,
    },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });
}

// Admin: Update blog post
export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string;
    featuredImage?: string;
    published?: boolean;
    publishedAt?: Date;
    authorId?: string;
    authorName?: string;
    categoryIds?: string[];
    tagIds?: string[];
  }
) {
  const updateData: any = { ...data };

  // Convert empty string to null for authorId
  if (data.authorId !== undefined) {
    updateData.authorId = data.authorId && data.authorId.trim() !== '' ? data.authorId : null;
  }

  // Recalculate reading time if content changed
  if (data.content) {
    updateData.readingTime = calculateReadingTime(data.content);
    if (!data.excerpt) {
      updateData.excerpt = generateExcerpt(data.content);
    }
  }

  // Handle publishedAt when publishing
  if (data.published && !data.publishedAt) {
    const existingPost = await prisma.blogPost.findUnique({ where: { id } });
    if (existingPost && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  // Handle category and tag updates
  if (data.categoryIds !== undefined) {
    updateData.categories = {
      set: data.categoryIds.map(id => ({ id })),
    };
  }

  if (data.tagIds !== undefined) {
    updateData.tags = {
      set: data.tagIds.map(id => ({ id })),
    };
  }

  return prisma.blogPost.update({
    where: { id },
    data: updateData,
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });
}

// Admin: Delete blog post
export async function deleteBlogPost(id: string) {
  return prisma.blogPost.delete({
    where: { id },
  });
}
