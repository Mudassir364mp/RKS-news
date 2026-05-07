'use client';
import { usePathname } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Do not wrap the login page in the Guard to avoid redirect loops or blocking
  if (pathname === '/admin/login') {
    return children;
  }

  return <AdminGuard>{children}</AdminGuard>;
}
