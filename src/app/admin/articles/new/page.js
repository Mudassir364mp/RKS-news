'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { generateSlug } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
      Loading Editor...
    </div>
  )
});

export default function NewArticlePage() {
  const router = useRouter();
  const editor = useRef(null);
  const contentRef = useRef(''); // ✅ content ko ref mein rakho — blur issue fix
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    categoryId: '',
    author: '',
    imageUrl: '',
    isBreaking: false,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        const cats = await res.json();
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
          // ✅ MongoDB _id ya custom id — dono handle karo
          const firstId = cats[0]._id || cats[0].id || '';
          setForm(f => ({ ...f, categoryId: String(firstId) }));
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }
    loadCategories();
  }, []);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Write your article content here...',
    height: 500,
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true },
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'paragraph', '|',
      'image', 'link', '|',
      'align', 'undo', 'redo', '|',
      'fullsize', 'preview'
    ],
    removeButtons: ['about', 'source']
  }), []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // ✅ Content ref se lo
    const content = contentRef.current;

    if (!form.title.trim()) {
      showToast('error', 'Title required hai.');
      setSaving(false);
      return;
    }
    if (!form.excerpt.trim()) {
      showToast('error', 'Excerpt required hai.');
      setSaving(false);
      return;
    }
    if (!content.trim()) {
      showToast('error', 'Article content khali hai. Editor mein kuch likho.');
      setSaving(false);
      return;
    }
    if (!form.categoryId) {
      showToast('error', 'Category select karo.');
      setSaving(false);
      return;
    }

    const slug = generateSlug(form.title);
    const payload = {
      ...form,
      content,
      slug,
      publishedAt: new Date().toISOString(),
      views: 0,
    };

    console.log('Sending payload:', payload); // debug

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log('API response:', result); // debug

      if (result.success) {
        showToast('success', 'Article published successfully!');
        setTimeout(() => router.push('/admin/articles'), 1500);
      } else {
        showToast('error', result.error || 'Failed to publish article.');
        setSaving(false);
      }
    } catch (error) {
      console.error('Submit error:', error);
      showToast('error', 'Network error. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '1rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600,
          backgroundColor: toast.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: toast.type === 'success' ? '#166534' : '#991b1b',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '400px',
        }}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => router.back()} style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
            <ArrowLeft size={18} /> Back
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>New Article</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', fontWeight: 600, opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Publish Article'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Title */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>Article Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Enter a compelling headline..."
              style={{ width: '100%', padding: '0.875rem', fontSize: '1.125rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>

          {/* Excerpt */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>Excerpt / Summary *</label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Write a brief summary..."
              rows={3}
              style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Content Editor */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>Article Content *</label>
            <JoditEditor
              ref={editor}
              value={contentRef.current}
              config={config}
              tabIndex={1}
              onChange={newContent => { contentRef.current = newContent; }} // ✅ onChange use karo
            />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Article Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Category *</label>
                <select
                  value={form.categoryId}
                  onChange={e => setForm({ ...form, categoryId: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', backgroundColor: 'white' }}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map(c => {
                    const id = String(c._id || c.id || '');
                    return <option key={id} value={id}>{c.name}</option>;
                  })}
                </select>
              </div>

              {/* Author */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Author Name *</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                />
              </div>

              {/* Breaking */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>
                <input
                  type="checkbox"
                  id="isBreaking"
                  checked={form.isBreaking}
                  onChange={e => setForm({ ...form, isBreaking: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="isBreaking" style={{ fontWeight: 600, color: '#991b1b', fontSize: '0.875rem' }}>Mark as Breaking News</label>
              </div>
            </div>
          </div>

          {/* Image */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Featured Image</h3>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Image URL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', marginBottom: '0.5rem' }}
            />
            {form.imageUrl && (
              <div style={{ borderRadius: '0.5rem', overflow: 'hidden', aspectRatio: '16/9', marginTop: '0.5rem' }}>
                <img src={form.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* Publish button repeat for convenience */}
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{ width: '100%', padding: '0.875rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Publishing...' : '🚀 Publish Article'}
          </button>
        </div>
      </div>
    </div>
  );
}