# Phased Component-First Project Roadmap (Headless Architecture)

This document outlines the structured development phases for the **QP NewsLetter IT Community Learning Platform**, separating backend API/Gutenberg development from the decoupled, responsive frontend.

---

## Phase 0: Foundations (Backend Setup & API Enablers)

This phase establishes the local development environments, registers content models, exposes fields, and ensures local database sync stability.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **F1** | **Design Token System & Styling Foundations** | `/frontend/src/styles/theme.css`<br>`tailwind.config.js` | Frontend Configuration | 4h |
| **F2** | **Custom Post Types (CPTs) & Taxonomies** | `acf-json/post_type_*.json`<br>`acf-json/taxonomy_*.json` | Backend Setup (ACF JSON) | 6h |
| **F3** | **Advanced Custom Fields (ACF) Integration** | `acf-json/group_*_fields.json` | Backend Custom Fields | 8h |
| **F4** | **API Exposing & Headless Endpoint Config** | `functions.php`<br>`/wp-json/wp/v2/` mappings | Backend API Router | 6h |
| **F5** | **Responsive Image (RIS) payload setup** | `functions.php`<br>Media Attachment sizes | Backend Media Config | 3h |
| **F6** | **Custom Gutenberg Block Scaffolding** | `/blocks/` registration & schema exports | Backend Custom Blocks | 8h |

### 🛠️ Phase 0 Audit Checkpoint:
- [ ] Custom Post Types and Taxonomies are registered and visible in the WordPress admin panel.
- [ ] ACF fields are successfully synced and return correct values (e.g., term IDs, array of IDs) when queried.
- [ ] JSON endpoints (`/wp-json/wp/v2/blog`, etc.) expose custom fields and Gutenberg blocks in the API payload.
- [ ] Custom blocks (`qp/code-snippet`, `qp/tip-callout`, `qp/sponsor-banner`, `qp/resource-cta`) are scaffolded on the backend and registered in the block editor.

---

## Phase 1: Atoms (Basic Frontend UI Elements)

Atoms are the lowest-level visual components rendered on the decoupled frontend.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **A1** | **Standard Button Component** | `/frontend/components/atoms/Button` | Frontend UI Component | 2h |
| **A2** | **Tag & Category Badge Badges** | `/frontend/components/atoms/Badge` | Frontend UI Component | 2h |
| **A3** | **Speaker Avatar Image Wrapper** | `/frontend/components/atoms/Avatar` | Frontend UI Component (with RIS) | 2h |
| **A4** | **Typography Headings & Lead Text styling** | `/frontend/src/styles/typography.css`| Frontend Style Rule | 2h |

---

## Phase 2: Molecules (Compound Frontend Components)

Molecules are combinations of atoms behaving as single interactive units on the frontend.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **M1** | **Content Card Component (Blog, News, Resource)** | `/frontend/components/molecules/Card` | Frontend UI Component | 4h |
| **M2** | **Event Info block** (Date, Location Format, Cost) | `/frontend/components/molecules/EventMeta` | Frontend UI Component | 3h |
| **M3** | **Speaker Profile Card** | `/frontend/components/molecules/SpeakerCard` | Frontend UI Component | 3h |
| **M4** | **Sponsor Indicator bar** | `/frontend/components/molecules/SponsorBar` | Frontend UI Component | 3h |
| **M5** | **Newsletter Subscription Card** | `/frontend/components/molecules/NewsletterCard`| Frontend UI Component | 4h |

---

## Phase 3: Organisms (Section-Level Frontend Components)

Organisms are complex combinations of molecules and atoms that form distinct, reusable sections.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **O1** | **Global Navigation Header with Dropdowns** | `/frontend/components/organisms/Header` | Frontend UI Component | 6h |
| **O2** | **Global Navigation Footer** | `/frontend/components/organisms/Footer` | Frontend UI Component | 4h |
| **O3** | **Speakers Grid Section** | `/frontend/components/organisms/SpeakersGrid` | Frontend UI Component | 4h |
| **O4** | **Content Grid & Unified Tag Filtering Section**| `/frontend/components/organisms/ContentGrid` | Frontend UI Component / API Search | 8h |

### 🛠️ Phases 1-3 Audit Checkpoint:
- [ ] Keyboard navigation (Tab index, active focus states) tested on Header & Footer.
- [ ] Responsive images (RIS) load with aspect-ratio containers, resulting in zero layout shift.
- [ ] All components follow modern semantic HTML5 structures.

---

## Phase 4: Templates (Dynamic Decoupled Page Templates)

Templates map backend API routes to full-page layouts on the decoupled frontend.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **T1** | **Single Blog & News Page Template** | `/frontend/templates/SinglePost` | Frontend Page Controller | 6h |
| **T2** | **Single Event Details Template** | `/frontend/templates/SingleEvent` | Frontend Page Controller | 8h |
| **T3** | **Single Resource Layout** (Download / External Link)| `/frontend/templates/SingleResource` | Frontend Page Controller | 6h |
| **T4** | **Newsletter Archive Page Template** (PDF Download)| `/frontend/templates/ArchiveNewsletter`| Frontend Page Controller | 4h |
| **T5** | **Unified Tag Archive Page** (Cross-hub filtering) | `/frontend/templates/TagArchive` | Frontend Page Controller | 6h |

---

## Phase 5: Pages, Lists & Subscriber Integration

Assembling static pages, connecting APIs, and importing historical subscriber data to satisfy SOW Milestone 2.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **P1** | **Home / Community Dashboard** | `/frontend/pages/index` | Frontend Page Layout | 8h |
| **P2** | **About & Learning Paths Page** | `/frontend/pages/about` | Frontend Page Layout | 4h |
| **S1** | **TAPPC Newsletters Subscriber Import & Workflows**| `admin/import-subscribers.php` / SQL Script| Backend Subscriber Integration | 8h |

### 🛠️ S1 Subscriber Import Details:
- Format, clean, and map the legacy CSV/Excel list.
- Import contacts with email validation, deduping, and opt-in flag safeguards.
- Establish unsubscribing webhooks / status API endpoints to sync frontend toggle preferences back to the database.

---

## Phase 6: Cutover, Training & Deployment

Production-readiness verification, user training, and launch cutover.

| Task ID | Component Name & Scope | Target Files / Outputs | Architecture Line | Est. Hours |
|---|---|---|---|---|
| **C1** | **Query Tuning & Static Content Caching** | Redis rules, CDN / Varnish config | Server / API Performance | 4h |
| **C2** | **WCAG 2.1 AA Accessibility Validation** | Screen Reader & Focus Audits | Accessibility Compliance | 4h |
| **C3** | **handover Training: Tip Upload & Subscriber Workflows**| Administrator Training Session | Deliverable Delivery / Handoff | 4h |
| **C4** | **Managed Hosting Setup, Domain Launch, & Backups**| Cloudways Deploy / Backups Setup | Systems Architecture | 4h |

---

### 🏁 Milestone 2 (Backend & Frontend Build) Acceptance Criteria:
- [ ] Decoupled frontend correctly pulls and renders all CPT details, categories, and tags.
- [ ] Historical TAPPC subscriber lists are fully imported and verified.
- [ ] No layout shifts occur when loading dynamic media contents.

### 🏁 Final Delivery Acceptance Criteria:
- [ ] Platform audited and signed off as compliant with **WCAG 2.1 AA**.
- [ ] Backup schedule active (weekly automated) with server recovery testing verified.
- [ ] HANDOVER COMPLETE: Editorial team trained on custom Gutenberg authorship and subscriber workflows.
