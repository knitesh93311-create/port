'use client';

import { useState, useEffect, FormEvent } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadFile,
  Project
} from '@/lib/api';
import ImageCropperModal from '@/components/ImageCropperModal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [modalTitle, setModalTitle] = useState('Add Project');

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [uploading, setUploading] = useState(false);

  // Cropper States
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropTargetImage, setCropTargetImage] = useState<string | null>(null);
  const [cropCallback, setCropCallback] = useState<((croppedBlob: Blob) => void) | null>(null);

  // Delete Confirm State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load projects.');
      } else {
        setError('Failed to load projects.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setCurrentProject(null);
    setModalTitle('Add Project');
    setTitle('');
    setDescription('');
    setTechInput('');
    setGithubUrl('');
    setLiveUrl('');
    setThumbnail('');
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setModalTitle('Edit Project');
    setTitle(project.title);
    setDescription(project.description);
    setTechInput(project.techStack ? project.techStack.join(', ') : '');
    setGithubUrl(project.githubUrl || '');
    setLiveUrl(project.liveUrl || '');
    setThumbnail(project.thumbnail || '');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropTargetImage(reader.result as string);
      setCropCallback(() => async (croppedBlob: Blob) => {
        setUploading(true);
        try {
          const croppedFile = new File([croppedBlob], file.name || 'project.jpg', { type: 'image/jpeg' });
          const res = await uploadFile(croppedFile);
          setThumbnail(res.url);
          setCropperOpen(false);
        } catch (err: unknown) {
          alert(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
          setUploading(false);
        }
      });
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Title and Description are required.');
      return;
    }

    const techStack = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectPayload = {
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      thumbnail,
    };

    try {
      if (currentProject) {
        // Edit Mode
        await updateProject(currentProject._id, projectPayload);
      } else {
        // Add Mode
        await createProject(projectPayload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  return (
    <AdminLayout>
      {/* ─── Header ─── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Projects
          </h1>
          <p className="text-sm text-secondary">
            Manage the list of projects showcased on your portfolio website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn btn-primary self-start sm:self-center"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          }}
        >
          ➕ Add Project
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-lg border text-sm" style={{ backgroundColor: 'var(--danger-muted)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          ⚠️ {error}
        </div>
      )}

      {/* ─── Projects Grid ─── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-shimmer rounded-xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card text-center py-16">
          <span className="text-4xl block mb-3">📁</span>
          <p className="text-lg font-semibold mb-1">No Projects Found</p>
          <p className="text-sm text-muted mb-4">Get started by creating your first portfolio project entry.</p>
          <button onClick={openAddModal} className="btn btn-primary">Create Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj._id} className="card hover:-translate-y-1.5 flex flex-col justify-between h-full min-h-[440px]">
              <div>
                {/* Image / Thumbnail Container */}
                <div
                  className="w-full h-44 rounded-lg mb-4 overflow-hidden bg-black/40 border flex items-center justify-center relative"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {proj.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <span className="text-3xl block mb-1">🖼️</span>
                      <span className="text-xs text-muted">No Preview Image</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold truncate mb-2" style={{ color: 'var(--text-primary)' }}>
                  {proj.title}
                </h3>
                <p className="text-sm text-secondary line-clamp-3 mb-4 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 max-h-16 overflow-y-auto pr-1">
                  {proj.techStack && proj.techStack.map((tech, idx) => (
                    <span key={idx} className="badge badge-accent py-0.5 px-2 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex gap-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-accent hover:underline">
                        GitHub
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-400 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="btn btn-ghost py-1 px-2.5 text-xs text-secondary hover:text-white"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(proj._id)}
                      className="btn btn-ghost py-1 px-2.5 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Add/Edit Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-2xl rounded-2xl border p-6 max-h-[90vh] overflow-y-auto animate-fade-in"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex justify-between items-center mb-6 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-xl font-bold">{modalTitle}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Portfolio Manager Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, features, challenges solved..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Technologies (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, TypeScript, Tailwind CSS, Node.js"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Thumbnail / Cover Image URL</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="flex-1"
                  />
                  <div className="relative shrink-0">
                    <input
                      type="file"
                      id="upload-file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      disabled={uploading}
                    />
                    <button
                      type="button"
                      disabled={uploading}
                      className="btn btn-ghost h-full px-4 text-xs"
                    >
                      {uploading ? 'Uploading...' : '📁 Upload File'}
                    </button>
                  </div>
                </div>
                {thumbnail && (
                  <div className="mt-3 relative w-32 h-20 rounded border bg-black/20 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbnail} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setThumbnail('')}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-black/90 text-white rounded-full w-5 h-5 flex items-center justify-center text-2xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ─── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-xl border p-6 animate-fade-in"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <h3 className="text-lg font-bold mb-2">Delete Project</h3>
            <p className="text-sm text-secondary mb-5">
              Are you sure you want to delete this project? This action is permanent and cannot be undone.
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
      {cropperOpen && cropTargetImage && cropCallback && (
        <ImageCropperModal
          imageSrc={cropTargetImage}
          onCrop={cropCallback}
          onClose={() => {
            setCropperOpen(false);
            setCropTargetImage(null);
            setCropCallback(null);
          }}
        />
      )}
    </AdminLayout>
  );
}
