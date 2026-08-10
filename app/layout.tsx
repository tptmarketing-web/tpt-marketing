import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My TPT Store',
  description: 'Quality Educational Resources for Every Classroom',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'My TPT Store',
    description: 'Quality Educational Resources for Every Classroom',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={`${nunito.variable} font-sans bg-white text-gray-800 antialiased`}>
        {children}
        <Toaster position="top-right" />
        <ChunkLoadErrorHandler />
      </body>
    </html>
  );
}
