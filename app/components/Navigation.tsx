'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-3 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs md:text-sm gap-4">
          <div className="text-gray-300 font-medium">THIS IS AN ADVERTISEMENT</div>
          <div className="flex items-center gap-4 md:gap-8 flex-wrap">
            <a href="tel:513-943-6650" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>CALL US: <span className="text-yellow-400 font-semibold">513-943-6650</span></span>
            </a>
            <a href="mailto:info@finneylawfirm.com" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>EMAIL US: <span className="text-yellow-400 font-semibold">info@finneylawfirm.com</span></span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-6 h-6 flex items-center justify-center hover:text-yellow-400 transition-colors" aria-label="Facebook">
              <span className="text-sm font-bold">f</span>
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center hover:text-yellow-400 transition-colors" aria-label="Twitter">
              <span className="text-sm font-bold">X</span>
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center hover:text-yellow-400 transition-colors" aria-label="LinkedIn">
              <span className="text-xs font-bold">in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/98 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 font-bold hover:text-yellow-600 transition-colors">
              FINNEY LAW FIRM
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider relative group">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/practice-areas" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider relative group">
                PRACTICE AREAS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/professionals" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider relative group">
                PROFESSIONALS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider relative group">
                BLOG
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider relative group">
                CONTACT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all group-hover:w-full"></span>
              </Link>
              <button className="text-gray-700 hover:text-yellow-600 transition-colors p-2 hover:bg-gray-100 rounded-full" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link 
                href="/case" 
                className="btn-outline flex items-center gap-2 text-sm"
              >
                DO I HAVE A CASE?
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden pb-6 pt-4 border-t border-gray-100 animate-in slide-in-from-top">
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider py-2">ABOUT</Link>
                <Link href="/practice-areas" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider py-2">PRACTICE AREAS</Link>
                <Link href="/professionals" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider py-2">PROFESSIONALS</Link>
                <Link href="/blog" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider py-2">BLOG</Link>
                <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm uppercase tracking-wider py-2">CONTACT</Link>
                <Link 
                  href="/case" 
                  className="btn-outline text-center mt-2"
                >
                  DO I HAVE A CASE?
                  <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
