'use client';
import { useEffect, useState } from 'react';
import { articleStore, categoryStore, adStore, breakingNewsStore } from '@/lib/store';
import { Users, FileText, Eye, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    views: 0,
    breaking: 0,
    ads: 0
  });

  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const articles = articleStore.getAll();
    const categories = categoryStore.getAll();
    const ads = adStore.getAll();
    const breaking = breakingNewsStore.getAll();
    
    const totalViews = articles.reduce((sum, art) => sum + (art.views || 0), 0);
    
    setStats({
      articles: articles.length,
      categories: categories.length,
      views: totalViews,
      breaking: breaking.length,
      ads: ads.length
    });

    setRecentArticles(articles.slice(0, 5));
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard title="Total Articles" value={stats.articles} icon={<FileText size={24} color="#ef4444" />} trend="+12%" />
        <StatCard title="Total Views" value={stats.views.toLocaleString()} icon={<Eye size={24} color="#3b82f6" />} trend="+4.5%" />
        <StatCard title="Categories" value={stats.categories} icon={<Users size={24} color="#10b981" />} />
        <StatCard title="Active Ads" value={stats.ads} icon={<TrendingUp size={24} color="#f59e0b" />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Recent Articles */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Recent Articles</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentArticles.map(article => (
              <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '0.375rem', overflow: 'hidden' }}>
                    <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: '300px' }}>{article.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{new Date(article.publishedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>{article.views} views</span>
                  <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '9999px', fontWeight: 500 }}>Published</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 600 }}>Create New Article</button>
            <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '0.5rem', fontWeight: 600, border: '1px solid #d1d5db' }}>Add Breaking News</button>
            <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '0.5rem', fontWeight: 600, border: '1px solid #d1d5db' }}>Manage Advertisements</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600 }}>{title}</h3>
        <div style={{ padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{value}</div>
        {trend && <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#10b981' }}>{trend}</div>}
      </div>
    </div>
  );
}
