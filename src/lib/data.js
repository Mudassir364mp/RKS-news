// lib/data.js

export const initialCategories = [
  { id: '1', name: 'Politics', slug: 'politics', color: '#dc2626' },
  { id: '2', name: 'Business', slug: 'business', color: '#059669' },
  { id: '3', name: 'Technology', slug: 'technology', color: '#2563eb' },
  { id: '4', name: 'Sports', slug: 'sports', color: '#ea580c' },
  { id: '5', name: 'Entertainment', slug: 'entertainment', color: '#9333ea' },
];

export const initialArticles = [
  {
    id: '1',
    title: 'Global Markets Rally as Tech Stocks Surge',
    slug: 'global-markets-rally-tech-stocks-surge',
    excerpt: 'Major indices reached new record highs today following strong earnings reports from tech giants.',
    content: '<p>Major indices reached new record highs today following strong earnings reports from tech giants. The surge was led by AI-focused companies...</p>',
    categoryId: '2',
    author: 'Sarah Jenkins',
    publishedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a2236a0?auto=format&fit=crop&q=80&w=1000',
    views: 12500,
    isBreaking: false,
  },
  {
    id: '2',
    title: 'New Policy Announcement Shifts Political Landscape',
    slug: 'new-policy-announcement-shifts',
    excerpt: 'The surprise announcement this morning has sent shockwaves through the political establishment.',
    content: '<p>The surprise announcement this morning has sent shockwaves through the political establishment...</p>',
    categoryId: '1',
    author: 'Michael Chang',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1541872703874-fa7252fc7ee8?auto=format&fit=crop&q=80&w=1000',
    views: 8400,
    isBreaking: true,
  },
  {
    id: '3',
    title: 'Championship Finals: A Historic Victory',
    slug: 'championship-finals-historic-victory',
    excerpt: 'In an unprecedented turn of events, the underdogs secured a massive victory last night.',
    content: '<p>In an unprecedented turn of events, the underdogs secured a massive victory last night...</p>',
    categoryId: '4',
    author: 'David Wright',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1000',
    views: 22100,
    isBreaking: false,
  }
];

export const initialBreakingNews = [
  { id: '1', text: 'Live: Prime Minister addresses the nation at 8 PM', link: '/article/live-pm-address' },
  { id: '2', text: 'Stock markets crash globally after Central Bank raises interest rates', link: '/article/stock-market-crash' },
  { id: '3', text: 'Earthquake of magnitude 6.5 hits the northern coast', link: '/article/northern-coast-earthquake' }
];

export const initialAds = [
  {
    id: 'header-ad-1',
    position: 'header',
    type: 'image',
    image: 'https://via.placeholder.com/728x90?text=Premium+Ad+Space',
    link: '#',
    active: true
  },
  {
    id: 'sidebar-ad-1',
    position: 'sidebar',
    type: 'html',
    code: '<div style="background:#e5e7eb;padding:1rem;text-align:center;height:250px;display:flex;align-items:center;justify-content:center;font-weight:bold;">Sidebar Ad</div>',
    active: true
  }
];

// Initialize localStorage with these defaults if empty
export const initializeData = () => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('rks_categories')) {
      localStorage.setItem('rks_categories', JSON.stringify(initialCategories));
    }
    if (!localStorage.getItem('rks_articles')) {
      localStorage.setItem('rks_articles', JSON.stringify(initialArticles));
    }
    if (!localStorage.getItem('rks_breaking')) {
      localStorage.setItem('rks_breaking', JSON.stringify(initialBreakingNews));
    }
    if (!localStorage.getItem('rks_ads')) {
      localStorage.setItem('rks_ads', JSON.stringify(initialAds));
    }
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }
  }
};
