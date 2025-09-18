
'use client';

import { isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (isAdmin()) {
      setIsAuthorized(true);
      setShowModal(false);
    }
  }, []);

  const handlePasswordSubmit = () => {
    if (password === 'admin123') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin-password', password);
      }
      setIsAuthorized(true);
      setShowModal(false);
    } else {
      alert('Incorrect password.');
      setPassword('');
    }
  };

  if (!isAuthorized) {
    return (
      <Dialog open={showModal} onOpenChange={(open) => {
        if (!open) router.push('/');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Access Required</DialogTitle>
            <DialogDescription>
              Please enter the password to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handlePasswordSubmit();
                    }
                }}
              />
            </div>
            <Button onClick={handlePasswordSubmit} className="w-full">
              Unlock
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
}
