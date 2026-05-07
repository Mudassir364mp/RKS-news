'use client';
import { useState, useEffect } from 'react';
import { breakingNewsStore } from '@/lib/store';
import { Edit, Trash2, Plus, Megaphone } from 'lucide-react';

export default function AdminBreakingNews() {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ text: '', link: '' });

  useEffect(() => {
    setNews(breakingNewsStore.getAll());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this breaking news alert?')) {
      const remaining = news.filter(n => n.id !== id);
      breakingNewsStore.updateAll(remaining);
      setNews(remaining);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updated;
    if (currentItem.id) {
      updated = news.map(n => n.id === currentItem.id ? currentItem : n);
    } else {
      updated = [{ ...currentItem, id: `break-${Date.now()}` }, ...news]; // Add to top
    }
    breakingNewsStore.updateAll(updated);
    setNews(updated);
    setIsEditing(false);
    setCurrentItem({ text: '', link: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <Megaphone color="#ef4444" /> Breaking News
        </h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>
            <Plus size={20} />
            <span>New Alert</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, backgroundColor: 'white', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem' }}>Alert Text</th>
                <th style={{ padding: '1rem' }}>Link</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#111827' }}>
                    {item.text}
                  </td>
                  <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {item.link || 'None'}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setIsEditing(true); setCurrentItem(item); }} style={{ color: '#f59e0b' }}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {news.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    No ongoing breaking news alerts.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', padding: '0 1rem', color: '#6b7280', fontSize: '0.875rem' }}>
             Note: Alerts are displayed in the header ticker sequence across the entire site.
          </p>
        </div>

        {isEditing && (
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              {currentItem.id ? 'Edit Alert' : 'New Alert'}
            </h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Alert Text</label>
                <textarea 
                  value={currentItem.text}
                  onChange={e => setCurrentItem({ ...currentItem, text: e.target.value })}
                  placeholder="e.g. Major updates from the Central Bank..." 
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', minHeight: '80px', fontFamily: 'inherit' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Target Link (Optional)</label>
                <input 
                  type="text" 
                  value={currentItem.link}
                  onChange={e => setCurrentItem({ ...currentItem, link: e.target.value })}
                  placeholder="/article/some-slug" 
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 600 }}>
                  Save Alert
                </button>
                <button type="button" onClick={() => { setIsEditing(false); setCurrentItem({text:'', link:''}); }} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f3f4f6', color: '#4b5563', borderRadius: '0.5rem', fontWeight: 600 }}>
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
