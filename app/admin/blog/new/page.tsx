'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const TipTapEditor = dynamic(() => import('@/app/components/TipTapEditor'), {
  ssr: false,
  loading: () => <div className="border border-gray-300 rounded-lg p-4 min-h-[300px] bg-gray-50">Loading editor...</div>,
});

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Professional {
  id: string;
  firstName: string;
  lastName: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    published: false,
    authorId: '',
    authorName: '',
    categoryIds: [] as string[],
    tagIds: [] as string[],
    newCategory: '',
    newTag: '',
  });

  // Load categories, tags, and professionals
  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, tagRes, profRes] = await Promise.all([
          fetch('/api/blog/categories'),
          fetch('/api/blog/tags'),
          fetch('/api/professionals'),
        ]);

        if (catRes.ok) {
          const data = await catRes.json();
          setCategories(data);
        }

        if (tagRes.ok) {
          const data = await tagRes.json();
          setTags(data);
        }

        if (profRes.ok) {
          const data = await profRes.json();
          setProfessionals(data);
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 100);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, formData.slug]);

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published: publish,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!formData.newCategory.trim()) return;

    try {
      const response = await fetch('/api/blog/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.newCategory }),
      });

      if (response.ok) {
        const newCat = await response.json();
        setCategories([...categories, newCat]);
        setFormData({ ...formData, newCategory: '', categoryIds: [...formData.categoryIds, newCat.id] });
      }
    } catch (err) {
      console.error('Error creating category:', err);
    }
  };

  const addTag = async () => {
    if (!formData.newTag.trim()) return;

    try {
      const response = await fetch('/api/blog/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.newTag }),
      });

      if (response.ok) {
        const newTag = await response.json();
        setTags([...tags, newTag]);
        setFormData({ ...formData, newTag: '', tagIds: [...formData.tagIds, newTag.id] });
      }
    } catch (err) {
      console.error('Error creating tag:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
            <Link
              href="/admin/blog"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="space-y-6">
          {/* Title */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Enter post title"
            />
          </div>

          {/* Slug */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="url-friendly-slug"
            />
            <p className="mt-1 text-sm text-gray-500">
              URL: /blog/{formData.slug || 'your-post-slug'}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <TipTapEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Write your blog post content here..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Estimated reading time:{' '}
              {Math.max(1, Math.ceil(formData.content.trim().split(/\s+/).length / 200))} min
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Optional)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Brief summary of the post (auto-generated if left empty)"
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image (Optional)
            </label>
            
            {/* Image Preview */}
            {formData.featuredImage && (
              <div className="mb-4 relative inline-block">
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="max-w-full max-h-96 w-auto h-auto object-contain rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featuredImage: '' })}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* File Upload */}
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  // Validate file size
                  if (file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    e.target.value = '';
                    return;
                  }

                  setUploadingImage(true);
                  try {
                    const formData = new FormData();
                    formData.append('image', file);

                    const response = await fetch('/api/blog/upload-image', {
                      method: 'POST',
                      body: formData,
                    });

                    if (!response.ok) {
                      const error = await response.json();
                      throw new Error(error.error || 'Upload failed');
                    }

                    const data = await response.json();
                    setFormData((prev) => ({ ...prev, featuredImage: data.url }));
                  } catch (err: any) {
                    alert(err.message || 'Failed to upload image');
                  } finally {
                    setUploadingImage(false);
                    e.target.value = '';
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={uploadingImage}
              />
              {uploadingImage && (
                <span className="px-4 py-2 text-sm text-gray-600">Uploading...</span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Upload an image from your device (JPEG, PNG, GIF, WebP - Max 5MB)
            </p>
          </div>

          {/* Author */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <select
              value={formData.authorId}
              onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            >
              <option value="">Select a professional</option>
              {professionals.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.firstName} {prof.lastName}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mb-2">Or enter author name manually:</p>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Author name"
            />
          </div>

          {/* Categories */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="space-y-2 mb-3">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          categoryIds: [...formData.categoryIds, cat.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          categoryIds: formData.categoryIds.filter((id) => id !== cat.id),
                        });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newCategory}
                onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New category name"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white shadow rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    formData.tagIds.includes(tag.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.tagIds.includes(tag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, tagIds: [...formData.tagIds, tag.id] });
                      } else {
                        setFormData({
                          ...formData,
                          tagIds: formData.tagIds.filter((id) => id !== tag.id),
                        });
                      }
                    }}
                    className="sr-only"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New tag name"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/blog"
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading || !formData.title || !formData.slug || !formData.content}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading || !formData.title || !formData.slug || !formData.content}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
