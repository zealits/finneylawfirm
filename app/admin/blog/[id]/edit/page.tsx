'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  published: boolean;
  authorId: string | null;
  authorName: string | null;
  categories: Category[];
  tags: Tag[];
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
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

  // Load post data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [postRes, catRes, tagRes, profRes] = await Promise.all([
          fetch(`/api/blog/posts/${postId}`),
          fetch('/api/blog/categories'),
          fetch('/api/blog/tags'),
          fetch('/api/professionals'),
        ]);

        if (!postRes.ok) {
          throw new Error('Failed to load post');
        }

        const post: BlogPost = await postRes.json();
        
        setFormData({
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt || '',
          featuredImage: post.featuredImage || '',
          published: post.published,
          authorId: post.authorId || '',
          authorName: post.authorName || '',
          categoryIds: post.categories.map((c) => c.id),
          tagIds: post.tags.map((t) => t.id),
          newCategory: '',
          newTag: '',
        });

        if (catRes.ok) setCategories(await catRes.json());
        if (tagRes.ok) setTags(await tagRes.json());
        if (profRes.ok) setProfessionals(await profRes.json());

        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
        setLoading(false);
      }
    };

    loadData();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published: publish !== undefined ? publish : formData.published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
      setDeleting(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <div className="flex gap-3">
              <Link
                href="/admin/blog"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to Blog
              </Link>
              {formData.published && (
                <Link
                  href={`/blog/${formData.slug}`}
                  target="_blank"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  View Post
                </Link>
              )}
            </div>
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
            />
            <p className="mt-1 text-sm text-gray-500">
              URL: /blog/{formData.slug}
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete Post'}
            </button>
            <div className="flex gap-3">
              <Link
                href="/admin/blog"
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              {formData.published ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, false)}
                    disabled={saving}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Unpublish'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Update'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, false)}
                    disabled={saving}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Draft'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Publishing...' : 'Publish'}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
