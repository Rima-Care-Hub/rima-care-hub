// src/App.jsx
import React, { useState } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useShifts } from './hooks/useShifts';
import { usePatients } from './hooks/usePatients';
import { useCreatePaymentSession } from './hooks/useCreatePaymentSession';
import { useTransactions } from './hooks/useTransactions';
import { useWallet } from './hooks/useWallet';
import { useCreatePayoutRequest } from './hooks/useCreatePayoutRequest';
import { apiClient } from './lib/apiClient';

// ----- Public layout & pages -----
const PublicHeader = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className="public-header">
      <Link to="/" className="logo-row">
        <div className="dot" />
        <span className="brand">RimaCare Hub</span>
      </Link>
      <button type="button" className="nav-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <nav className={`public-nav ${menuOpen ? 'public-nav--open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/register" className="primary-button nav-cta" onClick={() => setMenuOpen(false)}>Sign up</Link>
      </nav>
    </header>
  );
};

const PublicFooter = () => (
  <footer className="public-footer">
    <div className="public-footer-inner">
      <p className="public-footer-brand">RimaCare Hub</p>
      <p>Connecting care across Nigeria. Quality home care, one platform.</p>
      <p className="public-footer-copy">© {new Date().getFullYear()} RimaCare Hub. All rights reserved.</p>
    </div>
  </footer>
);

const LandingPage = () => (
  <div className="public-layout">
    <PublicHeader />
    <main className="public-main landing-main">
      <section className="hero">
        <p className="hero-badge">Nigeria’s home care platform</p>
        <h1 className="hero-title">Quality home care, connected</h1>
        <p className="hero-lead">
          Connect with vetted agencies and caregivers. Book shifts, manage care, and handle payments
          securely—all in one place.
        </p>
        <div className="hero-ctas">
          <Link to="/register" className="primary-button hero-cta-primary">Get started</Link>
          <a href="#about" className="ghost-button hero-cta-secondary">Learn more</a>
        </div>
      </section>

      <section className="landing-section section-features">
        <h2 className="section-heading">Why RimaCare Hub</h2>
        <p className="section-lead">One platform for scheduling, payments, and payouts.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Shifts & scheduling</h3>
            <p>Manage shifts and assignments in one place. See availability and book care when you need it.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure payments</h3>
            <p>Pay with Paystack. Transparent fees and instant confirmation. Naira only.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Vetted providers</h3>
            <p>Agencies and caregivers on the platform. Build trust with verified profiles.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Wallets & payouts</h3>
            <p>Earn into your wallet. Request payouts when you’re ready. We handle the rest.</p>
          </div>
        </div>
      </section>

      <section className="landing-section section-how">
        <h2 className="section-heading">How it works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <h3>Sign up</h3>
            <p>Register as an agency or a caregiver. Tell us a bit about yourself.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <h3>Get matched</h3>
            <p>Families and clients find you. Accept shifts and manage your schedule.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <h3>Get paid</h3>
            <p>Payments go to your wallet. Request payouts in Naira when you’re ready.</p>
          </div>
        </div>
      </section>

      <section className="landing-section section-who">
        <h2 className="section-heading">Who it’s for</h2>
        <div className="who-grid">
          <div className="who-card">
            <h3>Care agencies</h3>
            <p>Scale your agency. Manage staff, shifts, and payments from one dashboard.</p>
          </div>
          <div className="who-card">
            <h3>Caregivers & nurses</h3>
            <p>Independent carers: reach more clients and get paid on time, every time.</p>
          </div>
          <div className="who-card">
            <h3>Families & clients</h3>
            <p>Find vetted care. Book and pay with confidence. (Coming soon.)</p>
          </div>
        </div>
      </section>

      <section className="landing-section section-cta">
        <h2 className="section-heading cta-heading">Ready to get started?</h2>
        <p className="section-lead">Join RimaCare Hub and connect with Nigeria’s home care community.</p>
        <div className="hero-ctas">
          <Link to="/register" className="primary-button hero-cta-primary">Create account</Link>
          <Link to="/login" className="ghost-button hero-cta-secondary">Sign in</Link>
        </div>
      </section>

      <section id="about" className="landing-section section-about">
        <h2 className="section-heading">About RimaCare Hub</h2>
        <p className="section-lead section-about-lead">
          RimaCare Hub is a digital platform for home care in Nigeria. We connect home care agencies,
          independent nurses and caregivers, and families who need care—so everyone can focus on what matters.
        </p>
        <h3 className="section-about-h3">Our mission</h3>
        <p className="section-about-p">
          To make quality home care accessible and transparent: from booking and scheduling to payments
          and payouts, all in one trusted place.
        </p>
        <h3 className="section-about-h3">Contact</h3>
        <p className="section-about-p">
          For partnerships or support, reach out through the platform after signing in.
        </p>
      </section>
    </main>
    <PublicFooter />
  </div>
);

