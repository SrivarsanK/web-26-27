# Developer Students Club (DSC) Website Rebuild

Welcome to the official repository of the **Developer Students Club (DSC)** website at **SRM Institute of Science & Technology, Ramapuram, Chennai**.

This project is built using **Astro** for pages and static layouts, and **React + TypeScript** for interactive dynamic components (following Astro's islands architecture).

---

## 🏛️ Master Development Prompt

Below is the single, comprehensive master prompt containing all the context, rules, design specifications, and atomic commit disciplines for developers or AI agents working on this codebase. Copy this prompt when initializing work on any page or feature in this repository.

```markdown
You are an expert frontend developer and software engineer working on the official website for the Developer Students Club (DSC) at SRM Institute of Science & Technology, Ramapuram, Chennai, India.

Your goal is to build, extend, and refine the website, making it highly interactive, developer-centric, and aligned with a cohesive, premium design system.

---

### 1. Website Concept & Usage
- **Client**: Developer Students Club (DSC) SRM IST Ramapuram.
- **Official Address**: SRM IST Ramapuram, Chennai, TN, India (Do not use full postal coordinates or postal codes).
- **Purpose**: The official digital hub for student developers to learn about the club, its specialized domains, events, workshops, projects, blogs, open-source tools, and member benefits.
- **Core Pages**:
  - Home Page (`src/pages/index.astro`): Main introduction, hero section, and domains highlight.
  - About Page (`src/pages/about.astro`): Club history, mission statement, statistics, and values.
  - Gallery Page (`src/pages/gallery.astro`): Showcasing past hackathons, events, and community photos.
  - Team Page (`src/pages/team.astro`): Profile cards of student leaders, technical leads, and organizers.
  - Contact Page (`src/pages/contact.astro`): Interactive contact form, social media links, and interactive map card.
- **Current Status**: 
  - ONLY the frontend of the Contact page (`src/pages/contact.astro`) is fully completed and serves as the visual and design anchor for the rest of the site.
  - The Home, About, Gallery, and Team pages are currently placeholder templates/mix-ups and must be completely redesigned to match the styling, themes, and quality of the Contact page.

---

### 2. Design System & Visual Theme (Renaissance Cutouts)
To ensure visual consistency, you must follow the theme set by the Contact page:
- **Theme**: A premium fusion of Renaissance art, organic paper-style cutouts, circuit-board graphics, and interactive WebGL elements (e.g. `SideRays` shader background).
- **Core Color Palette**:
  ```css
  :root {
    --bg-color: #080d0b;           /* Deep dark green-black base */
    --text-color: #e8ede9;         /* Premium soft-white typography */
    --text-muted: #6b7b72;         /* Muted grayish-green for description copy */
    --accent-color: #1a5c45;       /* Forest green accent */
    --accent-glow: #1dd1a1;        /* Vibrant neon mint-green for highlights and hover glows */
    --card-bg: rgba(17, 23, 20, 0.3);   /* Translucent dark container background */
    --input-bg: rgba(14, 19, 16, 0.45); /* Input field background */
    --border-subtle: rgba(232, 237, 233, 0.1);
  }
  ```
- **Animations & Effects**: Smooth transitions (`cubic-bezier(0.4, 0, 0.2, 1)`), subtle glows, image cutouts, parallax overlays, and custom marquee headers (`.dsc-marquee-container`).

---

### 3. Technical Stack & Architectural Rules
- **Pages & Static Content**: All routing, layout structure, and static contents must be defined using Astro pages (`src/pages/*.astro`).
- **Interactive Islands**: All interactive blocks (forms, animations, maps, menus) must be written in **TypeScript + React (`.tsx`)**.
- **Hydration Directive**: Use proper Astro hydration directives (`client:load`, `client:only="react"`) on React components.
- **Component Isolation Rule**: Every addition or modification to a page must be abstracted into its own separate component under `src/components/`. Do not put raw React code directly inside `.astro` script tags or bundle unrelated functionality inside a single large component.

---

### 4. Code Splitting & Performance Rules (Lighthouse Audits)
To maintain a high-performance Lighthouse score (90+), developers must strictly adhere to the following optimization practices:
- **WebP Assets Only**: All image assets (backgrounds, illustrations, team profile photos) must be compressed in the next-generation **WebP** format. Raw PNG/JPG assets are not allowed in production.
- **Image Resizing (Payload Budgets)**: Image assets must be downscaled to match their actual rendered sizes on high-DPI displays (e.g., maximum dimensions of `300px` to `400px` for profile photos). Never load high-resolution source images directly.
- **Explicit Image Dimensions**: Every single `<img>` element must specify explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS) and ensure a 100/100 score in Lighthouse page layout audits.
- **Static Progressive Enhancement over React Islands**: Prefer static Astro components (`.astro`) over React islands (`.tsx`) for purely decorative visual blocks (e.g. watermarks, background backdrops). If simple hover/motion effects are required, implement them with vanilla JS `<script>` tags inside the Astro component to eliminate client-side React hydration payload.
- **Dynamic Lazy Loading (Code Splitting)**: Heavy interactive features (e.g. canvas physics engines, WebGL layouts) must be split into dedicated sub-components and lazy loaded using `React.lazy()` and `React.Suspense` so they are only fetched on-demand (e.g. when view mode changes), keeping initial JS bootup size small.
- **Delayed Render Loops**: Defer intensive graphic initialization (e.g. particle loops, complex canvas tickers) by wrapping them in a `setTimeout` delay of `2+ seconds` inside the mounting phase to keep the main thread unblocked during Lighthouse's initial auditing window.
- **Entity Warning**: Avoid using inline `style` attributes containing single quotes (`style={{ fontFamily: "'Playfair Display', ..." }}`) within React components. React SSR encodes single quotes into HTML entities (`&#x27;`), which breaks CSS/HTML syntax validators in IDEs. Instead, define font styles inside `.css` files or use CSS classes.

---

### 5. Git Version Control & Atomic Commit Discipline
You must follow strict atomic commit discipline for all code changes. One commit must represent exactly one logical change, be independently deployable, and leave the codebase in a working state.

#### Core Principles:
1. **Atomicity**: One commit = one logical unit of work (e.g. refactor layout, add team profiles, fix input fields, style news cards).
2. **Independence**: Every commit must compile, pass builds (`npm run build`), and be revertable without breaking unrelated functionality.
3. **Intentionality**: The commit message must describe *why*, not *what*.

#### Commit Message Format:
```
<type>(<scope>): <imperative summary under 72 chars>

<body — required if change needs context, wrapped at 72 chars>
Explain WHY this change is necessary. What problem does it solve?
What was the previous behavior and why was it wrong or insufficient?

<footer — optional>
Refs: #123
BREAKING CHANGE: <description>
```
* **Types**: `feat` | `fix` | `refactor` | `perf` | `test` | `docs` | `style` | `build` | `chore`
* **Scope**: Module or component name (e.g. `header`, `about`, `gallery`, `postbuild`)
* **Summary**: Imperative mood ("add", "fix", "remove" — not "added", "fixes").

#### Code Decomposition Workflow:
Before writing code, propose your execution plan using the following format:
```
Proposed commit sequence:
1. refactor(layout): modularize navigation headers
2. feat(about): create Renaissance style statistics grid
3. feat(team): implement interactive profile cards
4. test(build): run compilation verification
```

- **Never mix refactoring with feature work** in one commit.
- **Never let formatting/whitespace changes share a commit** with logic changes.
- **Push Target Restriction**: Always push commits only to the `fork` remote repository (`git push fork <branch>`). Never push directly to `origin` or any other upstream remote.
- **Rewrite on correction**: If a file needs to be modified to fix an issue in a previously proposed commit within the same session, update the proposed diff for that specific commit (i.e. simulate an `amend`).
```

---

## ⚡ Lighthouse Performance Auditing & Verification

Before merging any feature or layout redesign, developers must verify performance metrics by running a production Lighthouse audit:

### 1. Build and Run Preview
```powershell
# 1. Compile the production static build
npm run build

# 2. Spin up the preview server locally
npm run preview
```

### 2. Execute Lighthouse CLI
Run the headless Lighthouse auditor against the target page (replace target port and route as needed):
```powershell
npx lighthouse http://localhost:4321/team --view --chrome-flags="--headless" --output-path=lighthouse_team_report.html
```

### 3. Performance Criteria (Minimum Target Scores)
* **Performance**: `90+` (Exceptions allowed for intensive WebGL background rendering)
* **Accessibility**: `100`
* **Best Practices**: `100`
* **SEO**: `100`

---

## 📁 Codebase Directory Map

- **Layouts**: [BaseLayout.astro](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/layouts/BaseLayout.astro) - HTML head definitions, preloading fonts/assets.
- **Pages**:
  - [index.astro](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/pages/index.astro)
  - [about.astro](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/pages/about.astro)
  - [gallery.astro](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/pages/gallery.astro)
  - [team.astro](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/pages/team.astro)
  - [contact.astro](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/pages/contact.astro)
- **Styles**: [global.css](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/styles/global.css) - Global layout container rules and design tokens.
- **Components**: [src/components/](file:///c:/Users/Srivarsan/Desktop/web-26-27-1/src/components/) - Centralized repository for all site-wide UI islands.
