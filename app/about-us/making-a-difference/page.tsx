import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import aboutUsBanner from '../../../public/images/aboutUs/aboutUsBanner.jpg';

export default function MakingDifferencePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Banner Section */}
      <div className="relative w-full overflow-hidden -mt-[180px]" style={{ height: 'calc(60vh + 180px)', minHeight: '500px' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${aboutUsBanner.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-center mx-auto">
              <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">ABOUT</p>
              <div className="w-24 h-1 bg-yellow-500 mb-8 mx-auto shadow-lg"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-6 leading-tight font-bold drop-shadow-lg">
                Making a Difference
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              When our team of professionals came together to form Finney Law Firm, we began with a sense of purpose: to make a positive difference for our clients, our profession, and the communities in which we live.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              The stories below show the power of our focus on outcomes and how we made a difference for our clients by knowledgeably and practically applying our expertise in the field of law.
            </p>
          </div>

          {/* Articles/Stories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Article 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                In Garfield Heights yard-sign case Finney Law Firm clinches third win at United States Supreme Court
              </h3>
              <p className="text-gray-600 text-sm mb-3">By Christopher P. Finney</p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Finney Law Firm achieved a significant victory at the United States Supreme Court in a case involving First Amendment rights and yard signs in Garfield Heights...
              </p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm uppercase tracking-wider">
                READ MORE →
              </a>
            </div>

            {/* Article 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                So, literally, our client wakes up one morning and has no curb cut to his business
              </h3>
              <p className="text-gray-600 text-sm mb-3">By Christopher P. Finney</p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                When a client discovered their business access had been removed overnight, Finney Law Firm quickly intervened to restore their property rights...
              </p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm uppercase tracking-wider">
                READ MORE →
              </a>
            </div>

            {/* Article 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                Specific performance in real estate contracts
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Our firm successfully secured specific performance for a client in a complex real estate transaction, ensuring they received the property they had contracted for...
              </p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm uppercase tracking-wider">
                READ MORE →
              </a>
            </div>

            {/* Article 4 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
                Digging deep to recover for client defrauded
              </h3>
              <p className="text-gray-600 text-sm mb-3">By Christopher P. Finney</p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Through thorough investigation and aggressive litigation, we recovered significant damages for a client who had been defrauded in a business transaction...
              </p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm uppercase tracking-wider">
                READ MORE →
              </a>
            </div>
          </div>

          {/* Community Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="text-center mb-12">
              <p className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">
                OUR ATTORNEYS ARE ACTIVE IN THE COMMUNITY
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8">
                Making a Difference in Our Communities
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Attorney 1 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl font-serif">CF</span>
                  </div>
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-2">Christopher P. Finney</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mr. Finney serves on the Boards of the 1851 Center for Constitutional Law, Coalition Opposed to Additional Spending and Taxes, co-chairman for Kasich for Governor Campaign Committee, and Hamilton County Tax Levy Review Committee.
                </p>
              </div>

              {/* Attorney 2 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl font-serif">BG</span>
                  </div>
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-2">Bradley M. Gibson</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mr. Gibson is a member of the Volunteer Lawyers Project, providing legal services to low-income citizens, pro bono legal services, volunteering as a hockey coach, and Vice President of Moeller High School Alumni Association.
                </p>
              </div>

              {/* Attorney 3 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl font-serif">IH</span>
                  </div>
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-2">Isaac T. Heintz</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mr. Heintz serves as Secretary and Board Member of the Northside Business Association (NBA).
                </p>
              </div>

              {/* Attorney 4 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl font-serif">RT</span>
                  </div>
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-2">Richard P. Turner</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mr. Turner is a member of the Volunteer Lawyers Project, volunteering with Wills for Heroes, and providing legal documents to America's first responders.
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


