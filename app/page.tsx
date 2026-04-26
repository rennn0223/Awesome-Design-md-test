"use client";
import { useState } from "react";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export type Lang = "en" | "zh";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <>
      <Cursor />
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <Timeline lang={lang} />
        <Certificates lang={lang} />
        <Contact lang={lang} />
      </main>
      <footer className="py-10 text-center font-mono text-xs text-white/20 border-t border-white/5">
        <span className="text-primary/40">©</span> 2026 LIN, SHU-JEN —{" "}
        <span className="text-primary/40">SYSTEMS_ARCHITECT</span>
      </footer>
    </>
  );
}
