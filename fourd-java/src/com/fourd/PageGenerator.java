package com.fourd;

import java.util.List;

/**
 * Generates all four HTML pages of the Four-D Furniture static site.
 * Each buildXxx() method returns a complete, self-contained HTML string.
 */
public class PageGenerator {

    private final List<Product> products;

    public PageGenerator(List<Product> products) {
        this.products = products;
    }

    // =========================================================
    // PUBLIC PAGE BUILDERS
    // =========================================================

    public String buildIndex() {
        String body = navbar()
            + heroSection()
            + aboutSection()
            + processSection()
            + testimonialsSection()
            + ctaStrip()
            + footer();
        return htmlShell(
            "Four-D Furniture | Custom Office Furniture Manufacturing",
            "Four-D Furniture Manufacturing crafts premium customized office furniture in Caloocan City, Philippines.",
            body
        );
    }

    public String buildPortfolio() {
        String body = navbar()
            + pageHero("Our Work", "Our Portfolio",
                       "A curated showcase of our custom office furniture projects.")
            + filterBar()
            + portfolioGrid()
            + footer();
        return htmlShell(
            "Portfolio | Four-D Furniture Manufacturing",
            "Explore our portfolio of custom office furniture: seating, desking, and storage solutions.",
            body
        );
    }

    public String buildAppointment() {
        String body = navbar()
            + pageHero("Visit Us", "Book an Appointment",
                       "Visit our showroom or schedule a consultation with our design team.")
            + appointmentForm()
            + footer();
        return htmlShell(
            "Appointment | Four-D Furniture Manufacturing",
            "Book a showroom visit or consultation at Four-D Furniture Manufacturing.",
            body
        );
    }

    public String buildInquiry() {
        String body = navbar()
            + pageHero("Get In Touch", "Send Us an Inquiry",
                       "Interested in one of our products? Fill out the form and we'll get back to you promptly.")
            + inquiryForm()
            + footer();
        return htmlShell(
            "Inquiry | Four-D Furniture Manufacturing",
            "Send an inquiry to Four-D Furniture Manufacturing for custom office furniture.",
            body
        );
    }

    // =========================================================
    // HTML SHELL
    // =========================================================

    private String htmlShell(String title, String description, String body) {
        return """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>""" + title + """
</title>
  <meta name="description" content=\"""" + description + """
\" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

""" + body + """

  <script src="script.js"></script>
</body>
</html>""";
    }

    // =========================================================
    // SHARED COMPONENTS
    // =========================================================

    private String navbar() {
        return """
  <header>
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
  </header>
""";
    }

    private String footer() {
        return """

  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand-name">Four-D Furniture</span>
          <span class="brand-tagline">Manufacturing Co.</span>
          <p>Crafting premium customized office furniture with quality, precision,
          and care\u2014since 2021. Based in Bo. Sto. Cristo Tala, Caloocan City, Philippines.</p>
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
            <li><span class="icon">&#128336;</span><span>Mon\u2013Fri, 8:00 AM \u2013 5:00 PM</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Four-D Furniture Manufacturing Co. All rights reserved.</span>
        <span>Caloocan City, Philippines</span>
      </div>
    </div>
  </footer>
""";
    }

    private String pageHero(String label, String title, String desc) {
        return """
  <section class="page-hero">
    <div class="page-hero-inner fade-in">
      <span class="section-label">""" + label + """
</span>
      <h1 class="section-title">""" + title + """
</h1>
      <p class="section-desc">""" + desc + """
</p>
    </div>
  </section>
""";
    }

    // =========================================================
    // INDEX SECTIONS
    // =========================================================

    private String heroSection() {
        return """
  <section class="hero">
    <div class="hero-inner fade-in">
      <span class="hero-label">&#9670; Premium Custom Furniture</span>
      <h1 class="hero-title">
        Custom Furniture<br>
        <em>Crafted for</em><br>
        Your Workspace
      </h1>
      <p class="hero-desc">
        We design and build bespoke office furniture tailored to your exact needs\u2014
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
""";
    }

    private String aboutSection() {
        return """
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
          to deliver furniture that is as functional as it is beautiful\u2014crafted to last
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
""";
    }

    private String processSection() {
        String[][] steps = {
            {"01", "Consultation", "We meet with you to understand your space, needs, and style preferences."},
            {"02", "Design",       "Our team drafts custom layouts and material specifications for your approval."},
            {"03", "Crafting",     "Skilled artisans handcraft each piece in our Caloocan workshop."},
            {"04", "Delivery",     "We deliver and install your furniture with white-glove care."},
        };

        StringBuilder sb = new StringBuilder();
        sb.append("""
  <section class="process">
    <div class="section-inner">
      <div style="text-align:center; margin-bottom:1rem;">
        <span class="section-label">How It Works</span>
        <h2 class="section-title">Our Process</h2>
        <p class="section-desc" style="margin:0 auto;">From concept to delivery, every step is intentional.</p>
      </div>
      <div class="process-steps">
""");
        for (String[] step : steps) {
            sb.append("        <div class=\"process-step reveal\">\n");
            sb.append("          <span class=\"step-number\">").append(step[0]).append("</span>\n");
            sb.append("          <h3 class=\"step-title\">").append(step[1]).append("</h3>\n");
            sb.append("          <p class=\"step-desc\">").append(step[2]).append("</p>\n");
            sb.append("        </div>\n");
        }
        sb.append("""
      </div>
    </div>
  </section>
""");
        return sb.toString();
    }

