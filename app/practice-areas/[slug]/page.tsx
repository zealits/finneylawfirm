import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getPracticeAreaBySlug, practiceAreas } from '@/lib/practiceAreas';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export default async function PracticeAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const practiceArea = getPracticeAreaBySlug(slug);

  if (!practiceArea) {
    notFound();
  }

  // Get all professionals and filter by practice area
  const allProfessionals = await prisma.professional.findMany({
    orderBy: { lastName: 'asc' },
  });

  // Filter professionals whose practiceAreas field contains this practice area
  const associatedProfessionals = allProfessionals.filter((professional) => {
    if (!professional.practiceAreas) return false;
    // Check if the practice area title (case-insensitive) is mentioned in the practiceAreas string
    // Split by comma and check each area, also check for partial matches
    const practiceAreasLower = professional.practiceAreas.toLowerCase();
    const areaTitleLower = practiceArea.title.toLowerCase();
    
    // Direct match
    if (practiceAreasLower.includes(areaTitleLower)) {
      return true;
    }
    
    // Also check for variations (e.g., "Labor & Employment" matches "Labor & Employment Law")
    // Split the practice area title into words and check if all key words are present
    const keyWords = areaTitleLower
      .replace(/&/g, '')
      .replace(/and/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2); // Filter out short words
    
    if (keyWords.length > 0) {
      return keyWords.every(word => practiceAreasLower.includes(word));
    }
    
    return false;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">PRACTICE AREAS</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              {practiceArea.title}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Our experienced team of attorneys specializes in {practiceArea.title.toLowerCase()}. 
              {associatedProfessionals.length > 0 
                ? ` Meet the professionals who can help you with your legal needs.`
                : ' Contact us to learn more about how we can assist you.'}
            </p>
          </div>

          {/* Professionals Grid */}
          {associatedProfessionals.length > 0 ? (
            <>
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8 text-center">
                {practiceArea.title} Professionals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {associatedProfessionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-4">
                No professionals are currently listed for {practiceArea.title.toLowerCase()}.
              </p>
              <Link 
                href="/contact"
                className="inline-block text-yellow-600 hover:text-yellow-700 font-semibold uppercase tracking-wider text-sm"
              >
                Contact Us →
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProfessionalCard({ professional }: { professional: any }) {
  const fullName = `${professional.firstName} ${professional.middleName || ''} ${professional.lastName}`.trim();
  const imageSrc = professional.imagePath 
    ? `/images/${professional.imagePath}` 
    : null;

  return (
    <div className="group bg-white border border-gray-200 hover:border-yellow-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Clickable area for profile (image + name + title) */}
      <Link href={`/team/${professional.slug}`}>
        <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={fullName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-gray-500 text-4xl font-serif">
                {professional.firstName.charAt(0)}
                {professional.lastName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 pb-4">
          <h3 className="text-lg md:text-xl font-serif text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
            {fullName}
          </h3>
          <p className="text-sm text-gray-600">{professional.title}</p>
        </div>
      </Link>

      {/* Contact information (not part of the link) */}
      <div className="px-6 pb-6 pt-2">
        <div className="space-y-2 text-sm">
          <a
            href={`tel:${professional.phone}`}
            className="block text-gray-600 hover:text-yellow-600 transition-colors"
          >
            {professional.phone}
          </a>
          <a
            href={`mailto:${professional.email}`}
            className="block text-gray-600 hover:text-yellow-600 transition-colors truncate"
          >
            {professional.email}
          </a>
        </div>
      </div>
    </div>
  );
}
