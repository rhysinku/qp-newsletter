# Project Technical Specification: IT Community Learning Platform

## 1. Overview & System Goals
This project is an **IT Community Learning Platform** designed to share educational resources, news, events, blogs, and newsletter archives. The platform's goal is to enable developers, sysadmins, and tech enthusiasts to learn and stay updated.

The system is built on a **headless WordPress architecture**, separating the editorial backend from the visual presentation layer:
- **Backend (WordPress Core)**: Used strictly for content management, Gutenberg-based layout authoring, custom post type management, and metadata storage.
- **API Consuming Layer**: Exposes fully structured post contents (including nested Gutenberg block objects and ACF PRO custom fields) via the WordPress REST API or WPGraphQL.
- **Frontend (Decoupled Presentation)**: Consumes the headless APIs and renders a lightning-fast, responsive developer-centric interface using modern semantic HTML, CSS utility tokens, and Tailwind CSS.
- **Asset Stability & RIS**: Strict aspect-ratio wrappers surrounding responsive images (`wp_get_attachment_image` metadata exposed to API) to guarantee zero layout shift (CLS).
- **Custom Post Types (CPTs) & Taxonomies**: Outlined below for stable local synchronization.

---

## 2. Global Conventions
To maintain strict codebase integrity, we enforce the following naming, key-generation, and return-format standards (per `CLAUDE.md` and `mmd-acf` guidelines):

1. **Slugs and Keys**:
   - All CPT and Taxonomy slugs must be `snake_case`, singular, and logical.
   - Field Group keys must follow the pattern `group_{slug}_fields`.
   - Field keys must follow the pattern `field_{hex}` using stable 13-character random hex values to ensure local-database sync stability.
2. **Field Names**:
   - Standard field names must be `snake_case`.
   - Taxonomy single-select reference fields must use the name `{taxonomy}-term` and return **term ID**.
   - Taxonomy multi-select reference fields must use the name `{taxonomy}-terms` and return **array of term IDs**.
   - Relationship fields must follow the alphabetical naming pattern `related-{type_a}-{type_b}` and return **array of post IDs**.
3. **File Output Structure**:
   - All CPT registrations are output to `wp-content/themes/{theme}/acf-json/post_type_{slug}.json`.
   - All Taxonomy registrations are output to `wp-content/themes/{theme}/acf-json/taxonomy_{slug}.json`.
   - All Field Group configurations are output to `wp-content/themes/{theme}/acf-json/group_{slug}_fields.json`.

---

## 3. Content Model (Post Types & Taxonomies)

### 3.1 Custom Post Types (CPTs)

| Post Type | Singular Slug | Plural Slug | Supports | Built-in Taxonomies | Description |
|---|---|---|---|---|---|
| **Blog** | `blog` | `blog` | `title`, `editor`, `excerpt`, `thumbnail`, `revisions`, `custom-fields` | `tech_tag`, `blog_category` | In-depth technical articles, tutorials, and developer thoughts. |
| **News** | `news` | `news` | `title`, `editor`, `excerpt`, `thumbnail`, `revisions`, `custom-fields` | `tech_tag`, `news_category` | Technical industry news, releases, product launches, and alerts. |
| **Event** | `event` | `events` | `title`, `editor`, `excerpt`, `thumbnail`, `revisions`, `custom-fields` | `tech_tag` | IT community meetups, webinars, conferences, and bootcamps. |
| **Newsletter** | `newsletter` | `newsletters` | `title`, `editor`, `excerpt`, `thumbnail`, `revisions`, `custom-fields` | — | Archive of dispatched community newsletters with PDF downloads. |
| **Resource** | `resource` | `resources` | `title`, `editor`, `excerpt`, `thumbnail`, `revisions`, `custom-fields` | `tech_tag` | Technical references, sheets, checklists, and downloadable guides. |

### 3.2 Custom Taxonomies

