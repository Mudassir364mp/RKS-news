'use client';
import { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'RKS Speed News',
    siteTagline: 'Fast. Accurate. Unbiased.',
    siteEmail: 'info@rksspeed.news',
    sitePhone: '+91 80000 12345',
    facebook: 'https://facebook.com/rksspeed',
    twitter: 'https://twitter.com/rksspeed',
    youtube: 'https://youtube.com/@rksspeed',
    instagram: 'https://instagram.com/rksspeed',
    adsenseId: '',
    metaDescription: 'Your trusted source for fast, accurate national and global news.',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rks_settings');
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('rks_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const InputField = ({ label, field, type = 'text', placeholder }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{label}</label>
      <input
        type={type}
        value={settings[field]}
        onChange={e => setSettings({ ...settings, [field]: e.target.value })}
        placeholder={placeholder}
        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', width: '100%', fontFamily: 'inherit' }}
      />
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>General Settings</h1>
        {saved && (
          <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>
            ✓ Settings saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Site Identity</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <InputField label="Site Name" field="siteName" placeholder="RKS Speed News" />
            <InputField label="Tagline" field="siteTagline" placeholder="Fast. Accurate." />
            <InputField label="Contact Email" field="siteEmail" type="email" placeholder="info@example.com" />
            <InputField label="Phone Number" field="sitePhone" placeholder="+91 ..." />
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.375rem' }}>Meta Description (SEO)</label>
            <textarea
              value={settings.metaDescription}
              onChange={e => setSettings({ ...settings, metaDescription: e.target.value })}
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Social Media Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <InputField label="Facebook" field="facebook" placeholder="https://facebook.com/..." />
            <InputField label="Twitter / X" field="twitter" placeholder="https://twitter.com/..." />
            <InputField label="YouTube" field="youtube" placeholder="https://youtube.com/..." />
            <InputField label="Instagram" field="instagram" placeholder="https://instagram.com/..." />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Monetization</h2>
          <InputField label="Google AdSense Publisher ID" field="adsenseId" placeholder="pub-XXXXXXXXXXXXXXXX" />
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>Enter your AdSense Publisher ID to enable automatic ad monetization across the site.</p>
        </div>

        <div>
          <button type="submit" style={{ padding: '0.875rem 3rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