// ----- Auth -----
const Protected = ({ session }) => {
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const AdminOnly = ({ session }) => {
  if (!session) return <Navigate to="/login" replace />;
  if (session?.user?.role !== 'admin') return <Navigate to="/app/dashboard" replace />;
  return <Outlet />;
};

const UserOnly = ({ session }) => {
  if (!session) return <Navigate to="/login" replace />;
  if (session?.user?.role === 'admin') return <Navigate to="/admin" replace />;
  return <Outlet />;
};

// ----- User app shell (agency / caregiver) -----
const userNavLinks = [
  { label: 'Dashboard', path: '/app/dashboard' },
  { label: 'Shifts', path: '/app/shifts' },
  { label: 'Patients', path: '/app/patients' },
  { label: 'Settings', path: '/app/settings' },
];

const UserShell = ({ session, onLogout }) => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="app-shell">
      <header className="mobile-app-header">
        <Link to="/app/dashboard" className="logo-row">
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </Link>
        <button type="button" className="nav-toggle" aria-label="Menu" onClick={() => setMobileNavOpen((o) => !o)}>
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </header>
      <div className={`sidebar-mobile-overlay ${mobileNavOpen ? 'sidebar-mobile-overlay--open' : ''}`} onClick={() => setMobileNavOpen(false)} aria-hidden="true" />
      <aside className={`sidebar sidebar-desktop ${mobileNavOpen ? 'sidebar-mobile--open' : ''}`}>
        <Link to="/app/dashboard" className="logo-row" onClick={() => setMobileNavOpen(false)}>
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </Link>
        <nav className="nav">
          {userNavLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className={`nav-item ${active ? 'nav-item--active' : ''}`} onClick={() => setMobileNavOpen(false)}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">{session?.user?.name?.[0] ?? session?.user?.username?.[0] ?? 'U'}</div>
            <div>
              <div className="user-name">{session?.user?.name ?? session?.user?.username}</div>
              <div className="user-email">{session?.user?.email}</div>
            </div>
          </div>
          <button className="ghost-button" onClick={onLogout}>Log out</button>
        </div>
      </aside>
      <main className="main">
        <header className="main-header">
          <h1 className="page-title">
            {userNavLinks.find((l) => l.path === location.pathname)?.label ?? 'Dashboard'}
          </h1>
        </header>
        <div className="main-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// ----- Admin app shell -----
const adminNavLinks = [
  { label: 'Overview', path: '/admin' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Settings', path: '/admin/settings' },
];

const AdminShell = ({ session, onLogout }) => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="app-shell">
      <header className="mobile-app-header">
        <Link to="/admin" className="logo-row">
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </Link>
        <button type="button" className="nav-toggle" aria-label="Menu" onClick={() => setMobileNavOpen((o) => !o)}>
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </header>
      <div className={`sidebar-mobile-overlay ${mobileNavOpen ? 'sidebar-mobile-overlay--open' : ''}`} onClick={() => setMobileNavOpen(false)} aria-hidden="true" />
      <aside className={`sidebar sidebar-desktop ${mobileNavOpen ? 'sidebar-mobile--open' : ''}`}>
        <Link to="/admin" className="logo-row" onClick={() => setMobileNavOpen(false)}>
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </Link>
        <div className="eyebrow" style={{ paddingLeft: 4 }}>Admin</div>
        <nav className="nav">
          {adminNavLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className={`nav-item ${active ? 'nav-item--active' : ''}`} onClick={() => setMobileNavOpen(false)}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">{session?.user?.username?.[0] ?? 'A'}</div>
            <div>
              <div className="user-name">Admin</div>
              <div className="user-email">{session?.user?.email}</div>
            </div>
          </div>
          <button className="ghost-button" onClick={onLogout}>Log out</button>
        </div>
      </aside>
      <main className="main">
        <header className="main-header">
          <h1 className="page-title">
            {adminNavLinks.find((l) => l.path === location.pathname)?.label ?? 'Overview'}
          </h1>
        </header>
        <div className="main-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// ----- Login / Register -----
const LoginPage = ({ onLogin, session }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const role = await onLogin(form);
      const target = redirectAfter ?? (role === 'admin' ? '/admin' : '/app/dashboard');
      navigate(target, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const status = err?.status;
      if (status === 401) setError('Invalid email or password.');
      else if (status && status >= 500) setError('Service unavailable. Please try again later.');
      else setError(`Unable to sign in. Please check your details and try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (session) {
    const to = session.user?.role === 'admin' ? '/admin' : '/app/dashboard';
    return <Navigate to={to} replace />;
  }

  return (
    <div className="auth-shell">
      <Link to="/" className="auth-back-link">← Back to home</Link>
      <div className="auth-card">
        <div className="logo-row">
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </div>
        <h1 className="page-title">Sign in</h1>
        <p className="subtle">Enter your email or username to continue.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Email or username
            <input className="input" type="text" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required placeholder="email or username" />
          </label>
          <label className="label">
            Password
            <input className="input" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required placeholder="••••••••" />
          </label>
          {error && <div className="error-message" style={{ marginTop: 8 }}>{error}</div>}
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Continue'}
          </button>
        </form>
        <p className="microcopy">
          Don't have an account? <Link to="/register" style={{ color: 'inherit', textDecoration: 'underline' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const RegisterPage = ({ onRegister, session }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: 'caregiver',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await onRegister({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        role: form.role,
        password: form.password,
      });
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      const status = err?.status;
      if (status === 400) setError('Invalid registration data. Please check all fields.');
      else if (status === 409) setError('Username or email already exists.');
      else if (status && status >= 500) setError('Service unavailable. Please try again later.');
      else setError('Unable to create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (session) return <Navigate to={session.user?.role === 'admin' ? '/admin' : '/app/dashboard'} replace />;

  return (
    <div className="auth-shell">
      <Link to="/" className="auth-back-link">← Back to home</Link>
      <div className="auth-card auth-card--register">
        <div className="logo-row">
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </div>
        <h1 className="page-title">Create account</h1>
        <p className="subtle">Join RimaCare Hub as a caregiver or agency.</p>
        <form className="form form--register" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="label">
              First name
              <input
                className="input"
                type="text"
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                required
                placeholder="John"
              />
              {errors.firstName && <div className="error-message" style={{ marginTop: 4, fontSize: '0.875rem' }}>{errors.firstName}</div>}
            </label>
            <label className="label">
              Last name
              <input
                className="input"
                type="text"
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                required
                placeholder="Doe"
              />
              {errors.lastName && <div className="error-message" style={{ marginTop: 4, fontSize: '0.875rem' }}>{errors.lastName}</div>}
            </label>
          </div>
          <div className="form-row">
            <label className="label">
              Username
              <input
                className="input"
                type="text"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
                placeholder="johndoe"
              />
              {errors.username && <div className="error-message" style={{ marginTop: 4, fontSize: '0.875rem' }}>{errors.username}</div>}
            </label>
            <label className="label">
              Email
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                placeholder="you@example.com"
              />
              {errors.email && <div className="error-message" style={{ marginTop: 4, fontSize: '0.875rem' }}>{errors.email}</div>}
            </label>
          </div>
          <label className="label">
            I am signing up as
            <select
              className="input"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            >
              <option value="caregiver">Caregiver (nurse / independent carer)</option>
              <option value="agency">Agency (care agency)</option>
            </select>
          </label>
          <div className="form-row">
            <label className="label">
              Password
              <input className="input" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required placeholder="••••••••" />
              {errors.password && <div className="error-message" style={{ marginTop: 4, fontSize: '0.875rem' }}>{errors.password}</div>}
            </label>
            <label className="label">
              Confirm Password
              <input className="input" type="password" value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} required placeholder="••••••••" />
              {errors.confirmPassword && <div className="error-message" style={{ marginTop: 4, fontSize: '0.875rem' }}>{errors.confirmPassword}</div>}
            </label>
          </div>
          {error && <div className="error-message" style={{ marginTop: 8 }}>{error}</div>}
          <button type="submit" className="primary-button" disabled={submitting}>{submitting ? 'Creating account…' : 'Create account'}</button>
        </form>
        <p className="microcopy">Already have an account? <Link to="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>Sign in</Link></p>
      </div>
    </div>
  );
};

// ----- User dashboard (agency/caregiver) -----
const CardGrid = ({ children }) => <div className="grid">{children}</div>;

const DashboardCard = ({ title, value, hint, to }) => {
  const content = (
    <>
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      {hint && <div className="card-hint">{hint}</div>}
      {to && <span className="card-link">View →</span>}
    </>
  );
  if (to) {
    return (
      <Link to={to} className="card card--link">
        {content}
      </Link>
    );
  }
  return <div className="card">{content}</div>;
};

const UserDashboardPage = ({ session }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: shifts, isLoading: shiftsLoading } = useShifts();
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const role = session?.user?.role ?? currentUser?.role;
  const ownerType = role === 'agency' ? 'agency' : 'caregiver';
  const ownerId = String(session?.user?.userId ?? currentUser?.userId ?? '');
  const { data: walletData, isLoading: walletLoading, error: walletError } = useWallet(ownerType, ownerId);
  const { data: transactions, isLoading: txLoading, error: txError } = useTransactions();
  const createPayout = useCreatePayoutRequest(ownerType, ownerId);
  const [payoutAmount, setPayoutAmount] = useState('');

  const wallet = walletData?.wallet;
  const walletSummary = walletData?.summary;
  const walletPayouts = walletData?.payouts ?? [];
  const formatNaira = (minor) => `₦${(minor / 100).toFixed(2)}`;

  const shiftCount = shiftsLoading ? '—' : String((shifts ?? []).length);
  const patientCount = patientsLoading ? '—' : String((patients ?? []).length);

  return (
    <div className="stack">
      <div className="dashboard-welcome">
        <h2 className="dashboard-welcome-title">Welcome to RimaCare Hub</h2>
        <p className="dashboard-welcome-lead">Your home care dashboard — manage shifts, patients, and payments in one place.</p>
        <div className="dashboard-quick-actions">
          <Link to="/app/shifts" className="ghost-button dashboard-quick-btn">Shifts</Link>
          <Link to="/app/patients" className="ghost-button dashboard-quick-btn">Patients</Link>
          <Link to="/app/settings" className="ghost-button dashboard-quick-btn">Settings</Link>
        </div>
      </div>
      <CardGrid>
        <DashboardCard
          title="Shifts"
          value={shiftCount}
          hint={(shifts ?? []).length ? 'Assigned to you' : 'No shifts yet'}
          to="/app/shifts"
        />
        <DashboardCard
          title="Patients"
          value={patientCount}
          hint={(patients ?? []).length ? 'Under your care' : 'None assigned'}
          to="/app/patients"
        />
      </CardGrid>
      <div className="panel">
        <div className="panel-title">Your wallet</div>
        <div className="panel-body">
          {walletLoading && <div>Loading wallet...</div>}
          {walletError && (walletError.status === 404 || walletError.status === 503 ? <div className="card-hint">Wallet will be available once you complete setup.</div> : <div>Unable to load wallet.</div>)}
          {!walletLoading && !walletError && wallet && (
            <>
              <div className="stat-pill">
                <div className="card-title">Balance</div>
                <div className="card-value">{formatNaira(wallet.balanceMinor)}</div>
              </div>
              <div className="stat-pill">
                <div className="card-title">Pending payouts</div>
                <div className="card-value">{formatNaira(walletSummary?.pendingPayoutMinor ?? 0)}</div>
              </div>
              {wallet.balanceMinor > 0 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const amount = Number(payoutAmount);
                    if (!Number.isFinite(amount) || amount <= 0) return;
                    createPayout.mutate({ amountMinor: Math.round(amount * 100) });
                  }}
                  style={{ marginTop: 12 }}
                >
                  <label className="label">Request payout (NGN)</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <input className="input" type="number" min="0" step="0.01" value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} style={{ maxWidth: 140 }} />
                    <button type="submit" className="ghost-button" disabled={createPayout.isPending}>{createPayout.isPending ? 'Submitting...' : 'Submit request'}</button>
                  </div>
                </form>
              )}
              {walletPayouts.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div className="card-hint">Recent payout requests</div>
                  <div className="list">
                    {walletPayouts.slice(0, 3).map((p) => (
                      <div key={p.id} className="list-item">
                        <span>{formatNaira(p.amountMinor)}</span>
                        <span className="badge subtle">{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="panel">
        <div className="panel-title">Recent transactions</div>
        <p className="card-hint" style={{ marginBottom: 8 }}>Payments from care bookings appear here.</p>
        <div className="panel-body">
          {txLoading && <div>Loading...</div>}
          {txError && (txError.status === 404 || txError.status === 503 ? <div className="card-hint">Transactions will appear here once you receive payments.</div> : <div>Unable to load.</div>)}
          {!txLoading && !txError && (
            <div className="list">
              {(transactions?.data ?? []).map((t) => (
                <div key={t.id} className="list-item">
                  <div>
                    <div className="card-title">{formatNaira(t.amountMinor)} {t.currency}</div>
                    <div className="card-hint">Fee: {formatNaira(t.platformFeeMinor)} · Net: {formatNaira(t.netAmountMinor)} · {new Date(t.createdAt).toLocaleString()}</div>
                  </div>
                  <span className="badge subtle">{t.status}</span>
                </div>
              ))}
              {!transactions?.data?.length && <div className="card-hint">No transactions yet.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShiftsPage = () => {
  const { data: shifts, isLoading, error } = useShifts();
  if (isLoading) return <div className="panel"><div className="panel-title">Shifts</div><div className="panel-body">Loading...</div></div>;
  if (error) return <div className="panel"><div className="panel-title">Shifts</div><div className="panel-body">Unable to load shifts.</div></div>;
  return (
    <div className="panel">
      <div className="panel-title">Shifts</div>
      <div className="list">
        {(shifts ?? []).map((item) => (
          <div key={item.id} className="list-item">
            <div>
              <div className="card-title">{item.title}</div>
              <div className="card-hint">{item.detail}</div>
            </div>
            <button className="ghost-button">Open</button>
          </div>
        ))}
        {!shifts?.length && <div className="card-hint">No shifts yet.</div>}
      </div>
    </div>
  );
};

const PatientsPage = () => {
  const { data: patients, isLoading, error } = usePatients();
  if (isLoading) return <div className="panel"><div className="panel-title">Patients</div><div className="panel-body">Loading...</div></div>;
  if (error) return <div className="panel"><div className="panel-title">Patients</div><div className="panel-body">Unable to load patients.</div></div>;
  return (
    <div className="panel">
      <div className="panel-title">Patients</div>
      <div className="list">
        {(patients ?? []).map((item) => (
          <div key={item.id} className="list-item">
            <div>
              <div className="card-title">{item.name}</div>
              <div className="card-hint">{item.status}</div>
            </div>
            <div className="badge subtle">Monitored</div>
          </div>
        ))}
        {!patients?.length && <div className="card-hint">No patients yet.</div>}
      </div>
    </div>
  );
};

const UserSettingsPage = ({ session, onLogout }) => (
  <div className="stack">
    <div className="panel">
      <div className="panel-title">Workspace</div>
      <div className="panel-body">
        <div className="badge">{session?.user?.name ?? session?.user?.username}</div>
        <div className="badge">{session?.user?.email}</div>
        <div className="badge subtle">Region: Nigeria</div>
      </div>
    </div>
    <div className="panel">
      <div className="panel-title">Access</div>
      <div className="panel-body">
        <button className="ghost-button" onClick={onLogout}>Log out</button>
      </div>
    </div>
  </div>
);

// ----- Admin pages -----
const AdminOverviewPage = ({ session }) => {
  const showPayTest = import.meta.env.VITE_SHOW_PAY_TEST === 'true';
  const createPaymentSession = useCreatePaymentSession();
  const { data: currentUser } = useCurrentUser();
  const handlePayTest = async () => {
    try {
      const res = await createPaymentSession.mutateAsync({
        amount_minor: 50000,
        sellerType: 'agency',
        sellerId: 'dev-agency-1',
        metadata: { email: currentUser?.email ?? session?.user?.email },
      });
      if (res?.authorization_url) window.location.href = res.authorization_url;
    } catch (e) {
      console.error(e);
      alert(`Failed: ${e.message}`);
    }
  };
  return (
    <div className="stack">
      <div className="panel">
        <div className="panel-title">Admin overview</div>
        <div className="panel-body">
          <p className="card-hint">Manage users, view platform activity, and handle payouts from the sidebar.</p>
          {showPayTest && (
            <button className="primary-button" onClick={handlePayTest} disabled={createPaymentSession.isPending} style={{ marginTop: 12 }}>
              {createPaymentSession.isPending ? 'Starting…' : 'Test payment (sandbox)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  React.useEffect(() => {
    apiClient('/users')
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((e) => setErr(e))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="panel"><div className="panel-title">Users</div><div className="panel-body">Loading...</div></div>;
  if (err) return <div className="panel"><div className="panel-title">Users</div><div className="panel-body">Unable to load users.</div></div>;
  return (
    <div className="panel">
      <div className="panel-title">Users</div>
      <div className="list">
        {users.map((u) => (
          <div key={u.id} className="list-item">
            <div>
              <div className="card-title">{u.firstName} {u.lastName}</div>
              <div className="card-hint">{u.email} · {u.username} · {u.role}</div>
            </div>
            <span className="badge subtle">{u.role}</span>
          </div>
        ))}
        {!users.length && <div className="card-hint">No users.</div>}
      </div>
    </div>
  );
};

const AdminSettingsPage = ({ session, onLogout }) => (
  <div className="stack">
    <div className="panel">
      <div className="panel-title">Admin account</div>
      <div className="panel-body">
        <div className="badge">{session?.user?.username}</div>
        <div className="badge">{session?.user?.email}</div>
      </div>
    </div>
    <div className="panel">
      <div className="panel-title">Access</div>
      <div className="panel-body">
        <button className="ghost-button" onClick={onLogout}>Log out</button>
      </div>
    </div>
  </div>
);

// ----- App & routing -----
const App = () => {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem('rc-session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = async (form) => {
    const result = await apiClient('/auth/login', {
      method: 'POST',
      body: { username: form.email, password: form.password },
      skipAuthRedirect: true,
    });
    const token = result?.access_token;
    if (!token) {
      const error = new Error('Login did not return a token');
      error.status = 500;
      throw error;
    }
    const next = { token, user: { name: form.email, email: form.email } };
    localStorage.setItem('rc-session', JSON.stringify(next));
    setSession(next);
    try {
      const profile = await apiClient('/auth/profile');
      const merged = { token, user: { ...next.user, ...profile } };
      localStorage.setItem('rc-session', JSON.stringify(merged));
      setSession(merged);
      return merged.user.role;
    } catch {
      return null;
    }
  };

  const handleRegister = async (form) => {
    const result = await apiClient('/users', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        role: form.role || 'caregiver',
        password: form.password,
      },
      skipAuthRedirect: true,
    });
    if (!result) {
      const error = new Error('Registration did not return a user');
      error.status = 500;
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rc-session');
    setSession(null);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<Navigate to="/#about" replace />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} session={session} />} />
      <Route path="/register" element={<RegisterPage onRegister={handleRegister} session={session} />} />

      <Route element={<UserOnly session={session} />}>
        <Route element={<UserShell session={session} onLogout={handleLogout} />}>
          <Route path="/app/dashboard" element={<UserDashboardPage session={session} />} />
          <Route path="/app/shifts" element={<ShiftsPage />} />
          <Route path="/app/patients" element={<PatientsPage />} />
          <Route path="/app/settings" element={<UserSettingsPage session={session} onLogout={handleLogout} />} />
          <Route path="/app/payments/success" element={<div className="panel"><div className="panel-title">Payment success</div><div className="panel-body">Thank you.</div></div>} />
          <Route path="/app/payments/failure" element={<div className="panel"><div className="panel-title">Payment failed</div><div className="panel-body">Please try again.</div></div>} />
        </Route>
      </Route>

      <Route element={<AdminOnly session={session} />}>
        <Route element={<AdminShell session={session} onLogout={handleLogout} />}>
          <Route path="/admin" element={<AdminOverviewPage session={session} />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage session={session} onLogout={handleLogout} />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={session ? (session.user?.role === 'admin' ? '/admin' : '/app/dashboard') : '/'} replace />} />
    </Routes>
  );
};

export default App;
