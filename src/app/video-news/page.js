'use client';
import Link from 'next/link';

export default function VideoNewsPage() {
  const videos = [
    { id: 1, title: 'Live Update: Press Conference on New Economic Policies', thumbnail: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80', duration: '4:20' },
    { id: 2, title: 'In-Depth: The Future of Renewable Energy', thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80', duration: '12:05' },
    { id: 3, title: 'Sports Highlights: National Championship Finals', thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80', duration: '8:45' },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem' }}>
        <div>
          <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800 }}>Video News</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Watch the latest news and analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
        {videos.map(video => (
          <div key={video.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--color-bg-alt)' }}>
              <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', backgroundColor: 'rgba(220, 38, 38, 0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '3px solid white' }}>
                 ▶
              </div>
              <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600 }}>
                {video.duration}
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3 }}>
              <Link href="#" className="hover:underline">{video.title}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
