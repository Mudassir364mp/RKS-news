'use client';
import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { getItems, setItem, deleteItem, addItem, updateItem } from '@/lib/store';

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState({ name: '', role: 'Reporter', email: '' });

  useEffect(() => {
    // We treat authors as a simple array in localStorage for this demo
    const stored = getItems('rks_authors');
    if (stored.length === 0) {
      const defaultAuthors = [
        { id: '1', name: 'Sarah Jenkins', role: 'Senior Editor', email: 'sarah@rks.com' },
        { id: '2', name: 'Michael Chang', role: 'Political Analyst', email: 'michael@rks.com' },
        { id: '3', name: 'David Wright', role: 'Sports Reporter', email: 'david@rks.com' }
      ];
      setItem('rks_authors', defaultAuthors);
      setAuthors(defaultAuthors);
    } else {
      setAuthors(stored);
    }
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this author?')) {
      deleteItem('rks_authors', id);
      setAuthors(getItems('rks_authors'));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentAuthor.name || !currentAuthor.email) return;

    if (currentAuthor.id) {
      updateItem('rks_authors', currentAuthor.id, currentAuthor);
    } else {
      addItem('rks_authors', currentAuthor);
    }

    setAuthors(getItems('rks_authors'));
    setIsEditing(false);
    setCurrentAuthor({ name: '', role: 'Reporter', email: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>Authors & Staff</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>
            <Plus size={20} />
            <span>New Author</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, backgroundColor: 'white', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map(author => (
                <tr key={author.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                      {author.name.charAt(0)}
                    </div>
                    {author.name}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>
                      {author.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#6b7280' }}>{author.email}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setIsEditing(true); setCurrentAuthor(author); }} style={{ color: '#f59e0b' }}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(author.id)} style={{ color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {authors.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    No authors found. ADD some.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              {currentAuthor.id ? 'Edit Author' : 'New Author'}
            </h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Full Name</label>
                <input 
                  type="text" 
                  value={currentAuthor.name}
                  onChange={e => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}
                  placeholder="e.g. Jane Doe" 
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Role</label>
                <input 
                  type="text" 
                  value={currentAuthor.role}
                  onChange={e => setCurrentAuthor({ ...currentAuthor, role: e.target.value })}
                  placeholder="e.g. Investigative Journalist" 
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Email</label>
                <input 
                  type="email" 
                  value={currentAuthor.email}
                  onChange={e => setCurrentAuthor({ ...currentAuthor, email: e.target.value })}
                  placeholder="jane@rks.com" 
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 600 }}>
                  Save
                </button>
                <button type="button" onClick={() => { setIsEditing(false); setCurrentAuthor({name:'', role:'Reporter', email:''}); }} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f3f4f6', color: '#4b5563', borderRadius: '0.5rem', fontWeight: 600 }}>
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
