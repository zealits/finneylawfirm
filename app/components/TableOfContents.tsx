'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const article = document.querySelector('.blog-content');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const headingElements: Heading[] = [];

    elements.forEach((element, index) => {
      const id = element.id || `heading-${index}`;
      element.id = id;
      headingElements.push({
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      });
    });

    setHeadings(headingElements);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="hidden xl:block fixed right-8 top-32 w-64 max-h-[70vh] overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Table of Contents</h3>
        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
                <a
                  href={`#${heading.id}`}
                  className={`block text-sm transition-colors duration-200 ${
                    activeId === heading.id
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}
