'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSession, logout, logActivity, ROLE_LABELS, ROLE_COLORS, hasPermission } from '@/lib/auth';
import Link from 'next/link';
import {
    LayoutDashboard, FileText, FolderTree, Users, Megaphone,
    Target, MessageSquare, Mail, Settings, BarChart, LogOut,
    ShieldAlert, Activity,
} from 'lucide-react';

// Full nav definition with required permission keys
const NAV_ITEMS = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, permission: 'dashboard' },
    { name: 'Articles', href: '/admin/articles', icon: FileText, permission: 'articles' },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree, permission: 'categories' },
    { name: 'Authors', href: '/admin/authors', icon: Users, permission: 'authors' },
    { name: 'Breaking News', href: '/admin/breaking-news', icon: Megaphone, permission: 'breaking-news' },
    { name: 'Advertisements', href: '/admin/ads', icon: Target, permission: 'ads' },
    { name: 'Comments', href: '/admin/comments', icon: MessageSquare, permission: 'comments' },
    { name: 'Subscribers', href: '/admin/subscribers', icon: Mail, permission: 'subscribers' },
    { name: 'SEO', href: '/admin/seo', icon: BarChart, permission: 'seo' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, permission: 'settings' },
    { name: 'Activity Log', href: '/admin/activity', icon: Activity, permission: 'settings' },
];

function LoadingScreen() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#050a14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(239,68,68,0.2)', borderTopColor: '#ef4444', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                <p style={{ color: '#475569', fontSize: '0.875rem' }}>Verifying session…</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}

function AccessDenied() {
    const router = useRouter();
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '3rem', textAlign: 'center' }}>
            <ShieldAlert size={64} color="#ef4444" strokeWidth={1.5} />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Access Denied</h2>
            <p style={{ color: '#6b7280', maxWidth: '400px' }}>You don't have permission to view this section. Contact your Super Admin to request access.</p>
            <button onClick={() => router.push('/admin')} style={{ padding: '0.75rem 2rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', fontWeight: 700 }}>
                Dashboard
            </button>
        </div>
    );
}

export default function AdminGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [session, setSession] = useState(null);
    const [checking, setChecking] = useState(true);

    // Refresh session on every route change
    useEffect(() => {
        const s = getSession();
        if (!s) {
            router.replace('/admin/login');
        } else {
            setSession(s);
        }
        setChecking(false);
    }, [pathname]);

    const handleLogout = () => {
        logout(session?.userId);
        router.replace('/admin/login');
    };

    if (checking) return <LoadingScreen />;
    if (!session) return <LoadingScreen />; // will redirect

    // Get current section permission key
    const currentNav = NAV_ITEMS.find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)));
    const currentPermission = currentNav?.permission;

    const canAccess = !currentPermission || hasPermission(session, currentPermission);
    const roleStyle = ROLE_COLORS[session.role] || ROLE_COLORS.reporter;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, -apple-system, sans-serif' }}>

            {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
            <aside style={{ width: '268px', backgroundColor: '#0d1117', color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

                {/* Brand */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <span style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ef4444' }}>RKS</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em' }}>SPEED NEWS</span>
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.15rem' }}>Content Management System</p>
                </div>

                {/* User card */}
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.125rem', flexShrink: 0 }}>
                        {session.avatar}
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.name}</div>
                        <span style={{
                            display: 'inline-block', marginTop: '0.2rem', padding: '0.1rem 0.5rem', borderRadius: '9999px',
                            fontSize: '0.7rem', fontWeight: 700,
                            backgroundColor: roleStyle.bg, color: roleStyle.text,
                        }}>
                            {ROLE_LABELS[session.role]}
                        </span>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '0.75rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.125rem', overflowY: 'auto' }}>
                    {NAV_ITEMS.map(item => {
                        const allowed = hasPermission(session, item.permission);
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={allowed ? item.href : '#'}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.875rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: isActive ? '#ef4444' : 'transparent',
                                    color: isActive ? 'white' : allowed ? '#94a3b8' : '#374151',
                                    fontWeight: 500, fontSize: '0.875rem',
                                    transition: 'all 0.15s',
                                    cursor: allowed ? 'pointer' : 'not-allowed',
                                    opacity: allowed ? 1 : 0.45,
                                }}
                                onMouseEnter={e => { if (allowed && !isActive) e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.12)'; if (allowed && !isActive) e.currentTarget.style.color = '#e5e7eb'; }}
                                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = allowed ? '#94a3b8' : '#374151'; } }}
                            >
                                <Icon size={17} />
                                {item.name}
                                {!allowed && <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#4b5563' }}>No access</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 600 }}>
                        View Live Site ↗
                    </Link>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '0.5rem', color: '#f87171', fontSize: '0.8125rem', fontWeight: 600, width: '100%', cursor: 'pointer' }}>
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main ────────────────────────────────────────────────────────────── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* Top Bar */}
                <header style={{ backgroundColor: 'white', padding: '0.875rem 1.75rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                        <span style={{ color: '#94a3b8' }}>
                            Last login: {new Date(session.loginAt).toLocaleString()}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                            <span style={{ fontWeight: 600, color: '#374151' }}>{session.name}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {canAccess ? children : <AccessDenied />}
                </main>
            </div>
        </div>
    );
}