| Taxonomy | Slug | Hierarchical | Associated Post Types | Terms / Options | Description |
|---|---|---|---|---|---|
| **Technology Tag** | `tech_tag` | `0` (Tag-style) | `blog`, `news`, `event`, `resource` | `react`, `laravel`, `docker`, `rust`, `api` | Interconnected tagging system for cross-content filtering. |
| **Blog Category** | `blog_category` | `1` (Category-style) | `blog` | `tutorials`, `guides`, `developer thoughts` | Structural categories for grouping blogs. |
| **News Category** | `news_category` | `1` (Category-style) | `news` | `industry updates`, `local alerts`, `product launches` | Structural categories for grouping news articles. |

---

## 4. Meta Fields Specification (ACF Configuration)

Each content type is extended with custom fields to support rich frontend displays. Below are the precise field specifications compiled from data-structure requirements.

### 4.1 Blog Field Group (`group_blog_fields`)
*Attached to post type `blog`*

- **File name**: `group_blog_fields.json`
- **Key**: `group_blog_fields`

| Field Label | Field Name | Field Key | Type | Req? | Choices / Options / Display Conditions | Instructions |
|---|---|---|---|---|---|---|
| **Tag** | `tech_tag-terms` | `field_blog_tag` | `taxonomy` | No | Taxonomy: `tech_tag`<br>Field Type: `checkbox`<br>Return: `id` | Select technology tags that apply to this blog post. |
| **Category** | `blog_category-term` | `field_blog_cat` | `taxonomy` | Yes | Taxonomy: `blog_category`<br>Field Type: `select`<br>Return: `id` | Select primary blog category. |
| **Estimate Reading Time** | `estimate_reading` | `field_blog_est_read` | `number` | No | `min: 1`, `step: 1`, suffix: `mins` | Est. reading time in minutes. |
| **Associated URL** | `associated_url` | `field_blog_assoc_url` | `url` | No | — | Reference or canonical external URL for the post. |
| **Sponsor Content** | `sponsor_content` | `field_blog_spons_cnt` | `true_false` | No | Default: `0`, UI Style | Is this content sponsored by an external partner? |
| **Sponsor Name** | `sponsor_name` | `field_blog_spons_nm` | `text` | Yes | **Display Condition:**<br>`"Sponsor Content" = true` | Name of the sponsor (visible only if Sponsored is checked). |
| **Sponsor Link** | `sponsor_link` | `field_blog_spons_lk` | `url` | Yes | **Display Condition:**<br>`"Sponsor Content" = true` | Website link of the sponsor (visible only if Sponsored is checked). |

---

### 4.2 News Field Group (`group_news_fields`)
*Attached to post type `news`*

- **File name**: `group_news_fields.json`
- **Key**: `group_news_fields`

| Field Label | Field Name | Field Key | Type | Req? | Choices / Options / Display Conditions | Instructions |
|---|---|---|---|---|---|---|
| **Tag** | `tech_tag-terms` | `field_news_tag` | `taxonomy` | No | Taxonomy: `tech_tag`<br>Field Type: `checkbox`<br>Return: `id` | Select technology tags that apply to this news item. |
| **Category** | `news_category-term` | `field_news_cat` | `taxonomy` | Yes | Taxonomy: `news_category`<br>Field Type: `select`<br>Return: `id` | Select primary news category. |
| **Estimate Reading Time** | `estimate_reading` | `field_news_est_read` | `number` | No | `min: 1`, `step: 1`, suffix: `mins` | Est. reading time in minutes. |
| **Associated URL** | `associated_url` | `field_news_assoc_url` | `url` | No | — | Reference or canonical external URL for the news. |
| **Sponsor Content** | `sponsor_content` | `field_news_spons_cnt` | `true_false` | No | Default: `0`, UI Style | Is this content sponsored? |
| **Sponsor Name** | `sponsor_name` | `field_news_spons_nm` | `text` | Yes | **Display Condition:**<br>`"Sponsor Content" = true` | Name of the sponsor (visible only if Sponsored is checked). |
| **Sponsor Link** | `sponsor_link` | `field_news_spons_lk` | `url` | Yes | **Display Condition:**<br>`"Sponsor Content" = true` | Website link of the sponsor (visible only if Sponsored is checked). |

