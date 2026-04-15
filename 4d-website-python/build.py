"""
Four-D Furniture Manufacturing — Static Site Generator
Generates all HTML pages, CSS, and JS for the frontend clone.
Run: python build.py
"""

import os
import json

# ============================================================
# PRODUCT DATA (from original seed.py)
# ============================================================
PRODUCTS = [
    {
        "id": 1,
        "title": "Executive Leather Chair",
        "category": "seating",
        "img_url": "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
        "description": "High-back executive chair upholstered in full-grain leather with adjustable lumbar support and polished aluminum base.",
        "dimension": "70W × 65D × 115–125H cm",
        "material": "Full-grain leather, solid steel frame, PU foam",
        "available": True,
    },
    {
        "id": 2,
        "title": "Ergonomic Task Chair",
        "category": "seating",
        "img_url": "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
        "description": "Breathable mesh back task chair with fully adjustable armrests, seat depth, and tilt tension for all-day comfort.",
        "dimension": "65W × 60D × 100–112H cm",
        "material": "Mesh fabric, nylon frame, chrome-finish base",
        "available": True,
    },
    {
        "id": 3,
        "title": "Executive L-Shape Desk",
        "category": "desking",
        "img_url": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
        "description": "Spacious L-shaped executive desk with cable management, a floating return, and solid hardwood top in custom finish.",
        "dimension": "180 × 90 + 120 × 60 cm; H: 76 cm",
        "material": "Solid Narra wood, steel frame, lacquer finish",
        "available": True,
    },
    {
        "id": 4,
        "title": "Standing Desk Pro",
        "category": "desking",
        "img_url": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
        "description": "Electric height-adjustable standing desk with memory presets, cable tray, and anti-collision sensor for seamless transitions.",
        "dimension": "160W × 80D cm; H: 62–128 cm",
        "material": "Bamboo top, steel frame, dual-motor lift",
        "available": True,
    },
    {
        "id": 5,
        "title": "Floor-to-Ceiling Shelving Wall",
        "category": "storage",
        "img_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        "description": "Built-in shelving system with adjustable shelves, integrated lighting, and sliding wood panels for a clean, minimal look.",
        "dimension": "Custom width; D: 35 cm; H: up to 300 cm",
        "material": "Solid wood, MDF panels, integrated LED strip lighting",
        "available": True,
    },
    {
        "id": 6,
        "title": "Mobile Pedestal Cabinet",
        "category": "storage",
        "img_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        "description": "Rolling under-desk pedestal with two drawers and a file drawer. Lockable, with soft-close mechanism and matching desk finish.",
        "dimension": "40W × 52D × 60H cm",
        "material": "Engineered wood, metal drawer glides, ABS edging",
        "available": True,
    },
    {
        "id": 7,
        "title": "Conference Table — 8 Seater",
        "category": "desking",
        "img_url": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
        "description": "Solid-top conference table with integrated power and data ports, cable management spine, and solid wood legs.",
        "dimension": "240W × 110D × 76H cm",
        "material": "Solid Acacia veneer top, powder-coated steel legs",
        "available": True,
    },
    {
        "id": 8,
        "title": "Mesh Visitor Chair",
        "category": "seating",
        "img_url": "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
        "description": "Stackable mesh visitor chair with contoured back support, padded seat, and chrome sled base — ideal for reception areas.",
        "dimension": "55W × 58D × 85H cm",
        "material": "Mesh back, foam seat, chrome sled base",
        "available": False,
    },
    {
        "id": 9,
        "title": "Lateral Filing Cabinet",
        "category": "storage",
        "img_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
        "description": "Wide lateral file cabinet accommodating letter and legal-size files. Full-extension drawers with central lock and label holders.",
        "dimension": "90W × 45D × 72H cm",
        "material": "Cold-rolled steel, powder-coat finish, ABS pulls",
        "available": True,
    },
]

