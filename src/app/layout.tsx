import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import localFont from 'next/font/local';
import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const sfPro = localFont({
  src: [
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-UltralightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-HeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/SF-Pro-Display-BlackItalic.otf',
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

import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`min-h-full flex flex-col ${sfPro.className} ${figtree.variable}`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
