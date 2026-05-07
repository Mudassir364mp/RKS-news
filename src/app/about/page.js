'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>About Us</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Who We Are</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
          RKS Speed News is a national digital media platform committed to delivering fast, accurate, and unbiased news coverage across India and the world.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
          <h2 className="heading-serif" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            Our mission is to empower citizens with reliable and timely information. We believe that an informed public is the foundation of a healthy democracy. RKS Speed News strives to uphold the highest journalistic standards, bringing news that matters to your doorstep instantly.
          </p>
        </section>

        <section style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
          <h2 className="heading-serif" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Our Team</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            We are a diverse team of journalists, editors, analysts, and digital media professionals with decades of combined experience. Our reporters work around the clock across all major cities and regions to ensure you never miss a critical update.
          </p>
        </section>

        <section style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
          <h2 className="heading-serif" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Editorial Standards</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            Every story published on RKS Speed News is verified through at least two independent sources before publication. We follow a strict editorial code of conduct and are committed to corrections and transparency when errors occur.
          </p>
        </section>

        <section style={{ backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Get In Touch</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Have a news tip, feedback, or partnership inquiry?</p>
          <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.75rem 2rem', fontSize: '1rem' }}>Contact Us</Link>
        </section>
      </div>
    </div>
  );
}
