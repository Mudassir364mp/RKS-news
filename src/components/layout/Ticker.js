'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { breakingNewsStore } from '@/lib/store';

export default function Ticker() {
  const [news, setNews] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch('/api/breaking');
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error('Failed to load breaking news:', error);
      }
    }
    loadNews();
  }, []);

  if (pathname.startsWith('/admin') || news.length === 0) return null;

  return (
    <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ backgroundColor: 'var(--color-primary-dark)', padding: '0.5rem 1rem', fontWeight: 700, whiteSpace: 'nowrap', zIndex: 10 }}>
        BREAKING NEWS
      </div>
      <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="animate-marquee" style={{ display: 'inline-flex', gap: '3rem', paddingLeft: '100%' }}>
          {news.map(item => (
            <div key={item.id} style={{ display: 'inline-block' }}>
              <Link href={item.link} className="hover:underline">
                <span style={{ marginRight: '0.5rem', color: '#fcd34d' }}>●</span>
                {item.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
