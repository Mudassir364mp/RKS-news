'use client';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Political Reporter', department: 'Editorial', location: 'Delhi', type: 'Full-time' },
    { title: 'Video Journalist', department: 'Media Production', location: 'Mumbai', type: 'Full-time' },
    { title: 'Digital Content Editor', department: 'Editorial', location: 'Remote', type: 'Full-time' },
    { title: 'Frontend Developer', department: 'Technology', location: 'Hyderabad', type: 'Full-time' },
    { title: 'Social Media Manager', department: 'Marketing', location: 'Bangalore', type: 'Contract' },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Join Our Team</span>
        <h1 className="heading-serif" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Careers at RKS Speed News</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Be part of a passionate team driving journalism into the digital age. We're always looking for talented people who believe in quality reporting.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        {jobs.map(job => (
          <div key={job.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', padding: '1.5rem 2rem', border: '1px solid var(--color-border)', transition: 'border-color 0.2s' }}
               onMouseEnter={e => e.currentTarget.style.borderColor='var(--color-primary)'}
               onMouseLeave={e => e.currentTarget.style.borderColor='var(--color-border)'}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>{job.title}</h3>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.location}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                {job.type}
              </span>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Apply</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-xl)', maxWidth: '600px', margin: '4rem auto 0' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Don't see your role?</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>We're always open to hearing from talented individuals. Send your resume and we'll keep it on file.</p>
        <a href="mailto:careers@rksspeed.news" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Send Open Application</a>
      </div>
    </div>
  );
}
