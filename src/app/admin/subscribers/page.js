'use client';
import { useState, useEffect } from 'react';
import { getItems } from '@/lib/store';
import { Download, Users } from 'lucide-react';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    setSubscribers(getItems('rks_subscribers'));
  }, []);

  const handleExportCSV = () => {
    const csv = 'Name,Email,Date\n' + 
      subscribers.map(s => `${s.name || 'Anonymous'},${s.email},${s.date}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rks_subscribers.csv';
    a.click();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <Users color="#3b82f6" /> Newsletter Subscribers
        </h1>
        {subscribers.length > 0 && (
          <button onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>
            <Download size={18} />
            Export CSV
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Total Subscribers</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{subscribers.length}</div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>This Week</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
            {subscribers.filter(s => new Date(s.date) > new Date(Date.now() - 7*86400000)).length}
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>This Month</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
            {subscribers.filter(s => new Date(s.date) > new Date(Date.now() - 30*86400000)).length}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {subscribers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
            No subscribers yet. They'll appear here when readers sign up for your newsletter.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 500, color: '#111827' }}>{sub.email}</td>
                  <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>{new Date(sub.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
