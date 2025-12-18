import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Ohio Employment Law: The "Faithless Servant" Doctrine',
    category: 'Labor and Employment Law',
    date: '09 DEC',
    image: '/blog1.jpg',
  },
  {
    id: 2,
    title: 'Trade Names vs. Fictitious Names: How to Best Protect Your Brand',
    category: 'Corporate Transactional',
    date: '09 DEC',
    image: '/blog2.jpg',
  },
  {
    id: 3,
    title: 'Recent Legal Developments in Business Litigation',
    category: 'Business & Commercial Litigation',
    date: '12 NOV',
    image: '/blog3.jpg',
  },
];

export default function RecentBlog() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 leading-tight">
            Recent <span className="underline decoration-yellow-500 decoration-2">Blogs</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group cursor-pointer card-hover"
            >
              <div className="relative h-64 md:h-72 w-full mb-6 overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wide z-10 rounded-md shadow-lg">
                  {post.date}
                </div>
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-gray-700 font-medium">Blog Image</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs md:text-sm mb-3 uppercase tracking-wider font-medium">{post.category}</p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
