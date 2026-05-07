'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adStore } from '@/lib/store';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [headerAd, setHeaderAd] = useState(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/categories')
        ]);
        const articlesData = await articlesRes.json();
        const categoriesData = await categoriesRes.json();
        
        setArticles(articlesData.slice(0, 10)); // Top 10 recent
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }

      // Ads are still local for now, but should move to API later if needed
      const ads = adStore.getByPosition('header');
      if (ads.length > 0) setHeaderAd(ads[0]);
    }
    loadData();
  }, []);

  const topArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header Ad Space */}
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {headerAd && (
           <div className="ad-placeholder" style={{ height: '90px' }}>
             {headerAd.type === 'image' ? (
                <img src={headerAd.image} alt="Advertisement" style={{ height: '100%', objectFit: 'cover' }} />
             ) : (
                <div dangerouslySetInnerHTML={{ __html: headerAd.code }} />
             )}
           </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="container hero-grid" style={{ marginBottom: '4rem' }}>
        {topArticle ? (
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '16/9', width: '100%' }}>
            <img src={topArticle.imageUrl || null} alt={topArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: '2rem', color: 'white' }}>
              <span className="badge" style={{ marginBottom: '1rem' }}>
                {categories.find(c => String(c.id) === String(topArticle.categoryId))?.name || 'News'}
              </span>
              <h1 className="heading-serif" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                <Link href={`/article/${topArticle.slug}`} className="hover:underline">
                  {topArticle.title}
                </Link>
              </h1>
              <p style={{ color: 'var(--color-text-light)', fontSize: '1.125rem' }}>{topArticle.excerpt}</p>
            </div>
          </div>
        ) : (
          <div style={{ background: 'var(--color-bg-alt)', minHeight: '400px', borderRadius: 'var(--radius-lg)' }} />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Latest Updates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {sideArticles.map(article => (
              <div key={article.id} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '120px', height: '80px', flexShrink: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img src={article.imageUrl || null} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                    <Link href={`/article/${article.slug}`} className="hover:underline">{article.title}</Link>
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {categories.find(c => String(c.id) === String(article.categoryId))?.name || 'News'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section style={{ backgroundColor: 'var(--color-bg-alt)', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="heading-serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Browse Categories</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderTop: `4px solid ${cat.color}`, transition: 'transform 0.2s' }}
                     onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                     onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, textAlign: 'center' }}>{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
