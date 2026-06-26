import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const sfPro = localFont({
  src: [
    {
      path: '../shared/assets/fonts/SFPRODISPLAYTHINITALIC.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYULTRALIGHTITALIC.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYLIGHTITALIC.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYREGULAR.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYMEDIUM.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYSEMIBOLDITALIC.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYBOLD.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYHEAVYITALIC.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SFPRODISPLAYBLACKITALIC.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-sf-pro',
});

export const metadata: Metadata = {
  title: 'Cyber Store',
  description: 'Electronics Ecommerce Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`min-h-full flex flex-col ${sfPro.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
