'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { BlogPostWithRelations } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPostWithRelations;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : post.authorName || 'Anonymous';

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid mb-6">
      {post.featuredImage && !imageError && (
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative w-full bg-gray-100 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          </div>
        </Link>
      )}
      {post.featuredImage && imageError && (
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative w-full bg-gray-200 h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        </Link>
      )}
      
      <div className="p-6">
        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">{authorName}</span>
            {publishedDate && <span>{publishedDate}</span>}
          </div>
          
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} min read
            </span>
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className="text-xs text-gray-600 hover:text-blue-600"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