---

### 4.3 Event Field Group (`group_event_fields`)
*Attached to post type `event`*

- **File name**: `group_event_fields.json`
- **Key**: `group_event_fields`

| Field Label | Field Name | Field Key | Type | Req? | Choices / Options / Display Conditions | Instructions |
|---|---|---|---|---|---|---|
| **Start Date** | `start_date` | `field_event_start` | `date_time_picker` | Yes | Return: `Y-m-d H:i:s`, Display: `d/m/Y g:i a` | Start date and time of the event. |
| **End Date** | `end_date` | `field_event_end` | `date_time_picker` | Yes | Return: `Y-m-d H:i:s`, Display: `d/m/Y g:i a` | End date and time of the event. |
| **Event Location Format** | `location_format` | `field_event_format` | `select` | Yes | `in_person` : In-Person<br>`online` : Online (Virtual) | Choose whether this event is physically hosted or virtual. |
| **Physical Venue** | `physical_venue` | `field_event_venue` | `textarea` | Yes | **Display Condition:**<br>`"Event Location Format" = "in_person"` | Full physical address or venue description. |
| **Virtual Meeting** | `virtual_meeting` | `field_event_meeting` | `url` | Yes | **Display Condition:**<br>`"Event Location Format" = "online"` | Join link for Zoom, Meet, Teams, etc. |
| **Registration URL** | `registration_url` | `field_event_reg_url` | `url` | Yes | **Display Condition:**<br>`"Event Location Format" = "online"` | Ticket booking or registration website URL. |
| **Entry Cost** | `entry_cost` | `field_event_cost` | `text` | No | e.g. "Free", "$15 USD", "Invite Only" | Ticket pricing details. |
| **Speakers** | `speakers` | `field_event_speakers` | `repeater` | No | Layout: `block`, Row Label: `Speaker` | List of speakers participating in the event. |
| **- Speaker Name** | `name` | `field_speaker_name` | `text` | Yes | Sub-field | Full name of speaker. |
| **- Speaker Title** | `title` | `field_speaker_title` | `text` | No | Sub-field | Professional title / company. |
| **- Speaker URL** | `url` | `field_speaker_url` | `url` | No | Sub-field | LinkedIn, personal site, or Twitter handle. |
| **- Speaker Avatar** | `avatar` | `field_speaker_avatar` | `image` | No | Sub-field, Return: `id` | Headshot image of speaker. |

---

### 4.4 Newsletter Field Group (`group_newsletter_fields`)
*Attached to post type `newsletter`*

- **File name**: `group_newsletter_fields.json`
- **Key**: `group_newsletter_fields`

| Field Label | Field Name | Field Key | Type | Req? | Choices / Options / Display Conditions | Instructions |
|---|---|---|---|---|---|---|
| **Send Date** | `send_date` | `field_newsletter_send` | `date_picker` | Yes | Return: `Y-m-d`, Display: `d/m/Y` | Date when the newsletter issue was dispatched. |
| **PDF Download** | `pdf_download` | `field_newsletter_pdf` | `file` | Yes | Allowed types: `pdf`<br>Return: `id` | Upload the PDF version of this newsletter issue. |

---

### 4.5 Resource Field Group (`group_resource_fields`)
*Attached to post type `resource`*

- **File name**: `group_resource_fields.json`
- **Key**: `group_resource_fields`

