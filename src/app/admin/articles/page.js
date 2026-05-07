'use client';
import { useState, useEffect } from 'react';
import { articleStore, categoryStore } from '@/lib/store';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setArticles(articleStore.getAll());
    setCategories(categoryStore.getAll());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      articleStore.delete(id);
      setArticles(articleStore.getAll());
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>Articles</h1>
        <Link href="/admin/articles/new" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 600 }}>
          <Plus size={20} />
          <span>New Article</span>
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '0.875rem' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Author</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600, color: '#111827', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{article.views || 0} Views</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    {getCategoryName(article.categoryId)}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>{article.author}</td>
                <td style={{ padding: '1rem', color: '#4b5563', fontSize: '0.875rem' }}>{new Date(article.publishedAt).toLocaleDateString()}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <Link href={`/article/${article.slug}`} target="_blank" style={{ color: '#3b82f6' }}>
                      <Eye size={18} />
                    </Link>
                    <Link href={`/admin/articles/edit/${article.id}`} style={{ color: '#f59e0b' }}>
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(article.id)} style={{ color: '#ef4444' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  No articles found. Create your first article!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
