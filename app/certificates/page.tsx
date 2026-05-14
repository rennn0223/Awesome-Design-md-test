"use client";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Certificates from "@/components/Certificates";
import Footer from "@/components/Footer";

export default function CertificatesPage() {
  const { lang } = useLang();

  return (
    <>
      <Nav />
      <Certificates lang={lang} />
      <Footer />
    </>
  );
}
