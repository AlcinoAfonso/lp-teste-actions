import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import lpData from '../../lp.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: lpData.metadata.title,
  description: lpData.metadata.description,
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
    <html lang="pt-BR">
      <body className={`${inter.variable} font-inter`}>{children}</body>
    </html>
  );
}
