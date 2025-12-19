import Link from 'next/link';
import { practiceAreas } from '@/lib/practiceAreas';

export default function PracticeAreas() {
  return (
    <section id="practice-areas-section" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">PRACTICE AREAS</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
            We Have Extensive Experience In A Broad Range of <span className="underline decoration-yellow-500 decoration-2">Legal Services</span>.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Click below to learn more about our services and experiences in that area of law. You'll also see exactly which of our attorneys specialize in the service you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {practiceAreas.map((area) => (
            <Link
              key={area.id}
              href={`/practice-areas/${area.slug}`}
              className="group relative bg-white border border-gray-200 hover:border-yellow-500 text-gray-900 p-8 md:p-10 aspect-square flex flex-col items-center justify-center transition-all duration-300 cursor-pointer rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 to-yellow-50/0 group-hover:from-yellow-50/50 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
              
              {/* Icon container with modern styling */}
              <div className="relative z-10 mb-6 p-4 rounded-full bg-gray-50 group-hover:bg-yellow-50 transition-colors duration-300">
                <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
              </div>
              
              {/* Title with improved typography */}
              <h3 className="relative z-10 text-center text-xs md:text-sm font-semibold uppercase tracking-wider leading-tight text-gray-800 group-hover:text-gray-900 transition-colors duration-300 px-2">
                {area.title.toUpperCase()}
              </h3>
              
              {/* Subtle bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/0 to-transparent group-hover:via-yellow-500 transition-all duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


