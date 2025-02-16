import { AuthContextProvider } from '@/context/AuthContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AuthContextProvider>
            <SiteHeader />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="container mx-auto px-4 py-4 text-center">
              <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </footer>
          </AuthContextProvider>
        </ NextIntlClientProvider>
      </body>
    </html>
  );
}
