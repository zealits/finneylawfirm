'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallback?: React.ReactNode;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  fallback,
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      fallback || (
        <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ minHeight: height }}>
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setImageError(true)}
    />
  );
}