# ============================================================
# CSS
# ============================================================
CSS = """
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

:root {
  --beige:       #f5efe6;
  --beige-dark:  #e8ddd0;
  --cream:       #faf7f2;
  --brown-light: #c4a882;
  --brown:       #8b6845;
  --brown-dark:  #5c4430;
  --charcoal:    #2d2d2d;
  --gray:        #6b6b6b;
  --gray-light:  #d8d2cb;
  --white:       #ffffff;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'DM Sans', sans-serif;
  --shadow-sm:  0 2px 10px rgba(91,68,48,0.08);
  --shadow-md:  0 6px 24px rgba(91,68,48,0.12);
  --shadow-lg:  0 16px 48px rgba(91,68,48,0.16);
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --transition: 0.3s ease;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background-color: var(--cream);
  color: var(--charcoal);
  line-height: 1.7;
  font-size: 16px;
}
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }

/* ---- NAVBAR ---- */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(250,247,242,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--beige-dark);
  padding: 0 2rem;
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}
.nav-logo { display: flex; flex-direction: column; line-height: 1; }
.nav-logo .brand-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--brown-dark);
  letter-spacing: 0.02em;
}
.nav-logo .brand-tagline {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brown-light);
}
.nav-links { display: flex; gap: 2.5rem; align-items: center; }
.nav-links a {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray);
  font-weight: 500;
  position: relative;
  transition: color var(--transition);
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0;
  width: 0; height: 1px;
  background: var(--brown);
  transition: width var(--transition);
}
.nav-links a:hover, .nav-links a.active { color: var(--brown-dark); }
.nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--brown-dark);
  border-radius: 2px;
  transition: var(--transition);
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-menu {
  display: none;
  flex-direction: column;
  background: var(--cream);
  border-top: 1px solid var(--beige-dark);
  padding: 1rem 0;
}
.mobile-menu.open { display: flex; }
.mobile-menu a {
  padding: 0.75rem 2rem;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--charcoal);
  font-weight: 500;
  border-bottom: 1px solid var(--beige-dark);
  transition: background var(--transition), color var(--transition);
}
.mobile-menu a:hover { background: var(--beige); color: var(--brown-dark); }

/* ---- BUTTONS ---- */
.btn {
  display: inline-block;
  padding: 0.85rem 2rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  transition: all var(--transition);
}
.btn-primary { background: var(--brown-dark); color: var(--white); }
.btn-primary:hover {
  background: var(--brown);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.btn-outline {
  background: transparent;
  color: var(--brown-dark);
  border: 1.5px solid var(--brown-dark);
}
.btn-outline:hover {
  background: var(--brown-dark);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.btn-sm { padding: 0.6rem 1.4rem; font-size: 0.78rem; }

/* ---- SECTION UTILITIES ---- */
section { padding: 5rem 2rem; }
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-label {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--brown-light);
  margin-bottom: 0.75rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: var(--brown-dark);
  line-height: 1.2;
  margin-bottom: 1.25rem;
}
.section-desc { color: var(--gray); max-width: 560px; font-size: 0.95rem; }
.divider {
  width: 48px;
  height: 2px;
  background: var(--brown-light);
  margin: 1.5rem 0;
  border-radius: 2px;
}

/* ---- HERO ---- */
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background:
    linear-gradient(135deg, rgba(250,247,242,0.92) 50%, rgba(232,221,208,0.7) 100%),
    url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80') center/cover no-repeat;
  padding: 5rem 2rem;
}
.hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; }
.hero-label {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--brown);
  background: rgba(196,168,130,0.15);
  border: 1px solid rgba(196,168,130,0.35);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.75rem;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 300;
  color: var(--brown-dark);
  line-height: 1.1;
  max-width: 700px;
  margin-bottom: 1.5rem;
}
.hero-title em { font-style: italic; color: var(--brown); }
.hero-desc {
  font-size: 1.05rem;
  color: var(--gray);
  max-width: 500px;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}
.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-scroll {
  margin-top: 4rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--brown-light);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.scroll-line { width: 40px; height: 1px; background: var(--brown-light); }

/* ---- ABOUT ---- */
.about { background: var(--beige); }
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
.about-image-wrap { position: relative; }
.about-image-wrap img {
  border-radius: var(--radius-lg);
  width: 100%;
  height: 460px;
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}
.about-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--brown-dark);
  color: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  text-align: center;
  min-width: 130px;
}
.about-badge strong {
  display: block;
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1;
}
.about-badge span {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}
.about-stats { display: flex; gap: 2rem; margin-top: 2rem; }
.stat { text-align: center; }
.stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--brown-dark);
  font-weight: 600;
}
.stat span { font-size: 0.78rem; color: var(--gray); letter-spacing: 0.05em; }

/* ---- PROCESS SECTION (new) ---- */
.process { background: var(--cream); }
.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}
.process-step {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--white);
  border-radius: var(--radius-md);
  border: 1px solid var(--beige-dark);
  position: relative;
  transition: transform var(--transition), box-shadow var(--transition);
}
.process-step:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.step-number {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 300;
  color: var(--brown-light);
  line-height: 1;
  margin-bottom: 1rem;
  display: block;
}
.step-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--brown-dark);
  margin-bottom: 0.5rem;
}
.step-desc { font-size: 0.83rem; color: var(--gray); line-height: 1.7; }

/* ---- TESTIMONIALS ---- */
.testimonials { background: var(--beige); }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-top: 3rem;
}
.testimonial-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--beige-dark);
  transition: transform var(--transition), box-shadow var(--transition);
}
.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.stars { color: var(--brown-light); font-size: 1rem; letter-spacing: 0.1em; margin-bottom: 1rem; }
.testimonial-text {
  font-size: 0.92rem;
  color: var(--gray);
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 1.5rem;
}
.testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
.author-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--beige-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--brown-dark);
  font-weight: 600;
}
.author-info strong { display: block; font-size: 0.88rem; color: var(--charcoal); }
.author-info span { font-size: 0.76rem; color: var(--brown-light); }

/* ---- CTA STRIP ---- */
.cta-strip {
  background: var(--brown-dark);
  padding: 3.5rem 2rem;
  text-align: center;
}
.cta-strip h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem,3vw,2.2rem);
  color: #fff;
  font-weight: 400;
  margin-bottom: 1rem;
}
.cta-strip p { color: rgba(255,255,255,0.7); max-width: 460px; margin: 0 auto 2rem; font-size: 0.95rem; }
.cta-strip .cta-btns { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

/* ---- FOOTER ---- */
footer { background: var(--brown-dark); color: rgba(255,255,255,0.7); padding: 4rem 2rem 2rem; }
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.footer-brand .brand-name {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--white);
  display: block;
  margin-bottom: 0.25rem;
}
.footer-brand .brand-tagline {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brown-light);
  display: block;
  margin-bottom: 1rem;
}
.footer-brand p { font-size: 0.88rem; line-height: 1.8; max-width: 300px; }
.footer-heading {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--white);
  margin-bottom: 1.25rem;
  font-weight: 500;
}
.footer-links li { margin-bottom: 0.6rem; }
.footer-links a { font-size: 0.88rem; transition: color var(--transition); }
.footer-links a:hover { color: var(--brown-light); }
.footer-contact li {
  font-size: 0.88rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}
.footer-contact li span.icon { color: var(--brown-light); flex-shrink: 0; margin-top: 2px; }
.footer-bottom {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ---- PAGE HERO ---- */
.page-hero {
  background:
    linear-gradient(135deg, rgba(250,247,242,0.94) 60%, rgba(232,221,208,0.8) 100%),
    url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80') center/cover no-repeat;
  padding: 5rem 2rem 4rem;
  text-align: center;
}
.page-hero-inner { max-width: 700px; margin: 0 auto; }

/* ---- FILTER BAR ---- */
.filter-bar {
  background: var(--beige);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--beige-dark);
  position: sticky;
  top: 70px;
  z-index: 100;
}
.filter-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.filter-label {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brown);
  font-weight: 500;
}
.filter-btn {
  background: none;
  border: 1.5px solid var(--beige-dark);
  border-radius: 50px;
  padding: 0.45rem 1.2rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gray);
  cursor: pointer;
  transition: all var(--transition);
}
.filter-btn:hover, .filter-btn.active {
  background: var(--brown-dark);
  color: var(--white);
  border-color: var(--brown-dark);
}

/* ---- PORTFOLIO GRID ---- */
.portfolio-section { padding: 4rem 2rem; }
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}
.product-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--beige-dark);
  transition: transform var(--transition), box-shadow var(--transition);
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}
.product-card.hidden { display: none; }
.card-image-wrap { overflow: hidden; height: 220px; position: relative; }
.card-image-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .card-image-wrap img { transform: scale(1.06); }
.card-category-badge {
  position: absolute;
  top: 12px; left: 12px;
  background: rgba(92,68,48,0.85);
  color: var(--white);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border-radius: 50px;
  backdrop-filter: blur(4px);
}
.unavailable-badge {
  position: absolute;
  top: 12px; right: 12px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 50px;
}
.card-body { padding: 1.5rem; }
.card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--brown-dark);
  margin-bottom: 0.5rem;
}
.card-desc { font-size: 0.85rem; color: var(--gray); margin-bottom: 1rem; line-height: 1.7; }
.card-specs {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
  padding: 0.85rem;
  background: var(--beige);
  border-radius: var(--radius-sm);
}
.card-specs span {
  font-size: 0.78rem;
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.card-specs span strong { color: var(--brown-dark); font-weight: 500; }
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem;
  color: var(--gray);
  display: none;
}
.no-results.show { display: block; }
.no-results p { font-size: 1rem; margin-top: 0.5rem; }

/* ---- FORMS ---- */
.form-section { background: var(--cream); padding: 5rem 2rem; }
.form-layout {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 5rem;
  align-items: start;
}
.form-layout.single { grid-template-columns: 1fr; max-width: 640px; }
.form-info { padding-top: 1rem; }
.form-info .info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.75rem;
  align-items: flex-start;
}
.info-icon {
  width: 44px; height: 44px;
  background: var(--beige);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  border: 1px solid var(--beige-dark);
}
.info-text strong { display: block; font-size: 0.85rem; color: var(--charcoal); margin-bottom: 0.2rem; }
.info-text span { font-size: 0.83rem; color: var(--gray); }
.form-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--beige-dark);
}
.form-card h2 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--brown-dark);
  margin-bottom: 0.25rem;
}
.form-card p.form-sub { font-size: 0.85rem; color: var(--gray); margin-bottom: 2rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; }
.form-group label {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brown);
  font-weight: 500;
  margin-bottom: 0.45rem;
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem 1rem;
  border: 1.5px solid var(--beige-dark);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--charcoal);
  background: var(--cream);
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--brown-light);
  box-shadow: 0 0 0 3px rgba(196,168,130,0.15);
}
.form-group input.error,
.form-group textarea.error { border-color: #c0392b; }
.form-group textarea { resize: vertical; min-height: 110px; }
.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b6845' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-color: var(--cream);
  padding-right: 2.5rem;
}
.error-msg { font-size: 0.74rem; color: #c0392b; margin-top: 0.3rem; display: none; }
.error-msg.show { display: block; }
.success-alert {
  display: none;
  background: #f0faf0;
  border: 1.5px solid #6dbf67;
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  color: #2d7d2d;
  font-size: 0.9rem;
  align-items: center;
  gap: 0.75rem;
}
.success-alert.show { display: flex; }
.success-alert .check { font-size: 1.3rem; }
.form-submit-wrap { margin-top: 0.75rem; }
.form-submit-wrap .btn { width: 100%; text-align: center; padding: 1rem; }

/* ---- FADE IN ---- */
.fade-in { animation: fadeIn 0.6s ease forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---- SCROLL REVEAL ---- */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ---- RESPONSIVE ---- */
@media (max-width: 1024px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid { grid-template-columns: 1fr; }
  .about-image-wrap img { height: 340px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .form-layout { grid-template-columns: 1fr; gap: 3rem; }
  .process-steps { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  section { padding: 3.5rem 1.25rem; }
  .hero { min-height: 80vh; }
  .hero-title { font-size: 2.2rem; }
  .hero-btns { flex-direction: column; }
  .hero-btns .btn { text-align: center; }
  .portfolio-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .about-stats { justify-content: space-around; }
  .about-badge { right: 0; bottom: -16px; }
  .process-steps { grid-template-columns: 1fr; }
  .filter-bar { top: 70px; }
}
"""

