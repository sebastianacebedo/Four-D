/* ============================================================
   FOUR-D FURNITURE — Admin Dashboard Script
   admin-script.js

   Responsibilities:
   - localStorage-backed data store (inquiries, appointments, portfolio)
   - Panel/tab navigation
   - Table render + sort + filter
   - Portfolio CRUD with availability toggle
   - Modal management
   - Toast notification system
   - Logout (redirect to index.html)
   ============================================================ */

'use strict';

/* ============================================================
   DEFAULT DATA SEEDS
   Used only if localStorage is empty on first load
   ============================================================ */
const DEFAULT_DATA = {
  inquiries: [
    { id: 'inq-1', name: 'Rafael Cruz',      email: 'rafael@cruzpartners.ph', phone: '+63 912 345 6789', product: 'Executive L-Shape Desk',         message: 'We need 3 desks for our partners room. Narra wood preferred with dark lacquer finish. Please include bulk pricing.',    date: '2025-07-01', status: 'pending'   },
    { id: 'inq-2', name: 'Maria Lim',        email: 'mlim@techflow.ph',       phone: '+63 917 234 5678', product: 'Floor-to-Ceiling Shelving Wall',  message: 'Looking for custom shelving in an L-shaped office. Must accommodate both A4 legal folders and decorative items.',       date: '2025-07-03', status: 'contacted' },
    { id: 'inq-3', name: 'Jerome Mendoza',   email: 'jerome@studiom.ph',      phone: '+63 998 765 4321', product: 'Open Plan Workstation (4-Pod)',   message: 'Designing a 20-person co-working space in BGC. Need modular workstations that can be reconfigured.',                    date: '2025-07-05', status: 'completed' },
    { id: 'inq-4', name: 'Ana Santos',       email: 'ana.santos@realty.ph',   phone: '+63 919 888 1234', product: 'Ergonomic Task Chair',            message: 'Bulk inquiry for 50 ergonomic chairs for our new Makati office. Please send a price list and lead time estimate.',       date: '2025-07-08', status: 'pending'   },
    { id: 'inq-5', name: 'Luis Garcia',      email: 'lgarcia@buildph.com',    phone: '+63 905 456 7890', product: 'Executive Credenza',              message: 'We need a credenza that matches our existing Four-D desk. Same Narra veneer and brushed gold hardware.',                date: '2025-07-09', status: 'pending'   },
    { id: 'inq-6', name: 'Bianca Torres',    email: 'bianca@designco.ph',     phone: '+63 925 111 2233', product: 'Conference Room Chair',           message: 'Require 18 conference chairs for two board rooms. Prefer anthracite grey premium fabric. Can you accommodate?',          date: '2025-07-11', status: 'archived'  },
  ],
  appointments: [
    { id: 'appt-1', name: 'Patricia Reyes',     email: 'patricia@brightoffice.ph', phone: '+63 917 111 2222', date: '2025-07-12', time: '10:00', message: 'Visiting with our interior designer to plan a full fit-out for our BGC branch. Looking at desks and storage.', status: 'pending'   },
    { id: 'appt-2', name: 'Carlos Tan',         email: 'carlos.tan@tangroup.ph',   phone: '+63 932 222 3333', date: '2025-07-14', time: '14:00', message: 'Want to see material samples and finishes for custom executive desks. Possibly ordering 5 units.',              status: 'contacted' },
    { id: 'appt-3', name: 'Sofia Villanueva',   email: 'svillanueva@arch.ph',      phone: '+63 945 333 4444', date: '2025-07-16', time: '09:00', message: 'Architect from a mid-size design firm. Interested in the open-plan pod workstations for a client project.',    status: 'pending'   },
    { id: 'appt-4', name: 'Miguel Aquino',      email: 'maquino@healthph.com',     phone: '+63 918 444 5555', date: '2025-07-10', time: '11:00', message: 'Ergonomic chairs for a medical office. Needs lumbar support demonstration and fabric swatch review.',         status: 'completed' },
  ],
  portfolio: [
    { id: 'p-1', title: 'Executive Leather Chair',         category: 'seating',  available: true,  dimensions: '70W × 65D × 115–125H cm',           materials: 'Full-grain leather, solid steel frame, PU foam',       desc: 'High-back executive chair upholstered in full-grain leather with adjustable lumbar support and polished aluminum base.', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80' },
    { id: 'p-2', title: 'Ergonomic Task Chair',            category: 'seating',  available: true,  dimensions: '65W × 60D × 100–112H cm',            materials: 'Mesh fabric, nylon frame, chrome-finish base',          desc: 'Breathable mesh back task chair with fully adjustable armrests, seat depth, and tilt tension for all-day comfort.', img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80' },
    { id: 'p-3', title: 'Conference Room Chair',           category: 'seating',  available: true,  dimensions: '55W × 58D × 90–98H cm',              materials: 'Premium fabric, solid steel sled base, foam padding',   desc: 'Sleek mid-back chair ideal for boardrooms and meeting spaces, upholstered in premium fabric with polished sled base.', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80' },
    { id: 'p-4', title: 'Executive L-Shape Desk',          category: 'desking',  available: true,  dimensions: '180 × 90 + 120 × 60 cm; H: 76 cm',   materials: 'Solid Narra wood, steel frame, lacquer finish',          desc: 'Spacious L-shaped executive desk with cable management, a floating return, and solid hardwood top in custom finish.', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80' },
    { id: 'p-5', title: 'Sit-Stand Height Adjustable Desk',category: 'desking',  available: false, dimensions: '160W × 80D cm; H: 62–128 cm',         materials: 'Solid rubber wood top, powder-coated steel legs',       desc: 'Electric height-adjustable desk with programmable memory settings, solid wood surface, and built-in USB charging ports.', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80' },
    { id: 'p-6', title: 'Open Plan Workstation (4-Pod)',   category: 'desking',  available: true,  dimensions: '280 × 280 cm; H: 75 / 125 cm screen', materials: 'HMR board, melamine finish, aluminum trim',             desc: 'Modular 4-person workstation cluster with integrated privacy screens, shared cable channels, and custom surface finishes.', img: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&q=80' },
    { id: 'p-7', title: 'Floor-to-Ceiling Shelving Wall',  category: 'storage',  available: true,  dimensions: 'Custom W; D: 35 cm; H: up to 300 cm', materials: 'Solid wood, MDF panels, integrated LED strip lighting', desc: 'Built-in shelving system with adjustable shelves, integrated lighting, and sliding wood panels for a clean, minimal look.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { id: 'p-8', title: 'Mobile Pedestal Filing Cabinet',  category: 'storage',  available: true,  dimensions: '42W × 55D × 60H cm',                  materials: 'Cold-rolled steel, powder-coat finish, nylon casters',  desc: 'Under-desk mobile pedestal with two box drawers and one file drawer, locking mechanism, and silent casters.', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80' },
    { id: 'p-9', title: 'Executive Credenza',              category: 'storage',  available: true,  dimensions: '180W × 45D × 75H cm',                 materials: 'Narra veneer, solid wood legs, brushed gold hardware',  desc: 'Low-profile credenza with hinged cabinet doors, central locking drawer, and custom wood veneer top matching desk sets.', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  ]
};

/* ============================================================
   LOCALSTORAGE DATA LAYER
   ============================================================ */
const LS_KEY = 'fourD_adminDB';

function loadDB() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) { /* ignore parse error */ }
  return JSON.parse(JSON.stringify(DEFAULT_DATA)); // deep clone
}

function saveDB() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(DB));
  } catch(e) {
    showToast('Storage quota exceeded — changes may not persist.', 'danger');
  }
}

/** Clear all localStorage data and reload with defaults */
function resetDB() {
  if (!confirm('Reset all admin data to factory defaults?\n\nThis cannot be undone.')) return;
  localStorage.removeItem(LS_KEY);
  DB = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveDB();
  renderAll();
  showToast('Data reset to factory defaults.', 'info');
}

let DB = loadDB();

/* ============================================================
   SORT STATE
   ============================================================ */
const sortState = {
  inq:  { key: 'date', asc: false },
  appt: { key: 'date', asc: true  },
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initModalDismiss();
  setCurrentDate();
  renderAll();
  attachImgPreview();
});

function setCurrentDate() {
  const el = document.getElementById('topbarDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-PH', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });
}

