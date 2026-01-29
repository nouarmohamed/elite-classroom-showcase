import VolumeArchive from '@/components/Volumes/VolumeArchive';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Light Novel Archive | Classroom of the Elite',
    description: 'Access the complete collection of Classroom of the Elite light novels. Read online or download for offline access.',
};

export default function VolumesPage() {
    return (
        <main className="relative">
            <Navigation />

            {/* Header space */}
            <div className="h-24" />

            <VolumeArchive />

            <Footer />
        </main>
    );
}
