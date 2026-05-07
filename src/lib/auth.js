// lib/auth.js
// Client-side authentication & security system for RKS Speed News Admin

// ─── Constants ────────────────────────────────────────────────────────────────
const SESSION_KEY = 'rks_admin_session';
const ATTEMPTS_KEY = 'rks_login_attempts';
const ACTIVITY_KEY = 'rks_admin_activities';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in ms

// ─── Admin Users (hashed passwords simulated via btoa encoding) ────────────────
// In production these would be bcrypt hashes stored in a secure DB
const ADMIN_USERS = [
    {
        id: 'usr_001',
        email: 'admin@rksspeed.news',
        passwordHash: 'U3VwZXJBZG1pbkAyMDI0IQ==',   // Super Admin (SuperAdmin@2024!)
        name: 'Admin Root',
        role: 'super_admin',
        avatar: 'A',
        permissions: ['*'],
    },
    {
        id: 'usr_002',
        email: 'editor@rksspeed.news',
        passwordHash: 'RWRpdG9yQDIwMjQh', // Editor@2024!
        name: 'Chief Editor',
        role: 'editor',
        avatar: 'E',
        permissions: ['articles', 'categories', 'breaking_news', 'comments', 'seo'],
    },
    {
        id: 'usr_003',
        email: 'reporter@rksspeed.news',
        passwordHash: 'UmVwb3J0ZXJAMjAyNCE=', // Reporter@2024!
        name: 'Staff Reporter',
        role: 'reporter',
        avatar: 'R',
        permissions: ['articles'],
    },
    {
        id: 'usr_004',
        email: 'content@rksspeed.news',
        passwordHash: 'Q29udGVudEAyMDI0IQ==', // Content@2024!
        name: 'Content Manager',
        role: 'content_manager',
        avatar: 'C',
        permissions: ['articles', 'categories', 'breaking_news'],
    },
];

// ─── Role definitions ─────────────────────────────────────────────────────────
export const ROLE_LABELS = {
    super_admin: 'Super Admin',
    editor: 'Editor',
    reporter: 'Reporter',
    content_manager: 'Content Manager',
};

export const ROLE_COLORS = {
    super_admin: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
    editor: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    reporter: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
    content_manager: { bg: '#faf5ff', text: '#6b21a8', border: '#e9d5ff' },
};

// Permissions map — which nav sections each role can access
export const ROLE_PERMISSIONS = {
    super_admin: ['dashboard', 'articles', 'categories', 'authors', 'breaking-news', 'ads', 'comments', 'subscribers', 'seo', 'settings'],
    editor: ['dashboard', 'articles', 'categories', 'breaking-news', 'comments', 'seo'],
    reporter: ['dashboard', 'articles'],
    content_manager: ['dashboard', 'articles', 'categories', 'breaking-news'],
};

// ─── Simple hash fn (for demo — production should use bcrypt on server) ────────
const hashPassword = (password) => {
    if (typeof window !== 'undefined' && window.btoa) {
        return window.btoa(password);
    }
    if (typeof Buffer !== 'undefined') {
        return Buffer.from(password).toString('base64');
    }
    return '';
};
const verifyPassword = (plain, hash) => hashPassword(plain) === hash;

// ─── Brute-force protection ────────────────────────────────────────────────────
export const getLoginAttempts = (email) => {
    if (typeof window === 'undefined') return { count: 0, lastAttempt: 0, locked: false };
    const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}');
    const entry = all[email] || { count: 0, lastAttempt: 0 };
    const now = Date.now();

    // Auto-reset lockout after LOCKOUT_DURATION
    if (entry.locked && now - entry.lastAttempt > LOCKOUT_DURATION) {
        entry.count = 0;
        entry.locked = false;
        all[email] = entry;
        localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
    }

    return { ...entry, locked: entry.count >= MAX_ATTEMPTS };
};

const recordFailedAttempt = (email) => {
    const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}');
    const entry = all[email] || { count: 0, lastAttempt: 0 };
    entry.count += 1;
    entry.lastAttempt = Date.now();
    if (entry.count >= MAX_ATTEMPTS) entry.locked = true;
    all[email] = entry;
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
    return entry.count;
};

const clearAttempts = (email) => {
    const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}');
    delete all[email];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
};

// ─── Activity Log ──────────────────────────────────────────────────────────────
export const logActivity = (userId, action, detail = '') => {
    if (typeof window === 'undefined') return;
    const logs = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]');
    logs.unshift({
        id: `log_${Date.now()}`,
        userId,
        action,
        detail,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.slice(0, 80),
    });
    // Keep last 100 entries
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(logs.slice(0, 100)));
};

export const getActivityLogs = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]');
};

// ─── Session ───────────────────────────────────────────────────────────────────
const buildSession = (user, rememberMe) => ({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    permissions: user.permissions,
    loginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + (rememberMe ? 7 * 86400000 : 8 * 3600000)).toISOString(),
    userAgent: typeof window !== 'undefined' ? navigator.userAgent.slice(0, 80) : '',
});

export const saveSession = (session) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = () => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
        const session = JSON.parse(raw);
        if (new Date(session.expiresAt) < new Date()) {
            clearSession();
            return null;
        }
        return session;
    } catch {
        clearSession();
        return null;
    }
};

export const clearSession = () => {
    if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = () => !!getSession();

// ─── Login ─────────────────────────────────────────────────────────────────────
export const login = (email, password, rememberMe = false) => {
    const attempts = getLoginAttempts(email);

    if (attempts.locked) {
        const remaining = Math.ceil((LOCKOUT_DURATION - (Date.now() - attempts.lastAttempt)) / 60000);
        return { success: false, error: `Account locked due to too many attempts. Try again in ${remaining} minutes.`, locked: true };
    }

    const user = ADMIN_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || !verifyPassword(password, user.passwordHash)) {
        const count = recordFailedAttempt(email);
        const remaining = MAX_ATTEMPTS - count;
        if (remaining <= 0) {
            logActivity(email, 'LOCKED', `Account locked after ${MAX_ATTEMPTS} failed attempts`);
            return { success: false, error: `Too many failed attempts. Account locked for 15 minutes.`, locked: true };
        }
        return { success: false, error: `Invalid email or password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` };
    }

    // Success
    clearAttempts(email);
    const session = buildSession(user, rememberMe);
    saveSession(session);
    logActivity(user.id, 'LOGIN', `Logged in as ${user.role}`);

    return { success: true, session };
};

// ─── Logout ────────────────────────────────────────────────────────────────────
export const logout = (userId) => {
    if (userId) logActivity(userId, 'LOGOUT', 'Logged out');
    clearSession();
};

// ─── Permission check ──────────────────────────────────────────────────────────
export const hasPermission = (session, section) => {
    if (!session) return false;
    if (session.role === 'super_admin') return true;
    const allowed = ROLE_PERMISSIONS[session.role] || [];
    return allowed.includes(section);
};
