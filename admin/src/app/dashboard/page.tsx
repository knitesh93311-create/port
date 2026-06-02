'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { getProjects, getMessages, getPortfolio, toggleMessageRead, Project, Message } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    messagesCount: 0,
    unreadMessages: 0,
    portfolioActive: false,
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [projects, messages, portfolio] = await Promise.all([
        getProjects().catch(() => [] as Project[]),
        getMessages().catch(() => [] as Message[]),
        getPortfolio().catch(() => null),
      ]);

      const unread = messages.filter((m) => !m.read).length;

      setStats({
        projectsCount: projects.length,
        messagesCount: messages.length,
        unreadMessages: unread,
        portfolioActive: !!portfolio,
      });

      // Show latest 5 messages
      const sortedMessages = [...messages].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentMessages(sortedMessages.slice(0, 5));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch dashboard data.');
      } else {
        setError('Failed to fetch dashboard data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleRead = async (id: string) => {
    try {
      await toggleMessageRead(id);
      // Refresh statistics and list
      fetchDashboardData();
    } catch (err: unknown) {
      alert('Error updating message status');
    }
  };

  return (
    <AdminLayout>
      {/* ─── Header ─── */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Welcome back. Here is the overview of your developer portfolio performance.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="btn btn-ghost shrink-0 self-start sm:self-center"
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-lg border text-sm" style={{ backgroundColor: 'var(--danger-muted)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          ⚠️ {error}
        </div>
      )}

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects */}
        <div className="card hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Total Projects</span>
            <span className="text-2xl">🚀</span>
          </div>
          {loading ? (
            <div className="h-9 w-12 animate-shimmer rounded-md" />
          ) : (
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {stats.projectsCount}
            </h2>
          )}
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Showcased on your portfolio</p>
        </div>

        {/* Total Messages */}
        <div className="card hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Total Messages</span>
            <span className="text-2xl">💬</span>
          </div>
          {loading ? (
            <div className="h-9 w-12 animate-shimmer rounded-md" />
          ) : (
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              {stats.messagesCount}
            </h2>
          )}
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Received via contact form</p>
        </div>

        {/* Unread Messages */}
        <div className="card hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Unread Messages</span>
            <span className="text-2xl">✉️</span>
          </div>
          {loading ? (
            <div className="h-9 w-12 animate-shimmer rounded-md" />
          ) : (
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
              {stats.unreadMessages}
            </h2>
          )}
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Awaiting your response</p>
        </div>

        {/* Portfolio Status */}
        <div className="card hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Portfolio Status</span>
            <span className="text-2xl">🟢</span>
          </div>
          {loading ? (
            <div className="h-9 w-20 animate-shimmer rounded-md" />
          ) : (
            <span className={`badge ${stats.portfolioActive ? 'badge-success' : 'badge-danger'} py-1 px-3 text-sm`}>
              {stats.portfolioActive ? 'Active' : 'Offline'}
            </span>
          )}
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Connected to MongoDB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Recent Messages Table ─── */}
        <div className="card lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>✉️</span> Recent Messages
            </h3>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 w-full animate-shimmer rounded-lg" />
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="text-center py-10">
                <span className="text-3xl mb-2 block">📭</span>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No messages found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th className="py-2.5 text-xs font-semibold text-muted uppercase">Sender</th>
                      <th className="py-2.5 text-xs font-semibold text-muted uppercase">Subject</th>
                      <th className="py-2.5 text-xs font-semibold text-muted uppercase">Status</th>
                      <th className="py-2.5 text-xs font-semibold text-muted uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMessages.map((msg) => (
                      <tr key={msg._id} className="hover:bg-black/20" style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="py-3 pr-2">
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{msg.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{msg.email}</p>
                        </td>
                        <td className="py-3 max-w-[200px] truncate pr-2">
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{msg.subject || '(No Subject)'}</p>
                          <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{msg.message}</p>
                        </td>
                        <td className="py-3">
                          <span className={`badge ${msg.read ? 'badge-success' : 'badge-warning'}`}>
                            {msg.read ? 'Read' : 'Unread'}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleToggleRead(msg._id)}
                            className="btn btn-ghost py-1 px-2 text-xs"
                          >
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {recentMessages.length > 0 && (
            <div className="mt-4 pt-4 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <Link href="/messages" className="text-xs font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                View All Messages →
              </Link>
            </div>
          )}
        </div>

        {/* ─── Quick Actions ─── */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="/portfolio"
              className="flex items-center justify-between p-4 rounded-xl border hover:border-indigo-500 hover:bg-indigo-500/5 group"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">👤</span>
                <div>
                  <p className="text-sm font-semibold group-hover:text-indigo-400">Edit Portfolio</p>
                  <p className="text-xs text-muted">Update bio, skills, experience</p>
                </div>
              </div>
              <span className="text-muted group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">→</span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center justify-between p-4 rounded-xl border hover:border-indigo-500 hover:bg-indigo-500/5 group"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🚀</span>
                <div>
                  <p className="text-sm font-semibold group-hover:text-indigo-400">Manage Projects</p>
                  <p className="text-xs text-muted">Add, edit, or delete projects</p>
                </div>
              </div>
              <span className="text-muted group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">→</span>
            </Link>

            <Link
              href="/messages"
              className="flex items-center justify-between p-4 rounded-xl border hover:border-indigo-500 hover:bg-indigo-500/5 group"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💬</span>
                <div>
                  <p className="text-sm font-semibold group-hover:text-indigo-400">Inbox Messages</p>
                  <p className="text-xs text-muted">Read client inquiries</p>
                </div>
              </div>
              <span className="text-muted group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">→</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
