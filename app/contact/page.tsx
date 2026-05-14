"use client";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const { lang } = useLang();

  return (
    <>
      <Nav />
      <Contact lang={lang} />
      <Footer />
    </>
  );
}
