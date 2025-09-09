import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Optimal | Luxury Website",
  description: "High-class premium feel corporate website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-wine text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
