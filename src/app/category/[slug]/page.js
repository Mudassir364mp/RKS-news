'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatRelativeTime } from '@/lib/utils';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        const catRes = await fetch('/api/categories');
        const categories = await catRes.json();
        const cat = categories.find(c => c.slug === slug);
        
        if (cat) {
          setCategory(cat);
          const artRes = await fetch(`/api/articles?category=${cat.id}`);
          const arts = await artRes.json();
          setArticles(arts);
        }
      } catch (error) {
        console.error('Failed to load category:', error);
      }
    }
    loadData();
  }, [slug]);

  if (!category) return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ borderBottom: `4px solid ${category.color || 'var(--color-primary)'}`, paddingBottom: '1rem', marginBottom: '3rem' }}>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800 }}>{category.name} News</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginTop: '0.5rem' }}>
          Latest updates, analysis, and breaking news in {category.name}.
        </p>
      </div>

      {articles.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>No articles found</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>There are no articles in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {articles.map(article => (
            <div key={article.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href={`/article/${article.slug}`}>
                <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} 
                       onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                       onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
              </Link>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>
                  <Link href={`/article/${article.slug}`} className="hover:underline">{article.title}</Link>
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.excerpt}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600 }}>
                  {formatRelativeTime(article.publishedAt)} • By {article.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
