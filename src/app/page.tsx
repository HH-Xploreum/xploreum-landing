import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Xperts } from '@/components/sections/xperts';
import { About } from '@/components/sections/about';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Xperts />
        <About />
      </main>
      <Footer />
    </>
  );
}
