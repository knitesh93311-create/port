'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getMessages, toggleMessageRead, deleteMessage, Message } from '@/lib/api';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Expanded Message ID
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Delete Confirm State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMessagesList = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMessages();
      // Sort messages by date descending
      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(sorted);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load messages.');
      } else {
        setError('Failed to load messages.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesList();
  }, []);

  const handleToggleRead = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Avoid triggering accordion expand
    try {
      await toggleMessageRead(id);
      fetchMessagesList();
    } catch (err: unknown) {
      alert('Failed to update message status.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      setDeleteConfirmId(null);
      if (expandedId === id) setExpandedId(null);
      fetchMessagesList();
    } catch (err: unknown) {
      alert('Failed to delete message.');
    }
  };

  const handleRowClick = async (msg: Message) => {
    if (expandedId === msg._id) {
      setExpandedId(null);
    } else {
      setExpandedId(msg._id);
      // Automatically mark as read if it is unread when expanded
      if (!msg.read) {
        try {
          await toggleMessageRead(msg._id);
          // Update local state directly to avoid full reload layout jump
          setMessages((prev) =>
            prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
          );
        } catch (err) {
          // Fail silently here, user can manually toggle if needed
        }
      }
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout>
      {/* ─── Header ─── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Messages
            </h1>
            {unreadCount > 0 && (
              <span className="badge badge-danger text-sm font-semibold py-1 px-2.5">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-secondary mt-1">
            Read and manage inquiries received from your portfolio contact form.
          </p>
        </div>
        <button
          onClick={fetchMessagesList}
          disabled={loading}
          className="btn btn-ghost shrink-0 self-start sm:self-center"
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Inbox'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-lg border text-sm" style={{ backgroundColor: 'var(--danger-muted)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          ⚠️ {error}
        </div>
      )}

      {/* ─── Inbox List ─── */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-shimmer rounded-xl" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="card text-center py-16">
          <span className="text-4xl block mb-3">📬</span>
          <p className="text-lg font-semibold mb-1">Inbox Empty</p>
          <p className="text-sm text-muted">You have no messages at the moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const isExpanded = expandedId === msg._id;
            return (
              <div
                key={msg._id}
                onClick={() => handleRowClick(msg)}
                className="card p-0 cursor-pointer overflow-hidden transition-all duration-200"
                style={{
                  borderColor: isExpanded ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: isExpanded
                    ? 'rgba(28, 28, 39, 0.9)'
                    : msg.read
                    ? 'var(--bg-card)'
                    : 'rgba(99, 102, 241, 0.03)',
                  borderLeft: !msg.read
                    ? '4px solid var(--accent)'
                    : '1px solid var(--border)',
                }}
              >
                {/* Header Summary Row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-primary truncate">
                        {msg.name}
                      </p>
                      <p className="text-xs text-muted truncate">{msg.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className={`text-sm ${!msg.read ? 'font-semibold text-primary' : 'text-secondary'} truncate`}>
                        {msg.subject || '(No Subject)'}
                      </p>
                      <p className="text-xs text-muted truncate max-w-md">
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                    <span className="text-xs text-muted">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleToggleRead(e, msg._id)}
                        className={`btn py-1 px-2.5 text-xs ${
                          msg.read ? 'btn-ghost' : 'btn-primary'
                        }`}
                        style={{
                          background: msg.read ? 'transparent' : 'var(--accent-muted)',
                          color: msg.read ? 'var(--text-secondary)' : 'var(--accent-hover)',
                          border: msg.read ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        {msg.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(msg._id);
                        }}
                        className="btn btn-ghost py-1 px-2.5 text-xs text-red-400 hover:bg-red-500/10"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Pane */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5 pt-3 animate-fade-in border-t"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'black/10' }}
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-1">
                          Full Message Details
                        </span>
                        <div className="text-sm">
                          <span className="font-semibold text-secondary">From: </span>
                          <span className="text-primary">{msg.name}</span>{' '}
                          <a href={`mailto:${msg.email}`} className="text-accent text-xs ml-1 hover:underline">
                            ({msg.email})
                          </a>
                        </div>
                      </div>
                      <a
                        href={`mailto:${msg.email}?subject=RE: ${msg.subject || 'Inquiry'}`}
                        className="btn btn-primary text-xs py-1 px-3"
                        style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        ✉️ Reply via Email
                      </a>
                    </div>

                    <div
                      className="p-4 rounded-xl whitespace-pre-wrap text-sm leading-relaxed border"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {msg.message}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Delete Confirmation Modal ─── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-xl border p-6 animate-fade-in"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <h3 className="text-lg font-bold mb-2">Delete Message</h3>
            <p className="text-sm text-secondary mb-5">
              Are you sure you want to delete this message? This action is permanent.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn btn-danger"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
