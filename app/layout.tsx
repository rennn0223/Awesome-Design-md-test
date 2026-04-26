import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "LIN, SHU-JEN | Systems Architect",
  description:
    "Digital Twins & Embodied AI Infrastructure. NVIDIA GTC 2026 Exhibitor. Partnering with MSI Innovation Center.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg`}>
        {children}
      </body>
    </html>
  );
}
