'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Column 1: Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif mb-6">FINNEY LAW FIRM</h3>
            <a href="mailto:info@finneylawfirm.com" className="text-gray-300 hover:text-yellow-400 transition-colors block mb-6">
              info@finneylawfirm.com
            </a>
            
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2 text-yellow-400">Downtown:</p>
                <p className="text-gray-300 text-sm leading-relaxed">635 Main Street</p>
                <p className="text-gray-300 text-sm leading-relaxed">Cincinnati, Ohio 45202</p>
                <a href="tel:513-854-8834" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">513-854-8834</a>
              </div>
              
              <div>
                <p className="font-semibold mb-2 text-yellow-400">Eastgate:</p>
                <p className="text-gray-300 text-sm leading-relaxed">4270 Ivy Pointe Boulevard, Suite 225</p>
                <p className="text-gray-300 text-sm leading-relaxed">Cincinnati, Ohio 45245</p>
                <a href="tel:513-943-6650" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">513-943-6650</a>
              </div>
              
              <div>
                <p className="font-semibold mb-2 text-yellow-400">Ft. Thomas:</p>
                <p className="text-gray-300 text-sm leading-relaxed">1501 Alexandria Pike</p>
                <p className="text-gray-300 text-sm leading-relaxed">Ft. Thomas, Kentucky 41075</p>
                <a href="tel:859-577-7893" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">859-577-7893</a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b-2 border-yellow-500 pb-3 inline-block">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>Practice Areas</span>
                </Link>
              </li>
              <li>
                <Link href="/professionals" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>Professionals</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span>Disclaimer</span>
                </Link>
              </li>
            </ul>

            <div className="mt-10">
              <h4 className="text-lg font-semibold mb-6 border-b-2 border-yellow-500 pb-3 inline-block">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg" aria-label="Facebook">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg" aria-label="Twitter">
                  <span className="text-sm font-bold">X</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <span className="text-xs font-bold">in</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b-2 border-yellow-500 pb-3 inline-block">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/practice-areas/commercial-real-estate" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Commercial Real Estate</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/residential-real-estate" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Residential Real Estate</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/corporate-transactional" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Corporate Transactional</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/business-civil-litigation" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Business & Civil Litigation</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/labor-employment" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Labor & Employment Law</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/small-business" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Small Business Solutions Group</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/estate-planning" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Estate Planning & Admin</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/public-interest" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Public Interest Law</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/personal-injury" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Personal Injury</span>
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/property-tax" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">›</span>
                  <span className="text-sm">Property Tax Valuation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Ivy Pointe Title & Recent Tweets */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b-2 border-yellow-500 pb-3 inline-block">
              Ivy Pointe Title
            </h4>
            <p className="text-green-400 text-xl md:text-2xl font-bold mb-4">ivy pointe title</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-10">
              Ivy Pointe Title is part of the Finney family of companies dedicated to "making a difference" for our clients.
            </p>

            <div>
              <h4 className="text-lg font-semibold mb-6 border-b-2 border-yellow-500 pb-3 inline-block">
                Recent Tweets
              </h4>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm italic">
                  Twitter feed is not available at the moment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Finney Law Firm. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