    private String testimonialsSection() {
        String[][] testimonials = {
            {"RC", "Rafael Cruz",    "CEO, Cruz &amp; Partners Law Firm",
             "\"Four-D transformed our entire office. The executive desks they custom-built fit perfectly in our space and the quality is outstanding. Our team absolutely loves them.\""},
            {"ML", "Maria Lim",      "Office Manager, TechFlow Solutions",
             "\"We needed storage solutions for a very unusually shaped office. Four-D listened carefully, designed a perfect layout, and delivered on time. Highly recommended!\""},
            {"JM", "Jerome Mendoza", "Architect, Studio M Design",
             "\"The craftsmanship is exceptional. We've ordered three times now and each piece is better than the last. Their team is professional and responsive throughout.\""},
        };

        StringBuilder sb = new StringBuilder();
        sb.append("""
  <section class="testimonials">
    <div class="section-inner">
      <div style="text-align:center; margin-bottom:1rem;">
        <span class="section-label">Client Testimonials</span>
        <h2 class="section-title">What Our Clients Say</h2>
      </div>
      <div class="testimonials-grid">
""");
        for (String[] t : testimonials) {
            sb.append("""
        <div class="testimonial-card reveal">
          <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="testimonial-text">""").append(t[3]).append("""
</p>
          <div class="testimonial-author">
            <div class="author-avatar">""").append(t[0]).append("""
</div>
            <div class="author-info">
              <strong>""").append(t[1]).append("""
</strong>
              <span>""").append(t[2]).append("""
</span>
            </div>
          </div>
        </div>
""");
        }
        sb.append("""
      </div>
    </div>
  </section>
""");
        return sb.toString();
    }

    private String ctaStrip() {
        return """
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
""";
    }

    // =========================================================
    // PORTFOLIO SECTIONS
    // =========================================================

    private String filterBar() {
        return """
  <div class="filter-bar">
    <div class="filter-inner">
      <span class="filter-label">Filter by Category:</span>
      <button class="filter-btn active" data-filter="all">All Products</button>
      <button class="filter-btn" data-filter="seating">Seating</button>
      <button class="filter-btn" data-filter="desking">Desking</button>
      <button class="filter-btn" data-filter="storage">Storage</button>
    </div>
  </div>
""";
    }

    private String portfolioGrid() {
        StringBuilder sb = new StringBuilder();
        sb.append("""
  <section class="portfolio-section">
    <div class="section-inner">
      <div class="portfolio-grid" id="portfolioGrid">
""");
        for (Product p : products) {
            sb.append(productCard(p));
        }
        sb.append("""
      </div>
      <div class="no-results" id="noResults">
        <p>No products found for this category.</p>
      </div>
    </div>
  </section>
""");
        return sb.toString();
    }

    private String productCard(Product p) {
        String unavailableBadge = p.isAvailable() ? ""
            : "            <span class=\"unavailable-badge\">Unavailable</span>\n";

        String action = p.isAvailable()
            ? "            <a href=\"inquiry.html?product=" + p.getTitleEncoded()
              + "\" class=\"btn btn-primary btn-sm\">Request Quote</a>\n"
            : "            <span class=\"btn btn-sm\" style=\"background:#ccc;color:#fff;cursor:not-allowed;\">Unavailable</span>\n";

        return """
        <article class="product-card" data-category=\"""" + p.getCategory() + """
">
          <div class="card-image-wrap">
            <img src=\"""" + p.getImgUrl() + """
" alt=\"""" + p.getTitle() + """
" loading="lazy" />
            <span class="card-category-badge">""" + p.getCategoryLabel() + """
</span>
""" + unavailableBadge + """
          </div>
          <div class="card-body">
            <h3 class="card-title">""" + p.getTitle() + """
</h3>
            <p class="card-desc">""" + p.getDescription() + """
</p>
            <div class="card-specs">
              <span><strong>Dimensions:</strong> """ + p.getDimension() + """
</span>
              <span><strong>Materials:</strong> """ + p.getMaterial() + """
</span>
            </div>
""" + action + """
          </div>
        </article>
""";
    }

    // =========================================================
    // APPOINTMENT FORM
    // =========================================================

    private String appointmentForm() {
        return """
  <section class="form-section">
    <div class="form-layout">

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
            <span>Monday \u2013 Friday, 8:00 AM \u2013 5:00 PM</span>
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
""";
    }

    // =========================================================
    // INQUIRY FORM
    // =========================================================

    private String inquiryForm() {
        return """
  <section class="form-section">
    <div class="form-layout">

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
            <span>No commitment required \u2014 get a detailed quote at no cost.</span>
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
            <textarea id="inqMessage" name="content"
              placeholder="Describe your project, dimensions, materials, or any other requirements..."></textarea>
            <span class="error-msg" id="inqMessageErr"></span>
          </div>
          <div class="form-submit-wrap">
            <button type="submit" class="btn btn-primary">Submit Inquiry</button>
          </div>
        </form>
      </div>

    </div>
  </section>
""";
    }
}
