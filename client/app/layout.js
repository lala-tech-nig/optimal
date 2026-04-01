import "./globals.css";

export const metadata = {
  title: "OMC | Premium Management Consultancy",
  description: "Global authority in management and strategic consulting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-brand-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
