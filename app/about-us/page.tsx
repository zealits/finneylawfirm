import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';
import downtownImage from '../../public/images/aboutUs/FLF-Downtown.jpg'
import flfEastgate from '../../public/images/aboutUs/FLF-Eastgate.jpg'
import ftThomasImage from '../../public/images/aboutUs/FLF-Ft-Thomas.jpg'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">ABOUT</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              About Finney Law Firm
            </h1>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                In 2014, led by Christopher P. Finney, seven bright, hard-working attorneys and a dedicated, talented staff came together to form Finney Law Firm. Since then, we have grown into a full-service law firm serving individuals and businesses throughout Greater Cincinnati and Northern Kentucky.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                We work relentlessly to add value for our clients by applying cutting-edge legal strategies and utilizing highly productive technology. This approach allows us to keep pace with the changing demands of our clients' own challenging personal and business environments. <a href="/contact" className="text-yellow-600 hover:text-yellow-700 underline">Contact us</a> to see how Finney Law Firm can make a difference for you.
              </p>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-16">
            {/* Downtown Location */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6">Downtown</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <Image src={downtownImage} alt="Downtown Cincinnati" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    With a stunning downtown location at 635 Main Street, Cincinnati, Ohio 45202, we're just steps away from the vibrant city center, offering convenience and easy access to all that Cincinnati has to offer.
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">635 Main Street</p>
                    <p>Cincinnati, Ohio 45202</p>
                    <p>
                      <a href="tel:513-854-8834" className="text-yellow-600 hover:text-yellow-700">513-854-8834</a>
                    </p>
                    <p className="text-sm text-gray-600">(fax) 513-943-6669</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Eastgate Location */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6">Eastgate</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <Image src={flfEastgate} alt="Eastgate Office" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    We are conveniently located just off I-275 in Clermont County, close to the northern suburbs of Southwest Ohio. We are close to Jungle Jim's and Eastgate Mall.
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">4270 Ivy Pointe Boulevard</p>
                    <p>Suite 225</p>
                    <p>Cincinnati, Ohio 45245</p>
                    <p>
                      <a href="tel:513-943-6650" className="text-yellow-600 hover:text-yellow-700">513-943-6650</a>
                    </p>
                    <p className="text-sm text-gray-600">(fax) 513-943-6669</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ft. Thomas Location */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6">Ft. Thomas</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <Image src={ftThomasImage} alt="Ft. Thomas Office" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    Beautiful Fort Thomas, Kentucky is full of history, locally owned shops, businesses and restaurants. We are conveniently located just minutes away from Newport, Covington and downtown Cincinnati.
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">1501 Alexandria Pike</p>
                    <p>Ft. Thomas, Kentucky 41075</p>
                    <p>
                      <a href="tel:859-577-7893" className="text-yellow-600 hover:text-yellow-700">859-577-7893</a>
                    </p>
                    <p className="text-sm text-gray-600">(fax) 513-943-6669</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


