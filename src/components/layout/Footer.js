'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subs = JSON.parse(localStorage.getItem('rks_subscribers') || '[]');
    if (!subs.find(s => s.email === email)) {
      subs.push({ email, date: new Date().toISOString() });
      localStorage.setItem('rks_subscribers', JSON.stringify(subs));
    }
    setSubscribed(true);
    setEmail('');
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', paddingTop: '4rem', paddingBottom: '2rem', marginTop: '5rem' }}>
      {/* Newsletter Band */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '2.5rem 0', marginBottom: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Stay Informed. Subscribe.</h3>
            <p style={{ opacity: 0.85, fontSize: '0.9rem' }}>Get breaking news and top stories delivered straight to your inbox daily.</p>
          </div>
          {subscribed ? (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
              ✓ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email address"
                style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '0.9rem', outline: 'none', color: '#111827' }} />
              <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#111827', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container footer-grid" style={{ marginBottom: '3rem' }}>
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '-0.025em' }}>RKS </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>SPEED NEWS</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Delivering fast, accurate, and unbiased news. Your trusted source for breaking updates across India and the world since 2020.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { label: 'FB', href: 'https://facebook.com', hoverColor: '#60a5fa' },
              { label: 'TW', href: 'https://twitter.com', hoverColor: '#38bdf8' },
              { label: 'YT', href: 'https://youtube.com', hoverColor: '#f87171' },
              { label: 'IG', href: 'https://instagram.com', hoverColor: '#f472b6' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener"
                style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.hoverColor; e.currentTarget.style.color = s.hoverColor; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
              >{s.label}</a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Categories</h4>
          {['Politics', 'Business', 'Technology', 'Sports', 'Entertainment'].map(cat => (
            <Link key={cat} href={`/category/${cat.toLowerCase()}`} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--color-text-muted)'}>{cat}</Link>
          ))}
        </div>

        {/* Company */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Company</h4>
          {[['About Us', '/about'], ['Contact', '/contact'], ['Advertise', '/advertise'], ['Careers', '/careers']].map(([label, href]) => (
            <Link key={label} href={href} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--color-text-muted)'}>{label}</Link>
          ))}
        </div>

        {/* Legal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Legal</h4>
          {[['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms']].map(([label, href]) => (
            <Link key={label} href={href} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--color-text-muted)'}>{label}</Link>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-light)', fontSize: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p>&copy; {new Date().getFullYear()} RKS Speed News. All rights reserved.</p>
        <p>Built with passion for journalism.</p>
      </div>
    </footer>
  );
}
