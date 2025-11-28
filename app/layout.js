import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

// Google font
const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO
export const metadata = {
  title: "Optimal Management Consultancy W.L.L | Qatar",
  description:
    "Optimal Management Consultancy (OMC) provides Management Systems Consultancy, Fire & Life Safety services, and accredited professional training in Doha, Qatar.",
  keywords: [
    "Management Consultancy Qatar",
    "ISO Certification Qatar",
    "Fire & Life Safety Consultancy",
    "NEBOSH Training Qatar",
    "IOSH Qatar",
    "PMP Courses Qatar",
    "Civil Defence Approvals Qatar",
    "Optimal Management Consultancy"
  ],
  authors: [{ name: "Optimal Management Consultancy W.L.L" }],
  creator: "Optimal Management Consultancy W.L.L",
  publisher: "Optimal Management Consultancy W.L.L",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.optimalqatar.com",
  },
  openGraph: {
    title: "Optimal Management Consultancy W.L.L | Qatar",
    description:
      "Consultancy and training services in ISO systems, Fire & Life Safety, and professional certifications in Doha, Qatar.",
    url: "https://www.optimalqatar.com",
    siteName: "Optimal Management Consultancy Qatar",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
        width: 1200,
        height: 630,
        alt: "Optimal Management Consultancy Qatar",
      },
    ],
    locale: "en_QA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimal Management Consultancy Qatar",
    description:
      "Accredited management systems consultancy, Fire & Life Safety consultancy, and professional training services in Doha.",
    images: [
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Optimal Management Consultancy W.L.L",
              url: "https://www.optimalqatar.com",
              logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
              sameAs: [
                "https://www.linkedin.com/company/optimal-management-consultancy",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+97400000000",
                  contactType: "customer service",
                  areaServed: "QA",
                  availableLanguage: ["English", "Arabic"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Doha",
                addressCountry: "QA",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-[var(--wine)] text-white`}>
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
