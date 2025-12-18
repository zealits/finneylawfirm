import Link from 'next/link';

export default function MakingDifference() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
              Making A Difference For Our Clients
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              There are three major facets to how the professionals at the Finney Law Firm work to "make a difference" for our clients:
            </p>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-yellow-500 text-2xl font-bold mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed">By creating the best possible outcomes for you and your business by carefully designed business creation, real estate title & transactional services, and estate planning.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-yellow-500 text-2xl font-bold mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed">By navigating the turbulent waters of disputes that you or your business encounter.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-yellow-500 text-2xl font-bold mt-1">•</span>
                <span className="text-base md:text-lg leading-relaxed">By advocating in the halls of government with regulators, legislators, or judges on your behalf.</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-md">
              <p className="text-gray-900 font-bold uppercase mb-3 text-sm tracking-wider">
                RESPONSIVE. RELIABLE. CREATIVE. UNIQUE. SOPHISTICATED.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                We are committed to the highest quality practice of the law consistent with our Vision and Values.
              </p>
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Click the links below to learn more about our approach to the practice of law and how our team of attorneys is making a difference for our clients!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/vision-values"
                className="btn-primary text-center"
              >
                VISION AND VALUES
              </Link>
              <Link
                href="/making-a-difference"
                className="btn-primary text-center"
              >
                MAKING A DIFFERENCE
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[400px] md:h-[500px] w-full bg-gray-300 rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for consultation image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <span className="text-gray-600 text-lg font-medium">Consultation Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
