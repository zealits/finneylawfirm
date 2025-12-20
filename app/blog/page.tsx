import { getPublishedPosts, getAllCategories, getAllTags } from '@/lib/blog';
import BlogPostCard from '@/app/components/BlogPostCard';
import BlogSearchBar from '@/app/components/BlogSearchBar';
import BlogFilters from '@/app/components/BlogFilters';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import MasonryGrid from '@/app/components/MasonryGrid';
import blogBanner from '../../public/images/blog/blogBanner.jpg';

export const metadata: Metadata = {
  title: 'Blog - Finney Law Firm',
  description: 'Read the latest legal insights, news, and updates from Finney Law Firm. Stay informed about legal matters that affect you.',
  openGraph: {
    title: 'Blog - Finney Law Firm',
    description: 'Read the latest legal insights, news, and updates from Finney Law Firm.',
    type: 'website',
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const categorySlug = params.category as string | undefined;
  const tagSlug = params.tag as string | undefined;
  const search = params.search as string | undefined;

  const [{ posts, pagination }, categories, tags] = await Promise.all([
    getPublishedPosts({ page, limit: 9, categorySlug, tagSlug, search }),
    getAllCategories(),
    getAllTags(),
  ]);

  // Build page title based on filters
  let pageTitle = 'Our Blog';
  if (search) {
    pageTitle = `Search results for "${search}"`;
  } else if (categorySlug) {
    const category = categories.find((c) => c.slug === categorySlug);
    if (category) pageTitle = `${category.name}`;
  } else if (tagSlug) {
    const tag = tags.find((t) => t.slug === tagSlug);
    if (tag) pageTitle = `Posts tagged with "${tag.name}"`;
  }

  return (
    <>
      <Navigation />
      
      {/* Hero Banner Section */}
      <div className="relative w-full overflow-hidden -mt-[180px]" style={{ height: 'calc(60vh + 180px)', minHeight: '500px' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${blogBanner.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-center mx-auto">
              <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">BLOG</p>
              <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto shadow-lg"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-6 leading-tight font-bold drop-shadow-lg">
                {pageTitle}
              </h1>
              <p className="text-white/90 max-w-3xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-md">
                Expert legal insights, news, and updates from our team of experienced attorneys
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <BlogSearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow-md p-6">
              <BlogFilters categories={categories} tags={tags} />
            </div>
          </aside>

          {/* Main Content - Blog Posts */}
          <main className="flex-1">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600 mb-4">
                  {search
                    ? "We couldn't find any posts matching your search."
                    : "There are no blog posts available at the moment."}
                </p>
                {(search || categorySlug || tagSlug) && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    View all posts
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-6 text-gray-600">
                  Showing {posts.length} of {pagination.total} post{pagination.total !== 1 ? 's' : ''}
                </div>

                {/* Blog Posts Masonry Grid */}
                <MasonryGrid>
                  {posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </MasonryGrid>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {/* Previous Button */}
                    {page > 1 && (
                      <Link
                        href={`/blog?page=${page - 1}${categorySlug ? `&category=${categorySlug}` : ''}${tagSlug ? `&tag=${tagSlug}` : ''}${search ? `&search=${search}` : ''}`}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Previous
                      </Link>
                    )}

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter((pageNum) => {
                          // Show first, last, current, and adjacent pages
                          return (
                            pageNum === 1 ||
                            pageNum === pagination.totalPages ||
                            (pageNum >= page - 1 && pageNum <= page + 1)
                          );
                        })
                        .map((pageNum, index, array) => {
                          // Add ellipsis if there's a gap
                          const showEllipsisBefore = index > 0 && pageNum - array[index - 1] > 1;
                          
                          return (
                            <div key={pageNum} className="flex items-center gap-1">
                              {showEllipsisBefore && (
                                <span className="px-2 text-gray-500">...</span>
                              )}
                              <Link
                                href={`/blog?page=${pageNum}${categorySlug ? `&category=${categorySlug}` : ''}${tagSlug ? `&tag=${tagSlug}` : ''}${search ? `&search=${search}` : ''}`}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                  page === pageNum
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </Link>
                            </div>
                          );
                        })}
                    </div>

                    {/* Next Button */}
                    {page < pagination.totalPages && (
                      <Link
                        href={`/blog?page=${page + 1}${categorySlug ? `&category=${categorySlug}` : ''}${tagSlug ? `&tag=${tagSlug}` : ''}${search ? `&search=${search}` : ''}`}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
