
import { Cpu, BriefcaseBusiness, Plane, Landmark, Users, Building, Bitcoin, type LucideIcon } from 'lucide-react';

export type Category = {
  name: string;
  slug: string;
  Icon: LucideIcon;
};

export const CATEGORIES: Category[] = [
  { name: 'IT', slug: 'it', Icon: Cpu },
  { name: 'Consultant', slug: 'consultant', Icon: BriefcaseBusiness },
  { name: 'Travel', slug: 'travel', Icon: Plane },
  { name: 'Finance', slug: 'finance', Icon: Landmark },
  { name: 'Business', slug: 'business', Icon: Users },
  { name: 'Companies', slug: 'companies', Icon: Building },
  { name: 'Cryptocoins', slug: 'cryptocoins', Icon: Bitcoin },
];
