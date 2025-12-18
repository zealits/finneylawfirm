import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function VisionValuesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">ABOUT</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Vision & Values
            </h1>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            {/* Our Mission */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 italic">Our Mission</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                The professionals at Finney Law Firm strive to make a positive difference for our clients by providing a broad array of high-quality, customized legal services for individuals and small to mid-sized businesses in Greater Cincinnati and Northern Kentucky.
              </p>
            </div>

            {/* Our Vision */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 italic">Our Vision</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                We are committed to the honest, timely, competent, responsive, creative, and courteous practice of law, with accountability from top to bottom in our organization.
              </p>
            </div>

            {/* Our Values */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 italic">Our Values</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                At Finney Law Firm, four key standards define our work:
              </p>
              <ul className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Integrity:</strong> We are honest and forthright in everything we do.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Accountability:</strong> We meet or exceed our commitments.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Communication:</strong> We keep our clients informed, every step of the way.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Excellence:</strong> We consistently deliver high-quality, customized legal services.
                  </div>
                </li>
              </ul>
            </div>

            {/* Our Responsibilities */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                  <strong>Our first responsibility is to our clients.</strong>
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  We endeavor to find cost-effective, creative, and aggressive strategies to address legal opportunities and problems to achieve the outcome our clients desire.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                  <strong>Our second responsibility is to our profession.</strong>
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  We respect and advance the privilege we have to practice law before the United States Supreme Court down to each state in which our attorneys are licensed.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                  <strong>Our third responsibility is to our team.</strong>
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  We value every member within our organization, from vendors to attorneys and everyone in between. Our emphasis has been, and will always be, ability, performance, and personal character. Each employee receives fair and adequate wages and benefits, and we provide an uplifting work environment to keep everyone on top of their game.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                  <strong>Our final responsibility is to our community.</strong>
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  We strive to be good, productive citizens. Finney Law Firm supports various programs/charities, as well as paying our fair share in taxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
