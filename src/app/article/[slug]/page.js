'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getItems, addItem } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';

function ShareButtons({ article }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(url);

  const share = (platform) => {
    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareButtons = [
    { id: 'whatsapp', label: 'WhatsApp', color: '#25d366', bg: '#dcfce7' },
    { id: 'twitter', label: 'Twitter / X', color: '#1d9bf0', bg: '#dbeafe' },
    { id: 'facebook', label: 'Facebook', color: '#1877f2', bg: '#dbeafe' },
    { id: 'linkedin', label: 'LinkedIn', color: '#0a66c2', bg: '#dbeafe' },
  ];

  return (
    <div style={{ margin: '3rem 0', padding: '1.5rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
      <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Share this article</h3>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {shareButtons.map(btn => (
          <button key={btn.id} onClick={() => share(btn.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.875rem', backgroundColor: btn.bg, color: btn.color, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.8'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            {btn.label}
          </button>
        ))}
        <button onClick={copyLink}
          style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.875rem', backgroundColor: copied ? '#dcfce7' : 'var(--color-bg)', color: copied ? '#166534' : 'var(--color-text)', border: '1px solid var(--color-border)', transition: 'all 0.2s' }}>
          {copied ? '✓ Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}

function CommentSection({ articleSlug }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = getItems(`rks_comments_${articleSlug}`) || [];
    setComments(stored.filter(c => c.approved));
  }, [articleSlug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(`rks_comments_${articleSlug}`, { ...form, date: new Date().toISOString(), approved: false });
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ marginTop: '3rem', borderTop: '2px solid var(--color-border)', paddingTop: '2rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>
        Comments ({comments.length})
      </h2>

      {comments.length === 0 && !submitted && (
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Be the first to comment on this article.</p>
      )}

      {comments.map(c => (
        <div key={c.id} style={{ marginBottom: '1.5rem', padding: '1.25rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 700 }}>{c.name}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{formatRelativeTime(c.date)}</span>
          </div>
          <p style={{ color: 'var(--color-text)', lineHeight: 1.7 }}>{c.message}</p>
        </div>
      ))}

      {submitted ? (
        <div style={{ padding: '1.25rem', backgroundColor: '#dcfce7', borderRadius: 'var(--radius-lg)', color: '#166534', fontWeight: 600 }}>
          ✓ Your comment has been submitted and is awaiting moderation. Thank you!
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.25rem' }}>Leave a Comment</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Name *</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email *</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Comment *</label>
              <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={4} placeholder="Share your thoughts..."
                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'inherit', resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>
              Post Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/articles/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const art = await res.json();
        
        setArticle(art);
        
        // Fetch categories to find the name
        const catRes = await fetch('/api/categories');
        const categories = await catRes.json();
        setCategory(categories.find(c => String(c.id) === String(art.categoryId)));
        
        // Fetch related articles
        const relatedRes = await fetch(`/api/articles?category=${art.categoryId}`);
        const related = await relatedRes.json();
        setRelatedArticles(related.filter(a => a.id !== art.id).slice(0, 3));
        
        // Note: Views increment logic needs an API endpoint, omitting for now
      } catch (error) {
        console.error('Error loading article:', error);
      }
    }
    loadArticle();
  }, [slug]);

  if (!article) return (
    <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <div style={{ color: 'var(--color-text-muted)' }}>Loading article...</div>
    </div>
  );

  return (
    <div className="container article-layout" style={{ padding: '3rem 1rem' }}>
      {/* Main Content */}
      <article>
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span>/</span>
          {category && <Link href={`/category/${category.slug}`} style={{ color: 'var(--color-primary)' }}>{category.name}</Link>}
          <span>/</span>
          <span style={{ color: 'var(--color-text)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</span>
        </div>

        {/* Breaking badge */}
        {article.isBreaking && (
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', animation: 'pulse 2s infinite' }}>
              🔴 Breaking News
            </span>
          </div>
        )}

        <h1 className="heading-serif" style={{ fontSize: '2.75rem', lineHeight: 1.2, marginBottom: '1.25rem' }}>{article.title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>{article.excerpt}</p>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.25rem', flexShrink: 0 }}>
              {article.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{article.author}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {formatRelativeTime(article.publishedAt)} &nbsp;•&nbsp; {(article.views || 0).toLocaleString()} views
              </div>
            </div>
          </div>
          {category && (
            <Link href={`/category/${category.slug}`} className="badge">{category.name}</Link>
          )}
        </div>

        {/* Featured Image */}
        <div style={{ marginBottom: '2.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <img src={article.imageUrl} alt={article.title} style={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }} />
        </div>

        {/* Content */}
        <div style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--color-text)' }}
          dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Share Buttons */}
        <ShareButtons article={article} />

        {/* Comments */}
        <CommentSection articleSlug={article.slug} />
      </article>

      {/* Sidebar */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="ad-placeholder" style={{ height: '250px' }}>
          <span>Advertisement (300×250)</span>
        </div>

        {relatedArticles.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, borderBottom: '3px solid var(--color-primary)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
              Related Articles
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {relatedArticles.map(rel => (
                <div key={rel.id}>
                  <Link href={`/article/${rel.slug}`}>
                    <div style={{ width: '100%', height: '130px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.5rem' }}>
                      <img src={rel.imageUrl} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
                    </div>
                    <h4 style={{ fontWeight: 600, lineHeight: 1.3, fontSize: '0.9rem' }}>{rel.title}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{formatRelativeTime(rel.publishedAt)}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ad-placeholder" style={{ height: '600px' }}>
          <span>Advertisement (300×600)</span>
        </div>
      </aside>
    </div>
  );
}
