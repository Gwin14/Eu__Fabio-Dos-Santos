import AISection from "@/components/AISection";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Noise from "@/components/Noise";
import Omnichannel from "@/components/Omnichannel";
import { Archive, Career, Contact, Stack } from "@/components/Sections";
import SkipLink from "@/components/SkipLink";
import { InUse, MobileApps } from "@/components/Work";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Omnichannel />
        <MobileApps />
        <InUse />
        <AISection />
        <Career />
        <Stack />
        <Archive />
        <Contact />
      </main>
      <Noise fixed opacity={0.05} fps={18} blendMode="overlay" zIndex={60} />
      <CommandPalette />
    </>
  );
}
