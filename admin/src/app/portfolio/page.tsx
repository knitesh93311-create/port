'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getPortfolio, updatePortfolio, uploadFile, PortfolioData } from '@/lib/api';
import ImageCropperModal from '@/components/ImageCropperModal';

type Skill = { name: string; level: number; iconName: string };

type Experience = {
  id: number;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  color: string;
  iconName: string;
};



export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'skills' | 'experience'>('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Raw data from MongoDB
  const [portfolioId, setPortfolioId] = useState<string | null>(null);

  // ─── Section Forms States ───
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    tagline: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    location: '',
    availability: '',
    resumeUrl: '',
    heroImage: '',
    aboutImage: '',
  });

  const [skillsData, setSkillsData] = useState<{
    frontend: Skill[];
    backend: Skill[];
    database: Skill[];
    tools: Skill[];
  }>({
    frontend: [],
    backend: [],
    database: [],
    tools: [],
  });
  const [activeSkillCategory, setActiveSkillCategory] = useState<'frontend' | 'backend' | 'database' | 'tools'>('frontend');

  const [experienceTimeline, setExperienceTimeline] = useState<Experience[]>([]);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingAboutImage, setUploadingAboutImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  // Image Cropper State
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropTargetImage, setCropTargetImage] = useState<string | null>(null);
  const [cropCallback, setCropCallback] = useState<((croppedBlob: Blob) => void) | null>(null);

  const triggerImageCrop = (file: File, onCropped: (croppedBlob: Blob) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropTargetImage(reader.result as string);
      setCropCallback(() => onCropped);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    triggerImageCrop(file, async (croppedBlob) => {
      setUploadingHeroImage(true);
      try {
        const ext = croppedBlob.type === 'image/png' ? 'png' : croppedBlob.type === 'image/webp' ? 'webp' : 'jpg';
        const croppedFile = new File([croppedBlob], file.name || `hero.${ext}`, { type: croppedBlob.type });
        const res = await uploadFile(croppedFile);
        setPersonalInfo(prev => {
          const updated = { ...prev, heroImage: res.url };
          updatePortfolio({ personalInfo: updated })
            .then(() => showNotification('Hero photo uploaded and saved successfully!'))
            .catch(err => setError(err instanceof Error ? err.message : 'Failed to save hero photo.'));
          return updated;
        });
        setCropperOpen(false);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploadingHeroImage(false);
      }
    });
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    triggerImageCrop(file, async (croppedBlob) => {
      setUploadingAboutImage(true);
      try {
        const ext = croppedBlob.type === 'image/png' ? 'png' : croppedBlob.type === 'image/webp' ? 'webp' : 'jpg';
        const croppedFile = new File([croppedBlob], file.name || `about.${ext}`, { type: croppedBlob.type });
        const res = await uploadFile(croppedFile);
        setPersonalInfo(prev => {
          const updated = { ...prev, aboutImage: res.url };
          updatePortfolio({ personalInfo: updated })
            .then(() => showNotification('About photo uploaded and saved successfully!'))
            .catch(err => setError(err instanceof Error ? err.message : 'Failed to save about photo.'));
          return updated;
        });
        setCropperOpen(false);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploadingAboutImage(false);
      }
    });
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    try {
      const res = await uploadFile(file);
      setPersonalInfo(prev => {
        const updated = { ...prev, resumeUrl: res.url };
        updatePortfolio({ personalInfo: updated })
          .then(() => showNotification('Resume PDF uploaded and saved successfully!'))
          .catch(err => setError(err instanceof Error ? err.message : 'Failed to save resume.'));
        return updated;
      });
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingResume(false);
    }
  };

  // Load Data
  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPortfolio();
      if (data) {
        setPortfolioId(data._id as string);
        if (data.personalInfo) {
          setPersonalInfo({
            name: (data.personalInfo as any).name || '',
            title: (data.personalInfo as any).title || '',
            tagline: (data.personalInfo as any).tagline || '',
            bio: (data.personalInfo as any).bio || '',
            email: (data.personalInfo as any).email || '',
            github: (data.personalInfo as any).github || '',
            linkedin: (data.personalInfo as any).linkedin || '',
            location: (data.personalInfo as any).location || '',
            availability: (data.personalInfo as any).availability || '',
            resumeUrl: (data.personalInfo as any).resumeUrl || '',
            heroImage: (data.personalInfo as any).heroImage || '',
            aboutImage: (data.personalInfo as any).aboutImage || '',
          });
        }
        if (data.skillsData) {
          setSkillsData({
            frontend: (data.skillsData as any).frontend || [],
            backend: (data.skillsData as any).backend || [],
            database: (data.skillsData as any).database || [],
            tools: (data.skillsData as any).tools || [],
          });
        }
        if (data.experienceTimeline) {
          setExperienceTimeline(data.experienceTimeline as Experience[]);
        }

      }
    } catch (err: unknown) {
      setError('Failed to fetch portfolio settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  const handleSaveSection = async (sectionKey: string, payload: any) => {
    setSaving(true);
    setError(null);
    try {
      await updatePortfolio({ [sectionKey]: payload });
      showNotification(`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} updated successfully!`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  // ─── Skills Handlers ───
  const handleSkillChange = (category: 'frontend' | 'backend' | 'database' | 'tools', index: number, field: keyof Skill, value: any) => {
    const updated = { ...skillsData };
    updated[category] = [...updated[category]];
    updated[category][index] = { ...updated[category][index], [field]: value };
    setSkillsData(updated);
  };

  const addSkill = (category: 'frontend' | 'backend' | 'database' | 'tools') => {
    const updated = { ...skillsData };
    updated[category] = [...updated[category], { name: 'New Skill', level: 80, iconName: 'FaCode' }];
    setSkillsData(updated);
  };

  const deleteSkill = (category: 'frontend' | 'backend' | 'database' | 'tools', index: number) => {
    const updated = { ...skillsData };
    updated[category] = updated[category].filter((_, idx) => idx !== index);
    setSkillsData(updated);
  };

  // ─── Experience Handlers ───
  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    const updated = [...experienceTimeline];
    updated[index] = { ...updated[index], [field]: value };
    setExperienceTimeline(updated);
  };

  const addExperience = () => {
    const maxId = experienceTimeline.reduce((max, item) => (item.id > max ? item.id : max), 0);
    setExperienceTimeline([
      ...experienceTimeline,
      {
        id: maxId + 1,
        role: 'Job Role',
        company: 'Company Name',
        period: 'Period (e.g. 2025 - Present)',
        type: 'Full-time',
        description: 'Describe your duties and accomplishments...',
        color: 'border-indigo-500',
        iconName: 'FaBriefcase',
      },
    ]);
  };

  const deleteExperience = (index: number) => {
    setExperienceTimeline(experienceTimeline.filter((_, idx) => idx !== index));
  };

  return (
    <AdminLayout>
      {/* ─── Header ─── */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Portfolio Settings
        </h1>
        <p className="text-sm text-secondary mt-1">
          Customize your personal details, developer skills, professional timeline, services, and client testimonials.
        </p>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 mb-6 rounded-lg border text-sm animate-slide-in" style={{ backgroundColor: 'var(--danger-muted)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          ⚠️ {error}
        </div>
      )}
      {successMsg && (
        <div className="p-4 mb-6 rounded-lg border text-sm animate-slide-in" style={{ backgroundColor: 'var(--success-muted)', borderColor: 'var(--success)', color: 'var(--success)' }}>
          ✅ {successMsg}
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <div className="h-12 w-full animate-shimmer rounded-lg" />
          <div className="h-[400px] w-full animate-shimmer rounded-xl" />
        </div>
      ) : (
        <div>
          {/* ─── Tabs Navigation ─── */}
          <div className="flex border-b overflow-x-auto gap-2 mb-6" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-3 px-4 font-semibold text-sm shrink-0 border-b-2 transition-all ${
                activeTab === 'personal'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-secondary hover:text-white'
              }`}
            >
              👤 Personal Info
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-3 px-4 font-semibold text-sm shrink-0 border-b-2 transition-all ${
                activeTab === 'skills'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-secondary hover:text-white'
              }`}
            >
              🛠️ Skills
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`py-3 px-4 font-semibold text-sm shrink-0 border-b-2 transition-all ${
                activeTab === 'experience'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-secondary hover:text-white'
              }`}
            >
              📅 Experience
            </button>

          </div>

          {/* ─── Tab 1: Personal Info ─── */}
          {activeTab === 'personal' && (
            <div className="card animate-fade-in">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-primary">
                <span>👤</span> Personal Information
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveSection('personalInfo', personalInfo);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Full Name</label>
                    <input
                      type="text"
                      required
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Professional Title</label>
                    <input
                      type="text"
                      required
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Tagline</label>
                  <input
                    type="text"
                    required
                    value={personalInfo.tagline}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, tagline: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Biography</label>
                  <textarea
                    rows={5}
                    required
                    value={personalInfo.bio}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Location</label>
                    <input
                      type="text"
                      required
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">GitHub Profile Link</label>
                    <input
                      type="url"
                      value={personalInfo.github}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">LinkedIn Profile Link</label>
                    <input
                      type="url"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Job Availability</label>
                    <input
                      type="text"
                      value={personalInfo.availability}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, availability: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Hero Section Photo (Croppable)</label>
                    <div className="flex items-center gap-4">
                      {personalInfo.heroImage ? (
                        <img 
                          src={personalInfo.heroImage} 
                          alt="Hero Preview" 
                          className="w-16 h-16 rounded-lg object-cover border-2 border-indigo-500" 
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center text-xs text-muted">
                          No Photo
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Image URL or upload..."
                          value={personalInfo.heroImage}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, heroImage: e.target.value })}
                          className="text-xs mb-2"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleHeroImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            disabled={uploadingHeroImage}
                          />
                          <button
                            type="button"
                            disabled={uploadingHeroImage}
                            className="btn btn-ghost w-full py-1.5 text-xs text-left"
                          >
                            {uploadingHeroImage ? 'Uploading...' : '📁 Crop & Upload Photo'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">About Section Photo (Croppable)</label>
                    <div className="flex items-center gap-4">
                      {personalInfo.aboutImage ? (
                        <img 
                          src={personalInfo.aboutImage} 
                          alt="About Preview" 
                          className="w-16 h-16 rounded-lg object-cover border-2 border-indigo-500" 
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center text-xs text-muted">
                          No Photo
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Image URL or upload..."
                          value={personalInfo.aboutImage}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, aboutImage: e.target.value })}
                          className="text-xs mb-2"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAboutImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            disabled={uploadingAboutImage}
                          />
                          <button
                            type="button"
                            disabled={uploadingAboutImage}
                            className="btn btn-ghost w-full py-1.5 text-xs text-left"
                          >
                            {uploadingAboutImage ? 'Uploading...' : '📁 Crop & Upload Photo'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 p-4 rounded-xl border mt-4" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Resume PDF Document</label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Resume URL or upload..."
                        value={personalInfo.resumeUrl}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, resumeUrl: e.target.value })}
                        className="text-xs"
                      />
                      <div className="flex items-center gap-3">
                        {personalInfo.resumeUrl && (
                          <a 
                            href={personalInfo.resumeUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-xs text-indigo-400 hover:underline"
                          >
                            📄 View Current Resume
                          </a>
                        )}
                        <div className="relative flex-1">
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            disabled={uploadingResume}
                          />
                          <button
                            type="button"
                            disabled={uploadingResume}
                            className="btn btn-ghost w-full py-1.5 text-xs text-left"
                          >
                            {uploadingResume ? 'Uploading Resume PDF...' : '📁 Upload Resume PDF'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
                  >
                    {saving ? 'Saving...' : '💾 Save Personal Info'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ─── Tab 2: Skills ─── */}
          {activeTab === 'skills' && (
            <div className="card animate-fade-in">
              <div className="flex justify-between items-center mb-6 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span>🛠️</span> Skills Settings
                </h3>
                <button
                  onClick={() => handleSaveSection('skillsData', skillsData)}
                  disabled={saving}
                  className="btn btn-primary text-xs"
                  style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
                >
                  {saving ? 'Saving...' : '💾 Save All Skills'}
                </button>
              </div>

              {/* Skill Sub-categories Toggles */}
              <div className="flex gap-2 mb-6">
                {(['frontend', 'backend', 'database', 'tools'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveSkillCategory(cat)}
                    className={`btn text-xs font-semibold px-3 py-1.5 border ${
                      activeSkillCategory === cat
                        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                        : 'border-border text-secondary bg-transparent hover:text-white'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                    Skill Entries under {activeSkillCategory.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => addSkill(activeSkillCategory)}
                    className="btn btn-ghost py-1 px-2.5 text-xs"
                  >
                    ➕ Add Entry
                  </button>
                </div>

                {skillsData[activeSkillCategory].length === 0 ? (
                  <p className="text-sm text-center py-6 text-muted">No skills in this category yet. Click Add to create.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillsData[activeSkillCategory].map((sk, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border flex flex-col gap-3 relative"
                        style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border)' }}
                      >
                        <button
                          type="button"
                          onClick={() => deleteSkill(activeSkillCategory, idx)}
                          className="absolute top-2 right-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs w-6 h-6 flex items-center justify-center rounded-full"
                        >
                          ✕
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-2xs uppercase tracking-wider font-semibold text-muted mb-1">Name</label>
                            <input
                              type="text"
                              value={sk.name}
                              onChange={(e) => handleSkillChange(activeSkillCategory, idx, 'name', e.target.value)}
                              className="text-xs py-1 px-2"
                            />
                          </div>
                          <div>
                            <label className="block text-2xs uppercase tracking-wider font-semibold text-muted mb-1">Icon (FontAwesome/SimpleIcon Name)</label>
                            <input
                              type="text"
                              value={sk.iconName}
                              onChange={(e) => handleSkillChange(activeSkillCategory, idx, 'iconName', e.target.value)}
                              placeholder="e.g. FaReact"
                              className="text-xs py-1 px-2"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-2xs uppercase tracking-wider font-semibold text-muted">Skill Level</label>
                            <span className="text-xs font-bold text-accent">{sk.level}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sk.level}
                            onChange={(e) => handleSkillChange(activeSkillCategory, idx, 'level', parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── Tab 3: Experience Timeline ─── */}
          {activeTab === 'experience' && (
            <div className="card animate-fade-in">
              <div className="flex justify-between items-center mb-6 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span>📅</span> Experience Timeline
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={addExperience}
                    className="btn btn-ghost text-xs"
                  >
                    ➕ Add Experience
                  </button>
                  <button
                    onClick={() => handleSaveSection('experienceTimeline', experienceTimeline)}
                    disabled={saving}
                    className="btn btn-primary text-xs"
                    style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
                  >
                    {saving ? 'Saving...' : '💾 Save Experience'}
                  </button>
                </div>
              </div>

              {experienceTimeline.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm text-muted">No experience entries found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {experienceTimeline.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-xl border relative"
                      style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border)' }}
                    >
                      <button
                        type="button"
                        onClick={() => deleteExperience(idx)}
                        className="absolute top-4 right-4 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs py-1 px-2.5 rounded-lg"
                      >
                        🗑️ Delete Entry
                      </button>

                      <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Entry #{idx + 1}</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Job Role / Designation</label>
                          <input
                            type="text"
                            required
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Company / Organization</label>
                          <input
                            type="text"
                            required
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Period</label>
                          <input
                            type="text"
                            required
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)}
                            placeholder="e.g. June 2025 - Present"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Experience Type</label>
                          <input
                            type="text"
                            required
                            value={exp.type}
                            onChange={(e) => handleExperienceChange(idx, 'type', e.target.value)}
                            placeholder="e.g. Internship Experience"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Border Style Accent Color</label>
                          <select
                            value={exp.color}
                            onChange={(e) => handleExperienceChange(idx, 'color', e.target.value)}
                          >
                            <option value="border-blue-500">Blue Accent</option>
                            <option value="border-cyan-500">Cyan Accent</option>
                            <option value="border-emerald-500">Emerald Accent</option>
                            <option value="border-purple-500">Purple Accent</option>
                            <option value="border-indigo-500">Indigo Accent</option>
                            <option value="border-rose-500">Rose Accent</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">IconName</label>
                          <input
                            type="text"
                            value={exp.iconName}
                            onChange={(e) => handleExperienceChange(idx, 'iconName', e.target.value)}
                            placeholder="e.g. FaBriefcase, FaCode, FaGraduationCap"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">Description</label>
                        <textarea
                          rows={3}
                          required
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
