'use client';
import Link from 'next/link';

export default function AdvertisePage() {
  const packages = [
    { name: 'Standard Banner', position: 'Header / Footer', size: '728×90 px', price: '₹5,000/mo', impressions: '~50K' },
    { name: 'Sidebar Widget', position: 'Article Sidebar', size: '300×250 px', price: '₹3,500/mo', impressions: '~35K' },
    { name: 'In-Article Ad', position: 'Mid-Article Placement', size: '600×200 px', price: '₹4,000/mo', impressions: '~40K' },
    { name: 'Sponsored Article', position: 'Marked as Sponsored', size: 'Full Article', price: '₹12,000/mo', impressions: '~100K' },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Reach Millions</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Advertise With Us</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Connect your brand with our highly engaged, national audience of readers who trust RKS Speed News for breaking updates.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '900px', margin: '0 auto 4rem' }}>
        {packages.map(pkg => (
          <div key={pkg.name} style={{ backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--color-border)', transition: 'transform 0.2s, box-shadow 0.2s' }}
               onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{pkg.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>{pkg.position}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Size</span>
                <span style={{ fontWeight: 600 }}>{pkg.size}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Avg. Impressions</span>
                <span style={{ fontWeight: 600 }}>{pkg.impressions}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Starting at</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{pkg.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-xl)', padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="heading-serif" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to Get Started?</h2>
        <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Contact our advertising team for a customized media kit and pricing tailored to your campaign goals.</p>
        <Link href="/contact" style={{ backgroundColor: 'white', color: 'var(--color-primary)', padding: '0.875rem 2.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>
          Get Media Kit
        </Link>
      </div>
    </div>
  );
}