# ============================================================
# JAVASCRIPT
# ============================================================
JS = r"""
/* Four-D Furniture — Main JS */

/* --- Mobile Menu --- */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
  highlightActiveNav();
  initScrollReveal();
});

/* --- Active Nav --- */
function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = href.replace('./', '/').replace('index.html', '/');
    if (path === linkPath || (path === '/' && href === 'index.html') ||
        (path.endsWith(href) && href !== 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* --- Portfolio Filter --- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('noResults');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selected = btn.dataset.filter;
      let visible = 0;
      cards.forEach(card => {
        const match = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      if (noResults) noResults.classList.toggle('show', visible === 0);
    });
  });
}
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

/* --- Form Validation Utility --- */
function validateField(field, errorEl, message) {
  if (!field) return true;
  const value = field.value.trim();
  const isEmpty = value === '';
  const isEmail = field.type === 'email';
  const emailBad = isEmail && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const invalid = isEmpty || emailBad;
  field.classList.toggle('error', invalid);
  if (errorEl) {
    errorEl.textContent = emailBad ? 'Please enter a valid email address.' : message;
    errorEl.classList.toggle('show', invalid);
  }
  return !invalid;
}

function addFieldListeners(fields) {
  fields.forEach(({ field, errorEl, message }) => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field, errorEl, message));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field, errorEl, message);
    });
  });
}

function showSuccessAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (!alert) return;
  alert.classList.add('show');
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => alert.classList.remove('show'), 6000);
}

/* --- Appointment Form --- */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;
  const fields = [
    { field: document.getElementById('apptName'),  errorEl: document.getElementById('apptNameErr'),  message: 'Full name is required.' },
    { field: document.getElementById('apptEmail'), errorEl: document.getElementById('apptEmailErr'), message: 'Email address is required.' },
    { field: document.getElementById('apptPhone'), errorEl: document.getElementById('apptPhoneErr'), message: 'Phone number is required.' },
    { field: document.getElementById('apptDate'),  errorEl: document.getElementById('apptDateErr'),  message: 'Preferred date is required.' },
    { field: document.getElementById('apptTime'),  errorEl: document.getElementById('apptTimeErr'),  message: 'Preferred time is required.' },
  ];
  addFieldListeners(fields);
  const dateField = document.getElementById('apptDate');
  if (dateField) dateField.min = new Date().toISOString().split('T')[0];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.every(({ field, errorEl, message }) => validateField(field, errorEl, message));
    if (allValid) { showSuccessAlert('apptSuccess'); form.reset(); }
  });
}
document.addEventListener('DOMContentLoaded', initAppointmentForm);

/* --- Inquiry Form --- */
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;
  const fields = [
    { field: document.getElementById('inqName'),    errorEl: document.getElementById('inqNameErr'),    message: 'Full name is required.' },
    { field: document.getElementById('inqEmail'),   errorEl: document.getElementById('inqEmailErr'),   message: 'Email address is required.' },
    { field: document.getElementById('inqPhone'),   errorEl: document.getElementById('inqPhoneErr'),   message: 'Phone number is required.' },
    { field: document.getElementById('inqProduct'), errorEl: document.getElementById('inqProductErr'), message: 'Please enter a product of interest.' },
    { field: document.getElementById('inqMessage'), errorEl: document.getElementById('inqMessageErr'), message: 'Please include a message.' },
  ];
  addFieldListeners(fields);

  // Pre-fill product from URL param
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get('product');
  const productField = document.getElementById('inqProduct');
  if (productParam && productField) productField.value = productParam;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.every(({ field, errorEl, message }) => validateField(field, errorEl, message));
    if (allValid) { showSuccessAlert('inqSuccess'); form.reset(); }
  });
}
document.addEventListener('DOMContentLoaded', initInquiryForm);

/* --- Smooth Anchor Scroll --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
"""

