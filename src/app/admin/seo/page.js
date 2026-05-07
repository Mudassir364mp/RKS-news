'use client';
import { useState, useEffect } from 'react';

export default function AdminSEO() {
  const [seo, setSeo] = useState({
    defaultTitle: 'RKS Speed News | Fast and Accurate',
    defaultDescription: 'Your trusted source for fast, accurate national and global news.',
    keywords: 'news, india, politics, business, sports, breaking news',
    ogImage: '',
    twitterHandle: '@rksspeed',
    googleAnalyticsId: '',
    schemaOrgName: 'RKS Speed News',
    schemaOrgLogo: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rks_seo');
    if (stored) setSeo(JSON.parse(stored));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('rks_seo', JSON.stringify(seo));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const InputField = ({ label, field, placeholder, hint }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{label}</label>
      <input
        type="text"
        value={seo[field]}
        onChange={e => setSeo({ ...seo, [field]: e.target.value })}
        placeholder={placeholder}
        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', width: '100%', fontFamily: 'inherit' }}
      />
      {hint && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{hint}</span>}
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>SEO Settings</h1>
        {saved && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>✓ Saved!</div>}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Default Meta Tags</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <InputField label="Default Site Title" field="defaultTitle" placeholder="RKS Speed News | ..." hint="Max 60 characters recommended" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Default Meta Description</label>
              <textarea value={seo.defaultDescription} onChange={e => setSeo({...seo, defaultDescription: e.target.value})} rows={3}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontFamily: 'inherit', resize: 'vertical' }} />
              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Max 160 characters recommended</span>
            </div>
            <InputField label="Default Keywords" field="keywords" placeholder="news, india, politics..." hint="Comma-separated keywords" />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Open Graph / Social</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <InputField label="Default OG Image URL" field="ogImage" placeholder="https://..." hint="Recommended: 1200x630 px" />
            <InputField label="Twitter Handle" field="twitterHandle" placeholder="@handle" />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Analytics & Schema</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <InputField label="Google Analytics ID" field="googleAnalyticsId" placeholder="G-XXXXXXXXXX" />
            <InputField label="Schema.org Org Name" field="schemaOrgName" placeholder="RKS Speed News" />
          </div>
        </div>

        <div>
          <button type="submit" style={{ padding: '0.875rem 3rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}
