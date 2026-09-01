(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();const c=[{key:"dashboard",label:"Dashboard",section:"Universal"},{key:"hotels",label:"Hotels",section:"Universal"},{key:"transaction",label:"Transaction",section:"Universal"},{key:"room-book",label:"Room Book",section:"Room Book",isGroup:!0},{key:"booking-list",label:"Booking List",section:"Room Book",parentKey:"room-book"},{key:"check-out",label:"Room Checkout",section:"Room Book",parentKey:"room-book"},{key:"room-status",label:"Room Status",section:"Room Book",parentKey:"room-book"},{key:"room-facilities",label:"Room Facilities",section:"Room Facilities",isGroup:!0},{key:"facilities-list",label:"Facilities List",section:"Room Facilities",parentKey:"room-facilities"},{key:"facilities-details",label:"Facilities Details",section:"Room Facilities",parentKey:"room-facilities"},{key:"room-size",label:"Room Size",section:"Room Facilities",parentKey:"room-facilities"},{key:"housekeeping",label:"Housekeeping",section:"Housekeeping",isGroup:!0},{key:"assign-room",label:"Assign Room",section:"Housekeeping",parentKey:"housekeeping"}],r=document.querySelector("#root"),b="harbor-session",y="http://localhost:5000/api";async function l(t,e){try{const o=await fetch(`${y}${t}`,{headers:{"Content-Type":"application/json"},...e});if(!o.ok)throw new Error(`API Error: ${o.status}`);return await o.json()}catch(o){throw console.error("API call failed:",o),o}}async function k(t=10,e=0){return l(`/bookings?limit=${t}&offset=${e}`)}async function f(t){return l(`/bookings/${t}`)}async function S(t){return l("/bookings",{method:"POST",body:JSON.stringify(t)})}async function w(t,e){return l(`/bookings/${t}`,{method:"PUT",body:JSON.stringify(e)})}async function A(t){return l(`/bookings/${t}`,{method:"DELETE"})}function R(){return window.localStorage.getItem(b)==="active"}function T(){const t=window.location.hash.replace("#/admin/","");return c.some(e=>e.key===t)?t:"dashboard"}function E(t){const e=c.find(s=>s.key===t)??c[1],o=t==="hotels"?"Hotels":t==="transaction"?"Transaction":t==="room-book"?"Room Book":t==="booking-list"?"Room Booking List":t==="check-out"?"Check Out":e.label;return`
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
          ${I(t)}
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
            <div class="breadcrumb">Home <span>/</span> ${o}</div>
            <div class="workspace-actions">
              <button class="mini-square" type="button">＋</button>
              <button class="mini-square" type="button">⌂</button>
            </div>
          </div>

          <div class="page-title-row">
            <h1>${o}</h1>
            
            ${t==="room-book"||t==="room-status"||t==="check-out"?'<button class="primary-action" type="button">New Booking</button>':""}
            ${t==="booking-list"?'<button class="primary-action" type="button">Book Now</button>':""}
            ${t==="hotels"?'<button class="primary-action" type="button">New Hotel</button>':""}
          </div>

          ${P(t)}
        </div>
      </main>
    </div>
  `}function I(t){return[{label:"Universal",items:["dashboard","hotels","transaction"]},{label:"Room Book",items:["room-book","booking-list","check-out","room-status"]},{label:"Room Facilities",items:["room-facilities","facilities-list","facilities-details","room-size"]},{label:"Housekeeping",items:["housekeeping","assign-room"]}].map(o=>{const s=o.items.map(a=>{const i=c.find(g=>g.key===a),d=a===t,n=i.isGroup||a==="room-book"||a==="room-facilities"||a==="housekeeping";return`
            <a class="nav-link ${d?"active":""} ${n?"group-header":""}" href="#/admin/${a}">
              ${i.label}
            </a>
          `}).join("");return`
        <div class="nav-section">
          <div class="section-label">${o.label}</div>
          ${s}
        </div>
      `}).join("")}function P(t){return{dashboard:F(),hotels:h(),transaction:M(),"room-book":$(),"booking-list":C(),"check-out":B(),"room-status":O(),"room-facilities":x(),"facilities-list":D(),"facilities-details":L(),"room-size":N(),housekeeping:q(),"assign-room":_()}[t]??h()}function F(){return`
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
  `}function h(){return`
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
  `}function M(){return`
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
  `}function $(){return`
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
  `}function C(){return`
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
  `}function B(){return`
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
  `}function O(){return`
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
  `}function x(){return`
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
  `}function D(){return`
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
  `}function L(){return`
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
  `}function N(){return`
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
  `}function q(){return`
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
  `}function _(){return`
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
  `}function p(){if(!r)return;if(!R()){r.innerHTML=J(),r.querySelector("#login-form")?.addEventListener("submit",a=>{a.preventDefault(),window.localStorage.setItem(b,"active"),window.location.hash="#/admin/hotels",p()});const o=r.querySelector("#password"),s=r.querySelector("#show-password");s?.addEventListener("click",()=>{if(!o)return;const a=o.type==="text";o.type=a?"password":"text",s.textContent=a?"Show":"Hide"});return}const t=T();r.innerHTML=E(t),t==="booking-list"&&H(),window.scrollTo(0,0)}function H(){u(),document.querySelector("#btn-add-booking")?.addEventListener("click",()=>m()),document.querySelectorAll(".modal-close, .modal-close-btn").forEach(s=>{s.addEventListener("click",()=>v())}),document.querySelector("#booking-form")?.addEventListener("submit",async s=>{s.preventDefault(),await G()})}async function u(){try{const t=document.querySelector("#bookings-tbody");if(!t)return;t.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px;">Loading...</td></tr>';const o=(await k()).data||[];if(o.length===0){t.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px; color: #7a7d7a;">No bookings found</td></tr>';return}t.innerHTML=o.map(s=>`
		<tr>
			<td>${s.guest_name||"N/A"}</td>
			<td>${s.room_type||"N/A"}</td>
			<td>${s.check_in_date||""}</td>
			<td>${s.check_out_date||""}</td>
			<td>$${parseFloat(s.paid_amount||0).toFixed(2)}</td>
			<td>$${parseFloat(s.balance_amount||0).toFixed(2)}</td>
			<td><span class="status-pill ${s.payment_status==="PAID"?"success":"pending"}">${s.payment_status||"PENDING"}</span></td>
			<td>
				<button class="action-btn edit-btn" data-id="${s.id}">✎ Edit</button>
				<button class="action-btn delete-btn" data-id="${s.id}">✕ Delete</button>
			</td>
		</tr>
	`).join(""),document.querySelectorAll(".edit-btn").forEach(s=>{s.addEventListener("click",async a=>{const i=a.target.getAttribute("data-id");i&&await U(i)})}),document.querySelectorAll(".delete-btn").forEach(s=>{s.addEventListener("click",async a=>{const i=a.target.getAttribute("data-id");i&&await Y(i)})})}catch(t){console.error("Error loading bookings:",t);const e=document.querySelector("#bookings-tbody");e&&(e.innerHTML='<tr><td colspan="8" style="text-align: center; color: #d8647a;">Error loading bookings</td></tr>')}}function m(t){const e=document.querySelector("#booking-modal");if(!e)return;const o=document.querySelector("#modal-title");o&&(o.textContent=t?"Edit Booking":"Add Booking");const s=document.querySelector("#booking-form");s&&(s.reset(),t?(document.querySelector("#booking-name").value=t.guest_name||"",document.querySelector("#booking-room-type").value=t.room_type||"",document.querySelector("#booking-check-in").value=t.check_in_date||"",document.querySelector("#booking-check-out").value=t.check_out_date||"",document.querySelector("#booking-total").value=t.total_amount||"",document.querySelector("#booking-status").value=t.payment_status||"PENDING",s.dataset.bookingId=t.id):delete s.dataset.bookingId),e.classList.add("show"),e.style.display="flex"}function v(){const t=document.querySelector("#booking-modal");t&&(t.classList.remove("show"),t.style.display="none")}async function G(){const t=document.querySelector("#booking-form");if(!t)return;const e=document.querySelector("#booking-name").value,o=document.querySelector("#booking-room-type").value,s=document.querySelector("#booking-check-in").value,a=document.querySelector("#booking-check-out").value,i=parseFloat(document.querySelector("#booking-total").value),d=document.querySelector("#booking-status").value;if(!e||!o||!s||!a){alert("Please fill in all required fields");return}try{const n=t.dataset.bookingId;n?(await w(n,{check_in_date:s,check_out_date:a,payment_status:d}),alert("Booking updated successfully")):(await S({organization_id:1,hotel_id:1,branch_id:1,guest_name:e,check_in_date:s,check_out_date:a,room_type:o,total_amount:i,adults:1,children:0}),alert("Booking created successfully")),v(),await u()}catch(n){console.error("Error saving booking:",n),alert("Error saving booking. Please check the console.")}}async function U(t){try{const e=await f(t);m(e)}catch(e){console.error("Error loading booking:",e),alert("Error loading booking")}}async function Y(t){if(confirm("Are you sure you want to delete this booking?"))try{await A(t),alert("Booking deleted successfully"),await u()}catch(e){console.error("Error deleting booking:",e),alert("Error deleting booking")}}function J(){return`
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
  `}window.addEventListener("hashchange",p);window.addEventListener("load",()=>{window.location.hash||(window.location.hash="#/admin/dashboard")});p();
