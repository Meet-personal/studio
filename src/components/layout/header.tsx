
'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
    const isMobile = useIsMobile();

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
             {isMobile && (
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Link href="/" className="flex items-center gap-2">
                        <Logo className="w-7 h-7 text-primary" />
                        <span className="font-headline text-lg font-semibold text-foreground">
                            Daily Chronicles
                        </span>
                    </Link>
                </div>
            )}
        </header>
    );
}
