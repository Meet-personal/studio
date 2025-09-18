import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Logo } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Daily Chronicles',
  description: 'AI-generated daily blog posts',
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
      <body className={cn('font-body antialiased min-h-screen')}>
        <SidebarProvider>
          <Sidebar collapsible="icon" className="bg-sidebar-background">
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
          <SidebarInset>
            <Header />
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
