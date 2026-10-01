# Solvia Nova

**Digital Solution & Software House Modern** — A full-featured web application built with a custom PHP MVC framework.

## Tech Stack

- **Backend:** PHP 8+ (custom MVC)
- **Database:** MySQL (PDO)
- **Frontend:** Tailwind CSS, Alpine.js
- **Styling:** Inline styles for invoice views (print-friendly)

## Features

### Public
- Landing page / Hero
- Portfolio showcase
- Services listing
- Team members
- Blog / Articles
- Gallery
- Testimonials
- Contact form
- SEO management

### Admin Panel (`/sso`)
- Dashboard
- Portfolio CRUD
- Services CRUD
- Team CRUD
- Blog CRUD
- Gallery CRUD
- Testimonials CRUD
- Categories CRUD
- Messages inbox
- Invoice management
- SEO settings
- Site settings (social media, signature, etc.)

### Invoice Module
- **CRUD** — Create, read, update, delete invoices
- **Dynamic line items** — Alpine.js powered, add/remove items with auto-calculated totals
- **Preview** — Ready-to-print invoice preview page
- **Print** — Separate print-optimized page with `auto=1` for auto-print
- **Bank dropdown** — 50+ Indonesian banks with Clearbit logo fallback + local PNG support
- **Global signature** — Signature image, signatory name & role managed via Settings (not per-invoice)

## Installation

### Requirements
- PHP 8.0+
- MySQL 5.7+ / MariaDB 10.3+
- Apache with `mod_rewrite` (or equivalent for other web servers)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/210102001-rgb/PortofolioSolvia.git
cd PortofolioSolvia

# 2. Configure database
#    - Create a MySQL database named `solvianova_db`
#    - Import database/solvianova_db.sql (main schema + seed data)
#    - Import database/invoice_tables.sql (invoice-specific tables)

# 3. Configure app
#    - Edit app/config/config.php
#    - Set APP_URL to your local domain
#    - Update DB_HOST, DB_NAME, DB_USER, DB_PASS as needed

# 4. Set up web server
#    - Point document root to PortofolioSolvia/public/
#    - Ensure .htaccess is enabled (AllowOverride All)

# 5. Default admin credentials
#    - URL: http://your-domain/sso
#    - Username: admin
#    - Password: admin123 (change immediately)
```

### Database
| File | Purpose |
|------|---------|
| `database/solvianova_db.sql` | Main schema + seed data (all tables except invoice) |
| `database/invoice_tables.sql` | Invoice-specific tables (`invoices`, `invoice_items`) |

## Project Structure

```
├── app/
│   ├── config/          # App configuration (DB, URLs, paths)
│   ├── controllers/     # MVC controllers
│   ├── core/            # Framework core (App, Router, Controller, Model, Database)
│   ├── helpers/         # Helper functions (banks.php, helpers.php)
│   ├── lang/            # Translation files
│   ├── models/          # MVC models
│   ├── routes/          # Route definitions
│   └── views/           # View templates
│       ├── admin/       # Admin panel views
│       └── layouts/     # Layout templates (main, admin, blank)
├── database/            # SQL schema files
├── public/              # Web root
│   ├── assets/          # CSS, JS, images, uploads
│   └── index.php        # Entry point
```

## Invoice API / Routes

| Method | Route                         | Description          |
|--------|-------------------------------|----------------------|
| GET    | `/sso/invoice`                | Invoice list         |
| GET    | `/sso/invoice/create`         | Create form          |
| POST   | `/sso/invoice/create`         | Store invoice        |
| GET    | `/sso/invoice/{id}`           | Preview              |
| GET    | `/sso/invoice/{id}/print`     | Print view           |
| GET    | `/sso/invoice/{id}/edit`      | Edit form            |
| POST   | `/sso/invoice/{id}/edit`      | Update invoice       |
| POST   | `/sso/invoice/{id}/delete`    | Delete invoice       |

## Bank Logo Support

Place bank logo PNGs in `public/assets/uploads/bank-logos/` named by slug (e.g., `mandiri.png`, `bni.png`, `bca.png`). Fallback order: local file → Clearbit CDN → colored initials.

## License

MIT
