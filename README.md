# QP NewsLetter (IT Community Learning Platform)

> An interconnected, community-first learning hub where developers, sysadmins, and tech enthusiasts learn, share, and grow together.

This repository contains the backend structures, specifications, and configurations for **QP NewsLetter**, a comprehensive IT Community Learning Platform. Built on a high-performance **headless WordPress architecture**, this platform separates editorial content management from a fast, decoupled, and highly accessible frontend.

---

## 🚀 Architectural Overview

To deliver extreme loading speeds, airtight security, and design consistency matching technical documentation platforms, QP NewsLetter leverages a decoupled stack:

* **Backend Engine (WordPress Core)**: Houses custom post types, structural taxonomies, and custom Gutenberg block layouts.
* **REST API Controller**: Delivers highly structured JSON payloads—including custom metadata and Gutenberg blocks with nested attributes—to the frontend.
* **ACF PRO Syncing**: All custom field schemas, custom post types, and taxonomies are managed in standard JSON files inside `/acf-json/` with stable 13-character random hex keys for automatic Git versioning and database synchronization.
* **Decoupled Frontend**: Consumes backend API outputs and renders pages using modern semantic HTML, CSS utility tokens, and Tailwind CSS.

---

## 🛠️ Key Features

* 🏷️ **Unified Technology Tagging**: A global `tech_tag` taxonomy interconnects all content hubs. Clicking "Docker" on a tutorial instantly lists related system alerts, webinars, and cheat sheets.
* 📨 **Self-Hosted Subscriber Management**: Secure local database tables (`wp_qp_subscribers`) with custom POST `/subscribe` and `/unsubscribe` API controllers to manage subscriptions securely without third-party SaaS monthly fees.
* ✍️ **Custom Editorial Block Suite**: Four tailor-made Gutenberg blocks (`qp/code-snippet`, `qp/tip-callout`, `qp/sponsor-banner`, and `qp/resource-cta`) to let editors author rich technical content once and distribute it everywhere.
* 🖼️ **Zero Cumulative Layout Shift (CLS)**: Custom REST API responsive image wrappers (RIS) stream source attributes and aspect-ratios, letting the decoupled frontend build strict layout containers to eliminate layout shifts.
* ♿ **A11y to the Core**: Built and validated systematically against strict **WCAG 2.1 Level AA** compliance protocols (enforcing full keyboard navigability, color contrast minimums, and aria-live announcements).

---

## 📂 Repository Structure

The project blueprint is structured as follows:

```text
/
├── acf-json/                       # ACF Local JSON Sync Directory
│   ├── group_blog_fields.json      # Blog custom meta fields (REST API Enabled)
│   ├── group_event_fields.json     # Event meta fields (Virtual vs Physical)
│   ├── group_news_fields.json      # News meta fields (Reading time, sponsor flags)
│   ├── group_newsletter_fields.json# Weekly PDF dispatch meta fields
│   ├── group_resource_fields.json  # Resource skill-level & file attachment fields
│   ├── post_type_*.json            # Custom Post Type registrations
│   └── taxonomy_*.json             # Shared technology tag & category schemas
│
├── datastructure/                  # Client-supplied data specs (PDF archives)
│
└── docs/                           # Central Documentation Hub
    ├── PROJECT-SPEC.md             # Core REST API layouts, block attributes, and database specs
    ├── ROADMAP.md                  # Component-first backlog (Phase 0 Setup to Phase 6 Launch)
    ├── SCOPE-OF-CONCEPT.md         # Target audience, visual identity, sitemaps, and user journeys
    └── knowledge/
        └── product/
            └── scope-of-work.md    # APPROVED Scope of Work, payment milestones, and responsibilities
```

---

## 📖 Essential Documentation Map

Before writing code or configuring local environments, developers must review the active specifications inside `/docs/`:

1. **Reconcile Scope & Contract Objectives**:
   Review 📑 **[`docs/knowledge/product/scope-of-work.md`](docs/knowledge/product/scope-of-work.md)** to verify agreed deliverables, client asset dependencies, and the 8–10 week delivery milestones.
2. **Review DB Models, Custom Blocks & API Contracts**:
   Review 📑 **[`docs/PROJECT-SPEC.md`](docs/PROJECT-SPEC.md)** to analyze the exact ACF field keys, Custom CPT/Taxonomy rewrite slug configurations, the custom subscriber SQL schema, and the custom Gutenberg blocks properties.
3. **Execute the BACKLOG Step-by-Step**:
   Review 📑 **[`docs/ROADMAP.md`](docs/ROADMAP.md)** to align development tracks with our component-first lifecycle (Foundations → Atoms → Molecules → Organisms → Templates → Pages → Cutover).
4. **Understand Creative Direction & Personas**:
   Review 📑 **[`docs/SCOPE-OF-CONCEPT.md`](docs/SCOPE-OF-CONCEPT.md)** to inspect the "Deep Slate Gray" and "Cyberpunk Blue" color palette, system typography stacks, sitemaps, and mockup user scenarios.

---

## 🔧 Local Setup & Synchronization

### Back-End (WordPress CMS)
The backend acts as an API provider. To initialize and sync CPTs and metadata:
1. Ensure your local environment is running (using standard DDEV or LocalWP):
   ```bash
   ddev start
   ```
2. Navigate to the WordPress admin dashboard (`/wp-admin/`).
3. Under **Custom Fields -> Updates**, click **Sync Available** to automatically populate your WordPress database with the custom post types, custom taxonomies, and meta field groups configured inside `/acf-json/`.
4. Run legacy CSV subscriber imports using WP-CLI (configured during Phase 5):
   ```bash
   ddev wp qp-newsletter import <path_to_historical_subscriber_list.csv>
   ```

### Front-End (Decoupled Layout)
The decoupled client application resides in the `/frontend/` folder, fetching dynamic content using REST or WPGraphQL APIs. Run visual audits on responsive pages to verify strict **WCAG 2.1 AA** compliance using axe DevTools.

---

## 👥 The Project Team
* **Rhysin Villahermosa** — Lead WordPress Developer (BSIT, 4 Years dedicated web development experience). Configures custom database structures, headless API exposures, custom Gutenberg block suites, and subscriber automation workflows.
