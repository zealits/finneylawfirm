import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const professional = await prisma.professional.findUnique({
    where: { slug },
  });

  if (!professional) {
    notFound();
  }

  const fullName = `${professional.firstName} ${professional.middleName || ''} ${professional.lastName}`.trim();
  const imageSrc = professional.imagePath 
    ? `/images/${professional.imagePath}` 
    : null;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/professionals" 
              className="text-yellow-500 hover:text-yellow-600 text-sm uppercase tracking-wider font-semibold"
            >
              PROFESSIONALS
            </Link>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 bg-gray-200 rounded-lg overflow-hidden">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={fullName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500 text-6xl font-serif">{professional.firstName.charAt(0)}{professional.lastName.charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-8">
                {fullName}
              </h1>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">PHONE</p>
                    <a 
                      href={`tel:${professional.phone}`}
                      className="text-gray-700 hover:text-yellow-600 transition-colors text-lg"
                    >
                      {professional.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">EMAIL</p>
                    <a 
                      href={`mailto:${professional.email}`}
                      className="text-gray-700 hover:text-yellow-600 transition-colors text-lg"
                    >
                      {professional.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Practice Areas */}
              {professional.practiceAreas && (
                <div className="mb-8">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">PRACTICE AREAS</p>
                  <p className="text-gray-700 leading-relaxed">{professional.practiceAreas}</p>
                </div>
              )}

              {/* Biography */}
              {professional.biography && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">Biography</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {professional.biography.split('\n\n').map((paragraph, index) => (
                        <span key={index}>
                          {paragraph}
                          {index < professional.biography!.split('\n\n').length - 1 && <><br /><br /></>}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              )}

              {/* Education */}
              {professional.education && 
               typeof professional.education === 'object' && 
               professional.education !== null &&
               'raw' in professional.education &&
               typeof professional.education.raw === 'string' &&
               professional.education.raw.trim().length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-serif text-gray-900 mb-3">Education</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {professional.education.raw}
                    </p>
                  </div>
                </div>
              )}

              {/* Admitted to Practice */}
              {professional.admittedToPractice && professional.admittedToPractice.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-serif text-gray-900 mb-3">Admitted to Practice</h3>
                  <ul className="space-y-1">
                    {professional.admittedToPractice.map((admission, index) => (
                      <li key={index} className="text-gray-700">{admission}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Form Link */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href={`/contact?professional=${professional.slug}`}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wider transition-colors"
                >
                  Contact {professional.firstName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