# ============================================================
# SHARED COMPONENTS
# ============================================================
def navbar():
    return """  <header>
    <nav class="navbar">
      <div class="nav-container">
        <a href="index.html" class="nav-logo">
          <span class="brand-name">Four-D Furniture</span>
          <span class="brand-tagline">Manufacturing Co.</span>
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="appointment.html">Appointments</a></li>
          <li><a href="inquiry.html">Inquiries</a></li>
        </ul>
        <button class="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="mobile-menu">
        <a href="index.html">Home</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="appointment.html">Appointments</a>
        <a href="inquiry.html">Inquiries</a>
      </nav>
    </nav>
  </header>"""


def footer(full=True):
    if full:
        return """  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand-name">Four-D Furniture</span>
          <span class="brand-tagline">Manufacturing Co.</span>
          <p>Crafting premium customized office furniture with quality, precision,
          and care—since 2021. Based in Bo. Sto. Cristo Tala, Caloocan City, Philippines.</p>
        </div>
        <div>
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="appointment.html">Book Appointment</a></li>
            <li><a href="inquiry.html">Send Inquiry</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Contact Us</h4>
          <ul class="footer-contact">
            <li><span class="icon">&#128205;</span><span>Caloocan City, Metro Manila, Philippines</span></li>
            <li><span class="icon">&#128222;</span><span>+63 912 425 0654</span></li>
            <li><span class="icon">&#9993;</span><span>fourdfurniture2023@gmail.com</span></li>
            <li><span class="icon">&#128336;</span><span>Mon–Fri, 8:00 AM – 5:00 PM</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Four-D Furniture Manufacturing Co. All rights reserved.</span>
        <span>Caloocan City, Philippines</span>
      </div>
    </div>
  </footer>"""
    else:
        return """  <footer>
    <div class="footer-inner">
      <div class="footer-bottom">
        <span>&copy; 2026 Four-D Furniture Manufacturing Co. All rights reserved.</span>
        <span>Caloocan City, Philippines</span>
      </div>
    </div>
  </footer>"""


