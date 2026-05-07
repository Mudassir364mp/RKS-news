'use client';
import { useEffect, useState } from 'react';
import { getActivityLogs, getSession } from '@/lib/auth';

export default function ActivityLogPage() {
    const [logs, setLogs] = useState([]);
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(getSession());
        setLogs(getActivityLogs());
    }, []);

    const actionColors = {
        LOGIN: { bg: '#dcfce7', text: '#166534', label: 'Login' },
        LOGOUT: { bg: '#f3f4f6', text: '#374151', label: 'Logout' },
        LOCKED: { bg: '#fee2e2', text: '#991b1b', label: 'Locked' },
        DEFAULT: { bg: '#eff6ff', text: '#1d4ed8', label: 'Action' },
    };

    const getActionStyle = (action) => actionColors[action] || actionColors.DEFAULT;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>Activity Log</h1>
                <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Security audit trail — last 100 events.</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '0.875rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {logs.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                        No activity recorded yet. Activity will appear here as admins use the system.
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                {['Time', 'User / Email', 'Action', 'Detail', 'Browser'].map(h => (
                                    <th key={h} style={{ padding: '0.875rem 1rem', fontWeight: 700, color: '#374151', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, i) => {
                                const style = getActionStyle(log.action);
                                return (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                                        <td style={{ padding: '0.875rem 1rem', color: '#4b5563', whiteSpace: 'nowrap' }}>
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#111827', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {log.userId}
                                        </td>
                                        <td style={{ padding: '0.875rem 1rem' }}>
                                            <span style={{ padding: '0.2rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: style.bg, color: style.text }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.875rem 1rem', color: '#6b7280', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {log.detail || '—'}
                                        </td>
                                        <td style={{ padding: '0.875rem 1rem', color: '#9ca3af', fontSize: '0.75rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {log.userAgent}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
