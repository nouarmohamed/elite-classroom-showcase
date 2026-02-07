import Hero from '@/components/Hero/Hero';
import CharacterGallery from '@/components/Characters/CharacterGallery';
import VolumeArchive from '@/components/Volumes/VolumeArchive';
import QuoteSection from '@/components/ui/QuoteSection';
import AboutSection from '@/components/ui/AboutSection';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HierarchySection from '@/components/Sections/HierarchySection';
import SolitudeSection from '@/components/Sections/SolitudeSection';
import PsychologicalDescent from '@/components/Sections/PsychologicalDescent';

import EliteRoster from '@/components/Sections/EliteRoster';
import CinematicMoments from '@/components/Sections/CinematicMoments';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Quote Interlude */}
      <QuoteSection />

      {/* The Hierarchy - Power Dynamics */}
      <HierarchySection />

      {/* Elite Roster - The Players */}
      <EliteRoster />

      {/* Character Gallery */}
      <section id="characters">
        <CharacterGallery />
      </section>

      {/* Solitude - The Weight of Perfection */}
      <SolitudeSection />

      {/* Cinematic Moments - The World */}
      <CinematicMoments />

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
