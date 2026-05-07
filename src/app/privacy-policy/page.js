'use client';

export default function PrivacyPage() {
  const sections = [
    { title: '1. Information We Collect', content: 'We may collect information you provide directly to us, such as when you sign up for our newsletter, contact us, or engage with our content. This includes name, email address, and any other information you choose to provide.' },
    { title: '2. How We Use Your Information', content: 'We use the information we collect to deliver, maintain, and improve our services, send newsletters and updates you have subscribed to, respond to your comments and questions, and monitor and analyze trends and usage.' },
    { title: '3. Cookies & Tracking', content: 'We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies.' },
    { title: '4. Advertising', content: 'We may display third-party advertisements on our website. These third-party ad networks may use cookies, web beacons, and other technologies to collect information about you. Our privacy policy does not apply to those third-party services.' },
    { title: '5. Data Security', content: 'We implement reasonable security measures to protect the security of your personal information. However, no transmission over the Internet or storage system can be guaranteed to be 100% secure.' },
    { title: '6. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at privacy@rksspeed.news.' },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Legal</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {sections.map(section => (
          <div key={section.title}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{section.title}</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