def html_shell(title, head_extra, body_content, description=""):
    desc = description or "Four-D Furniture Manufacturing crafts premium customized office furniture in Caloocan City, Philippines."
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{desc}" />
  <link rel="stylesheet" href="style.css" />
{head_extra}</head>
<body>

{navbar()}

{body_content}

{footer()}

  <script src="script.js"></script>
</body>
</html>"""


# ============================================================
# INDEX PAGE
# ============================================================
def build_index():
    body = """
  <!-- HERO -->
  <section class="hero">
    <div class="hero-inner fade-in">
      <span class="hero-label">&#9670; Premium Custom Furniture</span>
      <h1 class="hero-title">
        Custom Furniture<br>
        <em>Crafted for</em><br>
        Your Workspace
      </h1>
      <p class="hero-desc">
        We design and build bespoke office furniture tailored to your exact needs—
        combining artisan craftsmanship with practical, modern aesthetics.
      </p>
      <div class="hero-btns">
        <a href="portfolio.html" class="btn btn-primary">View Portfolio</a>
        <a href="appointment.html" class="btn btn-outline">Book Appointment</a>
      </div>
      <div class="hero-scroll">
        <span class="scroll-line"></span>
        Scroll to explore
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about">
    <div class="section-inner about-grid">
      <div class="about-image-wrap reveal">
        <img
          src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80"
          alt="Craftsman working on furniture"
          loading="lazy"
        />
        <div class="about-badge">
          <strong>5+</strong>
          <span>Years of<br>Craftsmanship</span>
        </div>
      </div>
      <div class="about-content reveal">
        <span class="section-label">About Us</span>
        <h2 class="section-title">Furniture Built With Intention</h2>
        <div class="divider"></div>
        <p class="section-desc" style="margin-bottom:1rem;">
          Four-D Furniture Manufacturing is a Caloocan-based company specializing in
          fully customized office furniture. From executive desks and ergonomic seating
          to modular storage solutions, every piece is built to order using premium materials
          and traditional joinery techniques.
        </p>
        <p class="section-desc">
          We partner closely with architects, interior designers, and business owners
          to deliver furniture that is as functional as it is beautiful—crafted to last
          for decades, not just seasons.
        </p>
        <div class="about-stats">
          <div class="stat"><strong>500+</strong><span>Projects Completed</span></div>
          <div class="stat"><strong>98%</strong><span>Client Satisfaction</span></div>
          <div class="stat"><strong>3</strong><span>Product Lines</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="process">
    <div class="section-inner">
      <div style="text-align:center; margin-bottom:1rem;">
        <span class="section-label">How It Works</span>
        <h2 class="section-title">Our Process</h2>
        <p class="section-desc" style="margin:0 auto 0;">From concept to delivery, every step is intentional.</p>
      </div>
      <div class="process-steps">
        <div class="process-step reveal">
          <span class="step-number">01</span>
          <h3 class="step-title">Consultation</h3>
          <p class="step-desc">We meet with you to understand your space, needs, and style preferences.</p>
        </div>
        <div class="process-step reveal">
          <span class="step-number">02</span>
          <h3 class="step-title">Design</h3>
          <p class="step-desc">Our team drafts custom layouts and material specifications for your approval.</p>
        </div>
        <div class="process-step reveal">
          <span class="step-number">03</span>
          <h3 class="step-title">Crafting</h3>
          <p class="step-desc">Skilled artisans handcraft each piece in our Caloocan workshop.</p>
        </div>
        <div class="process-step reveal">
          <span class="step-number">04</span>
          <h3 class="step-title">Delivery</h3>
          <p class="step-desc">We deliver and install your furniture with white-glove care.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonials">
    <div class="section-inner">
      <div style="text-align:center; margin-bottom:1rem;">
        <span class="section-label">Client Testimonials</span>
        <h2 class="section-title">What Our Clients Say</h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card reveal">
          <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testimonial-text">
            "Four-D transformed our entire office. The executive desks they custom-built
            fit perfectly in our space and the quality is outstanding. Our team absolutely loves them."
          </p>
          <div class="testimonial-author">
            <div class="author-avatar">RC</div>
            <div class="author-info">
              <strong>Rafael Cruz</strong>
              <span>CEO, Cruz &amp; Partners Law Firm</span>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal">
          <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testimonial-text">
            "We needed storage solutions for a very unusually shaped office. Four-D
            listened carefully, designed a perfect layout, and delivered on time. Highly recommended!"
          </p>
          <div class="testimonial-author">
            <div class="author-avatar">ML</div>
            <div class="author-info">
              <strong>Maria Lim</strong>
              <span>Office Manager, TechFlow Solutions</span>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal">
          <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testimonial-text">
            "The craftsmanship is exceptional. We've ordered three times now and each
            piece is better than the last. Their team is professional and responsive throughout."
          </p>
          <div class="testimonial-author">
            <div class="author-avatar">JM</div>
            <div class="author-info">
              <strong>Jerome Mendoza</strong>
              <span>Architect, Studio M Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="section-inner">
      <h2>Ready to furnish your workspace?</h2>
      <p>Browse our portfolio or reach out to schedule a consultation with our team.</p>
      <div class="cta-btns">
        <a href="portfolio.html" class="btn btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.5);">View Portfolio</a>
        <a href="inquiry.html" class="btn btn-primary" style="background:var(--brown-light);">Send Inquiry</a>
      </div>
    </div>
  </section>
