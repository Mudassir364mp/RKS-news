'use client';

export default function TermsPage() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using RKS Speed News, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the website.' },
    { title: '2. Use of Content', content: 'All content published on RKS Speed News — including articles, images, videos, and graphics — is the intellectual property of RKS Speed News or its licensors. Content may not be reproduced, distributed, or republished without prior written permission.' },
    { title: '3. User Conduct', content: 'You agree not to engage in any conduct that restricts or inhibits any other user from using or enjoying the site. You may not transmit any unlawful, threatening, abusive, or defamatory content.' },
    { title: '4. Comments Policy', content: 'User-generated comments are the sole responsibility of the commenter. RKS Speed News reserves the right to remove any comments it deems inappropriate, offensive, or in violation of these terms.' },
    { title: '5. Disclaimer of Warranties', content: 'The site is provided on an "as is" basis without warranties of any kind. RKS Speed News does not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.' },
    { title: '6. Limitation of Liability', content: 'To the maximum extent permitted by applicable law, RKS Speed News shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the site or its content.' },
    { title: '7. Changes to Terms', content: 'We reserve the right to modify these terms at any time. We will notify users of significant changes by posting a notice on the website. Continued use of the site constitutes acceptance of the new terms.' },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '3rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Legal</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Terms & Conditions</h1>
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
