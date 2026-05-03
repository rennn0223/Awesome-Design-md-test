import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "./providers";
import { RouterTransition } from "./transition-wrapper";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700", "900"],
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
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <LangProvider>
          <RouterTransition>
            {children}
          </RouterTransition>
        </LangProvider>
      </body>
    </html>
  );
}
