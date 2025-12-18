import Image from 'next/image';
import lawyerImage from '../../public/images/whyChooseUs/chrisFinney.png'

export default function WhyChooseUs() {
  return (
    <section className="py-16 pb-0 md:py-20 md:pb-0 lg:py-24 lg:pb-0 bg-gray-800 text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Image - Seamlessly blended with background, aligned to top */}
          <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              {/* Image container that clips bottom transparent space */}
              <div className="relative inline-block" style={{ 
                lineHeight: 0,
                verticalAlign: 'top',
                maxHeight: '600px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <Image 
                  src={lawyerImage} 
                  alt="Christopher P. Finney" 
                  width={600} 
                  height={700}
                  className="w-full h-auto"
                  style={{ 
                    backgroundColor: 'transparent',
                    display: 'block',
                    objectFit: 'contain',
                    objectPosition: 'top center',
                    maxHeight: '600px',
                    
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6 shrink-0">
            <p className="text-yellow-400 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4">WHY CHOOSE US</p>
            
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif mb-4 leading-tight">
                Expect More From Your <span className="underline decoration-yellow-400 decoration-2">Lawyers</span>
              </h2>
              {/* Signature */}
              <p className="text-white text-2xl md:text-3xl font-serif italic mb-6" style={{ 
                fontFamily: 'Brush Script MT, Brush Script, cursive',
                fontWeight: 'normal'
              }}>
                Christopher P. Finney
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-white/90 text-base md:text-lg leading-relaxed italic">
                In 2014, I, along with seven bright, hard-working attorneys and a dedicated and talented staff, came together to form Finney Law Firm. Our team is committed to a unique practice of law that makes a positive difference for our clients by focusing on defining and then arriving at the best outcome for them.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed italic">
                Finney Law Firm's attorneys have extensive experience in a broad range of legal services. We work relentlessly to add value for our clients by applying cutting-edge legal strategies and utilizing highly productive technology. This approach allows us to keep pace with the changing demands of our clients' challenging personal and business environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
