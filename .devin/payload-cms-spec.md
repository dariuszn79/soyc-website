# Payload CMS Architecture Specification: Club & Fleet Website

This specification outlines the semantic restructuring of a Payload CMS (v3+) instance for a yacht/boating club. It aims to make the dashboard intuitive for non-technical administrators by leveraging Admin Groups, semantic naming, and streamlined relationship patterns.

---

## 1. Directory Structure

Organise your configuration files logically within your Payload codebase (typically under `src/payload/` or `src/app/(payload)/`):

```text
src/
├── collections/
│   ├── Pages.ts
│   ├── Boats.ts
│   ├── People.ts
│   ├── Courses.ts
│   ├── TrainingEvents.ts
│   ├── CruiseEvents.ts
│   ├── Media.ts
│   └── Users.ts
├── globals/
│   ├── SiteSettings.ts
│   ├── Navigation.ts
│   ├── ComponentLabels.ts
│   ├── FleetLocation.ts
│   ├── CruiseMap.ts
│   └── Page404.ts
└── blocks/
    ├── Hero.ts
    ├── TextWithImage.ts
    ├── CardsGrid.ts
    └── FormEmbed.ts
```

---

## 2. Sidebar Navigation Grouping

Apply the `admin.group` property to the following collections and globals to override the default "Collections" and "Globals" splits.

| Dashboard Group | Entity Type | Filename | System Slug | Visual Label / UI Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Content & Pages** | Collection | `Pages.ts` | `pages` | Pages (Home, Club, Community, Join Us, etc.) |
| | Global | `Navigation.ts` | `navigation` | Navigation (Header & Footer link arrays) |
| | Global | `Page404.ts` | `404-page` | 404 Error Page Content |
| **The Fleet** | Collection | `Boats.ts` | `boats` | Boats (Vessel Fleet Profiles) |
| | Global | `FleetLocation.ts` | `fleet-location` | Fleet Base Location / Home Port |
| **Cruises** | Collection | `CruiseEvents.ts` | `cruise-events` | Cruise Events (Upcoming trips and logs) |
| | Global | `CruiseMap.ts` | `cruise-map` | Interactive Route Tracker Map |
| **Training** | Collection | `Courses.ts` | `courses` | Course Curriculum (e.g., Competent Crew, Day Skipper) |
| | Collection | `TrainingEvents.ts`| `training-events` | Training Dates (Scheduled calendar entries/slots) |
| **Members & Forms**| Collection | `Users.ts` | `users` | Club Members & Admin Staff Accounts |
| | Plugin | Built-in | `forms` | Form Builder Templates (Membership Application) |
| | Plugin | Built-in | `form-submissions`| Received Form Entries (Applications Inbox) |
| **⚙️ Settings & Utility**| Global | `SiteSettings.ts` | `site-settings` | SEO Metadata, Integrations & Site Status |
| | Global | `ComponentLabels.ts`| `component-labels`| Multi-use UI text fragments and UI micro-copy |
| | Collection | `People.ts` | `people` | Committee Members, Staff, and Instructors |
| | Collection | `Media.ts` | `media` | Asset Library (Images, Documents, SVGs) |

---

## 3. Structural Page Schema (`collections/Pages.ts`)

This configuration uses Payload's `blocks` field to give admins a semantic section-based layout engine.

```typescript
import { CollectionConfig } from 'payload'
import { HeroSection } from '../blocks/Hero'
import { TextWithImageSection } from '../blocks/TextWithImage'
import { CardsGridSection } from '../blocks/CardsGrid'
import { FormEmbedSection } from '../blocks/FormEmbed'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: '🏛️ Content & Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'e.g., "the-club", "fleet", "join-us". Use "index" for the Home Page.',
      },
    },
    {
      name: 'pageSections',
      type: 'blocks',
      label: 'Page Layout Sections',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      blocks: [
        HeroSection,
        TextWithImageSection,
        CardsGridSection,
        FormEmbedSection,
      ],
    },
  ],
}
```

---

## 4. Section Blocks Definitions (`/blocks`)

Admins manage standalone subsections (Cards) wholly inside the page layout context to prevent sidebar clutter.

### 4.1 Hero Section (`blocks/Hero.ts`)
```typescript
import { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSection',
  labels: {
    singular: 'Hero Banner Section',
    plural: 'Hero Banner Sections',
  },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'textarea' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'link', type: 'text', label: 'Button Link (URL/Slug)' },
      ],
    },
  ],
}
```

### 4.2 Cards Grid Section (`blocks/CardsGrid.ts`)
```typescript
import { Block } from 'payload'

export const CardsGridSection: Block = {
  slug: 'cardsGridSection',
  interfaceName: 'CardsGridSection',
  labels: {
    singular: 'Cards Grid Section (Subsections)',
    plural: 'Cards Grid Sections (Subsections)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Section Introduction Text',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Subsections (Cards)',
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'link', type: 'text', label: 'Card Button Link' },
      ],
    },
  ],
}
```

### 4.3 Form Embed Section (`blocks/FormEmbed.ts`)
```typescript
import { Block } from 'payload'

export const FormEmbedSection: Block = {
  slug: 'formEmbedSection',
  interfaceName: 'FormEmbedSection',
  labels: {
    singular: 'Form Embed Section',
    plural: 'Form Embed Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms', // References the payload plugin-form-builder collection
      required: true,
      label: 'Select Form to Embed',
    },
  ],
}
```

---

## 5. Front-End Routing & Special Pages Logic

To ensure clean management, handle your structural core pages according to these implementation criteria:

*   **Standard Static Pages (`/home`, `/the-club`, `/community`, `/fleet`, `/cruises`, `/training`, `/join-us`):**
    *   Created as separate entries inside the `Pages` collection.
    *   The front-end dynamically renders layout blocks sequentially from the `pageSections` field array.
*   **The Membership Application Form:**
    *   Created entirely within the standard plugin dashboard under **Members & Forms > Forms**.
    *   Rendered on the website by editing the **Join Us** page entry in the `Pages` collection and appending a `FormEmbedSection` block referencing the membership application form record.
*   **Members Area Login (`/members-area`):**
    *   To prevent admin user error, create a fixed static page record in the `Pages` collection named "Members Area Login". 
    *   Apply `admin: { readOnly: true }` or use custom access control definitions to ensure admins do not delete or modify the core schema structure of the login route. All custom authentication configurations must handle security checks using standard frontend layout gates.
