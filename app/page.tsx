import { About } from "@/components/About";
import { BeyondScripts } from "@/components/BeyondScripts";
import { Cases } from "@/components/Cases";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FutureDirections } from "@/components/FutureDirections";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Roadmap } from "@/components/Roadmap";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { ThreeLayers } from "@/components/ThreeLayers";
import { WhyChainFlow } from "@/components/WhyChainFlow";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChainFlow />
        <ThreeLayers />
        <Skills />
        <Cases />
        <BeyondScripts />
        <Roadmap />
        <Services />
        <FutureDirections />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
