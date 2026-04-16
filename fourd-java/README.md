# Four-D Furniture — Static Site Generator (Java)

A pure-Java static site generator that produces a fully working frontend
clone of the Four-D Furniture Manufacturing website. No frameworks, no
build tools — just the JDK standard library and `javac`.

## Project Layout

```
fourd-java/
├── src/
│   └── com/fourd/
│       ├── SiteBuilder.java       ← Entry point (main)
│       ├── Product.java           ← Product model / data class
│       ├── ProductCatalogue.java  ← Hard-coded product seed data
│       ├── PageGenerator.java     ← Builds all four HTML pages
│       └── Assets.java            ← CSS + JS as Java string constants
├── output/                        ← Generated site (open index.html here)
│   ├── index.html
│   ├── portfolio.html
│   ├── appointment.html
│   ├── inquiry.html
│   ├── style.css
│   └── script.js
└── README.md
```

## Requirements

- **JDK 17+** (uses text blocks — `"""..."""` — introduced in Java 15 as standard)
- No external libraries or Maven/Gradle required

## Build & Run

```bash
# 1. Compile all sources into the out/ directory
javac -d out src/com/fourd/*.java

# 2. Run the generator
java -cp out com.fourd.SiteBuilder

# 3. Open the site
open output/index.html        # macOS
xdg-open output/index.html   # Linux
start output/index.html       # Windows
```

## What Gets Generated

| File                  | Description                                              |
|-----------------------|----------------------------------------------------------|
| `index.html`          | Home page: hero, about, process steps, testimonials, CTA |
| `portfolio.html`      | Product grid (9 items) with client-side category filter  |
| `appointment.html`    | Appointment booking form + contact info sidebar          |
| `inquiry.html`        | Product inquiry form with URL param pre-fill             |
| `style.css`           | Full stylesheet (warm brown/beige palette, Google Fonts) |
| `script.js`           | Mobile nav, scroll reveal, filter, form validation       |

## Pages

- **Home** (`index.html`) — Hero banner, About section with stats, 4-step
  Process section, 3 client testimonials, CTA strip.
- **Portfolio** (`portfolio.html`) — 9 product cards with category filter
  buttons (All / Seating / Desking / Storage). Filter is entirely client-side.
- **Appointments** (`appointment.html`) — Two-column layout: info sidebar +
  booking form (name, email, phone, date, time) with inline validation and
  success message.
- **Inquiries** (`inquiry.html`) — Two-column layout: info sidebar + inquiry
  form. Pre-fills the "Product of Interest" field from a `?product=` URL
  parameter (populated when clicking "Request Quote" on a portfolio card).

## Architecture Notes

`SiteBuilder` → calls `PageGenerator` → calls `ProductCatalogue` for data
and `Assets` for the CSS/JS strings. Everything is concatenated string
building — no templating engine dependency.

`Assets.java` stores CSS and JavaScript as Java 15+ **text blocks**,
making them easy to edit without escaping. Each text block is a `public
static final String` constant, written directly to disk by `SiteBuilder`.
