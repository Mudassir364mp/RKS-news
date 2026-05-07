'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Moon, Search, X, Menu } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  if (pathname.startsWith('/admin')) return null;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/category/politics', label: 'Politics' },
    { href: '/category/business', label: 'Business' },
    { href: '/category/technology', label: 'Technology' },
    { href: '/category/sports', label: 'Sports' },
    { href: '/video-news', label: 'Video News' },
    { href: '/photo-gallery', label: 'Photos' },
  ];

  return (
    <header style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', position: 'sticky', top: 0, zIndex: 50, boxShadow: 'var(--shadow-sm)' }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: '#111827', color: '#d1d5db', padding: '0.35rem 0', fontSize: '0.8rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener" style={{ color: '#9ca3af', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener" style={{ color: '#9ca3af', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noopener" style={{ color: '#9ca3af', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f87171'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>YouTube</a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container" style={{ padding: '0.875rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '-0.025em' }}>RKS</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-text)', textTransform: 'uppercase' }}>SPEED NEWS</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden-mobile" style={{ gap: '0.25rem', alignItems: 'center' }}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-bg-alt)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >{label}</Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Hamburger Menu Toggle */}
          <button className="hidden-desktop" onClick={() => setMobileOpen(!mobileOpen)} style={{ padding: '0.4rem', color: 'var(--color-text)', borderRadius: 'var(--radius-md)', transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-bg-alt)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {showSearch ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.25rem' }}>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{ padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', width: '200px' }}
              />
              <button type="button" onClick={() => setShowSearch(false)} style={{ color: 'var(--color-text-muted)', padding: '0.4rem' }}>
                <X size={18} />
              </button>
            </form>
          ) : (
            <button onClick={() => setShowSearch(true)} style={{ padding: '0.4rem', color: 'var(--color-text-muted)', borderRadius: 'var(--radius-md)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              <Search size={20} />
            </button>
          )}
          <button onClick={toggleDark} style={{ padding: '0.4rem', color: 'var(--color-text-muted)', borderRadius: 'var(--radius-md)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="hidden-desktop" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, boxShadow: 'var(--shadow-md)' }}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '1rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)', color: isActive ? 'var(--color-primary)' : 'var(--color-text)' }}>
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