| Field Label | Field Name | Field Key | Type | Req? | Choices / Options / Display Conditions | Instructions |
|---|---|---|---|---|---|---|
| **Resources Type** | `resources_type` | `field_resource_type` | `select` | Yes | `internal` : Internal Content<br>`external_link` : External Link<br>`downloadable_file` : Downloadable File | Where is this resource hosted? |
| **External URL** | `external_url` | `field_resource_ext_url` | `url` | Yes | **Display Condition:**<br>`"Resources Type" = "external_link"` | Direct link to the external resource. |
| **Downloadable File** | `downloadable_file` | `field_resource_file` | `file` | Yes | **Display Condition:**<br>`"Resources Type" = "downloadable_file"`<br>Return: `id` | Upload the resource file (PDF, Zip, etc.). |
| **Author** | `author` | `field_resource_author` | `text` | No | — | Author or organization that compiled the resource. |
| **Skill Level** | `skill_level` | `field_resource_skill` | `select` | Yes | `all` : All Level<br>`beginner` : Beginner<br>`intermediate` : Intermediate<br>`advance` : Advance | Intended target experience level for this resource. |

---

## 5. Architectural & Implementation Decisions

1. **Shared Taxonomy vs Separated Custom Fields**:
   To provide maximum cohesion for learning paths, `tech_tag` is defined as a shared, non-hierarchical taxonomy. This enables community members to click a "Docker" tag on a Blog post and immediately view related News, Events, and Resources categorized under "Docker".
2. **ACF Local JSON Synchronization**:
   By outputting custom post types, taxonomies, and field groups to standard JSON files inside the active theme’s `acf-json/` folder, the configurations are automatically registered by WordPress, version-controlled in Git, and easily synchronizable across staging, production, and other local ddev environments without requiring database migrations.
3. **Responsive Images (RIS) Integration in Headless Context**:
   To prevent layout shifts (CLS) on the decoupled frontend, all image media fields (featured thumbnails, speaker avatars) are stored as attachment IDs. A PHP REST API filter (`register_rest_field`) registered during Task `F5` will format these IDs into a comprehensive responsive image payload.
   * **API Payload Schema**:
     ```json
     "featured_image_ris": {
       "id": 124,
       "url": "https://api.qpnewsletter.com/wp-content/uploads/2026/09/image.jpg",
       "srcset": "https://api.qpnewsletter.com/wp-content/uploads/2026/09/image-300x200.jpg 300w, https://api.qpnewsletter.com/wp-content/uploads/2026/09/image-1024x768.jpg 1024w",
       "sizes": "(max-width: 1024px) 100vw, 1024px",
       "width": 1024,
       "height": 768,
       "aspect_ratio": "1.33"
     }
     ```
     The decoupled frontend reads this schema to build strict CSS `aspect-ratio` layout wrappers, completely eliminating Cumulative Layout Shift (CLS).
4. **Conditional Query Optimization**:
   For Events, an admin filter and customized pre_get_posts query hook will separate upcoming events from past events (comparing the `start_date` meta key against the current timestamp) to keep user views relevant.

---

## 6. Subscriber List Migration & Workflows

### 6.1 Database Storage Platform
To maintain a self-contained ecosystem, eliminate recurring SaaS subscription overheads, and ensure rapid custom API query support, newsletter subscriber data is stored directly in a secure custom table inside the WordPress database: `wp_qp_subscribers`.
* **Database Schema (`wp_qp_subscribers`)**:
  - `id` (BIGINT, Primary Key, Auto-increment)
  - `email` (VARCHAR 255, Unique index, Not Null)
  - `first_name` (VARCHAR 100)
  - `last_name` (VARCHAR 100)
  - `status` (VARCHAR 20, Default: 'active' - choices: 'active', 'unsubscribed', 'bounced')
  - `created_at` (DATETIME, Default: current timestamp)
  - `unsubscribed_at` (DATETIME, Nullable)

### 6.2 REST API Subscription Endpoints
WordPress exposes a custom, namespace-isolated REST API endpoint controller (`/wp-json/qp-newsletter/v1/subscribers`) for frontend subscription management:
* **POST `/subscribe`**:
  - **Inputs**: `email` (required), `first_name`, `last_name`
  - **Action**: Validates email string, checks against duplication. If the contact exists with an `'unsubscribed'` status, it toggles them back to `'active'`.
  - **Security**: Endpoint uses origin validation (CORS restricted to authorized frontend origins) and nonce/token authentication guards.