/* ============================================================
   RENDER ALL
   ============================================================ */
function renderAll() {
  refreshStats();
  renderOverview();
  renderInqTable();
  renderApptTable();
  renderPortfolioGrid();
}

/* ============================================================
   STATS
   ============================================================ */
function refreshStats() {
  const pendingInq   = DB.inquiries.filter(i => i.status === 'pending').length;
  const pendingAppt  = DB.appointments.filter(a => a.status === 'pending').length;
  const activePort   = DB.portfolio.filter(p => p.available).length;
  const unavailPort  = DB.portfolio.filter(p => !p.available).length;

  setText('statInqTotal',    DB.inquiries.length);
  setText('statInqPending',  pendingInq + ' pending response');
  setText('statApptPending', pendingAppt);
  setText('statApptTotal',   DB.appointments.length + ' total appointments');
  setText('statPortActive',  activePort);
  setText('statPortUnavail', unavailPort + ' marked unavailable');

  // Sidebar badges
  setText('badgeInq',  pendingInq  || '');
  setText('badgeAppt', pendingAppt || '');

  const bInq  = document.getElementById('badgeInq');
  const bAppt = document.getElementById('badgeAppt');
  if (bInq)  bInq.style.display  = pendingInq  > 0 ? '' : 'none';
  if (bAppt) bAppt.style.display = pendingAppt > 0 ? '' : 'none';
}

