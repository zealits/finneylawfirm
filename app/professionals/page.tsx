import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
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

const categoryRoutes: Record<ProfessionalCategory, string> = {
  'attorneys': '/professionals/attorneys',
  'of-counsel': '/professionals/of-counsel',
  'paralegals': '/professionals/paralegals',
  'admin-staff': '/professionals/admin-staff',
  'law-clerks-and-interns': '/professionals/law-clerks-and-interns',
};

function mapCategory(dbCategory: string): ProfessionalCategory | null {
  switch (dbCategory) {
    case 'ATTORNEYS':
      return 'attorneys';
    case 'OF_COUNSEL':
      return 'of-counsel';
    case 'PARALEGALS':
      return 'paralegals';
    case 'ADMIN_STAFF':
      return 'admin-staff';
    case 'LAW_CLERKS_AND_INTERNS':
      return 'law-clerks-and-interns';
    default:
      return null;
  }
}

export default async function ProfessionalsPage() {
  const dbProfessionals = await prisma.professional.findMany({
    orderBy: { lastName: 'asc' },
  });

  const attorneys = dbProfessionals.filter(
    (p) => mapCategory(p.category) === 'attorneys'
  );
  const ofCounsel = dbProfessionals.filter(
    (p) => mapCategory(p.category) === 'of-counsel'
  );
  const paralegals = dbProfessionals.filter(
    (p) => mapCategory(p.category) === 'paralegals'
  );
  const adminStaff = dbProfessionals.filter(
    (p) => mapCategory(p.category) === 'admin-staff'
  );
  const lawClerks = dbProfessionals.filter(
    (p) => mapCategory(p.category) === 'law-clerks-and-interns'
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">PROFESSIONALS</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Our Team
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              We are thrilled at the team we have assembled at the Finney Law Firm and hope you will be as well. Read about each of their experience, background and qualifications below. If you need a Cincinnati attorney, we are here to help.
            </p>
          </div>

          {/* Attorneys Section */}
          {attorneys.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 text-center">Attorneys</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {attorneys.map((attorney) => (
                  <ProfessionalCard key={attorney.id} professional={attorney} />
                ))}
              </div>
              {attorneys.length > 4 && (
                <div className="text-center mt-8">
                  <Link 
                    href={categoryRoutes.attorneys}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold uppercase tracking-wider text-sm"
                  >
                    View All Attorneys →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Of Counsel Section */}
          {ofCounsel.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 text-center">Of Counsel</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {ofCounsel.map((counsel) => (
                  <ProfessionalCard key={counsel.id} professional={counsel} />
                ))}
              </div>
              {ofCounsel.length > 4 && (
                <div className="text-center mt-8">
                  <Link 
                    href={categoryRoutes['of-counsel']}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold uppercase tracking-wider text-sm"
                  >
                    View All Of Counsel →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Other Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paralegals.length > 0 && (
              <Link 
                href={categoryRoutes.paralegals}
                className="group bg-white border-2 border-gray-200 hover:border-yellow-500 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-2xl font-serif text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {categoryLabels.paralegals}
                </h3>
                <p className="text-gray-600 text-sm">View our paralegal team</p>
              </Link>
            )}
            {adminStaff.length > 0 && (
              <Link 
                href={categoryRoutes['admin-staff']}
                className="group bg-white border-2 border-gray-200 hover:border-yellow-500 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-2xl font-serif text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {categoryLabels['admin-staff']}
                </h3>
                <p className="text-gray-600 text-sm">View our administrative staff</p>
              </Link>
            )}
            {lawClerks.length > 0 && (
              <Link 
                href={categoryRoutes['law-clerks-and-interns']}
                className="group bg-white border-2 border-gray-200 hover:border-yellow-500 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-2xl font-serif text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {categoryLabels['law-clerks-and-interns']}
                </h3>
                <p className="text-gray-600 text-sm">View our law clerks and interns</p>
              </Link>
            )}
          </div>
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


