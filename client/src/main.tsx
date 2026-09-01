import './styles.css';

type RouteKey =
	| 'dashboard'
	| 'hotels'
	| 'transaction'
	| 'room-book'
	| 'booking-list'
	| 'check-out'
	| 'room-status'
	| 'room-facilities'
	| 'facilities-list'
	| 'facilities-details'
	| 'room-size'
	| 'housekeeping'
	| 'assign-room'
	| 'checkins'
	| 'checkouts'
	| 'maintenance'
	| 'reports';

type NavItem = {
	key: RouteKey;
	label: string;
	section: string;
	isGroup?: boolean;
	parentKey?: RouteKey;
};

const navItems: NavItem[] = [
	{ key: 'dashboard', label: 'Dashboard', section: 'Universal' },
	{ key: 'hotels', label: 'Hotels', section: 'Universal' },
	{ key: 'transaction', label: 'Transaction', section: 'Universal' },
	{ key: 'room-book', label: 'Room Book', section: 'Room Book', isGroup: true },
	{ key: 'booking-list', label: 'Booking List', section: 'Room Book', parentKey: 'room-book' },
	{ key: 'check-out', label: 'Room Checkout', section: 'Room Book', parentKey: 'room-book' },
	{ key: 'room-status', label: 'Room Status', section: 'Room Book', parentKey: 'room-book' },
	{ key: 'room-facilities', label: 'Room Facilities', section: 'Room Facilities', isGroup: true },
	{ key: 'facilities-list', label: 'Facilities List', section: 'Room Facilities', parentKey: 'room-facilities' },
	{ key: 'facilities-details', label: 'Facilities Details', section: 'Room Facilities', parentKey: 'room-facilities' },
	{ key: 'room-size', label: 'Room Size', section: 'Room Facilities', parentKey: 'room-facilities' },
	{ key: 'housekeeping', label: 'Housekeeping', section: 'Housekeeping', isGroup: true },
	{ key: 'assign-room', label: 'Assign Room', section: 'Housekeeping', parentKey: 'housekeeping' },
	{ key: 'checkins', label: 'Check-ins', section: 'Operations' },
	{ key: 'checkouts', label: 'Check-outs', section: 'Operations' },
	{ key: 'maintenance', label: 'Maintenance', section: 'Operations' },
	{ key: 'reports', label: 'Reports', section: 'Operations' },
];

const root = document.querySelector<HTMLDivElement>('#root');
const sessionKey = 'harbor-session';

const API_BASE = 'http://localhost:5000/api';