/* ============================================================
   OVERVIEW PANEL (latest 3 rows each)
   ============================================================ */
function renderOverview() {
  const latestInq  = [...DB.inquiries].sort((a,b) => b.date.localeCompare(a.date)).slice(0,3);
  const latestAppt = [...DB.appointments].sort((a,b) => a.date.localeCompare(b.date)).slice(0,3);

  const inqBody = document.getElementById('ovInqBody');
  if (inqBody) {
    inqBody.innerHTML = latestInq.length
      ? latestInq.map(i => `
        <tr>
          <td><div class="td-primary">${esc(i.name)}</div></td>
          <td>${esc(i.product)}</td>
          <td>${fmtDate(i.date)}</td>
          <td>${badgeHTML(i.status)}</td>
        </tr>`).join('')
      : `<tr><td colspan="4"><div class="tbl-empty"><span class="empty-glyph">📭</span>No inquiries yet.</div></td></tr>`;
  }

  const apptBody = document.getElementById('ovApptBody');
  if (apptBody) {
    apptBody.innerHTML = latestAppt.length
      ? latestAppt.map(a => `
        <tr>
          <td><div class="td-primary">${esc(a.name)}</div></td>
          <td>${fmtDate(a.date)}</td>
          <td>${fmtTime(a.time)}</td>
          <td>${badgeHTML(a.status)}</td>
        </tr>`).join('')
      : `<tr><td colspan="4"><div class="tbl-empty"><span class="empty-glyph">📅</span>No appointments yet.</div></td></tr>`;
  }
}

/* ============================================================
   INQUIRY TABLE
   ============================================================ */
