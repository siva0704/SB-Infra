import Hero from '@/components/Hero';
import ProcessTimeline from '@/components/ProcessTimeline';
import ServicesGrid from '@/components/ServicesGrid';
import About from '@/components/About';
import VisionMission from '@/components/VisionMission';
import Specialties from '@/components/Specialties';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-luxe-black">
      <Hero />
      <About />
      <VisionMission />
      <ProcessTimeline />
      <Specialties />
      <ServicesGrid />

      {/* Footer / CTA simulated */}
      <footer className="h-[50vh] flex items-center justify-center bg-stone-950 text-stone-600">
        <p className="font-serif italic text-2xl">Crafting Reality.</p>
      </footer>
    </main>
  );
}