// API Functions
async function fetchAPI(endpoint: string, options?: RequestInit) {
	try {
		const response = await fetch(`${API_BASE}${endpoint}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...options,
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('API call failed:', error);
		throw error;
	}
}

// Booking API Functions
async function getBookings(limit = 10, offset = 0) {
	return fetchAPI(`/bookings?limit=${limit}&offset=${offset}`);
}

async function getBooking(id: string) {
	return fetchAPI(`/bookings/${id}`);
}

async function createBooking(booking: any) {
	return fetchAPI('/bookings', {
		method: 'POST',
		body: JSON.stringify(booking),
	});
}

async function updateBooking(id: string, booking: any) {
	return fetchAPI(`/bookings/${id}`, {
		method: 'PUT',
		body: JSON.stringify(booking),
	});
}

async function deleteBooking(id: string) {
	return fetchAPI(`/bookings/${id}`, {
		method: 'DELETE',
	});
}

// Room API Functions
async function getRooms() {
	return fetchAPI('/rooms');
}

async function updateRoom(id: string, room: any) {
	return fetchAPI(`/rooms/${id}`, {
		method: 'PUT',
		body: JSON.stringify(room),
	});
}

// Facility API Functions
async function getFacilities() {
	return fetchAPI('/facilities');
}

async function createFacility(facility: any) {
	return fetchAPI('/facilities', {
		method: 'POST',
		body: JSON.stringify(facility),
	});
}

async function updateFacility(id: string, facility: any) {
	return fetchAPI(`/facilities/${id}`, {
		method: 'PUT',
		body: JSON.stringify(facility),
	});
}

async function deleteFacility(id: string) {
	return fetchAPI(`/facilities/${id}`, {
		method: 'DELETE',
	});
}

// Check-in API Functions
async function getCheckins() {
	return fetchAPI('/checkins');
}

async function createCheckin(checkin: any) {
	return fetchAPI('/checkins', {
		method: 'POST',
		body: JSON.stringify(checkin),
	});
}

async function updateCheckin(id: string, checkin: any) {
	return fetchAPI(`/checkins/${id}`, {
		method: 'PUT',
		body: JSON.stringify(checkin),
	});
}

async function deleteCheckin(id: string) {
	return fetchAPI(`/checkins/${id}`, {
		method: 'DELETE',
	});
}

// Check-out API Functions
async function getCheckouts() {
	return fetchAPI('/checkouts');
}

async function createCheckout(checkout: any) {
	return fetchAPI('/checkouts', {
		method: 'POST',
		body: JSON.stringify(checkout),
	});
}

async function updateCheckout(id: string, checkout: any) {
	return fetchAPI(`/checkouts/${id}`, {
		method: 'PUT',
		body: JSON.stringify(checkout),
	});
}

async function deleteCheckout(id: string) {
	return fetchAPI(`/checkouts/${id}`, {
		method: 'DELETE',
	});
}

// Maintenance API Functions
async function getMaintenances() {
	return fetchAPI('/maintenance');
}

async function createMaintenance(maintenance: any) {
	return fetchAPI('/maintenance', {
		method: 'POST',
		body: JSON.stringify(maintenance),
	});
}

async function updateMaintenance(id: string, maintenance: any) {
	return fetchAPI(`/maintenance/${id}`, {
		method: 'PUT',
		body: JSON.stringify(maintenance),
	});
}

async function deleteMaintenance(id: string) {
	return fetchAPI(`/maintenance/${id}`, {
		method: 'DELETE',
	});
}

// Reports API Functions
async function getReportsSummary() {
	return fetchAPI('/reports/dashboard');
}

async function getOccupancyReport() {
	return fetchAPI('/reports/occupancy');
}

async function getRevenueReport() {
	return fetchAPI('/reports/revenue');
}

function isSignedIn(): boolean {
	return window.localStorage.getItem(sessionKey) === 'active';
}

function currentRoute(): RouteKey {
	const key = window.location.hash.replace('#/admin/', '') as RouteKey;
	return navItems.some((item) => item.key === key) ? key : 'dashboard';
}

function appShell(activeKey: RouteKey): string {
	const activeItem = navItems.find((item) => item.key === activeKey) ?? navItems[1];
	const tyre = activeKey === 'hotels' ? 'Hotels' : activeKey === 'transaction' ? 'Transaction' : activeKey === 'room-book' ? 'Room Book' : activeKey === 'booking-list' ? 'Room Booking List' : activeKey === 'check-out' ? 'Check Out' : activeKey === 'checkins' ? 'Check-ins' : activeKey === 'checkouts' ? 'Check-outs' : activeKey === 'maintenance' ? 'Maintenance' : activeKey === 'reports' ? 'Reports & Analytics' : activeItem.label;

	return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="user-profile">
          <div class="avatar-lg">A</div>
          <div>
            <div class="user-name">Anny glover</div>
            <div class="user-role">Super Admin</div>
          </div>
        </div>

        <div class="sidebar-tabs">
          <button class="tab-title is-selected" type="button">HOTELS</button>
          <button class="tab-title" type="button">HRMS</button>
          <button class="tab-title" type="button">TUNING</button>
        </div>

        <div class="sidebar-nav">
          ${sidebarGroupsMarkup(activeKey)}
        </div>
      </aside>

      <main class="main-panel">
        <header class="topbar">
          <div class="brand-header">
            <div class="brand-mark-mini">H</div>
            <div class="brand-name">HotelAir</div>
          </div>

          <div class="topbar-search-wrap">
            <span class="search-ico">⌕</span>
            <input type="search" placeholder="Search..." aria-label="Search" />
          </div>

          <div class="topbar-actions">
            <button class="header-icon" type="button">◔</button>
            <button class="header-icon" type="button">◌</button>
            <button class="header-icon" type="button">⚙</button>
            <div class="avatar-chip">M</div>
          </div>
        </header>

        <div class="workspace-wrap">
          <div class="workspace-header">
            <div class="breadcrumb">Home <span>/</span> ${tyre}</div>
            <div class="workspace-actions">
              <button class="mini-square" type="button">＋</button>
              <button class="mini-square" type="button">⌂</button>
            </div>
          </div>

          <div class="page-title-row">
            <h1>${tyre}</h1>
            ${activeKey === 'dashboard' ? '' : ''}
            ${activeKey === 'room-book' || activeKey === 'room-status' || activeKey === 'check-out' ? '<button class="primary-action" type="button">New Booking</button>' : ''}
            ${activeKey === 'booking-list' ? '<button class="primary-action" type="button">Book Now</button>' : ''}
            ${activeKey === 'hotels' ? '<button class="primary-action" type="button">New Hotel</button>' : ''}
          </div>

          ${pageContent(activeKey)}
        </div>
      </main>
    </div>
  `;
}

function sidebarGroupsMarkup(activeKey: RouteKey): string {
	const viewMap = [
		{ label: 'Universal', items: ['dashboard', 'hotels', 'transaction'] },
		{ label: 'Room Book', items: ['room-book', 'booking-list', 'check-out', 'room-status'] },
		{ label: 'Room Facilities', items: ['room-facilities', 'facilities-list', 'facilities-details', 'room-size'] },
		{ label: 'Housekeeping', items: ['housekeeping', 'assign-room'] },
		{ label: 'Operations', items: ['checkins', 'checkouts', 'maintenance', 'reports'] },
	];

	return viewMap
		.map((group) => {
			const groupItems = group.items
				.map((key) => {
					const item = navItems.find((entry) => entry.key === key)!;
					const isActive = key === activeKey;
					const isGroupHeader = item.isGroup || key === 'room-book' || key === 'room-facilities' || key === 'housekeeping';
					return `
            <a class="nav-link ${isActive ? 'active' : ''} ${isGroupHeader ? 'group-header' : ''}" href="#/admin/${key}">
              ${item.label}
            </a>
          `;
				})
				.join('');

			return `
        <div class="nav-section">
          <div class="section-label">${group.label}</div>
          ${groupItems}
        </div>
      `;
		})
		.join('');
}

function pageContent(key: RouteKey): string {
	const contentMap: Record<RouteKey, string> = {
		dashboard: dashboardPageMarkup(),
		hotels: hotelsPageMarkup(),
		transaction: transactionPageMarkup(),
		'room-book': roomBookPageMarkup(),
		'booking-list': bookingListPageMarkup(),
		'check-out': checkOutPageMarkup(),
		'room-status': roomStatusPageMarkup(),
		'room-facilities': roomFacilitiesPageMarkup(),
		'facilities-list': facilitiesListPageMarkup(),
		'facilities-details': facilitiesDetailsPageMarkup(),
		'room-size': roomSizePageMarkup(),
		housekeeping: housekeepingPageMarkup(),
		'assign-room': assignRoomPageMarkup(),
		checkins: checkinsPageMarkup(),
		checkouts: checkoutsPageMarkup(),
		maintenance: maintenancePageMarkup(),
		reports: reportsPageMarkup(),
	};

	return contentMap[key] ?? hotelsPageMarkup();
}

function dashboardPageMarkup(): string {
	return `
    <section class="dashboard-grid">
      <div class="kpi-cards">
        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Today Booking</h3>
            <div class="kpi-trend positive">+11%</div>
          </div>
          <div class="kpi-value">1,587</div>
          <div class="kpi-subtitle">From previous period</div>
        </article>

        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Amount</h3>
            <div class="kpi-trend positive">+05%</div>
          </div>
          <div class="kpi-value">$2,258</div>
          <div class="kpi-subtitle">New income</div>
        </article>

        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Customer</h3>
            <div class="kpi-trend positive">+11%</div>
          </div>
          <div class="kpi-value">2.3k</div>
          <div class="kpi-subtitle">From previous period</div>
        </article>

        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Revenue</h3>
            <div class="kpi-trend positive">+21%</div>
          </div>
          <div class="kpi-value">11,558</div>
          <div class="kpi-subtitle">From previous period</div>
        </article>
      </div>

      <div class="dashboard-charts">
        <article class="chart-card">
          <div class="chart-header">
            <h3>Reservations</h3>
            <div class="chart-controls">
              <button type="button" class="status-filter">Booking Confirmed</button>
              <button type="button" class="status-filter">Booking Completed</button>
              <button type="button" class="status-filter">Booking Canceled</button>
            </div>
          </div>
          <div class="chart-placeholder">📊 Chart visualization area</div>
        </article>

        <article class="recent-bookings">
          <div class="chart-header">
            <h3>Recent Bookings</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Anderson</td>
                <td>Deluxe Suite</td>
                <td>2026-09-05</td>
                <td><span class="status-pill success">Confirmed</span></td>
              </tr>
              <tr>
                <td>Sarah Mitchell</td>
                <td>Standard Room</td>
                <td>2026-09-06</td>
                <td><span class="status-pill pending">Pending</span></td>
              </tr>
              <tr>
                <td>Michael Brown</td>
                <td>Executive Suite</td>
                <td>2026-09-07</td>
                <td><span class="status-pill success">Confirmed</span></td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </section>
  `;
}

function hotelsPageMarkup(): string {
	return `
    <section class="hotels-grid">
      <article class="hotel-card" onclick="window.location.hash='#/admin/room-book'"><div class="mini-icon">📅</div><h3>Room Book</h3><p>Manage room bookings</p></article>
      <article class="hotel-card" onclick="window.location.hash='#/admin/booking-list'"><div class="mini-icon">📋</div><h3>Room List</h3><p>View all bookings</p></article>
      <article class="hotel-card accent-card"><div class="mini-icon">🔄</div><h3>Room Status</h3><p>Room availability</p></article>
      <article class="hotel-card"><div class="mini-icon">🖼️</div><h3>Room Image</h3><p>Room photos</p></article>
      <article class="hotel-card"><div class="mini-icon">✨</div><h3>Room Facilities</h3><p>Facility management</p></article>
      <article class="hotel-card"><div class="mini-icon">🧹</div><h3>Housekeeping</h3><p>Cleaning schedule</p></article>
      <article class="hotel-card"><div class="mini-icon">🚕</div><h3>Cab Booking</h3><p>Transport arrange</p></article>
      <article class="hotel-card"><div class="mini-icon">📑</div><h3>Cab List</h3><p>All bookings</p></article>
      <article class="hotel-card"><div class="mini-icon">📦</div><h3>Items Manage</h3><p>Inventory control</p></article>
      <article class="hotel-card"><div class="mini-icon">⭐</div><h3>Personalized</h3><p>Guest preferences</p></article>
      <article class="hotel-card"><div class="mini-icon">🎟️</div><h3>Promo Code</h3><p>Discount manage</p></article>
      <article class="hotel-card"><div class="mini-icon">📊</div><h3>Booking Report</h3><p>Analytics & trends</p></article>
      <article class="hotel-card"><div class="mini-icon">💰</div><h3>Purchase Report</h3><p>Spending summary</p></article>
      <article class="hotel-card"><div class="mini-icon">📦</div><h3>Stock Report</h3><p>Inventory status</p></article>
    </section>
  `;
}

function transactionPageMarkup(): string {
	return `
    <section class="transaction-overview">
      <div class="summary-cards">
        <article class="summary-card"><div class="summary-icon">◫</div><div class="summary-body"><h4>Bill</h4><strong>$2,500.00</strong></div><div class="sparkline spark-purple"></div></article>
        <article class="summary-card"><div class="summary-icon">◫</div><div class="summary-body"><h4>Food</h4><strong>$22,300.00</strong></div><div class="sparkline spark-violet"></div></article>
        <article class="summary-card"><div class="summary-icon">◫</div><div class="summary-body"><h4>Utility</h4><strong>$730.00</strong></div><div class="sparkline spark-pink"></div></article>
        <article class="summary-card"><div class="summary-icon">◫</div><div class="summary-body"><h4>Shopping</h4><strong>$5,500.00</strong></div><div class="sparkline spark-rose"></div></article>
      </div>

      <div class="transaction-panel">
        <div class="week-strip">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
        </div>
        <div class="strip-dates">
          <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span><span>08</span><span>09</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
        </div>

        <div class="table-controls">
          <div class="entries-box">Show <span>10</span> entries</div>
          <div class="search-box">Search: <input type="text" /></div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Product Description</th>
              <th>Status</th>
              <th>Price</th>
              <th>Order No.</th>
              <th>Order Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Gas Bill Payment</td><td>Your order is successful</td><td>$500.00</td><td>B-123123</td><td>$500.00</td><td><span class="action-icons">✉</span><span class="action-icons">◌</span></td></tr>
            <tr><td>Electricity Bill</td><td>Successful</td><td>$1000.00</td><td>M-123123</td><td>$1000.00</td><td><span class="action-icons">✉</span><span class="action-icons">◌</span></td></tr>
            <tr><td>Water Bill</td><td>Successful</td><td>$250.00</td><td>P-123123</td><td>$250.00</td><td><span class="action-icons">✉</span><span class="action-icons">◌</span></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function roomBookPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table table-room-book">
        <thead>
          <tr>
            <th>Name</th>
            <th>Room Type</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Paid Amount</th>
            <th>Due Amount</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Frank Baker</td><td>Single</td><td>12/03/2024</td><td>13/03/2024</td><td>$0.00</td><td>$230</td><td><span class="status-pill pending">Pending</span></td></tr>
          <tr><td>Phil Glover</td><td>Studio</td><td>12/03/2024</td><td>21/03/2024</td><td>$0.00</td><td>$4450</td><td><span class="status-pill pending">Pending</span></td></tr>
          <tr><td>Rya Randall</td><td>Deluxe</td><td>12/03/2024</td><td>24/03/2024</td><td>$0.00</td><td>$430</td><td><span class="status-pill pending">Pending</span></td></tr>
          <tr><td>Sally Graham</td><td>Queen</td><td>12/03/2024</td><td>17/03/2024</td><td>$1550</td><td>$0.00</td><td><span class="status-pill success">Success</span></td></tr>
          <tr><td>Victor Rampling</td><td>Junior Suite</td><td>12/03/2024</td><td>15/03/2024</td><td>$0.00</td><td>$530</td><td><span class="status-pill pending">Pending</span></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function bookingListPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
        <button class="primary-action" id="btn-add-booking" type="button">Add Booking</button>
      </div>
      <table class="data-table table-booking-list">
        <thead>
          <tr>
            <th>NAME</th>
            <th>ROOM TYPE</th>
            <th>CHECK IN</th>
            <th>CHECK OUT</th>
            <th>PAID AMOUNT</th>
            <th>DUE AMOUNT</th>
            <th>PAYMENT STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody id="bookings-tbody">
          <tr><td colspan="8" style="text-align: center; padding: 20px;">Loading...</td></tr>
        </tbody>
      </table>
    </section>

    <!-- Add/Edit Booking Modal -->
    <div id="booking-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title">Add Booking</h2>
          <button class="modal-close" type="button">&times;</button>
        </div>
        <form id="booking-form">
          <div class="form-group">
            <label>Guest Name *</label>
            <input type="text" id="booking-name" required />
          </div>
          <div class="form-group">
            <label>Room Type *</label>
            <input type="text" id="booking-room-type" required />
          </div>
          <div class="form-group">
            <label>Check-In Date *</label>
            <input type="date" id="booking-check-in" required />
          </div>
          <div class="form-group">
            <label>Check-Out Date *</label>
            <input type="date" id="booking-check-out" required />
          </div>
          <div class="form-group">
            <label>Total Amount *</label>
            <input type="number" id="booking-total" required />
          </div>
          <div class="form-group">
            <label>Payment Status</label>
            <select id="booking-status">
              <option value="PENDING">Pending</option>
              <option value="PARTIAL">Partial</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="submit" class="primary-action">Save</button>
            <button type="button" class="modal-close-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function checkOutPageMarkup(): string {
	return `
    <section class="checkout-layout">
      <div class="checkout-panel">
        <div class="section-heading">Customer Details</div>
        <table class="checkout-table">
          <tbody>
            <tr><th>Name</th><td>Jone Liya</td></tr>
            <tr><th>Room No</th><td>102</td></tr>
            <tr><th>Booking No</th><td>11580</td></tr>
            <tr><th>Email ID</th><td>joneiya@gmail.com</td></tr>
            <tr><th>Mobile No</th><td>+22 202-302-4586</td></tr>
            <tr><th>Address</th><td>Low FG, Gat Road</td></tr>
            <tr><th>Time Format</th><td>24HRS</td></tr>
          </tbody>
        </table>
      </div>

      <div class="checkout-panel">
        <div class="section-heading">Billing Details</div>
        <table class="checkout-table">
          <tbody>
            <tr><th>Room Rent Amt</th><td>$800</td></tr>
            <tr><th>Electricity Bill</th><td>$100</td></tr>
            <tr><th>Food Bill</th><td>$250</td></tr>
            <tr><th>Internet Bill</th><td>$20</td></tr>
            <tr><th>Other</th><td>$80</td></tr>
            <tr><th>Total</th><td>$1,250</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function roomStatusPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ROOM ID</th>
            <th>ROOM NO</th>
            <th>ROOM TYPE</th>
            <th>FLOOR NO</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>001</td><td>101</td><td>Single</td><td>1st Floor</td><td><span class="status-pill success">Available</span></td></tr>
          <tr><td>002</td><td>102</td><td>Double</td><td>1st Floor</td><td><span class="status-pill pending">Occupied</span></td></tr>
          <tr><td>003</td><td>103</td><td>Suite</td><td>1st Floor</td><td><span class="status-pill pending">Occupied</span></td></tr>
          <tr><td>004</td><td>201</td><td>Single</td><td>2nd Floor</td><td><span class="status-pill pending">Occupied</span></td></tr>
          <tr><td>005</td><td>202</td><td>Double</td><td>2nd Floor</td><td><span class="status-pill success">Available</span></td></tr>
          <tr><td>006</td><td>203</td><td>Suite</td><td>2nd Floor</td><td><span class="status-pill success">Available</span></td></tr>
          <tr><td>007</td><td>301</td><td>Double</td><td>3rd Floor</td><td><span class="status-pill pending">Occupied</span></td></tr>
          <tr><td>008</td><td>302</td><td>Suite</td><td>3rd Floor</td><td><span class="status-pill success">Available</span></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function roomFacilitiesPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>FACILITY ID</th>
            <th>FACILITY NAME</th>
            <th>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>F001</td><td>Air Conditioning</td><td>Central AC system available in all rooms</td></tr>
          <tr><td>F002</td><td>WiFi</td><td>High-speed internet connectivity</td></tr>
          <tr><td>F003</td><td>Gym</td><td>Equipped fitness center</td></tr>
          <tr><td>F004</td><td>Swimming Pool</td><td>Olympic size swimming pool</td></tr>
          <tr><td>F005</td><td>Restaurant</td><td>In-house restaurant with room service</td></tr>
          <tr><td>F006</td><td>Spa</td><td>Full-service spa and wellness center</td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function facilitiesListPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FACILITY NAME</th>
            <th>CATEGORY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>F001</td><td>Air Conditioning</td><td>Comfort</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>F002</td><td>WiFi Internet</td><td>Technology</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>F003</td><td>Gym</td><td>Recreation</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>F004</td><td>Swimming Pool</td><td>Recreation</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>F005</td><td>Restaurant</td><td>Dining</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>F006</td><td>Bar</td><td>Dining</td><td><span class="status-pill pending">Inactive</span></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function facilitiesDetailsPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FACILITY DETAIL</th>
            <th>FACILITY TYPE</th>
            <th>CAPACITY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>FD01</td><td>Camera Security</td><td>Safety</td><td>24/7</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>FD02</td><td>Thermostat Control</td><td>Comfort</td><td>Room Control</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>FD03</td><td>WiFi Router</td><td>Technology</td><td>Multi-device</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>FD04</td><td>LED Lighting</td><td>Ambiance</td><td>Smart Control</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function roomSizePageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>SIZE ID</th>
            <th>ROOM TYPE</th>
            <th>SQUARE FEET</th>
            <th>CAPACITY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>RS01</td><td>Single Room</td><td>150</td><td>1</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS02</td><td>Double Room</td><td>200</td><td>2</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS03</td><td>Deluxe</td><td>250</td><td>2</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS04</td><td>Junior Suite</td><td>300</td><td>2</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS05</td><td>Executive Suite</td><td>400</td><td>2</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS06</td><td>Presidential Suite</td><td>600</td><td>3</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS07</td><td>Cabana</td><td>350</td><td>2</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
          <tr><td>RS08</td><td>Connecting</td><td>450</td><td>4</td><td><span class="action-icons">✎</span><span class="action-icons">✕</span></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function housekeepingPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ROOM NO</th>
            <th>FLOOR</th>
            <th>ASSIGNED TO</th>
            <th>STATUS</th>
            <th>LAST CLEANED</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>101</td><td>1st</td><td>Maria Garcia</td><td><span class="status-pill success">Cleaned</span></td><td>2026-09-01</td></tr>
          <tr><td>102</td><td>1st</td><td>Maria Garcia</td><td><span class="status-pill pending">In Progress</span></td><td>2026-09-01</td></tr>
          <tr><td>103</td><td>1st</td><td>John Smith</td><td><span class="status-pill pending">Pending</span></td><td>2026-08-31</td></tr>
          <tr><td>201</td><td>2nd</td><td>John Smith</td><td><span class="status-pill success">Cleaned</span></td><td>2026-09-01</td></tr>
          <tr><td>202</td><td>2nd</td><td>Maria Garcia</td><td><span class="status-pill success">Cleaned</span></td><td>2026-09-01</td></tr>
          <tr><td>203</td><td>2nd</td><td>John Smith</td><td><span class="status-pill pending">In Progress</span></td><td>2026-09-01</td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function assignRoomPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ROOM NO</th>
            <th>ROOM TYPE</th>
            <th>ASSIGNED TO</th>
            <th>ASSIGNMENT DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>101</td><td>Single</td><td>Maria Garcia</td><td>2026-09-01</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>102</td><td>Double</td><td>John Smith</td><td>2026-09-01</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>103</td><td>Suite</td><td>Maria Garcia</td><td>2026-08-30</td><td><span class="status-pill pending">Inactive</span></td></tr>
          <tr><td>201</td><td>Single</td><td>John Smith</td><td>2026-09-01</td><td><span class="status-pill success">Active</span></td></tr>
          <tr><td>202</td><td>Double</td><td>Maria Garcia</td><td>2026-09-01</td><td><span class="status-pill success">Active</span></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function checkinsPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
        <button class="primary-action" id="btn-add-checkin" type="button">New Check-in</button>
      </div>
      <table class="data-table table-checkins">
        <thead>
          <tr>
            <th>BOOKING ID</th>
            <th>GUEST ID</th>
            <th>ROOM ID</th>
            <th>CHECK-IN TIME</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody id="checkins-tbody">
          <tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>
        </tbody>
      </table>
    </section>

    <!-- Add/Edit Check-in Modal -->
    <div id="checkin-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="checkin-modal-title">New Check-in</h2>
          <button class="modal-close" type="button">&times;</button>
        </div>
        <form id="checkin-form">
          <div class="form-group">
            <label>Booking ID *</label>
            <input type="number" id="checkin-booking-id" required />
          </div>
          <div class="form-group">
            <label>Guest ID *</label>
            <input type="number" id="checkin-guest-id" required />
          </div>
          <div class="form-group">
            <label>Room ID *</label>
            <input type="number" id="checkin-room-id" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="checkin-status">
              <option value="CHECKED_IN">Checked In</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="submit" class="primary-action">Save</button>
            <button type="button" class="modal-close-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function checkoutsPageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
        <button class="primary-action" id="btn-add-checkout" type="button">New Check-out</button>
      </div>
      <table class="data-table table-checkouts">
        <thead>
          <tr>
            <th>BOOKING ID</th>
            <th>GUEST ID</th>
            <th>ROOM ID</th>
            <th>CHECK-OUT TIME</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody id="checkouts-tbody">
          <tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>
        </tbody>
      </table>
    </section>

    <!-- Add/Edit Check-out Modal -->
    <div id="checkout-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="checkout-modal-title">New Check-out</h2>
          <button class="modal-close" type="button">&times;</button>
        </div>
        <form id="checkout-form">
          <div class="form-group">
            <label>Booking ID *</label>
            <input type="number" id="checkout-booking-id" required />
          </div>
          <div class="form-group">
            <label>Guest ID *</label>
            <input type="number" id="checkout-guest-id" required />
          </div>
          <div class="form-group">
            <label>Room ID *</label>
            <input type="number" id="checkout-room-id" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="checkout-status">
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="submit" class="primary-action">Save</button>
            <button type="button" class="modal-close-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function maintenancePageMarkup(): string {
	return `
    <section class="list-panel">
      <div class="table-controls top-controls">
        <div class="entries-box">Show <span>10</span> entries</div>
        <div class="search-box">Search: <input type="text" /></div>
        <button class="primary-action" id="btn-add-maintenance" type="button">New Request</button>
      </div>
      <table class="data-table table-maintenance">
        <thead>
          <tr>
            <th>ROOM ID</th>
            <th>TYPE</th>
            <th>DESCRIPTION</th>
            <th>PRIORITY</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody id="maintenance-tbody">
          <tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>
        </tbody>
      </table>
    </section>

    <!-- Add/Edit Maintenance Modal -->
    <div id="maintenance-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="maintenance-modal-title">New Maintenance Request</h2>
          <button class="modal-close" type="button">&times;</button>
        </div>
        <form id="maintenance-form">
          <div class="form-group">
            <label>Room ID *</label>
            <input type="number" id="maintenance-room-id" required />
          </div>
          <div class="form-group">
            <label>Request Type *</label>
            <input type="text" id="maintenance-type" required />
          </div>
          <div class="form-group">
            <label>Description *</label>
            <textarea id="maintenance-description" required></textarea>
          </div>
          <div class="form-group">
            <label>Priority</label>
            <select id="maintenance-priority">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="maintenance-status">
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="submit" class="primary-action">Save</button>
            <button type="button" class="modal-close-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function reportsPageMarkup(): string {
	return `
    <section class="dashboard-grid">
      <div class="kpi-cards">
        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Bookings</h3>
            <div class="kpi-trend positive">+05%</div>
          </div>
          <div class="kpi-value" id="report-bookings">0</div>
          <div class="kpi-subtitle">All time</div>
        </article>

        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Rooms</h3>
            <div class="kpi-trend positive">+02%</div>
          </div>
          <div class="kpi-value" id="report-rooms">0</div>
          <div class="kpi-subtitle">Available</div>
        </article>

        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Guests</h3>
            <div class="kpi-trend positive">+08%</div>
          </div>
          <div class="kpi-value" id="report-guests">0</div>
          <div class="kpi-subtitle">All time</div>
        </article>

        <article class="kpi-card">
          <div class="kpi-header">
            <h3 class="kpi-title">Total Revenue</h3>
            <div class="kpi-trend positive">+15%</div>
          </div>
          <div class="kpi-value" id="report-revenue">$0</div>
          <div class="kpi-subtitle">All time</div>
        </article>
      </div>

      <div class="dashboard-charts">
        <article class="chart-card">
          <div class="chart-header">
            <h3>Room Occupancy</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody id="occupancy-tbody">
              <tr><td colspan="2" style="text-align: center; padding: 20px;">Loading...</td></tr>
            </tbody>
          </table>
        </article>

        <article class="recent-bookings">
          <div class="chart-header">
            <h3>Revenue Trend (Last 30 Days)</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody id="revenue-tbody">
              <tr><td colspan="2" style="text-align: center; padding: 20px;">Loading...</td></tr>
            </tbody>
          </table>
        </article>
      </div>
    </section>
  `;
}

function render(): void {
	if (!root) return;

	if (!isSignedIn()) {
		root.innerHTML = loginMarkup();
		const form = root.querySelector<HTMLFormElement>('#login-form');
		form?.addEventListener('submit', (event) => {
			event.preventDefault();
			window.localStorage.setItem(sessionKey, 'active');
			window.location.hash = '#/admin/hotels';
			render();
		});
		const passwordInput = root.querySelector<HTMLInputElement>('#password');
		const toggle = root.querySelector<HTMLButtonElement>('#show-password');
		toggle?.addEventListener('click', () => {
			if (!passwordInput) return;
			const showing = passwordInput.type === 'text';
			passwordInput.type = showing ? 'password' : 'text';
			toggle.textContent = showing ? 'Show' : 'Hide';
		});
		return;
	}

	const activeKey = currentRoute();
	root.innerHTML = appShell(activeKey);

	// Attach event listeners after DOM is rendered
	if (activeKey === 'booking-list') {
		setupBookingListHandlers();
	} else if (activeKey === 'checkins') {
		setupCheckinsHandlers();
	} else if (activeKey === 'checkouts') {
		setupCheckoutsHandlers();
	} else if (activeKey === 'maintenance') {
		setupMaintenanceHandlers();
	} else if (activeKey === 'reports') {
		setupReportsHandlers();
	}

	// Scroll to top on page change
	window.scrollTo(0, 0);
}

function setupBookingListHandlers(): void {
	// Load bookings on page load
	loadBookingsTable();

	// Add booking button
	const addBtn = document.querySelector('#btn-add-booking');
	addBtn?.addEventListener('click', () => openBookingModal());

	// Modal close buttons
	const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-btn');
	modalCloseBtns.forEach((btn) => {
		btn.addEventListener('click', () => closeBookingModal());
	});

	// Booking form submit
	const bookingForm = document.querySelector('#booking-form');
	bookingForm?.addEventListener('submit', async (e) => {
		e.preventDefault();
		await saveBooking();
	});
}

async function loadBookingsTable(): Promise<void> {
	try {
		const tbody = document.querySelector('#bookings-tbody');
		if (!tbody) return;

		tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">Loading...</td></tr>';

		const response = await getBookings();
		const bookings = response.data || [];

		if (bookings.length === 0) {
			tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #7a7d7a;">No bookings found</td></tr>';
			return;
		}

		tbody.innerHTML = bookings
			.map(
				(booking: any) => `
		<tr>
			<td>${booking.guest_name || 'N/A'}</td>
			<td>${booking.room_type || 'N/A'}</td>
			<td>${booking.check_in_date || ''}</td>
			<td>${booking.check_out_date || ''}</td>
			<td>$${parseFloat(booking.paid_amount || 0).toFixed(2)}</td>
			<td>$${parseFloat(booking.balance_amount || 0).toFixed(2)}</td>
			<td><span class="status-pill ${booking.payment_status === 'PAID' ? 'success' : 'pending'}">${booking.payment_status || 'PENDING'}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${booking.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${booking.id}">✕ Delete</button>
			</td>
		</tr>
	`
			)
			.join('');

		// Attach edit/delete handlers
		document.querySelectorAll('.edit-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await editBooking(id);
			});
		});

		document.querySelectorAll('.delete-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await removeBooking(id);
			});
		});
	} catch (error) {
		console.error('Error loading bookings:', error);
		const tbody = document.querySelector('#bookings-tbody');
		if (tbody) {
			tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #d8647a;">Error loading bookings</td></tr>';
		}
	}
}

function openBookingModal(booking?: any): void {
	const modal = document.querySelector('#booking-modal');
	if (!modal) return;

	const title = document.querySelector('#modal-title');
	if (title) {
		title.textContent = booking ? 'Edit Booking' : 'Add Booking';
	}

	// Reset form
	const form = document.querySelector('#booking-form') as HTMLFormElement;
	if (form) {
		form.reset();
		if (booking) {
			(document.querySelector('#booking-name') as HTMLInputElement).value = booking.guest_name || '';
			(document.querySelector('#booking-room-type') as HTMLInputElement).value = booking.room_type || '';
			(document.querySelector('#booking-check-in') as HTMLInputElement).value = booking.check_in_date || '';
			(document.querySelector('#booking-check-out') as HTMLInputElement).value = booking.check_out_date || '';
			(document.querySelector('#booking-total') as HTMLInputElement).value = booking.total_amount || '';
			(document.querySelector('#booking-status') as HTMLSelectElement).value = booking.payment_status || 'PENDING';
			(form as any).dataset.bookingId = booking.id;
		} else {
			delete (form as any).dataset.bookingId;
		}
	}

	modal.classList.add('show');
	modal.style.display = 'flex';
}

function closeBookingModal(): void {
	const modal = document.querySelector('#booking-modal');
	if (modal) {
		modal.classList.remove('show');
		modal.style.display = 'none';
	}
}

async function saveBooking(): Promise<void> {
	const form = document.querySelector('#booking-form') as HTMLFormElement;
	if (!form) return;

	const name = (document.querySelector('#booking-name') as HTMLInputElement).value;
	const roomType = (document.querySelector('#booking-room-type') as HTMLInputElement).value;
	const checkIn = (document.querySelector('#booking-check-in') as HTMLInputElement).value;
	const checkOut = (document.querySelector('#booking-check-out') as HTMLInputElement).value;
	const total = parseFloat((document.querySelector('#booking-total') as HTMLInputElement).value);
	const status = (document.querySelector('#booking-status') as HTMLSelectElement).value;

	if (!name || !roomType || !checkIn || !checkOut) {
		alert('Please fill in all required fields');
		return;
	}

	try {
		const bookingId = (form as any).dataset.bookingId;

		if (bookingId) {
			// Update
			await updateBooking(bookingId, {
				check_in_date: checkIn,
				check_out_date: checkOut,
				payment_status: status,
			});
			alert('Booking updated successfully');
		} else {
			// Create
			await createBooking({
				organization_id: 1,
				hotel_id: 1,
				branch_id: 1,
				guest_name: name,
				check_in_date: checkIn,
				check_out_date: checkOut,
				room_type: roomType,
				total_amount: total,
				adults: 1,
				children: 0,
			});
			alert('Booking created successfully');
		}

		closeBookingModal();
		await loadBookingsTable();
	} catch (error) {
		console.error('Error saving booking:', error);
		alert('Error saving booking. Please check the console.');
	}
}

async function editBooking(id: string): Promise<void> {
	try {
		const booking = await getBooking(id);
		openBookingModal(booking);
	} catch (error) {
		console.error('Error loading booking:', error);
		alert('Error loading booking');
	}
}

async function removeBooking(id: string): Promise<void> {
	if (!confirm('Are you sure you want to delete this booking?')) return;

	try {
		await deleteBooking(id);
		alert('Booking deleted successfully');
		await loadBookingsTable();
	} catch (error) {
		console.error('Error deleting booking:', error);
		alert('Error deleting booking');
	}
}

// Check-in Handlers
function setupCheckinsHandlers(): void {
	loadCheckinsTable();

	const addBtn = document.querySelector('#btn-add-checkin');
	addBtn?.addEventListener('click', () => openCheckinModal());

	const modalCloseBtns = document.querySelectorAll('#checkin-modal .modal-close, #checkin-modal .modal-close-btn');
	modalCloseBtns.forEach((btn) => {
		btn.addEventListener('click', () => closeCheckinModal());
	});

	const checkinForm = document.querySelector('#checkin-form');
	checkinForm?.addEventListener('submit', async (e) => {
		e.preventDefault();
		await saveCheckin();
	});
}

async function loadCheckinsTable(): Promise<void> {
	try {
		const tbody = document.querySelector('#checkins-tbody');
		if (!tbody) return;

		tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>';

		const response = await getCheckins();
		const checkins = response.data || [];

		if (checkins.length === 0) {
			tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #7a7d7a;">No check-ins found</td></tr>';
			return;
		}

		tbody.innerHTML = checkins
			.map(
				(checkin: any) => `
		<tr>
			<td>${checkin.booking_id || 'N/A'}</td>
			<td>${checkin.guest_id || 'N/A'}</td>
			<td>${checkin.room_id || 'N/A'}</td>
			<td>${new Date(checkin.checkin_time).toLocaleString()}</td>
			<td><span class="status-pill ${checkin.status === 'CHECKED_IN' ? 'success' : 'pending'}">${checkin.status || 'PENDING'}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${checkin.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${checkin.id}">✕ Delete</button>
			</td>
		</tr>
	`
			)
			.join('');

		document.querySelectorAll('#checkins-tbody .edit-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await editCheckin(id);
			});
		});

		document.querySelectorAll('#checkins-tbody .delete-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await removeCheckin(id);
			});
		});
	} catch (error) {
		console.error('Error loading check-ins:', error);
		const tbody = document.querySelector('#checkins-tbody');
		if (tbody) {
			tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #d8647a;">Error loading check-ins</td></tr>';
		}
	}
}

function openCheckinModal(checkin?: any): void {
	const modal = document.querySelector('#checkin-modal');
	if (!modal) return;

	const title = document.querySelector('#checkin-modal-title');
	if (title) {
		title.textContent = checkin ? 'Edit Check-in' : 'New Check-in';
	}

	const form = document.querySelector('#checkin-form') as HTMLFormElement;
	if (form) {
		form.reset();
		if (checkin) {
			(document.querySelector('#checkin-booking-id') as HTMLInputElement).value = checkin.booking_id || '';
			(document.querySelector('#checkin-guest-id') as HTMLInputElement).value = checkin.guest_id || '';
			(document.querySelector('#checkin-room-id') as HTMLInputElement).value = checkin.room_id || '';
			(document.querySelector('#checkin-status') as HTMLSelectElement).value = checkin.status || 'CHECKED_IN';
			(form as any).dataset.checkinId = checkin.id;
		} else {
			delete (form as any).dataset.checkinId;
		}
	}

	modal.classList.add('show');
	modal.style.display = 'flex';
}

function closeCheckinModal(): void {
	const modal = document.querySelector('#checkin-modal');
	if (modal) {
		modal.classList.remove('show');
		modal.style.display = 'none';
	}
}

async function saveCheckin(): Promise<void> {
	const form = document.querySelector('#checkin-form') as HTMLFormElement;
	if (!form) return;

	const bookingId = (document.querySelector('#checkin-booking-id') as HTMLInputElement).value;
	const guestId = (document.querySelector('#checkin-guest-id') as HTMLInputElement).value;
	const roomId = (document.querySelector('#checkin-room-id') as HTMLInputElement).value;
	const status = (document.querySelector('#checkin-status') as HTMLSelectElement).value;

	if (!bookingId || !guestId || !roomId) {
		alert('Please fill in all required fields');
		return;
	}

	try {
		const checkinId = (form as any).dataset.checkinId;

		if (checkinId) {
			await updateCheckin(checkinId, { status });
			alert('Check-in updated successfully');
		} else {
			await createCheckin({
				booking_id: parseInt(bookingId),
				guest_id: parseInt(guestId),
				room_id: parseInt(roomId),
				status,
			});
			alert('Check-in created successfully');
		}

		closeCheckinModal();
		await loadCheckinsTable();
	} catch (error) {
		console.error('Error saving check-in:', error);
		alert('Error saving check-in');
	}
}

async function editCheckin(id: string): Promise<void> {
	try {
		const response = await fetch(`${API_BASE}/checkins/${id}`);
		const checkin = await response.json();
		openCheckinModal(checkin);
	} catch (error) {
		console.error('Error loading check-in:', error);
		alert('Error loading check-in');
	}
}

async function removeCheckin(id: string): Promise<void> {
	if (!confirm('Are you sure you want to delete this check-in?')) return;

	try {
		await deleteCheckin(id);
		alert('Check-in deleted successfully');
		await loadCheckinsTable();
	} catch (error) {
		console.error('Error deleting check-in:', error);
		alert('Error deleting check-in');
	}
}

// Check-out Handlers
function setupCheckoutsHandlers(): void {
	loadCheckoutsTable();

	const addBtn = document.querySelector('#btn-add-checkout');
	addBtn?.addEventListener('click', () => openCheckoutModal());

	const modalCloseBtns = document.querySelectorAll('#checkout-modal .modal-close, #checkout-modal .modal-close-btn');
	modalCloseBtns.forEach((btn) => {
		btn.addEventListener('click', () => closeCheckoutModal());
	});

	const checkoutForm = document.querySelector('#checkout-form');
	checkoutForm?.addEventListener('submit', async (e) => {
		e.preventDefault();
		await saveCheckout();
	});
}

async function loadCheckoutsTable(): Promise<void> {
	try {
		const tbody = document.querySelector('#checkouts-tbody');
		if (!tbody) return;

		tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>';

		const response = await getCheckouts();
		const checkouts = response.data || [];

		if (checkouts.length === 0) {
			tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #7a7d7a;">No check-outs found</td></tr>';
			return;
		}

		tbody.innerHTML = checkouts
			.map(
				(checkout: any) => `
		<tr>
			<td>${checkout.booking_id || 'N/A'}</td>
			<td>${checkout.guest_id || 'N/A'}</td>
			<td>${checkout.room_id || 'N/A'}</td>
			<td>${new Date(checkout.checkout_time).toLocaleString()}</td>
			<td><span class="status-pill ${checkout.status === 'COMPLETED' ? 'success' : 'pending'}">${checkout.status || 'PENDING'}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${checkout.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${checkout.id}">✕ Delete</button>
			</td>
		</tr>
	`
			)
			.join('');

		document.querySelectorAll('#checkouts-tbody .edit-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await editCheckout(id);
			});
		});

		document.querySelectorAll('#checkouts-tbody .delete-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await removeCheckout(id);
			});
		});
	} catch (error) {
		console.error('Error loading check-outs:', error);
		const tbody = document.querySelector('#checkouts-tbody');
		if (tbody) {
			tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #d8647a;">Error loading check-outs</td></tr>';
		}
	}
}

function openCheckoutModal(checkout?: any): void {
	const modal = document.querySelector('#checkout-modal');
	if (!modal) return;

	const title = document.querySelector('#checkout-modal-title');
	if (title) {
		title.textContent = checkout ? 'Edit Check-out' : 'New Check-out';
	}

	const form = document.querySelector('#checkout-form') as HTMLFormElement;
	if (form) {
		form.reset();
		if (checkout) {
			(document.querySelector('#checkout-booking-id') as HTMLInputElement).value = checkout.booking_id || '';
			(document.querySelector('#checkout-guest-id') as HTMLInputElement).value = checkout.guest_id || '';
			(document.querySelector('#checkout-room-id') as HTMLInputElement).value = checkout.room_id || '';
			(document.querySelector('#checkout-status') as HTMLSelectElement).value = checkout.status || 'PENDING';
			(form as any).dataset.checkoutId = checkout.id;
		} else {
			delete (form as any).dataset.checkoutId;
		}
	}

	modal.classList.add('show');
	modal.style.display = 'flex';
}

function closeCheckoutModal(): void {
	const modal = document.querySelector('#checkout-modal');
	if (modal) {
		modal.classList.remove('show');
		modal.style.display = 'none';
	}
}

async function saveCheckout(): Promise<void> {
	const form = document.querySelector('#checkout-form') as HTMLFormElement;
	if (!form) return;

	const bookingId = (document.querySelector('#checkout-booking-id') as HTMLInputElement).value;
	const guestId = (document.querySelector('#checkout-guest-id') as HTMLInputElement).value;
	const roomId = (document.querySelector('#checkout-room-id') as HTMLInputElement).value;
	const status = (document.querySelector('#checkout-status') as HTMLSelectElement).value;

	if (!bookingId || !guestId || !roomId) {
		alert('Please fill in all required fields');
		return;
	}

	try {
		const checkoutId = (form as any).dataset.checkoutId;

		if (checkoutId) {
			await updateCheckout(checkoutId, { status });
			alert('Check-out updated successfully');
		} else {
			await createCheckout({
				booking_id: parseInt(bookingId),
				guest_id: parseInt(guestId),
				room_id: parseInt(roomId),
				status,
			});
			alert('Check-out created successfully');
		}

		closeCheckoutModal();
		await loadCheckoutsTable();
	} catch (error) {
		console.error('Error saving check-out:', error);
		alert('Error saving check-out');
	}
}

async function editCheckout(id: string): Promise<void> {
	try {
		const response = await fetch(`${API_BASE}/checkouts/${id}`);
		const checkout = await response.json();
		openCheckoutModal(checkout);
	} catch (error) {
		console.error('Error loading check-out:', error);
		alert('Error loading check-out');
	}
}

async function removeCheckout(id: string): Promise<void> {
	if (!confirm('Are you sure you want to delete this check-out?')) return;

	try {
		await deleteCheckout(id);
		alert('Check-out deleted successfully');
		await loadCheckoutsTable();
	} catch (error) {
		console.error('Error deleting check-out:', error);
		alert('Error deleting check-out');
	}
}

// Maintenance Handlers
function setupMaintenanceHandlers(): void {
	loadMaintenanceTable();

	const addBtn = document.querySelector('#btn-add-maintenance');
	addBtn?.addEventListener('click', () => openMaintenanceModal());

	const modalCloseBtns = document.querySelectorAll('#maintenance-modal .modal-close, #maintenance-modal .modal-close-btn');
	modalCloseBtns.forEach((btn) => {
		btn.addEventListener('click', () => closeMaintenanceModal());
	});

	const maintenanceForm = document.querySelector('#maintenance-form');
	maintenanceForm?.addEventListener('submit', async (e) => {
		e.preventDefault();
		await saveMaintenance();
	});
}

async function loadMaintenanceTable(): Promise<void> {
	try {
		const tbody = document.querySelector('#maintenance-tbody');
		if (!tbody) return;

		tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>';

		const response = await getMaintenances();
		const maintenances = response.data || [];

		if (maintenances.length === 0) {
			tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #7a7d7a;">No maintenance requests found</td></tr>';
			return;
		}

		tbody.innerHTML = maintenances
			.map(
				(maintenance: any) => `
		<tr>
			<td>${maintenance.room_id || 'N/A'}</td>
			<td>${maintenance.request_type || 'N/A'}</td>
			<td>${maintenance.description || ''}</td>
			<td><span class="status-pill">${maintenance.priority || 'MEDIUM'}</span></td>
			<td><span class="status-pill ${maintenance.status === 'CLOSED' ? 'success' : 'pending'}">${maintenance.status || 'OPEN'}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${maintenance.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${maintenance.id}">✕ Delete</button>
			</td>
		</tr>
	`
			)
			.join('');

		document.querySelectorAll('#maintenance-tbody .edit-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await editMaintenance(id);
			});
		});

		document.querySelectorAll('#maintenance-tbody .delete-btn').forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				const id = (e.target as HTMLElement).getAttribute('data-id');
				if (id) await removeMaintenance(id);
			});
		});
	} catch (error) {
		console.error('Error loading maintenance:', error);
		const tbody = document.querySelector('#maintenance-tbody');
		if (tbody) {
			tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #d8647a;">Error loading maintenance</td></tr>';
		}
	}
}

function openMaintenanceModal(maintenance?: any): void {
	const modal = document.querySelector('#maintenance-modal');
	if (!modal) return;

	const title = document.querySelector('#maintenance-modal-title');
	if (title) {
		title.textContent = maintenance ? 'Edit Request' : 'New Maintenance Request';
	}

	const form = document.querySelector('#maintenance-form') as HTMLFormElement;
	if (form) {
		form.reset();
		if (maintenance) {
			(document.querySelector('#maintenance-room-id') as HTMLInputElement).value = maintenance.room_id || '';
			(document.querySelector('#maintenance-type') as HTMLInputElement).value = maintenance.request_type || '';
			(document.querySelector('#maintenance-description') as HTMLTextAreaElement).value = maintenance.description || '';
			(document.querySelector('#maintenance-priority') as HTMLSelectElement).value = maintenance.priority || 'MEDIUM';
			(document.querySelector('#maintenance-status') as HTMLSelectElement).value = maintenance.status || 'OPEN';
			(form as any).dataset.maintenanceId = maintenance.id;
		} else {
			delete (form as any).dataset.maintenanceId;
		}
	}

	modal.classList.add('show');
	modal.style.display = 'flex';
}

function closeMaintenanceModal(): void {
	const modal = document.querySelector('#maintenance-modal');
	if (modal) {
		modal.classList.remove('show');
		modal.style.display = 'none';
	}
}

async function saveMaintenance(): Promise<void> {
	const form = document.querySelector('#maintenance-form') as HTMLFormElement;
	if (!form) return;

	const roomId = (document.querySelector('#maintenance-room-id') as HTMLInputElement).value;
	const type = (document.querySelector('#maintenance-type') as HTMLInputElement).value;
	const description = (document.querySelector('#maintenance-description') as HTMLTextAreaElement).value;
	const priority = (document.querySelector('#maintenance-priority') as HTMLSelectElement).value;
	const status = (document.querySelector('#maintenance-status') as HTMLSelectElement).value;

	if (!roomId || !type || !description) {
		alert('Please fill in all required fields');
		return;
	}

	try {
		const maintenanceId = (form as any).dataset.maintenanceId;

		if (maintenanceId) {
			await updateMaintenance(maintenanceId, { request_type: type, description, priority, status });
			alert('Maintenance request updated successfully');
		} else {
			await createMaintenance({
				room_id: parseInt(roomId),
				request_type: type,
				description,
				priority,
				status,
			});
			alert('Maintenance request created successfully');
		}

		closeMaintenanceModal();
		await loadMaintenanceTable();
	} catch (error) {
		console.error('Error saving maintenance:', error);
		alert('Error saving maintenance request');
	}
}

async function editMaintenance(id: string): Promise<void> {
	try {
		const response = await fetch(`${API_BASE}/maintenance/${id}`);
		const maintenance = await response.json();
		openMaintenanceModal(maintenance);
	} catch (error) {
		console.error('Error loading maintenance:', error);
		alert('Error loading maintenance request');
	}
}

async function removeMaintenance(id: string): Promise<void> {
	if (!confirm('Are you sure you want to delete this maintenance request?')) return;

	try {
		await deleteMaintenance(id);
		alert('Maintenance request deleted successfully');
		await loadMaintenanceTable();
	} catch (error) {
		console.error('Error deleting maintenance:', error);
		alert('Error deleting maintenance request');
	}
}

// Reports Handler
function setupReportsHandlers(): void {
	loadReportsSummary();
}

async function loadReportsSummary(): Promise<void> {
	try {
		const summary = await getReportsSummary();

		const bookingsEl = document.querySelector('#report-bookings');
		const roomsEl = document.querySelector('#report-rooms');
		const guestsEl = document.querySelector('#report-guests');
		const revenueEl = document.querySelector('#report-revenue');

		if (bookingsEl) bookingsEl.textContent = summary.bookings || '0';
		if (roomsEl) roomsEl.textContent = summary.rooms || '0';
		if (guestsEl) guestsEl.textContent = summary.guests || '0';
		if (revenueEl) revenueEl.textContent = `$${parseFloat(summary.revenue || 0).toFixed(2)}`;

		// Load occupancy report
		const occupancyResponse = await getOccupancyReport();
		const occupancyTbody = document.querySelector('#occupancy-tbody');
		if (occupancyTbody && occupancyResponse.data) {
			occupancyTbody.innerHTML = occupancyResponse.data
				.map(
					(item: any) => `
				<tr>
					<td>${item.status}</td>
					<td>${item.total}</td>
				</tr>
			`
				)
				.join('');
		}

		// Load revenue report
		const revenueResponse = await getRevenueReport();
		const revenueTbody = document.querySelector('#revenue-tbody');
		if (revenueTbody && revenueResponse.data) {
			revenueTbody.innerHTML = revenueResponse.data
				.map(
					(item: any) => `
				<tr>
					<td>${item.day}</td>
					<td>$${parseFloat(item.revenue || 0).toFixed(2)}</td>
				</tr>
			`
				)
				.join('');
		}
	} catch (error) {
		console.error('Error loading reports:', error);
		alert('Error loading reports data');
	}
}

function loginMarkup(): string {
	return `
    <main class="login-screen">
      <section class="login-split left-panel">
        <div class="login-logo-wrap">
          <div class="brand-mark">HM</div>
          <div class="brand-block">
            <strong>Harbor</strong>
            <small>Hotel operations</small>
          </div>
        </div>
        <div class="login-hero">
          <p class="eyebrow">A calmer way to run your property</p>
          <h1>Every stay,<br><span>beautifully managed.</span></h1>
          <p>Bring reservations, guests, rooms, and teams together in one clear operating view.</p>
        </div>
        <div class="login-footer-line"><span></span> Harbor House • New York</div>
      </section>

      <section class="login-split right-panel">
        <div class="login-box">
          <p class="eyebrow">Welcome back</p>
          <h2>Sign in to Harbor</h2>
          <p class="muted-text">Your property is ready when you are.</p>

          <form id="login-form">
            <label>Email</label>
            <input type="email" placeholder="you@harborhouse.com" required />
            <label>Password</label>
            <div class="password-row">
              <input id="password" type="password" placeholder="Enter your password" required minlength="4" />
              <button id="show-password" type="button">Show</button>
            </div>
            <div class="remember-row">
              <label class="remember-check"><input type="checkbox" /> <span>Remember me</span></label>
              <a href="#/admin/hotels">Forgot password?</a>
            </div>
            <button class="login-submit" type="submit">Sign in <span>→</span></button>
          </form>
        </div>
      </section>
    </main>
  `;
}

window.addEventListener('hashchange', render);
window.addEventListener('load', () => {
	if (!window.location.hash) {
		window.location.hash = '#/admin/dashboard';
	}
});
render();
