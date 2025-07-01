'use client';

import ProtectedRoute from '@/components/protectRoute';

export default function ProtectedLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
