
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Logo } from '@/components/icons';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Daily Chronicles',
  description: 'AI-generated daily blog posts on various topics.',
  keywords: 'blog, ai, technology, finance, travel, business',
  authors: [{ name: 'Daily Chronicles Team' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <SidebarProvider>
          <div className="relative flex min-h-screen">
            <Sidebar collapsible="icon">
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
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
