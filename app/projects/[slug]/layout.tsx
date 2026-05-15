"use client";
import type { ReactNode } from "react";
import { LangProvider } from "@/app/providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <div className="min-h-screen bg-canvas">
        <Nav />
        {children}
        <Footer />
      </div>
    </LangProvider>
  );
}
