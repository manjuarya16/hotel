(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const p=[{key:"dashboard",label:"Dashboard",section:"Universal"},{key:"hotels",label:"Hotels",section:"Universal"},{key:"transaction",label:"Transaction",section:"Universal"},{key:"room-book",label:"Room Book",section:"Room Book",isGroup:!0},{key:"booking-list",label:"Booking List",section:"Room Book",parentKey:"room-book"},{key:"check-out",label:"Room Checkout",section:"Room Book",parentKey:"room-book"},{key:"room-status",label:"Room Status",section:"Room Book",parentKey:"room-book"},{key:"room-facilities",label:"Room Facilities",section:"Room Facilities",isGroup:!0},{key:"facilities-list",label:"Facilities List",section:"Room Facilities",parentKey:"room-facilities"},{key:"facilities-details",label:"Facilities Details",section:"Room Facilities",parentKey:"room-facilities"},{key:"room-size",label:"Room Size",section:"Room Facilities",parentKey:"room-facilities"},{key:"housekeeping",label:"Housekeeping",section:"Housekeeping",isGroup:!0},{key:"assign-room",label:"Assign Room",section:"Housekeeping",parentKey:"housekeeping"},{key:"checkins",label:"Check-ins",section:"Operations"},{key:"checkouts",label:"Check-outs",section:"Operations"},{key:"maintenance",label:"Maintenance",section:"Operations"},{key:"reports",label:"Reports",section:"Operations"}],l=document.querySelector("#root"),f="harbor-session",M="harbor-user",h="http://localhost:3041/api";async function R(t,a){return i("/auth/login",{method:"POST",body:JSON.stringify({email:t,password:a})})}async function i(t,a){try{const s=await fetch(`${h}${t}`,{headers:{"Content-Type":"application/json"},...a});if(!s.ok)throw new Error(`API Error: ${s.status}`);return await s.json()}catch(s){throw console.error("API call failed:",s),s}}async function L(t=10,a=0){return i(`/bookings?limit=${t}&offset=${a}`)}async function $(t){return i(`/bookings/${t}`)}async function x(t){return i("/bookings",{method:"POST",body:JSON.stringify(t)})}async function O(t,a){return i(`/bookings/${t}`,{method:"PUT",body:JSON.stringify(a)})}async function N(t){return i(`/bookings/${t}`,{method:"DELETE"})}async function P(){return i("/checkins")}async function D(t){return i("/checkins",{method:"POST",body:JSON.stringify(t)})}async function F(t,a){return i(`/checkins/${t}`,{method:"PUT",body:JSON.stringify(a)})}async function B(t){return i(`/checkins/${t}`,{method:"DELETE"})}async function _(){return i("/checkouts")}async function H(t){return i("/checkouts",{method:"POST",body:JSON.stringify(t)})}async function G(t,a){return i(`/checkouts/${t}`,{method:"PUT",body:JSON.stringify(a)})}async function U(t){return i(`/checkouts/${t}`,{method:"DELETE"})}async function J(){return i("/maintenance")}async function Y(t){return i("/maintenance",{method:"POST",body:JSON.stringify(t)})}async function j(t,a){return i(`/maintenance/${t}`,{method:"PUT",body:JSON.stringify(a)})}async function z(t){return i(`/maintenance/${t}`,{method:"DELETE"})}async function W(){return i("/reports/dashboard")}async function K(){return i("/reports/occupancy")}async function Q(){return i("/reports/revenue")}function V(){return window.localStorage.getItem(f)==="active"}function Z(){const t=window.location.hash.replace("#/admin/","");return p.some(a=>a.key===t)?t:"dashboard"}function X(t){const a=p.find(e=>e.key===t)??p[1],s=t==="hotels"?"Hotels":t==="transaction"?"Transaction":t==="room-book"?"Room Book":t==="booking-list"?"Room Booking List":t==="check-out"?"Check Out":t==="checkins"?"Check-ins":t==="checkouts"?"Check-outs":t==="maintenance"?"Maintenance":t==="reports"?"Reports & Analytics":a.label;return`
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
          ${tt(t)}
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
            <div class="breadcrumb">Home <span>/</span> ${s}</div>
            <div class="workspace-actions">
              <button class="mini-square" type="button">＋</button>
              <button class="mini-square" type="button">⌂</button>
            </div>
          </div>

          <div class="page-title-row">
            <h1>${s}</h1>
            
            ${t==="room-book"||t==="room-status"||t==="check-out"?'<button class="primary-action" type="button">New Booking</button>':""}
            ${t==="booking-list"?'<button class="primary-action" type="button">Book Now</button>':""}
            ${t==="hotels"?'<button class="primary-action" type="button">New Hotel</button>':""}
          </div>

          ${et(t)}
        </div>
      </main>
    </div>
  `}function tt(t){return[{label:"Universal",items:["dashboard","hotels","transaction"]},{label:"Room Book",items:["room-book","booking-list","check-out","room-status"]},{label:"Room Facilities",items:["room-facilities","facilities-list","facilities-details","room-size"]},{label:"Housekeeping",items:["housekeeping","assign-room"]},{label:"Operations",items:["checkins","checkouts","maintenance","reports"]}].map(s=>{const e=s.items.map(o=>{const n=p.find(r=>r.key===o),d=o===t,c=n.isGroup||o==="room-book"||o==="room-facilities"||o==="housekeeping";return`
            <a class="nav-link ${d?"active":""} ${c?"group-header":""}" href="#/admin/${o}">
              ${n.label}
            </a>
          `}).join("");return`
        <div class="nav-section">
          <div class="section-label">${s.label}</div>
          ${e}
        </div>
      `}).join("")}function et(t){return{dashboard:at(),hotels:g(),transaction:st(),"room-book":ot(),"booking-list":nt(),"check-out":it(),"room-status":dt(),"room-facilities":ct(),"facilities-list":rt(),"facilities-details":lt(),"room-size":ut(),housekeeping:pt(),"assign-room":ht(),checkins:mt(),checkouts:bt(),maintenance:vt(),reports:yt()}[t]??g()}function at(){return`
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
  `}function g(){return`
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
  `}function st(){return`
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
  `}function ot(){return`
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
  `}function nt(){return`
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
  `}function it(){return`
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
  `}function dt(){return`
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
  `}function ct(){return`
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
  `}function rt(){return`
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
  `}function lt(){return`
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
  `}function ut(){return`
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
  `}function pt(){return`
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
  `}function ht(){return`
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
  `}function mt(){return`
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
  `}function bt(){return`
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
  `}function vt(){return`
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
  `}function yt(){return`
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
  `}function m(){if(!l)return;if(!V()){l.innerHTML=Pt();const a=l.querySelector("#login-form");a?.addEventListener("submit",async o=>{o.preventDefault();const n=new FormData(a),d=String(n.get("email")||"").trim(),c=String(n.get("password")||"").trim();try{const r=await R(d,c);if(!r?.success)throw new Error(r?.error||"Login failed");window.localStorage.setItem(f,"active"),window.localStorage.setItem(M,JSON.stringify(r.user||{})),window.location.hash="#/admin/hotels",m()}catch(r){alert(r instanceof Error?r.message:"Login failed. Please try again.")}});const s=l.querySelector("#password"),e=l.querySelector("#show-password");e?.addEventListener("click",()=>{if(!s)return;const o=s.type==="text";s.type=o?"password":"text",e.textContent=o?"Show":"Hide"});return}const t=Z();l.innerHTML=X(t),t==="booking-list"?kt():t==="checkins"?Et():t==="checkouts"?It():t==="maintenance"?Rt():t==="reports"&&Ot(),window.scrollTo(0,0)}function kt(){b(),document.querySelector("#btn-add-booking")?.addEventListener("click",()=>S()),document.querySelectorAll(".modal-close, .modal-close-btn").forEach(e=>{e.addEventListener("click",()=>E())}),document.querySelector("#booking-form")?.addEventListener("submit",async e=>{e.preventDefault(),await gt()})}async function b(){try{const t=document.querySelector("#bookings-tbody");if(!t)return;t.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px;">Loading...</td></tr>';const s=(await L()).data||[];if(s.length===0){t.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px; color: #7a7d7a;">No bookings found</td></tr>';return}t.innerHTML=s.map(e=>`
		<tr>
			<td>${e.guest_name||"N/A"}</td>
			<td>${e.room_type||"N/A"}</td>
			<td>${e.check_in_date||""}</td>
			<td>${e.check_out_date||""}</td>
			<td>$${parseFloat(e.paid_amount||0).toFixed(2)}</td>
			<td>$${parseFloat(e.balance_amount||0).toFixed(2)}</td>
			<td><span class="status-pill ${e.payment_status==="PAID"?"success":"pending"}">${e.payment_status||"PENDING"}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${e.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${e.id}">✕ Delete</button>
			</td>
		</tr>
	`).join(""),document.querySelectorAll(".edit-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await ft(n)})}),document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await St(n)})})}catch(t){console.error("Error loading bookings:",t);const a=document.querySelector("#bookings-tbody");a&&(a.innerHTML='<tr><td colspan="8" style="text-align: center; color: #d8647a;">Error loading bookings</td></tr>')}}function S(t){const a=document.querySelector("#booking-modal");if(!a)return;const s=document.querySelector("#modal-title");s&&(s.textContent=t?"Edit Booking":"Add Booking");const e=document.querySelector("#booking-form");e&&(e.reset(),t?(document.querySelector("#booking-name").value=t.guest_name||"",document.querySelector("#booking-room-type").value=t.room_type||"",document.querySelector("#booking-check-in").value=t.check_in_date||"",document.querySelector("#booking-check-out").value=t.check_out_date||"",document.querySelector("#booking-total").value=t.total_amount||"",document.querySelector("#booking-status").value=t.payment_status||"PENDING",e.dataset.bookingId=t.id):delete e.dataset.bookingId),a.classList.add("show"),a.style.display="flex"}function E(){const t=document.querySelector("#booking-modal");t&&(t.classList.remove("show"),t.style.display="none")}async function gt(){const t=document.querySelector("#booking-form");if(!t)return;const a=document.querySelector("#booking-name").value,s=document.querySelector("#booking-room-type").value,e=document.querySelector("#booking-check-in").value,o=document.querySelector("#booking-check-out").value,n=parseFloat(document.querySelector("#booking-total").value),d=document.querySelector("#booking-status").value;if(!a||!s||!e||!o){alert("Please fill in all required fields");return}try{const c=t.dataset.bookingId;c?(await O(c,{check_in_date:e,check_out_date:o,payment_status:d}),alert("Booking updated successfully")):(await x({organization_id:1,hotel_id:1,branch_id:1,guest_name:a,check_in_date:e,check_out_date:o,room_type:s,total_amount:n,adults:1,children:0}),alert("Booking created successfully")),E(),await b()}catch(c){console.error("Error saving booking:",c),alert("Error saving booking. Please check the console.")}}async function ft(t){try{const a=await $(t);S(a)}catch(a){console.error("Error loading booking:",a),alert("Error loading booking")}}async function St(t){if(confirm("Are you sure you want to delete this booking?"))try{await N(t),alert("Booking deleted successfully"),await b()}catch(a){console.error("Error deleting booking:",a),alert("Error deleting booking")}}function Et(){v(),document.querySelector("#btn-add-checkin")?.addEventListener("click",()=>w()),document.querySelectorAll("#checkin-modal .modal-close, #checkin-modal .modal-close-btn").forEach(e=>{e.addEventListener("click",()=>C())}),document.querySelector("#checkin-form")?.addEventListener("submit",async e=>{e.preventDefault(),await wt()})}async function v(){try{const t=document.querySelector("#checkins-tbody");if(!t)return;t.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>';const s=(await P()).data||[];if(s.length===0){t.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px; color: #7a7d7a;">No check-ins found</td></tr>';return}t.innerHTML=s.map(e=>`
		<tr>
			<td>${e.booking_id||"N/A"}</td>
			<td>${e.guest_id||"N/A"}</td>
			<td>${e.room_id||"N/A"}</td>
			<td>${new Date(e.checkin_time).toLocaleString()}</td>
			<td><span class="status-pill ${e.status==="CHECKED_IN"?"success":"pending"}">${e.status||"PENDING"}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${e.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${e.id}">✕ Delete</button>
			</td>
		</tr>
	`).join(""),document.querySelectorAll("#checkins-tbody .edit-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await Ct(n)})}),document.querySelectorAll("#checkins-tbody .delete-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await qt(n)})})}catch(t){console.error("Error loading check-ins:",t);const a=document.querySelector("#checkins-tbody");a&&(a.innerHTML='<tr><td colspan="6" style="text-align: center; color: #d8647a;">Error loading check-ins</td></tr>')}}function w(t){const a=document.querySelector("#checkin-modal");if(!a)return;const s=document.querySelector("#checkin-modal-title");s&&(s.textContent=t?"Edit Check-in":"New Check-in");const e=document.querySelector("#checkin-form");e&&(e.reset(),t?(document.querySelector("#checkin-booking-id").value=t.booking_id||"",document.querySelector("#checkin-guest-id").value=t.guest_id||"",document.querySelector("#checkin-room-id").value=t.room_id||"",document.querySelector("#checkin-status").value=t.status||"CHECKED_IN",e.dataset.checkinId=t.id):delete e.dataset.checkinId),a.classList.add("show"),a.style.display="flex"}function C(){const t=document.querySelector("#checkin-modal");t&&(t.classList.remove("show"),t.style.display="none")}async function wt(){const t=document.querySelector("#checkin-form");if(!t)return;const a=document.querySelector("#checkin-booking-id").value,s=document.querySelector("#checkin-guest-id").value,e=document.querySelector("#checkin-room-id").value,o=document.querySelector("#checkin-status").value;if(!a||!s||!e){alert("Please fill in all required fields");return}try{const n=t.dataset.checkinId;n?(await F(n,{status:o}),alert("Check-in updated successfully")):(await D({booking_id:parseInt(a),guest_id:parseInt(s),room_id:parseInt(e),status:o}),alert("Check-in created successfully")),C(),await v()}catch(n){console.error("Error saving check-in:",n),alert("Error saving check-in")}}async function Ct(t){try{const s=await(await fetch(`${h}/checkins/${t}`)).json();w(s)}catch(a){console.error("Error loading check-in:",a),alert("Error loading check-in")}}async function qt(t){if(confirm("Are you sure you want to delete this check-in?"))try{await B(t),alert("Check-in deleted successfully"),await v()}catch(a){console.error("Error deleting check-in:",a),alert("Error deleting check-in")}}function It(){y(),document.querySelector("#btn-add-checkout")?.addEventListener("click",()=>q()),document.querySelectorAll("#checkout-modal .modal-close, #checkout-modal .modal-close-btn").forEach(e=>{e.addEventListener("click",()=>I())}),document.querySelector("#checkout-form")?.addEventListener("submit",async e=>{e.preventDefault(),await Tt()})}async function y(){try{const t=document.querySelector("#checkouts-tbody");if(!t)return;t.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>';const s=(await _()).data||[];if(s.length===0){t.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px; color: #7a7d7a;">No check-outs found</td></tr>';return}t.innerHTML=s.map(e=>`
		<tr>
			<td>${e.booking_id||"N/A"}</td>
			<td>${e.guest_id||"N/A"}</td>
			<td>${e.room_id||"N/A"}</td>
			<td>${new Date(e.checkout_time).toLocaleString()}</td>
			<td><span class="status-pill ${e.status==="COMPLETED"?"success":"pending"}">${e.status||"PENDING"}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${e.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${e.id}">✕ Delete</button>
			</td>
		</tr>
	`).join(""),document.querySelectorAll("#checkouts-tbody .edit-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await At(n)})}),document.querySelectorAll("#checkouts-tbody .delete-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await Mt(n)})})}catch(t){console.error("Error loading check-outs:",t);const a=document.querySelector("#checkouts-tbody");a&&(a.innerHTML='<tr><td colspan="6" style="text-align: center; color: #d8647a;">Error loading check-outs</td></tr>')}}function q(t){const a=document.querySelector("#checkout-modal");if(!a)return;const s=document.querySelector("#checkout-modal-title");s&&(s.textContent=t?"Edit Check-out":"New Check-out");const e=document.querySelector("#checkout-form");e&&(e.reset(),t?(document.querySelector("#checkout-booking-id").value=t.booking_id||"",document.querySelector("#checkout-guest-id").value=t.guest_id||"",document.querySelector("#checkout-room-id").value=t.room_id||"",document.querySelector("#checkout-status").value=t.status||"PENDING",e.dataset.checkoutId=t.id):delete e.dataset.checkoutId),a.classList.add("show"),a.style.display="flex"}function I(){const t=document.querySelector("#checkout-modal");t&&(t.classList.remove("show"),t.style.display="none")}async function Tt(){const t=document.querySelector("#checkout-form");if(!t)return;const a=document.querySelector("#checkout-booking-id").value,s=document.querySelector("#checkout-guest-id").value,e=document.querySelector("#checkout-room-id").value,o=document.querySelector("#checkout-status").value;if(!a||!s||!e){alert("Please fill in all required fields");return}try{const n=t.dataset.checkoutId;n?(await G(n,{status:o}),alert("Check-out updated successfully")):(await H({booking_id:parseInt(a),guest_id:parseInt(s),room_id:parseInt(e),status:o}),alert("Check-out created successfully")),I(),await y()}catch(n){console.error("Error saving check-out:",n),alert("Error saving check-out")}}async function At(t){try{const s=await(await fetch(`${h}/checkouts/${t}`)).json();q(s)}catch(a){console.error("Error loading check-out:",a),alert("Error loading check-out")}}async function Mt(t){if(confirm("Are you sure you want to delete this check-out?"))try{await U(t),alert("Check-out deleted successfully"),await y()}catch(a){console.error("Error deleting check-out:",a),alert("Error deleting check-out")}}function Rt(){k(),document.querySelector("#btn-add-maintenance")?.addEventListener("click",()=>T()),document.querySelectorAll("#maintenance-modal .modal-close, #maintenance-modal .modal-close-btn").forEach(e=>{e.addEventListener("click",()=>A())}),document.querySelector("#maintenance-form")?.addEventListener("submit",async e=>{e.preventDefault(),await Lt()})}async function k(){try{const t=document.querySelector("#maintenance-tbody");if(!t)return;t.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading...</td></tr>';const s=(await J()).data||[];if(s.length===0){t.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px; color: #7a7d7a;">No maintenance requests found</td></tr>';return}t.innerHTML=s.map(e=>`
		<tr>
			<td>${e.room_id||"N/A"}</td>
			<td>${e.request_type||"N/A"}</td>
			<td>${e.description||""}</td>
			<td><span class="status-pill">${e.priority||"MEDIUM"}</span></td>
			<td><span class="status-pill ${e.status==="CLOSED"?"success":"pending"}">${e.status||"OPEN"}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${e.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${e.id}">✕ Delete</button>
			</td>
		</tr>
	`).join(""),document.querySelectorAll("#maintenance-tbody .edit-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await $t(n)})}),document.querySelectorAll("#maintenance-tbody .delete-btn").forEach(e=>{e.addEventListener("click",async o=>{const n=o.target.getAttribute("data-id");n&&await xt(n)})})}catch(t){console.error("Error loading maintenance:",t);const a=document.querySelector("#maintenance-tbody");a&&(a.innerHTML='<tr><td colspan="6" style="text-align: center; color: #d8647a;">Error loading maintenance</td></tr>')}}function T(t){const a=document.querySelector("#maintenance-modal");if(!a)return;const s=document.querySelector("#maintenance-modal-title");s&&(s.textContent=t?"Edit Request":"New Maintenance Request");const e=document.querySelector("#maintenance-form");e&&(e.reset(),t?(document.querySelector("#maintenance-room-id").value=t.room_id||"",document.querySelector("#maintenance-type").value=t.request_type||"",document.querySelector("#maintenance-description").value=t.description||"",document.querySelector("#maintenance-priority").value=t.priority||"MEDIUM",document.querySelector("#maintenance-status").value=t.status||"OPEN",e.dataset.maintenanceId=t.id):delete e.dataset.maintenanceId),a.classList.add("show"),a.style.display="flex"}function A(){const t=document.querySelector("#maintenance-modal");t&&(t.classList.remove("show"),t.style.display="none")}async function Lt(){const t=document.querySelector("#maintenance-form");if(!t)return;const a=document.querySelector("#maintenance-room-id").value,s=document.querySelector("#maintenance-type").value,e=document.querySelector("#maintenance-description").value,o=document.querySelector("#maintenance-priority").value,n=document.querySelector("#maintenance-status").value;if(!a||!s||!e){alert("Please fill in all required fields");return}try{const d=t.dataset.maintenanceId;d?(await j(d,{request_type:s,description:e,priority:o,status:n}),alert("Maintenance request updated successfully")):(await Y({room_id:parseInt(a),request_type:s,description:e,priority:o,status:n}),alert("Maintenance request created successfully")),A(),await k()}catch(d){console.error("Error saving maintenance:",d),alert("Error saving maintenance request")}}async function $t(t){try{const s=await(await fetch(`${h}/maintenance/${t}`)).json();T(s)}catch(a){console.error("Error loading maintenance:",a),alert("Error loading maintenance request")}}async function xt(t){if(confirm("Are you sure you want to delete this maintenance request?"))try{await z(t),alert("Maintenance request deleted successfully"),await k()}catch(a){console.error("Error deleting maintenance:",a),alert("Error deleting maintenance request")}}function Ot(){Nt()}async function Nt(){try{const t=await W(),a=document.querySelector("#report-bookings"),s=document.querySelector("#report-rooms"),e=document.querySelector("#report-guests"),o=document.querySelector("#report-revenue");a&&(a.textContent=t.bookings||"0"),s&&(s.textContent=t.rooms||"0"),e&&(e.textContent=t.guests||"0"),o&&(o.textContent=`$${parseFloat(t.revenue||0).toFixed(2)}`);const n=await K(),d=document.querySelector("#occupancy-tbody");d&&n.data&&(d.innerHTML=n.data.map(u=>`
				<tr>
					<td>${u.status}</td>
					<td>${u.total}</td>
				</tr>
			`).join(""));const c=await Q(),r=document.querySelector("#revenue-tbody");r&&c.data&&(r.innerHTML=c.data.map(u=>`
				<tr>
					<td>${u.day}</td>
					<td>$${parseFloat(u.revenue||0).toFixed(2)}</td>
				</tr>
			`).join(""))}catch(t){console.error("Error loading reports:",t),alert("Error loading reports data")}}function Pt(){return`
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
            <input name="email" type="email" placeholder="you@harborhouse.com" required />
            <label>Password</label>
            <div class="password-row">
              <input id="password" name="password" type="password" placeholder="Enter your password" required minlength="4" />
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
  `}window.addEventListener("hashchange",m);window.addEventListener("load",()=>{window.location.hash||(window.location.hash="#/admin/dashboard")});m();
