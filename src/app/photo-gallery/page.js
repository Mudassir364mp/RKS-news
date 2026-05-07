'use client';
import { useState } from 'react';

const galleryItems = [
  { id: 1, title: 'Parliament Session Opens', category: 'Politics', src: 'https://images.unsplash.com/photo-1541872703874-fa7252fc7ee8?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Stock Market Surges', category: 'Business', src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a2236a0?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Championship Finals', category: 'Sports', src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Tech Innovation Summit', category: 'Technology', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'City Infrastructure Project', category: 'National', src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Renewable Energy Drive', category: 'Technology', src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'National Cultural Festival', category: 'Entertainment', src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'Monsoon Aerial View', category: 'National', src: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=800' },
  { id: 9, title: 'Award Ceremony Night', category: 'Entertainment', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'Politics', 'Business', 'Sports', 'Technology', 'National', 'Entertainment'];

export default function PhotoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeCategory);

  return (
    <div className="container" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Photo Gallery</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800 }}>News in Photos</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginTop: '0.5rem' }}>
          A visual story of today's most important events.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.4rem 1rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s', cursor: 'pointer',
              backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-alt)',
              color: activeCategory === cat ? 'white' : 'var(--color-text)',
              border: activeCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filtered.map(item => (
          <div key={item.id} onClick={() => setLightbox(item)}
            style={{ breakInside: 'avoid', marginBottom: '1rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
            onMouseEnter={e => e.currentTarget.querySelector('.overlay').style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.querySelector('.overlay').style.opacity = '0'}>
            <img src={item.src} alt={item.title} style={{ width: '100%', display: 'block', transition: 'transform 0.3s' }} />
            <div className="overlay" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem', opacity: 0, transition: 'opacity 0.3s' }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{item.title}</span>
              <span className="badge" style={{ marginTop: '0.5rem', display: 'inline-block', width: 'fit-content' }}>{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%' }}>
            <img src={lightbox.src} alt={lightbox.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', maxHeight: '75vh', objectFit: 'cover' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700 }}>{lightbox.title}</h3>
                <span className="badge" style={{ marginTop: '0.25rem', display: 'inline-block' }}>{lightbox.category}</span>
              </div>
              <button onClick={() => setLightbox(null)}
                style={{ color: 'white', fontSize: '2rem', lineHeight: 1, backgroundColor: 'rgba(255,255,255,0.1)', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
