'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/api';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Portfolio', href: '/portfolio', icon: '👤' },
  { label: 'Projects', href: '/projects', icon: '🚀' },
  { label: 'Messages', href: '/messages', icon: '💬' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col z-50"
      style={{
        width: 'var(--sidebar-width, 260px)',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* ─── Brand ─── */}
      <div
        className="flex items-center gap-3 px-6 shrink-0"
        style={{
          height: '72px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          className="flex items-center justify-center rounded-lg text-white font-bold text-sm"
          style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.3)',
          }}
        >
          NK
        </div>
        <div>
          <h1
            className="text-base font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            NK{' '}
            <span style={{ color: 'var(--accent)' }}>Admin</span>
          </h1>
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)', marginTop: '-2px' }}
          >
            Portfolio Manager
          </p>
        </div>
      </div>

      {/* ─── Navigation ─── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p
          className="text-xs font-semibold uppercase tracking-wider px-3 mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                  style={{
                    background: active
                      ? 'var(--accent-muted)'
                      : 'transparent',
                    color: active
                      ? 'var(--accent-hover)'
                      : 'var(--text-secondary)',
                    borderLeft: active
                      ? '3px solid var(--accent)'
                      : '3px solid transparent',
                    transition: 'all var(--transition-base)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background =
                        'var(--bg-card)';
                      e.currentTarget.style.color =
                        'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color =
                        'var(--text-secondary)';
                    }
                  }}
                >
                  <span className="text-lg" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ─── Footer / Logout ─── */}
      <div
        className="px-3 py-4 shrink-0"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: 'none',
            transition: 'all var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--danger-muted)';
            e.currentTarget.style.color = 'var(--danger)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
