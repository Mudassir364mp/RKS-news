'use client';
import { useState, useEffect } from 'react';
import { adStore } from '@/lib/store';
import { Edit, Trash2, Plus, Target } from 'lucide-react';

export default function AdminAds() {
  const [ads, setAds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAd, setCurrentAd] = useState({ position: 'header', type: 'image', image: '', link: '', code: '', active: true });

  useEffect(() => {
    setAds(adStore.getAll());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      const remaining = ads.filter(a => a.id !== id);
      adStore.updateAll(remaining);
      setAds(remaining);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updatedAds;
    if (currentAd.id) {
      updatedAds = ads.map(a => a.id === currentAd.id ? currentAd : a);
    } else {
      updatedAds = [...ads, { ...currentAd, id: `ad-${Date.now()}` }];
    }
    adStore.updateAll(updatedAds);
    setAds(updatedAds);
    setIsEditing(false);
    setCurrentAd({ position: 'header', type: 'image', image: '', link: '', code: '', active: true });
  };

  const toggleActive = (ad) => {
    const updatedAds = ads.map(a => a.id === ad.id ? { ...a, active: !a.active } : a);
    adStore.updateAll(updatedAds);
    setAds(updatedAds);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <Target color="#f59e0b" /> Advertisements
        </h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>
            <Plus size={20} />
            <span>New Ad Zone</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, backgroundColor: 'white', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem' }}>Position</th>
                <th style={{ padding: '1rem' }}>Type</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map(ad => (
                <tr key={ad.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#111827', textTransform: 'capitalize' }}>
                    {ad.position}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 500, textTransform: 'capitalize' }}>
                      {ad.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => toggleActive(ad)} style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: ad.active ? '#dcfce7' : '#fee2e2', color: ad.active ? '#166534' : '#991b1b' }}>
                      {ad.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setIsEditing(true); setCurrentAd(ad); }} style={{ color: '#f59e0b' }}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(ad.id)} style={{ color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {ads.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    No advertisements mapped.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              {currentAd.id ? 'Edit Advertisement' : 'New Advertisement'}
            </h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Position Slot</label>
                <select 
                  value={currentAd.position}
                  onChange={e => setCurrentAd({ ...currentAd, position: e.target.value })}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                >
                  <option value="header">Header Banner</option>
                  <option value="sidebar">Sidebar Widget</option>
                  <option value="in_article">In-Article Content</option>
                  <option value="footer">Footer Zone</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Ad Type</label>
                <select 
                  value={currentAd.type}
                  onChange={e => setCurrentAd({ ...currentAd, type: e.target.value })}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                >
                  <option value="image">Static Image / Banner</option>
                  <option value="html">Custom HTML / Script</option>
                </select>
              </div>

              {currentAd.type === 'image' ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Image URL</label>
                    <input 
                      type="text" 
                      value={currentAd.image}
                      onChange={e => setCurrentAd({ ...currentAd, image: e.target.value })}
                      placeholder="https://..." 
                      style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Target Link</label>
                    <input 
                      type="text" 
                      value={currentAd.link}
                      onChange={e => setCurrentAd({ ...currentAd, link: e.target.value })}
                      placeholder="https://..." 
                      style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                    />
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>HTML/Script Code</label>
                  <textarea 
                    value={currentAd.code}
                    onChange={e => setCurrentAd({ ...currentAd, code: e.target.value })}
                    placeholder="<div>...</div>" 
                    style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', minHeight: '150px', fontFamily: 'monospace' }}
                    required
                  />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="adActive" checked={currentAd.active} onChange={e => setCurrentAd({...currentAd, active: e.target.checked})} />
                <label htmlFor="adActive" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Active state</label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 600 }}>
                  Save Ad
                </button>
                <button type="button" onClick={() => { setIsEditing(false); setCurrentAd({position:'header', type:'image', image:'', link:'', code:'', active:true}); }} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f3f4f6', color: '#4b5563', borderRadius: '0.5rem', fontWeight: 600 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
