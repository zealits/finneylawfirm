import Navigation from './components/Navigation';
import HeroCarousel from './components/HeroCarousel';
import WhyChooseUs from './components/WhyChooseUs';
import PracticeAreas from './components/PracticeAreas';
import MakingDifference from './components/MakingDifference';
import RecentBlog from './components/RecentBlog';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      <HeroCarousel />
      <WhyChooseUs />
      <PracticeAreas />
      <MakingDifference />
      <RecentBlog />
      <Footer />
    </div>
  );
}