"""
    return html_shell(
        title="Four-D Furniture | Custom Office Furniture Manufacturing",
        head_extra="",
        body_content=body,
    )


# ============================================================
# PORTFOLIO PAGE
# ============================================================
def build_product_card(p):
    badge = ""
    if not p["available"]:
        badge = '<span class="unavailable-badge">Unavailable</span>'
    if p["available"]:
        action = f'<a href="inquiry.html?product={p["title"].replace(" ", "%20")}" class="btn btn-primary btn-sm">Request Quote</a>'
    else:
        action = '<span class="btn btn-sm" style="background:#ccc;color:#fff;cursor:not-allowed;">Unavailable</span>'

    return f"""        <article class="product-card" data-category="{p['category']}">
          <div class="card-image-wrap">
            <img src="{p['img_url']}" alt="{p['title']}" loading="lazy" />
            <span class="card-category-badge">{p['category'].capitalize()}</span>
            {badge}
          </div>
          <div class="card-body">
            <h3 class="card-title">{p['title']}</h3>
            <p class="card-desc">{p['description']}</p>
            <div class="card-specs">
              <span><strong>Dimensions:</strong> {p['dimension']}</span>
              <span><strong>Materials:</strong> {p['material']}</span>
            </div>
            {action}
          </div>
        </article>"""


def build_portfolio():
    cards = "\n".join(build_product_card(p) for p in PRODUCTS)
    body = f"""
  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="page-hero-inner fade-in">
      <span class="section-label">Our Work</span>
      <h1 class="section-title">Our Portfolio</h1>
      <p class="section-desc">
        A curated showcase of our custom office furniture projects.
      </p>
    </div>
  </section>

  <!-- FILTER BAR -->
  <div class="filter-bar">
    <div class="filter-inner">
      <span class="filter-label">Filter by Category:</span>
      <button class="filter-btn active" data-filter="all">All Products</button>
      <button class="filter-btn" data-filter="seating">Seating</button>
      <button class="filter-btn" data-filter="desking">Desking</button>
      <button class="filter-btn" data-filter="storage">Storage</button>
    </div>
  </div>

  <!-- PORTFOLIO GRID -->
  <section class="portfolio-section">
    <div class="section-inner">
      <div class="portfolio-grid" id="portfolioGrid">
{cards}
      </div>
      <div class="no-results" id="noResults">
        <p>No products found for this category.</p>
      </div>
    </div>
  </section>