* **POST `/unsubscribe`**:
  - **Inputs**: `email` (required)
  - **Action**: Safely updates the status to `'unsubscribed'` and sets `unsubscribed_at` to the current server timestamp to ensure strict legal compliance.

### 6.3 Legacy TAPPC subscriber List Import
The client will deliver historical subscriber spreadsheets (CSV/XLSX) prior to Milestone 2.
- **Import Script**: A WP-CLI command (`wp qp-newsletter import <file.csv>`) or a simple administrative file uploader will process the file, parse email columns, validate formats, and load them into the `wp_qp_subscribers` table with automated deduping routines.

---

## 7. Custom Gutenberg Block Inventory

Administrators will author weekly learning materials, tech tips, and news feeds utilizing four highly-focused Gutenberg blocks. These blocks expose structured layout configurations to the headless REST API.

### 7.1 Code Snippet Block (`qp/code-snippet`)
- **Visual Presentation**: Dark-mode syntax highlighting with inline line numbers, monospace font stacking (JetBrains Mono), and a responsive CTA copy button.
- **Attributes**:
  - `code` (string): The raw block of code.
  - `language` (string): dropdown selection (e.g. `javascript`, `php`, `rust`, `bash`, `html`).
  - `caption` (string): Optional caption shown at the bottom.

### 7.2 Tip Callout Block (`qp/tip-callout`)
- **Visual Presentation**: High-contrast bordered card styling matching the "Cyberpunk Blue" accent color to grab immediate attention during quick reading.
- **Attributes**:
  - `type` (select): `tip` (blue), `info` (teal), `warning` (orange).
  - `title` (text): Strong title header.
  - `content` (textarea): Main explanatory paragraph.

### 7.3 Sponsor Banner Block (`qp/sponsor-banner`)
- **Visual Presentation**: Unobtrusive sponsor section containing sponsor logo, text label, and external outbound URL.
- **Attributes**:
  - `sponsor_id` (number): Media Attachment ID of sponsor logo.
  - `sponsor_name` (text): Visible sponsor display string.
  - `sponsor_url` (url): Outbound click target.

### 7.4 Inline Resource CTA Block (`qp/resource-cta`)
- **Visual Presentation**: Flat button card displaying cheat sheet descriptions and a download link.
- **Attributes**:
  - `resource_id` (number): Selected Resource CPT post ID.
  - `button_label` (text): Custom CTA text (e.g., "Download Rust Cheatsheet").

---

## 8. WCAG 2.1 AA Compliance Verification Protocol

To ensure we achieve the accessibility standard defined in the SOW, the headless frontend components and layout pages must undergo a systematic manual and automated validation check before deployment:

1. **Keyboard Operability (SC 2.1.1 / 2.4.7)**:
   - All interactive items (links, buttons, event tags, download inputs) must be reachable via `Tab` or `Shift + Tab`.
   - Element focus rings must remain highly visible, utilizing `:focus-visible` styling (no raw `:focus` removal) with a minimum contrast ratio of `3:1` against surrounding background pixels.
2. **Contrast Levels (SC 1.4.3)**:
   - Body copy (Sans-serif Geist/Inter) and headings rendered against deep slate charcoal (`#0F172A`) must exceed a contrast ratio of `4.5:1`.
   - Cyberpunk Blue (`#3B82F6`) buttons and green event tags (`#10B981`) must maintain a readable text contrast (using dark text over light badges where required).
3. **Screen Reader Announcements (SC 4.1.3)**:
   - Icon-only interactive buttons (e.g., close modals, copy snippet clipboard button, social share anchors) must include descriptive `aria-label` tags.
   - Live filters, search grids, and active tag list filters must announce dynamic restructures to screen readers using an active status live region (`role="status"`, `aria-live="polite"`).
4. **Reflow & Resizing (SC 1.4.4 / 1.4.10)**:
   - Layout files must scale and reflow comfortably at `200%` browser zoom without text clipping or overlapping container layers.
   - Screen resolution limits down to `320px` mobile viewports must render cleanly without triggering horizontal scrollbars.
