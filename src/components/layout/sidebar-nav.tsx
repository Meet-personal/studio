
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from '@/components/ui/sidebar';
import { CATEGORIES, ADMIN_CATEGORIES } from '@/lib/constants';
import { Home } from 'lucide-react';
import { isAdmin } from '@/lib/posts';
import { useState, useEffect } from 'react';

export default function SidebarNav() {
  const pathname = usePathname();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    setShowAdmin(isAdmin());
  }, []);

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

      {showAdmin && (
        <>
          <SidebarSeparator />
          {ADMIN_CATEGORIES.map((category) => (
            <SidebarMenuItem key={category.slug}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(category.href)}
                tooltip={category.name}
              >
                <Link href={category.href}>
                  <category.Icon />
                  <span>{category.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </>
      )}
    </SidebarMenu>
  );
}
