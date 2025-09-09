import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Optimal | Luxury Website",
  description: "High-class premium feel corporate website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-wine">
      <body className="text-gold antialiased flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
