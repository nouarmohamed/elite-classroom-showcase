import Hero from '@/components/Hero/Hero';
import CharacterGallery from '@/components/Characters/CharacterGallery';
import VolumeArchive from '@/components/Volumes/VolumeArchive';
import QuoteSection from '@/components/ui/QuoteSection';
import AboutSection from '@/components/ui/AboutSection';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Quote Interlude */}
      <QuoteSection />

      {/* Character Gallery */}
      <section id="characters">
        <CharacterGallery />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Volume Archive */}
      <section id="volumes">
        <VolumeArchive />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