function renderInqTable() {
  const q    = (document.getElementById('inqSearch')?.value || '').toLowerCase();
  const { key, asc } = sortState.inq;

  let data = DB.inquiries.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.email.toLowerCase().includes(q) ||
    i.product.toLowerCase().includes(q)
  );

  data = sortArr(data, key, asc);

  setText('inqCount', `${data.length} of ${DB.inquiries.length} entr${DB.inquiries.length === 1 ? 'y' : 'ies'}`);

  const tbody = document.getElementById('inqTableBody');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="tbl-empty"><span class="empty-glyph">📭</span>No results match your search.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(i => `
    <tr>
      <td>
        <div class="td-primary">${esc(i.name)}</div>
      </td>
      <td>
        <div class="td-secondary">${esc(i.email)}</div>
        <div class="td-secondary">${esc(i.phone)}</div>
      </td>
      <td>${esc(i.product)}</td>
      <td><div class="td-truncate" title="${esc(i.message)}">${esc(i.message)}</div></td>
      <td style="white-space:nowrap;">${fmtDate(i.date)}</td>
      <td>${badgeHTML(i.status)}</td>
      <td>
        <div class="act-group">
          <button class="act-btn act-view"    onclick="viewDetail('inq','${i.id}')">View</button>
          ${i.status !== 'contacted' && i.status !== 'completed' && i.status !== 'archived'
            ? `<button class="act-btn act-done" onclick="changeStatus('inq','${i.id}','contacted')">Contacted</button>` : ''}
          ${i.status !== 'archived'
            ? `<button class="act-btn act-archive" onclick="changeStatus('inq','${i.id}','archived')">Archive</button>` : ''}
          <button class="act-btn act-delete"  onclick="deleteRecord('inq','${i.id}')">Delete</button>
        </div>
      </td>
    </tr>`).join('');
}

/* ============================================================
   APPOINTMENT TABLE
   ============================================================ */
function renderApptTable() {
  const q    = (document.getElementById('apptSearch')?.value || '').toLowerCase();
  const { key, asc } = sortState.appt;

  let data = DB.appointments.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.email.toLowerCase().includes(q)
  );

  data = sortArr(data, key, asc);

  setText('apptCount', `${data.length} of ${DB.appointments.length} entr${DB.appointments.length === 1 ? 'y' : 'ies'}`);

  const tbody = document.getElementById('apptTableBody');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="tbl-empty"><span class="empty-glyph">📅</span>No results match your search.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(a => `
    <tr>
      <td><div class="td-primary">${esc(a.name)}</div></td>
      <td>
        <div class="td-secondary">${esc(a.email)}</div>
        <div class="td-secondary">${esc(a.phone)}</div>
      </td>
      <td style="white-space:nowrap;">${fmtDate(a.date)}</td>
      <td style="white-space:nowrap;">${fmtTime(a.time)}</td>
      <td><div class="td-truncate" title="${esc(a.message)}">${esc(a.message)}</div></td>
      <td>${badgeHTML(a.status)}</td>
      <td>
        <div class="act-group">
          <button class="act-btn act-view"   onclick="viewDetail('appt','${a.id}')">View</button>
          ${a.status !== 'contacted' && a.status !== 'completed' && a.status !== 'archived'
            ? `<button class="act-btn act-done" onclick="changeStatus('appt','${a.id}','contacted')">Contacted</button>` : ''}
          ${a.status !== 'completed' && a.status !== 'archived'
            ? `<button class="act-btn act-done" style="background:var(--status-completed-bg);color:var(--status-completed-text);border-color:var(--status-completed-bdr);" onclick="changeStatus('appt','${a.id}','completed')">Completed</button>` : ''}
          ${a.status !== 'archived'
            ? `<button class="act-btn act-archive" onclick="changeStatus('appt','${a.id}','archived')">Archive</button>` : ''}
          <button class="act-btn act-delete" onclick="deleteRecord('appt','${a.id}')">Delete</button>
        </div>
      </td>
    </tr>`).join('');
}

/* ============================================================
   PORTFOLIO GRID
   ============================================================ */
