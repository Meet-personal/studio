
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { CATEGORIES } from '@/lib/constants';
import { Home } from 'lucide-react';

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={pathname === '/'}
          tooltip="Home"
        >
          <Link href="/">
            <Home />
            <span>Home</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {CATEGORIES.map((category) => (
        <SidebarMenuItem key={category.slug}>
          <SidebarMenuButton
            asChild
            isActive={pathname === `/category/${category.slug}`}
            tooltip={category.name}
          >
            <Link href={`/category/${category.slug}`}>
              <category.Icon />
              <span>{category.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
