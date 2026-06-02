'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api';
import Sidebar from '@/components/Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router]);

  // Show nothing while checking auth to prevent flash of content
  if (!checked) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="animate-spin-slow rounded-full"
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid var(--border)',
              borderTopColor: 'var(--accent)',
            }}
          />
          <p
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* ─── Main Content Area ─── */}
      <main
        className="flex-1 min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-width, 260px)',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
