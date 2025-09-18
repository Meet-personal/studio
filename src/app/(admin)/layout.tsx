
'use client';

import { isAdmin } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // The /admin page is where the user logs in, so we don't protect it.
    if (pathname === '/admin') {
        setIsAuthorized(true);
        return;
    }
    
    // For other admin pages, check for authorization.
    if (!isAdmin()) {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  if (!isAuthorized) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Verifying authorization...</p>
        </div>
    );
  }

  return <>{children}</>;
}
