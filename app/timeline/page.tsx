"use client";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

export default function TimelinePage() {
  const { lang } = useLang();

  return (
    <>
      <Nav />
      <Timeline lang={lang} />
      <Footer />
    </>
  );
}
