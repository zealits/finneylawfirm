'use client';

import Masonry from 'react-masonry-css';
import { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
}

// Type assertion to fix React 19 compatibility issue
const MasonryComponent = Masonry as any;

export default function MasonryGrid({ children }: MasonryGridProps) {
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <MasonryComponent
      breakpointCols={breakpointColumns}
      className="masonry-grid mb-12"
      columnClassName="masonry-grid-column"
    >
      {children}
    </MasonryComponent>
  );
}
