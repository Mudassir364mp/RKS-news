'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, getSession, getLoginAttempts } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState({ count: 0, locked: false });

  useEffect(() => {
    // Already logged in → straight to dashboard
    if (getSession()) router.replace('/admin');
  }, []);

  const refreshAttempts = (email) => {
    if (email) setAttempts(getLoginAttempts(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Intentional 600ms delay to simulate server round-trip
      await new Promise(res => setTimeout(res, 600));

      const result = login(form.email, form.password, form.rememberMe);

      if (result.success) {
        setSuccess(true);
        // Keep loading true so the spinner continues while navigating
        router.replace('/admin');
      } else {
        setError(result.error);
        refreshAttempts(form.email);
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected system error occurred. Please try again later.');
      setLoading(false);
    }
  };

  const remainingAttempts = Math.max(0, 5 - attempts.count);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050a14',
      backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(220,38,38,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,64,175,0.06) 0%, transparent 60%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.75rem',
            marginBottom: '1.75rem',
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444', letterSpacing: '-0.025em' }}>RKS</span>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>SPEED NEWS</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            CMS Admin Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Authorized personnel only. All activity is monitored and logged.
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.25rem',
          padding: '2.25rem',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          {/* Error Banner */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#fca5a5',
              padding: '0.875rem 1rem',
              borderRadius: '0.625rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-start',
            }}>
              <span style={{ flexShrink: 0 }}>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div style={{
              backgroundColor: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#6ee7b7',
              padding: '0.875rem 1rem',
              borderRadius: '0.625rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-start',
            }}>
              <span style={{ flexShrink: 0 }}>✓</span>
              <span>Authentication successful! Redirecting to dashboard...</span>
            </div>
          )}

          {/* Lockout warning */}
          {!attempts.locked && attempts.count >= 3 && (
            <div style={{
              backgroundColor: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.25)',
              color: '#fde68a',
              padding: '0.75rem 1rem',
              borderRadius: '0.625rem',
              marginBottom: '1.5rem',
              fontSize: '0.8125rem',
            }}>
              ⚡ {remainingAttempts} attempt{remainingAttempts === 1 ? '' : 's'} remaining before lockout.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm({ ...form, email: e.target.value }); refreshAttempts(e.target.value); }}
                required
                disabled={loading || attempts.locked}
                placeholder="admin@rksspeed.news"
                style={{
                  padding: '0.875rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.625rem',
                  color: 'white',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = '#ef4444'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  disabled={loading || attempts.locked}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.625rem',
                    color: 'white',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => e.target.style.borderColor = '#ef4444'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '0.875rem' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={form.rememberMe}
                onChange={e => setForm({ ...form, rememberMe: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#ef4444' }}
              />
              <label htmlFor="rememberMe" style={{ color: '#64748b', fontSize: '0.875rem', cursor: 'pointer' }}>
                Keep me signed in for 7 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || attempts.locked}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.9375rem',
                background: attempts.locked ? '#374151' : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: 'white',
                borderRadius: '0.625rem',
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '0.02em',
                cursor: loading || attempts.locked ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1,
                transition: 'all 0.2s',
                boxShadow: attempts.locked ? 'none' : '0 4px 15px rgba(220,38,38,0.3)',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  {success ? 'Redirecting...' : 'Verifying credentials...'}
                </span>
              ) : attempts.locked ? '🔒 Account Temporarily Locked' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>

        {/* Credentials reference */}
        <div style={{
          marginTop: '1.5rem',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '0.875rem',
          padding: '1.125rem 1.5rem',
        }}>
          <p style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
            Demo Credentials
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {[
              ['Super Admin', 'admin@rksspeed.news', 'SuperAdmin@2024!'],
              ['Editor', 'editor@rksspeed.news', 'Editor@2024!'],
              ['Reporter', 'reporter@rksspeed.news', 'Reporter@2024!'],
            ].map(([role, email, pass]) => (
              <div key={role} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600, minWidth: '110px' }}>{role}:</span>
                <span style={{ fontFamily: 'monospace' }}>{email}</span>
                <span style={{ color: '#475569' }}>/ {pass}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <p style={{ textAlign: 'center', color: '#1e293b', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          RKS Speed News CMS &bull; All rights reserved &bull; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
