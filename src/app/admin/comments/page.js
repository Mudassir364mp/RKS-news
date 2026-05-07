'use client';
import { useState, useEffect } from 'react';
import { getItems } from '@/lib/store';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load all comments from localStorage (keyed by article slug)
    const allComments = [];
    const articles = getItems('rks_articles');
    articles.forEach(article => {
      const artComments = getItems(`rks_comments_${article.slug}`) || [];
      artComments.forEach(c => allComments.push({ ...c, articleTitle: article.title, articleSlug: article.slug }));
    });
    setComments(allComments.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const handleApprove = (comment) => {
    const key = `rks_comments_${comment.articleSlug}`;
    const all = getItems(key);
    const updated = all.map(c => c.id === comment.id ? { ...c, approved: true } : c);
    localStorage.setItem(key, JSON.stringify(updated));
    setComments(prev => prev.map(c => c.id === comment.id ? { ...c, approved: true } : c));
  };

  const handleDelete = (comment) => {
    if (!confirm('Delete this comment?')) return;
    const key = `rks_comments_${comment.articleSlug}`;
    const all = getItems(key);
    const updated = all.filter(c => c.id !== comment.id);
    localStorage.setItem(key, JSON.stringify(updated));
    setComments(prev => prev.filter(c => c.id !== comment.id));
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>Comment Moderation</h1>

      {comments.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', color: '#6b7280', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          No comments yet. They will appear here as readers engage with articles.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.map(comment => (
            <div key={comment.id} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${comment.approved ? '#10b981' : '#f59e0b'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{comment.name}</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '1rem' }}>{comment.email}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: comment.approved ? '#dcfce7' : '#fef3c7', color: comment.approved ? '#166534' : '#92400e' }}>
                    {comment.approved ? 'Approved' : 'Pending'}
                  </span>
                  {!comment.approved && (
                    <button onClick={() => handleApprove(comment)} style={{ color: '#10b981' }} title="Approve">
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(comment)} style={{ color: '#ef4444' }} title="Delete">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p style={{ color: '#374151', marginBottom: '0.5rem' }}>{comment.message}</p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>On: <em>{comment.articleTitle}</em> — {new Date(comment.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
