// ============================================================
// DATA
// ============================================================
const products = [
  {
    id: 0, name: 'Rizal Lounge Sofa', category: 'Living',
    emoji: '🛋️', price: '₱18,000 – ₱45,000', badge: 'Popular',
    materials: ['Solid Acacia', 'High-Density Foam', 'Velvet / Linen'],
    desc: 'Inspired by classic Filipino sala sets with a modern silhouette. The Rizal Lounge Sofa features a wide-arm solid acacia frame with deep-seated cushions wrapped in premium upholstery. Customizable in fabric, color, and size — from 2-seater to L-shaped.',
    specs: [
      ['Dimensions', '220cm × 90cm × 85cm'],
      ['Frame', 'Solid Acacia Wood'],
      ['Finish', 'Natural Oil / Dark Walnut'],
      ['Lead Time', '3–5 weeks'],
      ['Warranty', '5 years structural']
    ]
  },
  {
    id: 1, name: 'Tondo Accent Chair', category: 'Living',
    emoji: '🪑', price: '₱8,000 – ₱22,000',
    materials: ['Rattan', 'Teak', 'Leather'],
    desc: 'A bold accent chair that celebrates Filipino rattan weaving traditions. The Tondo Chair combines natural rattan with a solid teak base and premium leather cushioning. A conversation piece that commands attention.',
    specs: [
      ['Dimensions', '75cm × 75cm × 90cm'],
      ['Frame', 'Solid Teak'],
      ['Back', 'Handwoven Rattan'],
      ['Lead Time', '2–3 weeks'],
      ['Warranty', '5 years structural']
    ]
  },
  {
    id: 2, name: 'Intramuros Dining Set', category: 'Dining',
    emoji: '🪵', price: '₱25,000 – ₱70,000', badge: 'Best Seller',
    materials: ['Narra Wood', 'Solid Teak', 'Leather Seats'],
    desc: 'Inspired by the heritage architecture of old Manila, the Intramuros Dining Set is a statement of grandeur. The hand-carved narra table pairs with high-back leather dining chairs for an unforgettable dining experience.',
    specs: [
      ['Table Size', '180cm × 90cm (extendable)'],
      ['Chairs Included', '4 – 8 (configurable)'],
      ['Wood', 'Philippine Narra / Teak'],
      ['Lead Time', '4–6 weeks'],
      ['Warranty', '5 years structural']
    ]
  },
  {
    id: 3, name: 'Binondo Coffee Table', category: 'Dining',
    emoji: '☕', price: '₱6,500 – ₱18,000',
    materials: ['Reclaimed Wood', 'Iron Hairpin Legs'],
    desc: 'Urban industrial meets Manila heritage. The Binondo Coffee Table features a live-edge reclaimed wood top on minimalist iron hairpin legs. Each table is truly one-of-a-kind — no two pieces of reclaimed wood are identical.',
    specs: [
      ['Dimensions', '120cm × 60cm × 45cm'],
      ['Top', 'Reclaimed Mango / Acacia'],
      ['Legs', 'Powder-coated Iron'],
      ['Lead Time', '2–4 weeks'],
      ['Warranty', '3 years']
    ]
  },
  {
    id: 4, name: 'Malate Wardrobe', category: 'Bedroom',
    emoji: '🚪', price: '₱30,000 – ₱85,000',
    materials: ['Solid Mahogany', 'Soft-Close Hinges', 'Mirror Panels'],
    desc: 'Floor-to-ceiling elegance for the modern Filipino bedroom. The Malate Wardrobe offers a fully customizable interior — hanging rails, drawers, and shelving — wrapped in a rich solid mahogany exterior with optional mirror panels.',
    specs: [
      ['Dimensions', 'Custom to your space'],
      ['Material', 'Solid Mahogany'],
      ['Hardware', 'Blum Soft-Close'],
      ['Lead Time', '5–7 weeks'],
      ['Warranty', '5 years structural']
    ]
  },
  {
    id: 5, name: 'Makati Platform Bed', category: 'Bedroom',
    emoji: '🛏️', price: '₱22,000 – ₱60,000', badge: 'New',
    materials: ['Solid Acacia', 'Upholstered Headboard', 'Storage Option'],
    desc: 'Low-profile and luxurious, the Makati Platform Bed brings boutique hotel aesthetics into your bedroom. A slatted solid acacia base elevates a tufted upholstered headboard, available with optional under-bed storage drawers.',
    specs: [
      ['Sizes', 'Single / Double / Queen / King'],
      ['Frame', 'Solid Acacia'],
      ['Headboard', 'Upholstered Foam & Fabric'],
      ['Lead Time', '3–5 weeks'],
      ['Warranty', '5 years']
    ]
  },
  {
    id: 6, name: 'BGC Executive Desk', category: 'Office',
    emoji: '💼', price: '₱15,000 – ₱40,000',
    materials: ['Solid Oak', 'Cable Management', 'Steel Legs'],
    desc: 'Engineered for focus and built to impress. The BGC Executive Desk is a wide-format work surface with integrated cable management channels and optional privacy panels. Perfect for home offices and corporate spaces alike.',
    specs: [
      ['Dimensions', '160cm × 80cm × 75cm'],
      ['Top', 'Solid Oak / Veneer'],
      ['Legs', 'Brushed Steel'],
      ['Lead Time', '3–4 weeks'],
      ['Warranty', '5 years']
    ]
  },
  {
    id: 7, name: 'Bespoke Series', category: 'Custom',
    emoji: '✏️', price: '₱30,000 & above', badge: 'Signature',
    materials: ['Any Wood', 'Custom Upholstery', 'Your Vision'],
    desc: 'The pinnacle of FOUR-D craftsmanship. The Bespoke Series is for clients who demand something truly unique. Our designers work with you from concept to completion — choosing every material, dimension, and finish to bring your vision to life.',
    specs: [
      ['Scope', 'Any furniture type'],
      ['Process', 'Consultation → Design → Build'],
      ['Timeline', '6–12 weeks (varies)'],
      ['Min. Order', 'Single piece or full room'],
      ['Warranty', 'Lifetime craftsmanship']
    ]
  }
];

