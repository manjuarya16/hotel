import './styles.css';

type Module = {
  key: string;
  label: string;
  description: string;
  metric: string;
};

const modules: Module[] = [
  { key: 'dashboard', label: 'Dashboard', description: 'Property performance at a glance', metric: 'Overview' },
  { key: 'bookings', label: 'Bookings', description: 'Reservations, arrivals, and departures', metric: '128 active' },
  { key: 'guests', label: 'Guests', description: 'Profiles, preferences, and stay history', metric: '2,841 profiles' },
  { key: 'rooms', label: 'Rooms', description: 'Inventory, rates, and availability', metric: '94.2% occupied' },
  { key: 'housekeeping', label: 'Housekeeping', description: 'Room readiness and daily assignments', metric: '18 tasks' },
  { key: 'maintenance', label: 'Maintenance', description: 'Work orders and property issues', metric: '4 open' },
  { key: 'checkin', label: 'Check-in', description: 'Arrivals and guest registration', metric: '32 arrivals' },
  { key: 'checkout', label: 'Check-out', description: 'Departures and room turnover', metric: '19 departures' },
  { key: 'payments', label: 'Payments', description: 'Transactions, refunds, and settlements', metric: '$18,420 today' },
  { key: 'invoices', label: 'Invoices', description: 'Billing documents and balances', metric: '7 pending' },
  { key: 'expenses', label: 'Expenses', description: 'Operating costs and approvals', metric: '$6,840 this month' },
  { key: 'reports', label: 'Reports', description: 'Operational and financial insights', metric: '12 reports' },
  { key: 'hotels', label: 'Hotels', description: 'Properties and hotel settings', metric: '3 properties' },
  { key: 'branches', label: 'Branches', description: 'Locations and operating teams', metric: '8 branches' },
  { key: 'users', label: 'Users', description: 'Staff accounts and access', metric: '46 team members' },
  { key: 'access-management', label: 'Access management', description: 'Roles, permissions, and policies', metric: '6 roles' },
];

const root = document.querySelector<HTMLDivElement>('#root');

function currentModule(): Module {
  const key = window.location.hash.replace('#/admin/', '') || 'dashboard';
  return modules.find((module) => module.key === key) ?? modules[0];
}

function render(): void {
  if (!root) return;

  const active = currentModule();
  root.innerHTML = `
		<div class="app-shell">
			<aside class="sidebar">
				<a class="brand" href="#/admin/dashboard" aria-label="Go to dashboard">
					<span class="brand-mark">HM</span>
					<span><strong>Harbor</strong><small>Hotel operations</small></span>
				</a>
				<div class="workspace-label">Workspace</div>
				<button class="property-switcher" type="button"><span class="status-dot"></span> Harbor House <span class="chevron">v</span></button>
				<nav class="module-nav" aria-label="Admin modules">
					${modules.map((module) => `<a class="nav-item ${module.key === active.key ? 'is-active' : ''}" href="#/admin/${module.key}"><span class="nav-icon">${module.label.slice(0, 1)}</span>${module.label}</a>`).join('')}
				</nav>
				<div class="sidebar-footer"><a href="#/admin/settings">Settings</a><a href="#/admin/users">Signed in as <strong>Admin</strong></a></div>
			</aside>
			<main class="content">
				<header class="topbar"><div class="breadcrumb">Admin <span>/</span> ${active.label}</div><div class="top-actions"><button class="icon-button" type="button" aria-label="Notifications">!</button><div class="avatar">AK</div></div></header>
				<section class="page-heading"><div><p class="eyebrow">${active.key === 'dashboard' ? 'Wednesday, August 26, 2026' : 'Admin module'}</p><h1>${active.label}</h1><p class="subtitle">${active.description}</p></div><button class="primary-button" type="button">+ New ${active.label === 'Dashboard' ? 'booking' : active.label.slice(0, -1)}</button></section>
				${active.key === 'dashboard' ? dashboardMarkup() : moduleMarkup(active)}
			</main>
		</div>
	`;
}

function dashboardMarkup(): string {
  return `<section class="metrics-grid">
		<article class="metric-card accent-coral"><span>Occupancy rate</span><strong>94.2%</strong><small>+8.4% from last week</small></article>
		<article class="metric-card accent-teal"><span>Today's revenue</span><strong>$18,420</strong><small>+12.8% from yesterday</small></article>
		<article class="metric-card accent-gold"><span>Arrivals today</span><strong>32</strong><small>8 VIP guests</small></article>
		<article class="metric-card accent-ink"><span>Open tasks</span><strong>22</strong><small>4 need attention</small></article>
	</section>
	<section class="dashboard-grid"><article class="panel chart-panel"><div class="panel-heading"><div><p class="eyebrow">Revenue overview</p><h2>Weekly performance</h2></div><button class="quiet-button" type="button">Last 7 days v</button></div><div class="chart"><div class="chart-line"></div><div class="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></article>
		<article class="panel"><div class="panel-heading"><div><p class="eyebrow">Live now</p><h2>Today's flow</h2></div><a class="text-link" href="#/admin/bookings">View all</a></div><div class="flow-list"><div><span class="flow-number">32</span><span><strong>Arrivals</strong><small>12 rooms ready</small></span><b class="pill teal">On track</b></div><div><span class="flow-number">19</span><span><strong>Departures</strong><small>5 rooms to inspect</small></span><b class="pill gold">In progress</b></div><div><span class="flow-number">18</span><span><strong>Housekeeping</strong><small>6 rooms remaining</small></span><b class="pill coral">Attention</b></div></div></article>
	</section>`;
}

function moduleMarkup(module: Module): string {
  return `<section class="module-placeholder"><div class="module-symbol">${module.label.slice(0, 1)}</div><p class="eyebrow">${module.key.replace('-', ' ')}</p><h2>${module.label} workspace</h2><p>The ${module.label.toLowerCase()} module is ready for its tables, forms, and workflows.</p><div class="module-actions"><button class="primary-button" type="button">Create ${module.label.slice(0, -1)}</button><button class="quiet-button" type="button">Import data</button></div></section>`;
}

window.addEventListener('hashchange', render);
render();
