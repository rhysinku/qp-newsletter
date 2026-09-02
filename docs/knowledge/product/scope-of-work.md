---
title: Scope of Work | QP NewsLetter
project: Website Design & Development for QP NewsLetter (IT Community Learning Platform)
date: September 2026
status: APPROVED
investment: $20,000 + GST
timeline: 8 to 10 weeks
lead_developer: Rhysin Villahermosa (BSIT, 4 Years XP)
last_reviewed: 2026-09-02
---

# Scope of Work: QP NewsLetter (IT Community Learning Platform)

This document is the authoritative, git-tracked record of the business scope, objectives, success criteria, and deliverables for the **QP NewsLetter** platform, transcribed and distilled from the signed client Scope of Work (SOW V3).

---

## 1. Executive Summary & Core Objectives

The primary objective of this project is to design and develop **QP NewsLetter**, a comprehensive **IT Community Learning Platform**. It serves as a unified hub for developers, sysadmins, and tech enthusiasts to access weekly educational resources, industry news, community events, and downloadable newsletter archives.

### Architectural Strategy
The project will be built utilizing a high-performance **headless WordPress architecture**. This approach separates the backend content authoring environment from the frontend presentation layer, delivering extreme speed, enhanced security, and developer-centric design control.
- **Backend (WordPress + Gutenberg + ACF PRO)**: Custom editorial workflows for creating structured block and meta-data.
- **Frontend (Headless Consuming Layer)**: Decoupled visual layer consuming backend REST/GraphQL data, rendered with semantic HTML5 and Tailwind CSS.

---

## 2. In Scope (Specific Deliverables)

### 2.1 Research & Discovery
- Technical requirements finalization.
- Target audience personas definition.
- Content routing logic for the unified tag-based hub structure.

### 2.2 Iterative Wireframes
- Wireframe design for mobile and desktop user journeys.
- Focus on weekly tip discovery and cross-hub navigation.

### 2.3 Website UX/UI Design
- Custom Dark-Mode design implementing the "Deep Slate Gray" and "Cyberpunk Blue" tech aesthetic.
- Monospace typography for code snippets (JetBrains Mono) and highly readable Sans-serif typography for body text.
- Formulated through iterative design rounds with concept evaluation, typography selection, and final polish.

### 2.4 Website Functionalities & Hubs

#### 2.4.1 General Functionalities
- **Global Naming & Taxonomies**: Implementation of `tech_tag` as a global taxonomy system to connect Blogs, News, Events, and Resources.
- **Responsive Media Layouts**: Image handling with strict aspect-ratio wrappers to achieve **Zero Layout Shift (CLS)**.
- **ACF JSON Sync stability**: Customized schema configurations synced to theme files using stable 13-character hex keys.
- **Accessibility Compliance**: Built and audited to meet **WCAG 2.1 AA** standards.

#### 2.4.2 Hub Specifics
- 📝 **Blog Hub**: Full architecture for in-depth tutorials, developer thoughts, and dynamic estimated reading times.
- ⚡ **News Hub**: Streamlined feeds for technical news, industry releases, and critical system/security alerts.
- 📅 **Events Calendar**: Clean layout dividing upcoming and past events, custom fields for virtual/physical locations and registration URLs.
- 📂 **Resources Directory**: Reference lists, cheatsheets, and external reference repositories filtered by skill levels.
- 📥 **Newsletter Archive**: Dedicated monthly archive allowing readers to download weekly digital dispatches in PDF format with a single click.

### 2.5 Subscriber Data Integration
- **Subscriber List Migration**: Formatting, mapping, and importing the existing **TAPPC Newsletters subscriber list** into the subscriber management system.
- Training the editorial team on managing ongoing subscriber list data workflows.

### 2.6 Domain Management, Hosting & Backups
- Launch coordination, including managed cloud hosting configuration and automated weekly backup setup.

---

## 3. Out of Scope

Any requirements or feature additions outside section 2 are treated as official variations. Examples include:
- Adding custom post types beyond the agreed `tech_tag` architectural layout.
- Integrating third-party APIs or external ERP/CRM systems unless explicitly listed.
- Designing additional layout variations beyond the approved wireframe scope.

---

## 4. Payment Milestones & Timelines

Total Project Cost: **$20,000 + GST**

| Milestone ID | Phase / Deliverables | Payment % | Value | Target Timeline |
|---|---|---|---|---|
| **M0** | **Deposit**: Project Commencement & Discovery | 30% | $6,000 | Weeks 1-2 |
| **M1** | **Milestone 1**: UX/UI Design & Wireframe Approval | 30% | $6,000 | Weeks 3-4 |
| **M2** | **Milestone 2**: Backend & Frontend Build Completion (including formatting of existing TAPPC Newsletters lists) | 30% | $6,000 | Weeks 5-7 |
| **M3** | **Final**: QA Testing, Training, and Deployment | 10% | $2,000 | Weeks 8-10 |

---

## 5. Responsibilities Matrix

### Marameo Design Responsibilities
- Deliver full UX/UI, WordPress headless configuration, and frontend development.
- Rigorously test all fields, taxonomies, and layout systems to meet **WCAG 2.1 AA** accessibility standards.
- Provide weekly progress updates via a dedicated project manager.
- Provide comprehensive handover training for administrative users on weekly tip uploading and subscriber data workflows.

### Client Responsibilities
- Provide consolidated feedback on milestones within **3 business days** to avoid timeline delays.
- Supply registrar access, domain details, and the final **TAPPC Newsletters subscriber lists** prior to Milestone 2.
- Provide initial educational and news content for live staging during the QA phase.

---

## 6. Assumptions & Dependencies

1. **Collaboration Speed**: Deliverable approvals will be processed within the 3-day SLA window.
2. **Subscriber Data Format**: The client will deliver TAPPC subscriber lists in CSV or Excel format containing clear email, name, and status headers.
3. **Headless Environment**: Hosting configuration assumes WordPress acts as a backend server and the decoupled frontend runs on standard node/static deployment workflows.

---

## 7. See Also

- 📑 **[`docs/PROJECT-SPEC.md`](../PROJECT-SPEC.md)** - Raw content model mappings, ACF field keys, and database registration details.
- 📑 **[`docs/ROADMAP.md`](../ROADMAP.md)** - Component-first execution roadmap (Phases 0-6).
- 📑 **[`docs/SCOPE-OF-CONCEPT.md`](../SCOPE-OF-CONCEPT.md)** - Audience personas, creative direction, information architecture, and user journeys.
