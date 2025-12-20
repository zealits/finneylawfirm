import { getPostBySlug, getRelatedPosts, incrementPostViews } from '@/lib/blog';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import BlogPostCard from '@/app/components/BlogPostCard';
import ReadingProgress from '@/app/components/ReadingProgress';
import SocialShare from '@/app/components/SocialShare';
import TableOfContents from '@/app/components/TableOfContents';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return {
      title: 'Post Not Found',
    };
  }

  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : post.authorName || 'Finney Law Firm';

  return {
    title: `${post.title} - Finney Law Firm Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    authors: [{ name: authorName }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [authorName],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Check if post exists and is published
  if (!post || !post.published) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementPostViews(post.id).catch(console.error);

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.id, 3);

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
    <>
      <Navigation />
      <ReadingProgress />

      <article className="bg-white min-h-screen">
        {/* Hero Section - More Modern */}
        <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb - More Subtle */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gray-600">/</li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li className="text-gray-600">/</li>
                <li className="text-gray-300 truncate">{post.title}</li>
              </ol>
            </nav>

            {/* Categories - Enhanced */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog?category=${category.slug}`}
                    className="group inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 group-hover:scale-125 transition-transform"></span>
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title - More Dramatic */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Meta Information - Redesigned */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {authorName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{authorName}</p>
                  {post.author?.title && (
                    <p className="text-xs text-gray-400">{post.author.title}</p>
                  )}
                </div>
              </div>
              {publishedDate && (
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">{publishedDate}</span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{post.readingTime} min read</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-sm">{post.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image - Adaptive Container */}
        {post.featuredImage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={1400}
                height={800}
                className="w-full h-auto object-cover max-h-[600px]"
                priority
                sizes="(max-width: 1536px) 100vw, 1536px"
              />
            </div>
          </div>
        )}

        {/* Sticky Social Share */}
        <SocialShare 
          url="" 
          title={post.title} 
          description={post.excerpt || ''} 
          sticky 
        />

        {/* Table of Contents */}
        <TableOfContents />

        {/* Content - Enhanced Typography */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="blog-content prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:list-inside
              prose-ol:my-6 prose-ol:list-decimal prose-ol:list-inside
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg
              prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12
              first-letter:text-7xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags - Enhanced */}
          {post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Related Topics</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="group inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span className="mr-2 text-gray-400 group-hover:text-blue-500 transition-colors">#</span>
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section - Beautiful Cards */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enjoyed this article?</h3>
                <p className="text-gray-600">Share it with your network!</p>
              </div>
              <SocialShare 
                url="" 
                title={post.title} 
                description={post.excerpt || ''} 
              />
            </div>
          </div>

          {/* Author Bio - Stunning Card */}
          {post.author && (
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {post.author.firstName[0]}
                      {post.author.lastName[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-300 mb-3 border border-white/20">
                      WRITTEN BY
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {post.author.firstName} {post.author.lastName}
                    </h3>
                    <p className="text-blue-200 font-medium mb-4">{post.author.title}</p>
                    {post.author.biography && (
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {post.author.biography.substring(0, 250)}...
                      </p>
                    )}
                    <Link
                      href={`/team/${post.author.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      View Full Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Posts - Enhanced */}
        {relatedPosts.length > 0 && (
          <div className="relative bg-gradient-to-b from-gray-50 to-white py-20 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-1.5 bg-blue-100 rounded-full text-sm font-semibold text-blue-700 mb-4">
                  KEEP READING
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Related Articles
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Continue exploring topics that matter to you
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <div
                    key={relatedPost.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <BlogPostCard post={relatedPost} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog - Enhanced CTA */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Posts
              </Link>
              <div className="text-center sm:text-right">
                <p className="text-sm text-gray-600 mb-1">Have a case?</p>
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Contact Us Today →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
