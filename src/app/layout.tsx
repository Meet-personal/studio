
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Logo } from '@/components/icons';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Daily Chronicles - AI-Generated Daily Insights',
    template: '%s | Daily Chronicles',
  },
  description: 'Your daily source for high-quality, AI-generated articles on technology, finance, business, travel, and more. Stay informed with fresh perspectives and in-depth analysis.',
  keywords: 'AI blog, technology articles, finance news, business insights, travel guides, daily content, artificial intelligence, machine learning',
  authors: [{ name: 'Daily Chronicles Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Daily Chronicles - AI-Generated Daily Insights',
    description: 'Your daily source for high-quality, AI-generated articles on technology, finance, business, travel, and more.',
    url: 'https://your-domain.com', // TODO: Replace with your actual domain
    siteName: 'Daily Chronicles',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', inter.variable)}>
      <head />
      <body className={cn('font-body antialiased')}>
        <SidebarProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar collapsible="icon" className="hidden md:flex">
                <SidebarHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <Logo className="w-8 h-8 text-primary" />
                    <span className="font-headline text-lg font-semibold text-sidebar-foreground">
                      Daily Chronicles
                    </span>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarNav />
                </SidebarContent>
              </Sidebar>
              <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
            </div>
            <Footer />
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
