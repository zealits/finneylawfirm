import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

type ProfessionalCategory =
  | 'attorneys'
  | 'of-counsel'
  | 'paralegals'
  | 'admin-staff'
  | 'law-clerks-and-interns';

const categoryLabels: Record<ProfessionalCategory, string> = {
  'attorneys': 'Attorneys',
  'of-counsel': 'Of Counsel',
  'paralegals': 'Paralegals',
  'admin-staff': 'Admin Staff',
  'law-clerks-and-interns': 'Law Clerks and Interns',
};

function toDbCategory(category: ProfessionalCategory): string {
  switch (category) {
    case 'attorneys':
      return 'ATTORNEYS';
    case 'of-counsel':
      return 'OF_COUNSEL';
    case 'paralegals':
      return 'PARALEGALS';
    case 'admin-staff':
      return 'ADMIN_STAFF';
    case 'law-clerks-and-interns':
      return 'LAW_CLERKS_AND_INTERNS';
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const category = categoryParam as ProfessionalCategory;
  const categoryLabel = categoryLabels[category] || categoryParam;

  const professionals = await prisma.professional.findMany({
    where: { category: toDbCategory(category) as any },
    orderBy: { lastName: 'asc' },
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">PROFESSIONALS</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              {categoryLabel}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Meet our {categoryLabel.toLowerCase()} team members.
            </p>
          </div>

          {/* Professionals Grid */}
          {professionals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {professionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No {categoryLabel.toLowerCase()} found.</p>
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
          <h3 className="text-lg md:text-xl font-serif text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
            {fullName}
          </h3>
        </div>
      </Link>

      {/* Contact + practice areas (not part of the link) */}
      <div className="px-6 pb-6 pt-2">
        <div className="space-y-2 text-sm">
          <a
            href={`tel:${professional.phone}`}
            className="block text-gray-600 hover:text-yellow-600 transition-colors"
          >
            Phone: {professional.phone}
          </a>
          <a
            href={`mailto:${professional.email}`}
            className="block text-gray-600 hover:text-yellow-600 transition-colors"
          >
            Email: {professional.email}
          </a>
        </div>
        {professional.practiceAreas && (
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            {professional.practiceAreas}
          </p>
        )}
      </div>
    </div>
  );
}
