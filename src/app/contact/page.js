'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production this would call an API route
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Contact</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Get In Touch</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          For news tips, press inquiries, advertising, or general feedback — we'd love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {[
            { label: 'Editorial Office', value: 'editorial@rksspeed.news', icon: '✉' },
            { label: 'Advertising', value: 'ads@rksspeed.news', icon: '📢' },
            { label: 'Press & Media', value: 'press@rksspeed.news', icon: '📰' },
            { label: 'Support', value: '+91 80000 12345', icon: '📞' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', padding: '4rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Message Sent!</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="John Doe"
                  style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="john@example.com"
                  style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Subject</label>
              <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
                <option value="">Select a subject...</option>
                <option value="news-tip">News Tip</option>
                <option value="advertising">Advertising Inquiry</option>
                <option value="press">Press & Media</option>
                <option value="correction">Correction Request</option>
                <option value="general">General Feedback</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="Write your message here..." rows={6}
                style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'inherit', resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