"""
    return html_shell(
        title="Portfolio | Four-D Furniture Manufacturing",
        head_extra="",
        body_content=body,
        description="Explore our portfolio of custom office furniture: seating, desking, and storage solutions.",
    )


# ============================================================
# APPOINTMENT PAGE
# ============================================================
def build_appointment():
    body = """
  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="page-hero-inner fade-in">
      <span class="section-label">Visit Us</span>
      <h1 class="section-title">Book an Appointment</h1>
      <p class="section-desc">
        Visit our showroom or schedule a consultation with our design team.
      </p>
    </div>
  </section>

  <!-- APPOINTMENT FORM -->
  <section class="form-section">
    <div class="form-layout">

      <!-- Info Column -->
      <div class="form-info reveal">
        <span class="section-label">Before You Visit</span>
        <h2 class="section-title" style="font-size:1.8rem;">What to Expect</h2>
        <div class="divider"></div>

        <div class="info-item">
          <div class="info-icon">&#128205;</div>
          <div class="info-text">
            <strong>Our Showroom</strong>
            <span>Bo. Sto. Cristo Tala, Caloocan City, Metro Manila, Philippines</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">&#128336;</div>
          <div class="info-text">
            <strong>Business Hours</strong>
            <span>Monday – Friday, 8:00 AM – 5:00 PM</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">&#128222;</div>
          <div class="info-text">
            <strong>Phone</strong>
            <span>+63 912 425 0654</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">&#9993;</div>
          <div class="info-text">
            <strong>Email</strong>
            <span>fourdfurniture2023@gmail.com</span>
          </div>
        </div>
      </div>

      <!-- Form Column -->
      <div class="form-card reveal">
        <h2>Schedule Your Visit</h2>
        <p class="form-sub">Fill in the form below and our team will confirm your appointment within 24 hours.</p>

        <div class="success-alert" id="apptSuccess">
          <span class="check">&#10003;</span>
          <span>Your appointment request has been received! We'll confirm within 24 hours.</span>
        </div>

        <form id="appointmentForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="apptName">Full Name</label>
              <input type="text" id="apptName" name="name" placeholder="Juan dela Cruz" />
              <span class="error-msg" id="apptNameErr"></span>
            </div>
            <div class="form-group">
              <label for="apptEmail">Email Address</label>
              <input type="email" id="apptEmail" name="email" placeholder="juan@example.com" />
              <span class="error-msg" id="apptEmailErr"></span>
            </div>
          </div>
          <div class="form-group">
            <label for="apptPhone">Phone Number</label>
            <input type="tel" id="apptPhone" name="phone" placeholder="+63 9XX XXX XXXX" />
            <span class="error-msg" id="apptPhoneErr"></span>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="apptDate">Preferred Date</label>
              <input type="date" id="apptDate" name="date" />
              <span class="error-msg" id="apptDateErr"></span>
            </div>
            <div class="form-group">
              <label for="apptTime">Preferred Time</label>
              <input type="time" id="apptTime" name="time" />
              <span class="error-msg" id="apptTimeErr"></span>
            </div>
          </div>
          <div class="form-submit-wrap">
            <button type="submit" class="btn btn-primary">Confirm Appointment</button>
          </div>
        </form>
      </div>

    </div>
  </section>
