'use client';

import { useState, useEffect } from 'react';
import slider1 from '../../public/images/heroSection/slider1.png'
import slider2 from '../../public/images/heroSection/slider2.png'
import slider3 from '../../public/images/heroSection/slider3.png'

interface CarouselSlide {
  id: number;
  backgroundImage?: string;
  backgroundGradient?: string;
  subheadline: string;
  headline: string;
  overlay?: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    // backgroundGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',// Ocean blue gradient
    backgroundImage: slider1.src.toString(), 
    subheadline: 'WE AGGRESSIVELY ADVANCE COMMERCIAL AND INDIVIDUAL DISPUTE RESOLUTION',
    headline: 'Navigating Turbulent Waters',
  },
  {
    id: 2,
    // backgroundGradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)', // Purple gradient
    backgroundImage: slider2.src.toString(), 
    subheadline: 'WE ARE COMMITTED TO THE HIGHEST QUALITY AND ETHICAL PRACTICE OF LAW',
    headline: 'Making A Difference For Our Clients',
  },
  {
    id: 3,
    // backgroundGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)', // Gray gradient
    backgroundImage: slider3.src.toString(), 
    subheadline: 'FINNEY LAW FIRM HAS WON THREE CASES',
    overlay: 'BEFORE THE U.S. SUPREME COURT',
    headline: 'Small Firm, BIG Cases',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden -mt-[180px]" style={{ height: 'calc(100vh + 180px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: currentSlideData.backgroundImage 
              ? `url(${currentSlideData.backgroundImage})`
              : currentSlideData.backgroundGradient || 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            backgroundSize: currentSlideData.backgroundImage ? 'cover' : '100% 100%',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {currentSlideData.subheadline && (
              <p className="text-white/90 text-xs md:text-sm lg:text-base mb-6 uppercase tracking-wider font-medium leading-relaxed">
                {currentSlideData.subheadline}
              </p>
            )}
            {currentSlideData.overlay && (
              <p className="text-white/90 text-xs md:text-sm lg:text-base mb-4 uppercase tracking-wider font-medium">
                {currentSlideData.overlay}
              </p>
            )}
            <div className="w-24 h-1 bg-yellow-500 mb-8 shadow-lg"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-10 leading-[1.1] font-bold drop-shadow-lg">
              {currentSlideData.headline}
            </h1>
            <button className="btn-primary text-sm md:text-base">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 shadow-lg ${
              index === currentSlide ? 'bg-yellow-500 w-10' : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
          setIsAutoPlaying(false);
        }}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
          setIsAutoPlaying(false);
        }}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}


