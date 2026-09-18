import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'VenueStrike Core • Entertainment Venue Booking & Concurrency Platform',
  description: 'High-concurrency SaaS engine for bowling centers, darts bars, and competitive socializing venues. Eliminates peak double-bookings with PostgreSQL transaction advisory locks, Toast POS sync, and real-time manager reporting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] antialiased selection:bg-indigo-500/20 selection:text-indigo-700 dark:selection:text-indigo-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Centralized Demo Traffic Tracking Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=venuestrike-core"
          alt=""
          width={1}
          height={1}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
      </body>
    </html>
  );
}