// ============================================================
// NAVIGATION
// ============================================================
let currentScreen = 'splash';
let previousScreen = 'home';
const navScreens = ['home','collections','inquiry','about','showroom'];

function navigate(targetId) {
  if (targetId === currentScreen) return;

  const current = document.getElementById(currentScreen);
  const target = document.getElementById(targetId);

  current.classList.remove('active');
  current.classList.add('slide-out');
  setTimeout(() => {
    current.classList.remove('slide-out');
  }, 400);

  target.style.transform = 'translateX(30px)';
  target.classList.add('active');
  requestAnimationFrame(() => {
    target.style.transform = '';
  });

  // Nav bar
  const bottomNav = document.getElementById('bottom-nav');
  bottomNav.style.display = navScreens.includes(targetId) ? 'flex' : 'flex';

  // Update active nav
  navScreens.forEach(s => {
    const btn = document.getElementById('nav-' + s);
    if (btn) btn.classList.toggle('active', s === targetId);
  });

  // Hide nav for product-detail
  if (targetId === 'product-detail') {
    bottomNav.style.opacity = '0';
    bottomNav.style.pointerEvents = 'none';
  } else {
    bottomNav.style.opacity = '1';
    bottomNav.style.pointerEvents = 'all';
  }

  previousScreen = currentScreen;
  currentScreen = targetId;
}

// ============================================================
// COLLECTIONS / FILTER
// ============================================================
let activeFilter = 'All';

function renderProducts(filter) {
  const grid = document.getElementById('prod-grid');
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map((p, i) => `
    <div class="prod-card" style="animation-delay:${i * 0.06}s" onclick="openProduct(${p.id})">
      <div class="prod-card-img">
        ${p.badge ? `<div class="prod-badge">${p.badge}</div>` : ''}
        ${p.emoji}
      </div>
      <div class="prod-card-body">
        <div class="prod-card-cat">${p.category}</div>
        <div class="prod-card-name">${p.name}</div>
        <div class="prod-price">${p.price}</div>
        <div class="prod-material">${p.materials[0]}</div>
      </div>
    </div>
  `).join('');
}

function setFilter(filter, el) {
  activeFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderProducts(filter);
}

function filterCollections(cat) {
  navigate('collections');
  setTimeout(() => {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => {
      if (t.textContent === cat) {
        setFilter(cat, t);
      }
    });
  }, 100);
}

// ============================================================
// PRODUCT DETAIL
// ============================================================
function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById('detail-emoji').textContent = p.emoji;
  document.getElementById('detail-cat').textContent = p.category;
  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-price').textContent = p.price;
  document.getElementById('detail-desc').textContent = p.desc;

  const materialsEl = document.getElementById('detail-materials');
  materialsEl.innerHTML = p.materials.map(m => `<div class="material-chip">${m}</div>`).join('');

  const specsEl = document.getElementById('detail-specs');
  specsEl.innerHTML = p.specs.map(([k,v]) => `
    <div class="spec-row">
      <span class="spec-key">${k}</span>
      <span class="spec-val">${v}</span>
    </div>
  `).join('');

  navigate('product-detail');
}

// ============================================================
// INQUIRY FORM
// ============================================================
function submitInquiry() {
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();

  if (!name || !phone) {
    // Shake animation on empty fields
    [document.getElementById('f-name'), document.getElementById('f-phone')].forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = '#c9504c';
        el.style.animation = 'none';
        setTimeout(() => {
          el.style.borderColor = 'var(--border)';
        }, 2000);
      }
    });
    return;
  }

  const overlay = document.getElementById('success-overlay');
  overlay.classList.add('show');
}

function closeSuccess() {
  document.getElementById('success-overlay').classList.remove('show');
  // Clear form
  ['f-name','f-phone','f-email','f-product','f-date','f-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  navigate('home');
}

// ============================================================
// INIT
// ============================================================
renderProducts('All');

// Auto-advance splash after 2.5s
setTimeout(() => {
  document.getElementById('splash').classList.remove('active');
  navigate('home');
}, 2600);

// Clock
function updateClock() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.querySelector('.status-time').textContent = `${h}:${m.toString().padStart(2,'0')} ${ampm}`;
}
updateClock();
setInterval(updateClock, 60000);