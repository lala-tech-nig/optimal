import './globals.css';

export const metadata = {
  title: 'Optimal Management Consultancy | ISO Certification Experts in Nigeria & Qatar',
  description: 'Optimal Management Consultancy helps organizations achieve ISO 9001, 14001, 45001, 27001 & more across Nigeria and Qatar. Expert, practical, end-to-end support.',
  keywords: 'ISO certification Nigeria, ISO consulting Qatar, ISO 9001, ISO 14001, ISO 45001, management consultancy',
  openGraph: {
    title: 'Optimal Management Consultancy',
    description: 'Get ISO Certified Faster, Smarter & Without Stress',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
