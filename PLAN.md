# Portfolio Implementation Plan

## 1) Product Goal
Build a static, story-driven software engineer portfolio that feels like an upgraded CV: polished visuals, smooth interactions, and strong performance.

## 2) Confirmed Decisions
- Framework: Astro + React islands
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion (subtle polished interactions)
- Hosting: GitHub Pages (static deployment)
- Initial scope: 3 showcased projects (MVP)
- Scrolling rule: no parallax/pinned storytelling sections; occasional sticky headings allowed
- Fixed element exception: social links fixed at bottom-left

## 3) Final Requirements (Source of Truth)

### Intro Section
- Animated intro screen with visible name and brief introduction
- Visual style inspired by `zunedaalim.com`

### Scroll Behavior
- Smooth section-to-section scrolling
- No parallax scrolling

### Project Showcase
- Inspired by Venture Showcase on `parthh.in`
- Left side: project title, short description, tech chips (logo + name)
- Right side: demo image in consistent container layout
- Each project includes synchronized solid background color treatment

### Fixed Social Links
- Social links remain fixed at bottom-left of viewport

### Experience Timeline
- Animated timeline inspired by “My career & experience” on `redoyanulhaque.me`

### Tech Stack Section
- Plaque/card style inspired by `redoyanulhaque.me`
- Blurred background plaques
- Inactive logos shown in black-and-white/grayscale
- Hover state enlarges plaque and reveals full-color logo

### Credits Section
- Credit block similar to `redoyanulhaque.me`
- Must include: “Designed and Developed by Alan Tran © 2026”

## 4) Build Phases and Tasks

### Phase 1 — Project Setup
**Goal:** Establish static architecture and deployment baseline.

**Tasks**
- [x] Scaffold Astro + React + TypeScript project
- [x] Install and configure Tailwind CSS
- [x] Configure Astro static output and GitHub Pages base path
- [x] Add standard scripts (`dev`, `build`, `preview`)
- [x] Add GitHub Actions workflow for static deployment

**Deliverables**
- Running local app with clean starter layout
- Successful production build output (`dist`)
- Auto-deploy workflow file committed

### Phase 2 — Global Layout and Navigation
**Goal:** Implement page structure and base UX behavior.

**Tasks**
- [x] Create single-page section skeleton in this order:
	Intro → Projects → Experience → Tech Stack → Credits
- [x] Add section spacing rhythm and max-width container system
- [x] Implement smooth scrolling behavior
- [x] Add fixed bottom-left social links with keyboard-accessible states

**Deliverables**
- Scrollable one-page structure
- Fixed social links visible across sections

### Phase 3 — Intro Experience
**Goal:** Land strong first impression with lightweight motion.

**Tasks**
- [x] Build intro content block (name + concise bio)
- [x] Add entrance animations using Framer Motion
- [x] Ensure reduced-motion fallback behavior

**Deliverables**
- Animated intro section that remains performant and readable

### Phase 4 — Project Showcase (MVP: 3 Projects)
**Goal:** Ship the flagship project storytelling section.

**Tasks**
- [ ] Create reusable `ProjectItem` component
- [x] Implement two-column layout (content left, image right)
- [x] Build tech chip component with logo + text
- [x] Add per-project synchronized solid color backgrounds
- [x] Standardize image container dimensions and behavior

**Deliverables**
- 3 complete project entries in unified visual format

### Phase 5 — Experience Timeline
**Goal:** Present career progression with clear animated chronology.

**Tasks**
- [x] Build vertical timeline structure
- [x] Add role/company/date cards
- [x] Add reveal-on-scroll timeline animations
- [x] Keep animation non-parallax and low-overhead

**Deliverables**
- Fully readable animated timeline section

### Phase 6 — Tech Stack Plaques
**Goal:** Showcase tools in an interactive but lightweight way.

**Tasks**
- [x] Create responsive grid of stack plaques
- [x] Apply blur-backed plaque styling
- [x] Implement grayscale default logo state
- [x] Implement hover scale + color reveal state

**Deliverables**
- Tech stack section with polished hover feedback

### Phase 7 — Credits and Contact
**Goal:** Close the page with clear identity and attribution.

**Tasks**
- [x] Build credits block with personal/contact details
- [x] Include required attribution line exactly:
	“Designed and Developed by Alan Tran © 2026”

**Deliverables**
- Final credits section complete and visible at page end

### Phase 8 — Quality and Performance Hardening
**Goal:** Ensure fast, accessible, production-ready output.

**Tasks**
- [ ] Optimize images and logo assets
- [x] Limit React hydration to interactive islands only
- [ ] Validate keyboard navigation and focus states
- [x] Validate reduced-motion behavior
- [ ] Run Lighthouse and tune obvious regressions

**Deliverables**
- Stable static build with strong performance and accessibility

## 5) Acceptance Checklist
- [x] Intro animation, name, and short bio are visible and polished
- [x] Smooth scrolling works without parallax effects
- [x] Project showcase follows exact left/right layout pattern
- [x] Tech chips contain both logo and technology name
- [x] Each showcased project has consistent solid color treatment
- [x] Social links stay fixed at bottom-left
- [x] Experience timeline is animated and readable
- [x] Tech stack plaques blur + grayscale + hover color reveal all work
- [x] Credits section includes required attribution text verbatim
- [ ] Site builds and deploys as static content to GitHub Pages

## 6) Content Needed From You
- Intro text (name + 1–2 sentence summary)
- 3 project entries (title, summary, tech list, preview image)
- Experience timeline entries (role, company, date range, highlights)
- Tech stack logos and display names
- Social/contact links and full credit details