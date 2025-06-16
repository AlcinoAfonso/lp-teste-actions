import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import lpData from '../../lp.json';
import { globalConfig } from '../config/globals';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: lpData.metadata.title,
  description: lpData.metadata.description,
  viewport: globalConfig.viewport,
  charset: globalConfig.charset,
  icons: {
    icon: lpData.metadata.favicon || '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={globalConfig.lang} className={inter.variable}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
