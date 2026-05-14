import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "./providers";
import { RouterTransition } from "./transition-wrapper";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LIN, SHU-JEN | Systems Architect",
    template: "%s | LIN, SHU-JEN",
  },
  description:
    "Digital Twins & Embodied AI Infrastructure. NVIDIA GTC 2026 Exhibitor. Partnering with MSI Innovation Center.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shujenlin.com",
    title: "LIN, SHU-JEN | Systems Architect",
    description:
      "Digital Twins & Embodied AI Infrastructure. NVIDIA GTC 2026 Exhibitor. Partnering with MSI Innovation Center.",
    siteName: "LIN, SHU-JEN Portfolio",
  },
  twitter: {
    card: "summary",
    title: "LIN, SHU-JEN | Systems Architect",
    description:
      "Digital Twins & Embodied AI Infrastructure. NVIDIA GTC 2026 Exhibitor. Partnering with MSI Innovation Center.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LangProvider>
          <RouterTransition>
            {children}
          </RouterTransition>
        </LangProvider>
      </body>
    </html>
  );
}
