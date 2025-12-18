import Link from 'next/link';

interface PracticeArea {
  id: number;
  title: string;
  icon: string;
}

const practiceAreas: PracticeArea[] = [
  { id: 1, title: 'LABOR & EMPLOYMENT LAW', icon: '📄' },
  { id: 2, title: 'SMALL BUSINESS SOLUTIONS GROUP', icon: '👥' },
  { id: 3, title: 'ESTATE PLANNING & ADMINISTRATION', icon: '📋' },
  { id: 4, title: 'PUBLIC INTEREST LAW', icon: '📢' },
  { id: 5, title: 'COMMERCIAL REAL ESTATE', icon: '🏢' },
  { id: 6, title: 'RESIDENTIAL REAL ESTATE', icon: '🏠' },
  { id: 7, title: 'CORPORATE TRANSACTIONAL', icon: '💼' },
  { id: 8, title: 'BUSINESS & COMMERCIAL LITIGATION', icon: '🤝' },
  { id: 9, title: 'PERSONAL INJURY', icon: '⚠️' },
  { id: 10, title: 'PROPERTY TAX VALUATION', icon: '🏘️' },
  { id: 11, title: 'IVY POINTE TITLE', icon: '🏷️' },
];

export default function PracticeAreas() {
  return (
    <section className="section-padding bg-white">
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
              href={`/practice-areas/${area.id}`}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white p-8 md:p-10 aspect-square flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer rounded-xl shadow-lg hover:shadow-2xl border border-gray-700 hover:border-yellow-500"
            >
              <div className="text-5xl md:text-6xl mb-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300">{area.icon}</div>
              <h3 className="text-center text-xs md:text-sm font-semibold uppercase tracking-wide leading-tight">
                {area.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
