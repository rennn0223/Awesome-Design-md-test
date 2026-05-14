"use client";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const { lang } = useLang();

  return (
    <>
      <Nav />
      <Projects lang={lang} />
      <Footer />
    </>
  );
}
