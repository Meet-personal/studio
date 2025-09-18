
'use client';

export function isAdmin(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return sessionStorage.getItem('admin-password') === 'admin123';
}
