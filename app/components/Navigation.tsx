'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { practiceAreas } from '@/lib/practiceAreas';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfessionalsDropdownOpen, setIsProfessionalsDropdownOpen] = useState(false);
  const [isPracticeAreasDropdownOpen, setIsPracticeAreasDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const practiceAreasDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfessionalsDropdownOpen(false);
      }
      if (practiceAreasDropdownRef.current && !practiceAreasDropdownRef.current.contains(event.target as Node)) {
        setIsPracticeAreasDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    }

    if (isProfessionalsDropdownOpen || isPracticeAreasDropdownOpen || isAboutDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfessionalsDropdownOpen, isPracticeAreasDropdownOpen, isAboutDropdownOpen]);

  // Handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    if (window.location.hash === '#practice-areas-section') {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        const section = document.getElementById('practice-areas-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  // Handle Practice Areas click - scroll to section on homepage, navigate to page otherwise
  function handlePracticeAreasClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href');
    if (href === '/practice-areas' || href === '#practice-areas') {
      e.preventDefault();
      // Check if we're on the homepage
      if (window.location.pathname === '/') {
        const section = document.getElementById('practice-areas-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to homepage and scroll
        window.location.href = '/#practice-areas-section';
      }
    }
  }

  const topBarRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);

  useEffect(() => {
    if (topBarRef.current) {
      setTopBarHeight(topBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div ref={topBarRef} className="bg-gray-900 text-white py-3 px-4 border-b border-gray-800">
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
      <nav 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-gray-100' 
            : ''
        }`}
        style={!isScrolled ? { 
          backgroundColor: 'transparent', 
          background: 'transparent' 
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className={`text-xl md:text-2xl lg:text-3xl font-serif font-bold transition-colors ${
              isScrolled 
                ? 'text-gray-900 hover:text-yellow-600' 
                : 'text-white hover:text-yellow-400'
            }`}>
              FINNEY LAW FIRM
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div 
                ref={aboutDropdownRef}
                className="relative"
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <Link 
                  href="/about-us" 
                  className={`transition-colors font-medium text-sm uppercase tracking-wider relative group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-yellow-600' 
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  ABOUT
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all ${isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'} ${isAboutDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                {/* About Dropdown Menu */}
                {isAboutDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="py-2">
                        <Link 
                          href="/about-us/vision-values" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          VISION & VALUES
                        </Link>
                        <Link 
                          href="/about-us/making-a-difference" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          MAKING A DIFFERENCE
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div 
                ref={practiceAreasDropdownRef}
                className="relative"
                onMouseEnter={() => setIsPracticeAreasDropdownOpen(true)}
                onMouseLeave={() => setIsPracticeAreasDropdownOpen(false)}
              >
                <Link 
                  href="/practice-areas" 
                  onClick={handlePracticeAreasClick}
                  className={`transition-colors font-medium text-sm uppercase tracking-wider relative group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-yellow-600' 
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  PRACTICE AREAS
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all ${isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'} ${isPracticeAreasDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                {/* Practice Areas Dropdown Menu */}
                {isPracticeAreasDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-80 z-50">
                    <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="py-2">
                        {practiceAreas.map((area) => (
                          <Link 
                            key={area.id}
                            href={`/practice-areas/${area.slug}`} 
                            className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                            onClick={() => setIsPracticeAreasDropdownOpen(false)}
                          >
                            {area.title.toUpperCase()}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsProfessionalsDropdownOpen(true)}
                onMouseLeave={() => setIsProfessionalsDropdownOpen(false)}
              >
                <Link 
                  href="/professionals" 
                  className={`transition-colors font-medium text-sm uppercase tracking-wider relative group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-yellow-600' 
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  PROFESSIONALS
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all ${isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'} ${isProfessionalsDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                {/* Dropdown Menu */}
                {isProfessionalsDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="py-2">
                        <Link 
                          href="/professionals/attorneys" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsProfessionalsDropdownOpen(false)}
                        >
                          ATTORNEYS
                        </Link>
                        <Link 
                          href="/professionals/of-counsel" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsProfessionalsDropdownOpen(false)}
                        >
                          OF COUNSEL
                        </Link>
                        <Link 
                          href="/professionals/paralegals" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsProfessionalsDropdownOpen(false)}
                        >
                          PARALEGALS
                        </Link>
                        <Link 
                          href="/professionals/admin-staff" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsProfessionalsDropdownOpen(false)}
                        >
                          ADMIN STAFF
                        </Link>
                        <Link 
                          href="/professionals/law-clerks-and-interns" 
                          className="block px-6 py-3 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors text-sm uppercase tracking-wider"
                          onClick={() => setIsProfessionalsDropdownOpen(false)}
                        >
                          LAW CLERKS AND INTERNS
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/blog" className={`transition-colors font-medium text-sm uppercase tracking-wider relative group ${
                isScrolled 
                  ? 'text-gray-700 hover:text-yellow-600' 
                  : 'text-white hover:text-yellow-400'
              }`}>
                BLOG
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'}`}></span>
              </Link>
              <Link href="/contact" className={`transition-colors font-medium text-sm uppercase tracking-wider relative group ${
                isScrolled 
                  ? 'text-gray-700 hover:text-yellow-600' 
                  : 'text-white hover:text-yellow-400'
              }`}>
                CONTACT
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-yellow-600' : 'bg-yellow-400'}`}></span>
              </Link>
              <button className={`transition-colors p-2 rounded-full ${
                isScrolled 
                  ? 'text-gray-700 hover:text-yellow-600 hover:bg-gray-100' 
                  : 'text-white hover:text-yellow-400 hover:bg-white/10'
              }`} aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link 
                href="/case" 
                className={`flex items-center gap-2 text-sm px-4 py-2 border transition-all ${
                  isScrolled 
                    ? 'btn-outline border-yellow-600 text-gray-900 hover:bg-yellow-600 hover:text-white' 
                    : 'border-white/50 text-white hover:bg-white/10 hover:border-white'
                }`}
              >
                DO I HAVE A CASE?
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
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
            <div className={`lg:hidden pb-6 pt-4 animate-in slide-in-from-top ${
              isScrolled ? 'border-t border-gray-100' : 'border-t border-white/20'
            }`}>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col">
                  <Link href="/about-us" className={`transition-colors font-medium text-sm uppercase tracking-wider py-2 ${
                    isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
                  }`}>ABOUT</Link>
                  <div className={`pl-4 flex flex-col border-l-2 ml-2 ${
                    isScrolled ? 'border-gray-200' : 'border-white/30'
                  }`}>
                    <Link href="/about-us/vision-values" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>VISION & VALUES</Link>
                    <Link href="/about-us/making-a-difference" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>MAKING A DIFFERENCE</Link>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Link 
                    href="/practice-areas" 
                    onClick={handlePracticeAreasClick}
                    className={`transition-colors font-medium text-sm uppercase tracking-wider py-2 ${
                      isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
                    }`}
                  >
                    PRACTICE AREAS
                  </Link>
                  <div className={`pl-4 flex flex-col border-l-2 ml-2 ${
                    isScrolled ? 'border-gray-200' : 'border-white/30'
                  }`}>
                    {practiceAreas.map((area) => (
                      <Link 
                        key={area.id}
                        href={`/practice-areas/${area.slug}`}
                        className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                          isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                        }`}
                      >
                        {area.title.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Link href="/professionals" className={`transition-colors font-medium text-sm uppercase tracking-wider py-2 ${
                    isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
                  }`}>PROFESSIONALS</Link>
                  <div className={`pl-4 flex flex-col border-l-2 ml-2 ${
                    isScrolled ? 'border-gray-200' : 'border-white/30'
                  }`}>
                    <Link href="/professionals/attorneys" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>ATTORNEYS</Link>
                    <Link href="/professionals/of-counsel" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>OF COUNSEL</Link>
                    <Link href="/professionals/paralegals" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>PARALEGALS</Link>
                    <Link href="/professionals/admin-staff" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>ADMIN STAFF</Link>
                    <Link href="/professionals/law-clerks-and-interns" className={`transition-colors text-xs uppercase tracking-wider py-1 ${
                      isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-yellow-400'
                    }`}>LAW CLERKS AND INTERNS</Link>
                  </div>
                </div>
                <Link href="/blog" className={`transition-colors font-medium text-sm uppercase tracking-wider py-2 ${
                  isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
                }`}>BLOG</Link>
                <Link href="/contact" className={`transition-colors font-medium text-sm uppercase tracking-wider py-2 ${
                  isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
                }`}>CONTACT</Link>
                <Link 
                  href="/case" 
                  className={`text-center mt-2 px-4 py-2 border transition-all ${
                    isScrolled 
                      ? 'btn-outline border-yellow-600 text-gray-900 hover:bg-yellow-600 hover:text-white' 
                      : 'border-white/50 text-white hover:bg-white/10 hover:border-white'
                  }`}
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
    </div>
  );
}


