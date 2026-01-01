// src/App.jsx
import React, { useMemo, useState } from 'react';
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

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Shifts', path: '/shifts' },
  { label: 'Patients', path: '/patients' },
  { label: 'Settings', path: '/settings' },
];

const Protected = ({ session }) => {
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const Shell = ({ session, onLogout }) => {
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo-row">
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </div>
        <nav className="nav">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item ${active ? 'nav-item--active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">{session?.user?.name?.[0] ?? 'U'}</div>
            <div>
              <div className="user-name">{session?.user?.name}</div>
              <div className="user-email">{session?.user?.email}</div>
            </div>
          </div>
          <button className="ghost-button" onClick={onLogout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="main">
        <header className="main-header">
          <div>
            <div className="eyebrow">Control room</div>
            <h1 className="page-title">
              {navLinks.find((l) => l.path === location.pathname)?.label ?? 'Home'}
            </h1>
          </div>
          <div className="pill">Live · Secure</div>
        </header>
        <div className="main-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const LoginPage = ({ onLogin, session }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form);
    navigate('/dashboard', { replace: true });
  };

  if (session) return <Navigate to="/dashboard" replace />;

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="logo-row">
          <div className="dot" />
          <span className="brand">RimaCare Hub</span>
        </div>
        <h1 className="page-title">Sign in</h1>
        <p className="subtle">Enter your workspace email to continue.</p>
        <form className="form" onSubmit={handleSubmit}>
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
          </label>
          <label className="label">
            Password
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="primary-button">
            Continue
          </button>
        </form>
        <p className="microcopy">Access is limited to authorized team members.</p>
      </div>
    </div>
  );
};

const CardGrid = ({ children }) => <div className="grid">{children}</div>;
const Card = ({ title, value, hint }) => (
  <div className="card">
    <div className="card-title">{title}</div>
    <div className="card-value">{value}</div>
    {hint && <div className="card-hint">{hint}</div>}
  </div>
);

const DashboardPage = ({ session }) => {
  const { data: currentUser } = useCurrentUser();
  const {
    data: shifts,
    isLoading: shiftsLoading,
    error: shiftsError,
  } = useShifts();
  const {
    data: patients,
    isLoading: patientsLoading,
    error: patientsError,
  } = usePatients();
  const {
    data: transactions,
    isLoading: txLoading,
    error: txError,
  } = useTransactions();
  const {
    data: walletData,
    isLoading: walletLoading,
    error: walletError,
  } = useWallet('agency', 'dev-agency-1');
  const createPaymentSession = useCreatePaymentSession();
  const createPayout = useCreatePayoutRequest('agency', 'dev-agency-1');
  const showPayTest = import.meta.env.VITE_SHOW_PAY_TEST === 'true';
  const simulateCheckout = import.meta.env.VITE_SIMULATE_CHECKOUT === 'true';
  const [payoutAmount, setPayoutAmount] = useState('');

  const wallet = walletData?.wallet;
  const walletSummary = walletData?.summary;
  const walletPayouts = walletData?.payouts ?? [];

  const formatNaira = (minor) => `₦${(minor / 100).toFixed(2)}`;

  const handlePayTest = async () => {
    try {
      const res = await createPaymentSession.mutateAsync({
        amount_minor: 50000,
        sellerType: 'agency',
        sellerId: 'dev-agency-1',
        metadata: {
          email: currentUser?.email ?? session?.user?.email,
        },
      });
      if (res?.authorization_url) {
        if (
          simulateCheckout &&
          typeof res.authorization_url === 'string' &&
          res.authorization_url.includes('paystack.mock')
        ) {
          const ref = res.reference ?? 'test_ref';
          window.location.href = `/payments/success?reference=${encodeURIComponent(ref)}`;
        } else {
          window.location.href = res.authorization_url;
        }
      }
    } catch (e) {
      // minimal UX for dev-only button
      alert('Failed to start payment session');
    }
  };

  const summary = useMemo(
    () => [
      {
        title: 'Active shifts',
        value: shifts ? String(shifts.length) : '—',
        hint: 'Today (mock)',
      },
      {
        title: 'Open requests',
        value: shifts
          ? String(shifts.filter((item) => item.status === 'pending').length)
          : '—',
        hint: 'Pending dispatch',
      },
      {
        title: 'Patients',
        value: patients ? String(patients.length) : '—',
        hint: 'Monitored',
      },
    ],
    [shifts, patients]
  );

  const alerts = [
    'Payout pipeline is in sandbox mode.',
    'Two caregivers have documents expiring this month.',
    'NIBSS verification is queued for 3 new agencies.',
  ];

  if (shiftsLoading || patientsLoading) {
    return (
      <div className="panel">
        <div className="panel-title">Dashboard</div>
        <div className="panel-body">Loading data...</div>
      </div>
    );
  }

  if (shiftsError || patientsError) {
    return (
      <div className="panel">
        <div className="panel-title">Dashboard</div>
        <div className="panel-body">Unable to load data.</div>
      </div>
    );
  }

  return (
    <div className="stack">
      <CardGrid>
        {summary.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </CardGrid>
      <div className="panel">
        <div className="panel-title">Alerts</div>
        <div className="list">
          {alerts.map((item) => (
            <div key={item} className="list-item">
              <span className="dot small" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="panel-title">Session</div>
        <div className="panel-body">
          <div className="badge">
            {currentUser?.email ?? session?.user?.email}
          </div>
          <div className="badge subtle">Role: Admin</div>
          {showPayTest && (
            <div style={{ marginTop: 12 }}>
              <button
                className="primary-button"
                onClick={handlePayTest}
                disabled={createPaymentSession.isPending}
              >
                {createPaymentSession.isPending ? 'Starting…' : 'Pay now (sandbox)'}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="panel">
        <div className="panel-title">Wallet (dev-agency-1)</div>
        <div className="panel-body">
          {walletLoading && <div>Loading wallet...</div>}
          {walletError && <div>Unable to load wallet.</div>}
          {!walletLoading && !walletError && wallet && (
            <>
              <div className="stat-pill">
                <div className="card-title">Balance</div>
                <div className="card-value">{formatNaira(wallet.balanceMinor)}</div>
              </div>
              <div className="stat-pill">
                <div className="card-title">Pending payouts</div>
                <div className="card-value">
                  {formatNaira(walletSummary?.pendingPayoutMinor ?? 0)}
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const amount = Number(payoutAmount);
                    if (!Number.isFinite(amount) || amount <= 0) return;
                    const minor = Math.round(amount * 100);
                    createPayout.mutate({ amountMinor: minor });
                  }}
                >
                  <label className="label">
                    Request payout (NGN)
                    <input
                      className="input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    className="ghost-button"
                    disabled={createPayout.isPending}
                    style={{ marginTop: 8 }}
                  >
                    {createPayout.isPending ? 'Submitting...' : 'Submit payout request'}
                  </button>
                </form>
              </div>
              {walletPayouts.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div className="card-hint">Recent payout requests:</div>
                  <div className="list">
                    {walletPayouts.slice(0, 3).map((p) => (
                      <div key={p.id} className="list-item">
                        <span>{formatNaira(p.amountMinor)}</span>
                        <span className="badge subtle" style={{ marginLeft: 'auto' }}>
                          {p.status}
                        </span>
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
        <div className="panel-body">
          {txLoading && <div>Loading transactions...</div>}
          {txError && <div>Unable to load transactions.</div>}
          {!txLoading && !txError && (
            <div className="list">
              {(transactions?.data ?? []).map((t) => (
                <div key={t.id} className="list-item">
                  <div>
                    <div className="card-title">
                      {formatNaira(t.amountMinor)} {t.currency}
                    </div>
                    <div className="card-hint">
                      Fee: {formatNaira(t.platformFeeMinor)} | Net: {formatNaira(t.netAmountMinor)}
                    </div>
                    <div className="card-hint">
                      {t.reference} | {new Date(t.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="badge subtle">{t.status}</div>
                </div>
              ))}
              {!transactions?.data?.length && <div>No transactions yet.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShiftsPage = () => {
  const { data: shifts, isLoading, error } = useShifts();

  if (isLoading) {
    return (
      <div className="panel">
        <div className="panel-title">Shifts</div>
        <div className="panel-body">Loading shifts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel">
        <div className="panel-title">Shifts</div>
        <div className="panel-body">Unable to load shifts.</div>
      </div>
    );
  }

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
      </div>
    </div>
  );
};

const PatientsPage = () => {
  const { data: patients, isLoading, error } = usePatients();

  if (isLoading) {
    return (
      <div className="panel">
        <div className="panel-title">Patients</div>
        <div className="panel-body">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel">
        <div className="panel-title">Patients</div>
        <div className="panel-body">Unable to load patients.</div>
      </div>
    );
  }

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
      </div>
    </div>
  );
};

const SettingsPage = ({ session, onLogout }) => (
  <div className="stack">
    <div className="panel">
      <div className="panel-title">Workspace</div>
      <div className="panel-body">
        <div className="badge">{session?.user?.name}</div>
        <div className="badge">{session?.user?.email}</div>
        <div className="badge subtle">Region: Nigeria</div>
      </div>
    </div>
    <div className="panel">
      <div className="panel-title">Access</div>
      <div className="panel-body">
        <button className="ghost-button" onClick={onLogout}>
          Log out of this device
        </button>
      </div>
    </div>
  </div>
);

const App = () => {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem('rc-session');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (form) => {
    const next = {
      token: 'dev-token',
      user: {
        name: 'Rima Admin',
        email: form.email,
      },
    };
    localStorage.setItem('rc-session', JSON.stringify(next));
    setSession(next);
  };

  const handleLogout = () => {
    localStorage.removeItem('rc-session');
    setSession(null);
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} session={session} />} />
      <Route element={<Protected session={session} />}>
        <Route element={<Shell session={session} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage session={session} />} />
          <Route path="/shifts" element={<ShiftsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/settings" element={<SettingsPage session={session} onLogout={handleLogout} />} />
          <Route
            path="/payments/success"
            element={
              <div className="panel">
                <div className="panel-title">Payment Success</div>
                <div className="panel-body">Thank you. This is a sandbox success placeholder.</div>
              </div>
            }
          />
          <Route
            path="/payments/failure"
            element={
              <div className="panel">
                <div className="panel-title">Payment Failed</div>
                <div className="panel-body">Please try again. This is a sandbox failure placeholder.</div>
              </div>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={session ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
};

export default App;
