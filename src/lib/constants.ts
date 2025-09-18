
import { Cpu, BriefcaseBusiness, Plane, Landmark, Users, Building, Bitcoin, LayoutDashboard, BarChart3, type LucideIcon } from 'lucide-react';

export type Category = {
  name: string;
  slug: string;
  Icon: LucideIcon;
};

export type AdminCategory = {
    name: string;
    slug: string;
    href: string;
    Icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  { name: 'IT', slug: 'it', Icon: Cpu },
  { name: 'Consultant', slug: 'consultant', Icon: BriefcaseBusiness },
  { name: 'Travel', slug: 'travel', Icon: Plane },
  { name: 'Finance', slug: 'finance', Icon: Landmark },
  { name: 'Business', slug: 'business', Icon: Users },
  { name: 'Companies', slug: 'companies', Icon: Building },
  { name: 'Cryptocoins', slug: 'cryptocoins', Icon: Bitcoin },
];

export const ADMIN_CATEGORIES: AdminCategory[] = [
    { name: 'Dashboard', slug: 'dashboard', href: '/admin', Icon: LayoutDashboard },
    { name: 'Analytics', slug: 'analytics', href: '/admin/analytics', Icon: BarChart3 },
]
