(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();const l=[{key:"dashboard",label:"Dashboard",section:"Universal"},{key:"hotels",label:"Hotels",section:"Universal"},{key:"transaction",label:"Transaction",section:"Universal"},{key:"room-book",label:"Room Book",section:"Room Book",isGroup:!0},{key:"booking-list",label:"Booking List",section:"Room Book",parentKey:"room-book"},{key:"check-out",label:"Room Checkout",section:"Room Book",parentKey:"room-book"},{key:"room-status",label:"Room Status",section:"Room Book",parentKey:"room-book"},{key:"room-facilities",label:"Room Facilities",section:"Room Facilities",isGroup:!0},{key:"facilities-list",label:"Facilities List",section:"Room Facilities",parentKey:"room-facilities"},{key:"facilities-details",label:"Facilities Details",section:"Room Facilities",parentKey:"room-facilities"},{key:"room-size",label:"Room Size",section:"Room Facilities",parentKey:"room-facilities"},{key:"housekeeping",label:"Housekeeping",section:"Housekeeping",isGroup:!0},{key:"assign-room",label:"Assign Room",section:"Housekeeping",parentKey:"housekeeping"}],n=document.querySelector("#root"),p="harbor-session";function m(){return window.localStorage.getItem(p)==="active"}function b(){const s=window.location.hash.replace("#/admin/","");return l.some(e=>e.key===s)?s:"dashboard"}function k(s){const e=l.find(o=>o.key===s)??l[1],i=s==="hotels"?"Hotels":s==="transaction"?"Transaction":s==="room-book"?"Room Book":s==="booking-list"?"Room Booking List":s==="check-out"?"Check Out":e.label;return`
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
          ${g(s)}
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
            <div class="breadcrumb">Home <span>/</span> ${i}</div>
            <div class="workspace-actions">
              <button class="mini-square" type="button">＋</button>
              <button class="mini-square" type="button">⌂</button>
            </div>
          </div>

          <div class="page-title-row">
            <h1>${i}</h1>
            
            ${s==="room-book"||s==="room-status"||s==="check-out"?'<button class="primary-action" type="button">New Booking</button>':""}
            ${s==="booking-list"?'<button class="primary-action" type="button">Book Now</button>':""}
            ${s==="hotels"?'<button class="primary-action" type="button">New Hotel</button>':""}
          </div>

          ${y(s)}
        </div>
      </main>
    </div>
  `}function g(s){return[{label:"Universal",items:["dashboard","hotels","transaction"]},{label:"Room Book",items:["room-book","booking-list","check-out","room-status"]},{label:"Room Facilities",items:["room-facilities","facilities-list","facilities-details","room-size"]},{label:"Housekeeping",items:["housekeeping","assign-room"]}].map(i=>{const o=i.items.map(t=>{const a=l.find(v=>v.key===t),r=t===s,h=a.isGroup||t==="room-book"||t==="room-facilities"||t==="housekeeping";return`
            <a class="nav-link ${r?"active":""} ${h?"group-header":""}" href="#/admin/${t}">
              ${a.label}
            </a>
          `}).join("");return`
        <div class="nav-section">
          <div class="section-label">${i.label}</div>
          ${o}
        </div>
      `}).join("")}function y(s){return{dashboard:f(),hotels:c(),transaction:w(),"room-book":u(),"booking-list":S(),"check-out":R(),"room-status":$(),"room-facilities":M(),"facilities-list":B(),"facilities-details":P(),"room-size":F(),housekeeping:H(),"assign-room":x()}[s]??c()}function f(){return`
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
  `}function c(){return`
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
  `}function w(){return`
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
  `}function u(){return`
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
  `}function S(){return u()}function R(){return`
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
  `}function $(){return'<div class="placeholder-box">Room status page</div>'}function M(){return'<div class="placeholder-box">Room facilities page</div>'}function B(){return'<div class="placeholder-box">Facilities list page</div>'}function P(){return'<div class="placeholder-box">Facilities details page</div>'}function F(){return'<div class="placeholder-box">Room size page</div>'}function H(){return'<div class="placeholder-box">Housekeeping page</div>'}function x(){return'<div class="placeholder-box">Assign room page</div>'}function d(){if(!n)return;if(!m()){n.innerHTML=T(),n.querySelector("#login-form")?.addEventListener("submit",t=>{t.preventDefault(),window.localStorage.setItem(p,"active"),window.location.hash="#/admin/hotels",d()});const i=n.querySelector("#password"),o=n.querySelector("#show-password");o?.addEventListener("click",()=>{if(!i)return;const t=i.type==="text";i.type=t?"password":"text",o.textContent=t?"Show":"Hide"});return}const s=b();n.innerHTML=k(s)}function T(){return`
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
  `}window.addEventListener("hashchange",d);window.addEventListener("load",()=>{window.location.hash||(window.location.hash="#/admin/dashboard")});d();
