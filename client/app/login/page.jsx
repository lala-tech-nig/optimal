'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('optimal_token', data.token);
        localStorage.setItem('optimal_admin', JSON.stringify(data.admin));
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid credentials');
        setStatus(null);
      }
    } catch {
      setError('Connection error. Please ensure the server is running.');
      setStatus(null);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--wine-deep) 0%, var(--wine) 60%, var(--wine-dark) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.07) 1px, transparent 0)',
        backgroundSize: '44px 44px', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '-15%', right: '-10%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16,
        padding: '3rem', width: '100%', maxWidth: 420, position: 'relative', zIndex: 2
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontWeight: 900, color: 'var(--wine-deep)',
            fontFamily: 'Playfair Display, serif',
            boxShadow: '0 8px 30px rgba(201,168,76,0.4)'
          }}>O</div>
          <h1 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.25rem' }}>Admin Portal</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>Optimal Management Consultancy</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', display: 'block', marginBottom: '0.4rem' }}>Email Address</label>
            <input
              className="form-input"
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="admin@optimal.com"
              required
              id="admin-email"
            />
          </div>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', display: 'block', marginBottom: '0.4rem' }}>Password</label>
            <input
              className="form-input"
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              required
              id="admin-password"
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)',
              borderRadius: 6, padding: '0.75rem 1rem', color: '#ff6b6b', fontSize: '0.85rem'
            }}>⚠️ {error}</div>
          )}

          <button type="submit" className="btn-gold" disabled={status === 'loading'}
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
            id="admin-login-btn">
            {status === 'loading' ? '⏳ Signing in...' : '🔐 Sign In to Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginTop: '2rem' }}>
          Default: admin@optimal.com / password123
        </p>

        <a href="/" style={{
          display: 'block', textAlign: 'center', marginTop: '1.5rem',
          color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s'
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
        >← Back to Website</a>
      </div>
    </div>
  );
}
