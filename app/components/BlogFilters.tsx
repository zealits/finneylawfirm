'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { BlogCategory, BlogTag } from '@prisma/client';

interface BlogFiltersProps {
  categories: (BlogCategory & { _count: { posts: number } })[];
  tags: (BlogTag & { _count: { posts: number } })[];
}

export default function BlogFilters({ categories, tags }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category');
  const currentTag = searchParams.get('tag');

  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentCategory === slug) {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    
    params.delete('page');
    router.push(`/blog?${params.toString()}`);
  };

  const handleTagClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentTag === slug) {
      params.delete('tag');
    } else {
      params.set('tag', slug);
    }
    
    params.delete('page');
    router.push(`/blog?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('tag');
    params.delete('page');
    router.push(`/blog?${params.toString()}`);
  };

  const hasActiveFilters = currentCategory || currentTag;

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pb-4 border-b">
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  currentCategory === category.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className={`text-xs ${
                    currentCategory === category.slug ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {category._count.posts}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.slug)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  currentTag === tag.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag.name} ({tag._count.posts})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