"""
    return html_shell(
        title="Appointment | Four-D Furniture Manufacturing",
        head_extra="",
        body_content=body,
        description="Book a showroom visit or consultation at Four-D Furniture Manufacturing.",
    )


# ============================================================
# INQUIRY PAGE
# ============================================================
def build_inquiry():
    product_options = "\n".join(
        f'          <option value="{p["title"]}">{p["title"]}</option>'
        for p in PRODUCTS if p["available"]
    )
    body = f"""
  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="page-hero-inner fade-in">
      <span class="section-label">Get In Touch</span>
      <h1 class="section-title">Send Us an Inquiry</h1>
      <p class="section-desc">
        Interested in one of our products? Fill out the form below and we'll get back to you promptly.
      </p>
    </div>
  </section>

  <!-- INQUIRY FORM -->
  <section class="form-section">
    <div class="form-layout">

      <!-- Info Column -->
      <div class="form-info reveal">
        <span class="section-label">Why Inquire?</span>
        <h2 class="section-title" style="font-size:1.8rem;">Let's Discuss Your Project</h2>
        <div class="divider"></div>
        <p class="section-desc" style="margin-bottom:2rem;">
          Every piece we make is built to order. Share your requirements and our team
          will prepare a customized quotation for you.
        </p>

        <div class="info-item">
          <div class="info-icon">&#9997;</div>
          <div class="info-text">
            <strong>Custom Orders</strong>
            <span>All furniture is made to your exact specifications.</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">&#128200;</div>
          <div class="info-text">
            <strong>Free Quotation</strong>
            <span>No commitment required — get a detailed quote at no cost.</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">&#128337;</div>
          <div class="info-text">
            <strong>Quick Response</strong>
            <span>We reply to all inquiries within one business day.</span>
          </div>
        </div>
      </div>

      <!-- Form Column -->
      <div class="form-card reveal">
        <h2>Product Inquiry Form</h2>
        <p class="form-sub">Tell us what you need and we'll prepare a custom quote for you.</p>

        <div class="success-alert" id="inqSuccess">
          <span class="check">&#10003;</span>
          <span>Thank you! Your inquiry has been received. We'll be in touch within one business day.</span>
        </div>

        <form id="inquiryForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="inqName">Full Name</label>
              <input type="text" id="inqName" name="name" placeholder="Juan dela Cruz" />
              <span class="error-msg" id="inqNameErr"></span>
            </div>
            <div class="form-group">
              <label for="inqEmail">Email Address</label>
              <input type="email" id="inqEmail" name="email" placeholder="juan@example.com" />
              <span class="error-msg" id="inqEmailErr"></span>
            </div>
          </div>
          <div class="form-group">
            <label for="inqPhone">Phone Number</label>
            <input type="tel" id="inqPhone" name="phone" placeholder="+63 9XX XXX XXXX" />
            <span class="error-msg" id="inqPhoneErr"></span>
          </div>
          <div class="form-group">
            <label for="inqProduct">Product of Interest</label>
            <input type="text" id="inqProduct" name="product" placeholder="e.g. Executive Leather Chair" />
            <span class="error-msg" id="inqProductErr"></span>
          </div>
          <div class="form-group">
            <label for="inqMessage">Message / Project Details</label>
            <textarea id="inqMessage" name="content" placeholder="Describe your project, dimensions, materials, or any other requirements..."></textarea>
            <span class="error-msg" id="inqMessageErr"></span>
          </div>
          <div class="form-submit-wrap">
            <button type="submit" class="btn btn-primary">Submit Inquiry</button>
          </div>
        </form>
      </div>

    </div>
  </section>
"""
    return html_shell(
        title="Inquiry | Four-D Furniture Manufacturing",
        head_extra="",
        body_content=body,
        description="Send an inquiry to Four-D Furniture Manufacturing for custom office furniture.",
    )


# ============================================================
# BUILD FUNCTION
# ============================================================
def build_all():
    out_dir = os.path.join(os.path.dirname(__file__), "pages")
    os.makedirs(out_dir, exist_ok=True)

    pages = {
        "index.html":       build_index(),
        "portfolio.html":   build_portfolio(),
        "appointment.html": build_appointment(),
        "inquiry.html":     build_inquiry(),
    }

    for filename, content in pages.items():
        path = os.path.join(out_dir, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✓ Generated {filename}")

    # Write CSS
    css_path = os.path.join(out_dir, "style.css")
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(CSS)
    print("  ✓ Generated style.css")

    # Write JS
    js_path = os.path.join(out_dir, "script.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(JS)
    print("  ✓ Generated script.js")

    # Write product data as JSON for future use
    json_path = os.path.join(out_dir, "products.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(PRODUCTS, f, indent=2)
    print("  ✓ Generated products.json")

    print(f"\n  Build complete! {len(pages)} HTML pages + CSS + JS + JSON")
    print(f"  Output directory: {out_dir}")


if __name__ == "__main__":
    print("\nBuilding Four-D Furniture static site...\n")
    build_all()
