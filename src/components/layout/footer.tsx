import Link from "next/link";
import { Logo } from "@/components/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-8 h-8 text-primary" />
              <span className="font-headline text-lg font-semibold text-foreground">
                Daily Chronicles
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-generated daily blog posts on a variety of topics.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-base text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="text-base text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-base text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-base text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-base text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Admin</h3>
            <ul className="mt-4 space-y-2">
                <li><Link href="/admin" className="text-base text-muted-foreground hover:text-primary">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-base text-muted-foreground">
            &copy; {currentYear} Daily Chronicles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
