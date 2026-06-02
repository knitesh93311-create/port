'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      router.replace('/dashboard');
    }
  }, [router]);

  if (!mounted) {
    return (
      <div
        className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      />
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      router.replace('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Invalid username or password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ─── Ambient Glow Blobs ─── */}
      <div
        className="absolute rounded-full filter blur-[120px] opacity-25 animate-pulse-glow"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          top: '15%',
          left: '15%',
        }}
      />
      <div
        className="absolute rounded-full filter blur-[120px] opacity-20"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          bottom: '15%',
          right: '15%',
          animation: 'pulse-glow 3s ease-in-out infinite alternate',
        }}
      />

      {/* ─── Login Card ─── */}
      <div
        className="w-full max-w-md p-8 rounded-2xl border animate-fade-in relative z-10"
        style={{
          backgroundColor: 'rgba(28, 28, 39, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
        }}
      >
        {/* Brand/Logo Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center rounded-2xl text-white font-extrabold text-lg mb-4"
            style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
              boxShadow: '0 0 24px rgba(99, 102, 241, 0.4)',
            }}
          >
            NK
          </div>
          <h2
            className="text-2xl font-bold tracking-tight mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome Back
          </h2>
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Enter your credentials to manage your developer portfolio
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="p-3 mb-5 rounded-lg border text-sm animate-slide-in flex items-start gap-2.5"
            style={{
              backgroundColor: 'var(--danger-muted)',
              borderColor: 'var(--danger)',
              color: 'var(--danger)',
            }}
          >
            <span className="text-base leading-none">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              disabled={loading}
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={loading}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm rounded-lg"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn mt-2 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
              color: '#ffffff',
              fontWeight: '600',
              padding: '0.75rem 1.25rem',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="animate-spin rounded-full border-2 border-white/30 border-t-white"
                  style={{ width: '16px', height: '16px' }}
                />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