function renderPortfolioGrid() {
  const grid = document.getElementById('pmGrid');
  if (!grid) return;

  if (!DB.portfolio.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray);">No portfolio items yet. Add one above.</div>`;
    return;
  }

  grid.innerHTML = DB.portfolio.map(p => `
    <div class="pm-card ${p.available ? '' : 'unavailable'}" id="pm-${p.id}">
      <div class="pm-img">
        <img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=60'" />
        <span class="pm-cat-badge">${capitalize(p.category)}</span>
        <span class="pm-unavail-badge">Unavailable</span>
      </div>
      <div class="pm-body">
        <div class="pm-title">${esc(p.title)}</div>
        <div class="pm-specs">
          <strong>Dim:</strong> ${esc(p.dimensions)}<br>
          <strong>Mat:</strong> ${esc(p.materials)}
        </div>
        <div class="pm-footer">
          <button class="act-btn act-edit" onclick="openEditModal('${p.id}')">✏ Edit</button>
          <button class="act-btn act-delete" onclick="deletePortfolioItem('${p.id}')">Delete</button>
          <div class="avail-toggle-wrap">
            <span class="avail-lbl">Available</span>
            <label class="toggle" title="${p.available ? 'Mark unavailable' : 'Mark available'}">
              <input type="checkbox" ${p.available ? 'checked' : ''}
                     onchange="toggleAvailability('${p.id}', this.checked)" />
              <span class="toggle-track"></span>
            </label>
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* ============================================================
   STATUS CHANGE & DELETE
   ============================================================ */
function changeStatus(type, id, newStatus) {
  const arr  = type === 'inq' ? DB.inquiries : DB.appointments;
  const item = arr.find(x => x.id === id);
  if (!item) return;
  item.status = newStatus;
  saveDB();
  type === 'inq' ? renderInqTable() : renderApptTable();
  renderOverview();
  refreshStats();
  showToast(`Status updated to "${capitalize(newStatus)}".`, 'success');
}

function deleteRecord(type, id) {
  if (!confirm('Permanently delete this record?')) return;
  if (type === 'inq') {
    DB.inquiries = DB.inquiries.filter(i => i.id !== id);
  } else {
    DB.appointments = DB.appointments.filter(a => a.id !== id);
  }
  saveDB();
  type === 'inq' ? renderInqTable() : renderApptTable();
  renderOverview();
  refreshStats();
  showToast('Record deleted.', 'danger');
}

/* ============================================================
   PORTFOLIO ACTIONS
   ============================================================ */
function toggleAvailability(id, isAvailable) {
  const item = DB.portfolio.find(p => p.id === id);
  if (!item) return;
  item.available = isAvailable;
  saveDB();

  // Update card class in-place without full re-render
  const card = document.getElementById('pm-' + id);
  if (card) card.classList.toggle('unavailable', !isAvailable);

  refreshStats();
  showToast(
    `"${item.title}" marked as ${isAvailable ? 'available' : 'unavailable'}.`,
    isAvailable ? 'success' : 'info'
  );
}

function deletePortfolioItem(id) {
  const item = DB.portfolio.find(p => p.id === id);
  if (!item) return;
  if (!confirm(`Delete "${item.title}" from the portfolio?\n\nThis cannot be undone.`)) return;
  DB.portfolio = DB.portfolio.filter(p => p.id !== id);
  saveDB();
  renderPortfolioGrid();
  refreshStats();
  showToast(`"${item.title}" deleted from portfolio.`, 'danger');
}

/* ============================================================
   PORTFOLIO MODAL — ADD
   ============================================================ */
function openAddModal() {
  window._editingPmId = null;
  document.getElementById('pmModalTitle').textContent = 'Add New Portfolio Item';
  document.getElementById('pmSaveBtn').textContent = 'Add to Portfolio';
  clearPmForm();
  openModal('pmModal');
}

/* ============================================================
   PORTFOLIO MODAL — EDIT
   ============================================================ */
function openEditModal(id) {
  const p = DB.portfolio.find(x => x.id === id);
  if (!p) return;
  window._editingPmId = id;
  document.getElementById('pmModalTitle').textContent = 'Edit Portfolio Item';
  document.getElementById('pmSaveBtn').textContent = 'Save Changes';

  document.getElementById('pmTitle').value      = p.title;
  document.getElementById('pmCategory').value   = p.category;
  document.getElementById('pmAvailable').value  = String(p.available);
  document.getElementById('pmDimensions').value = p.dimensions;
  document.getElementById('pmMaterials').value  = p.materials;
  document.getElementById('pmDesc').value       = p.desc;
  document.getElementById('pmImgUrl').value     = p.img;

  const prev = document.getElementById('pmImgPreview');
  const wrap = document.getElementById('pmImgPreviewWrap');
  if (p.img) {
    prev.src = p.img;
    wrap.style.display = 'block';
  } else {
    wrap.style.display = 'none';
  }

  openModal('pmModal');
}

function clearPmForm() {
  ['pmTitle','pmDimensions','pmMaterials','pmDesc','pmImgUrl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const cat = document.getElementById('pmCategory');
  if (cat) cat.value = 'seating';
  const avail = document.getElementById('pmAvailable');
  if (avail) avail.value = 'true';
  const wrap = document.getElementById('pmImgPreviewWrap');
  if (wrap) wrap.style.display = 'none';
}

function savePmItem() {
  const title = document.getElementById('pmTitle').value.trim();
  if (!title) {
    document.getElementById('pmTitle').classList.add('err');
    showToast('Please enter a product title.', 'danger');
    document.getElementById('pmTitle').focus();
    return;
  }
  document.getElementById('pmTitle').classList.remove('err');

  const payload = {
    title,
    category:   document.getElementById('pmCategory').value,
    available:  document.getElementById('pmAvailable').value === 'true',
    dimensions: document.getElementById('pmDimensions').value.trim(),
    materials:  document.getElementById('pmMaterials').value.trim(),
    desc:       document.getElementById('pmDesc').value.trim(),
    img:        document.getElementById('pmImgUrl').value.trim() ||
                'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  };

  if (window._editingPmId) {
    // Edit existing
    const idx = DB.portfolio.findIndex(p => p.id === window._editingPmId);
    if (idx !== -1) {
      DB.portfolio[idx] = { ...DB.portfolio[idx], ...payload };
      showToast(`"${title}" updated successfully.`, 'success');
    }
  } else {
    // Add new
    payload.id = 'p-' + Date.now();
    DB.portfolio.push(payload);
    showToast(`"${title}" added to portfolio.`, 'success');
  }

  saveDB();
  closeModal('pmModal');
  renderPortfolioGrid();
  refreshStats();
}

/* ============================================================
   IMAGE PREVIEW
   ============================================================ */
function attachImgPreview() {
  const urlInput = document.getElementById('pmImgUrl');
  const fileInput = document.getElementById('pmImgFile');
  const preview  = document.getElementById('pmImgPreview');
  const wrap     = document.getElementById('pmImgPreviewWrap');

  if (urlInput) {
    urlInput.addEventListener('input', function() {
      const val = this.value.trim();
      if (val) {
        preview.src = val;
        wrap.style.display = 'block';
      } else {
        wrap.style.display = 'none';
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        urlInput.value = ev.target.result;
        preview.src    = ev.target.result;
        wrap.style.display = 'block';
      };
      reader.readAsDataURL(file);
      showToast('Image loaded (mock upload — data URL).', 'info');
    });
  }
}

/* ============================================================
   DETAIL VIEW MODAL
   ============================================================ */
function viewDetail(type, id) {
  let item, title, rows;

  if (type === 'inq') {
    item  = DB.inquiries.find(i => i.id === id);
    title = 'Inquiry Details';
    rows  = [
      ['Full Name', esc(item.name)],
      ['Email',     esc(item.email)],
      ['Phone',     esc(item.phone)],
      ['Product',   esc(item.product)],
      ['Date',      fmtDate(item.date)],
      ['Status',    badgeHTML(item.status)],
      ['Message',   esc(item.message)],
    ];
  } else {
    item  = DB.appointments.find(a => a.id === id);
    title = 'Appointment Details';
    rows  = [
      ['Full Name', esc(item.name)],
      ['Email',     esc(item.email)],
      ['Phone',     esc(item.phone)],
      ['Date',      fmtDate(item.date)],
      ['Time',      fmtTime(item.time)],
      ['Status',    badgeHTML(item.status)],
      ['Notes',     esc(item.message)],
    ];
  }

  document.getElementById('detailTitle').textContent = title;
  document.getElementById('detailBody').innerHTML = `
    <div class="detail-list">
      ${rows.map(([k, v]) => `
        <div class="detail-item">
          <div class="detail-key">${k}</div>
          <div class="detail-val">${v}</div>
        </div>`).join('')}
    </div>`;

  openModal('detailModal');
}

/* ============================================================
   SORT & SEARCH
   ============================================================ */
function sortTable(type, key) {
  const s = sortState[type];
  s.asc = (s.key === key) ? !s.asc : true;
  s.key = key;
  type === 'inq' ? renderInqTable() : renderApptTable();
}

function filterTable(type) {
  type === 'inq' ? renderInqTable() : renderApptTable();
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initSidebar() {
  const btn     = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (btn) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      btn.classList.remove('open');
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Tab switching via data-panel
  document.querySelectorAll('[data-panel]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      // Allow plain links (live-link, logout) to pass through
      if (href && href !== '#') return;
      e.preventDefault();
      switchPanel(link.dataset.panel);
      // Close mobile sidebar
      btn?.classList.remove('open');
      sidebar?.classList.remove('open');
      overlay?.classList.remove('open');
    });
  });
}

function switchPanel(panelId) {
  // Deactivate all panels
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  // Deactivate all nav links
  document.querySelectorAll('.sidebar-nav [data-panel]').forEach(a => a.classList.remove('active'));

  // Activate target
  const panel = document.getElementById('panel-' + panelId);
  if (panel) panel.classList.add('active');

  const link = document.querySelector(`.sidebar-nav [data-panel="${panelId}"]`);
  if (link) link.classList.add('active');

  // Breadcrumb
  const labels = {
    overview:     'Dashboard',
    inquiries:    'Inquiries',
    appointments: 'Appointments',
    portfolio:    'Portfolio Manager',
  };
  setText('breadcrumbLabel', labels[panelId] || panelId);

  // Re-render if switching to a data panel
  if (panelId === 'inquiries')    renderInqTable();
  if (panelId === 'appointments') renderApptTable();
  if (panelId === 'portfolio')    renderPortfolioGrid();
}

/* ============================================================
   LOGOUT — redirect to public site
   ============================================================ */
function handleLogout() {
  if (!confirm('End admin session and return to the public site?')) return;
  showToast('Session ended. Redirecting…', 'neutral');
  setTimeout(() => { window.location.href = 'index.html'; }, 1200);
}

/* ============================================================
   MODAL UTILITIES
   ============================================================ */
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

function initModalDismiss() {
  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg, type = 'neutral') {
  const container = document.getElementById('toastWrap');
  if (!container) return;

  const icons = { success: '✓', danger: '✕', info: 'ℹ', neutral: '◆' };
  const el    = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type] || '◆'}</span>${msg}`;
  container.appendChild(el);

  setTimeout(() => {
    el.classList.add('fadeout');
    setTimeout(() => el.remove(), 320);
  }, 3600);
}

/* ============================================================
   HELPERS
   ============================================================ */
function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function badgeHTML(status) {
  const map = {
    pending:   'badge-pending',
    contacted: 'badge-contacted',
    archived:  'badge-archived',
    completed: 'badge-completed',
  };
  return `<span class="badge ${map[status] || 'badge-archived'}">${esc(status)}</span>`;
}

function fmtDate(str) {
  if (!str) return '—';
  // Parse as local date (avoid UTC shift)
  const [y,m,d] = str.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtTime(str) {
  if (!str) return '—';
  const [h, min] = str.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hr     = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hr}:${String(min).padStart(2, '0')} ${period}`;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sortArr(arr, key, asc) {
  return [...arr].sort((a, b) => {
    const va = String(a[key] ?? '').toLowerCase();
    const vb = String(b[key] ?? '').toLowerCase();
    return asc ? va.localeCompare(vb) : vb.localeCompare(va);
  });
}
