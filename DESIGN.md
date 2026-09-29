---
name: Achraf Malki Portfolio
description: Precision-engineered personal portfolio for an enterprise AI and systems consultant.
colors:
  command-blue: "#0987f2"
  arctic-canvas: "#f3fffe"
  deep-charcoal: "#313131"
  ink: "#222222"
  steel: "#555555"
  muted: "#888888"
typography:
  display:
    fontFamily: "Rubik, sans-serif"
    fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "clamp(1rem, 1.5vw, 1.25rem)"
    fontWeight: 300
    lineHeight: 1.6
  label:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  pill: "20px"
  card: "24px"
  card-inner: "16px"
  sm: "6px"
  md: "12px"
spacing:
  xs: "20px"
  sm: "30px"
  md: "60px"
  lg: "100px"
  xl: "200px"
components:
  button-primary:
    backgroundColor: "{colors.command-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.command-blue}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "50px"
  button-ghost-hover:
    backgroundColor: "{colors.command-blue}"
    textColor: "#ffffff"
---

# Design System: Achraf Malki Portfolio

## 1. Overview

**Creative North Star: "The Systems Brief"**

This is a portfolio that behaves like an engineering artifact: every element is justified by function, every choice is load-bearing. The design system was built around a single principle — that a precision engineer's interface should itself be precision-engineered. No decorative layers. No redundant structure. No ambient color that doesn't carry information. The medium is the message.

The type pairing is the central statement: Rubik for display headings (confident, geometric, accessible) and Roboto Mono for everything else (body, subtitles, labels). This is not a stylistic accident — the deliberate use of a monospace face for body copy signals that this portfolio is written in the same language as its author's work. The interface is a draft, not a brochure.

Command Blue (`#0987f2`) is the only chromatic element in the palette. It appears exclusively on interactive and emphasis targets: the primary button, the accent tagline, the card subtitle, the nav hover underline. Its scarcity is intentional. When blue appears, it means something: link, action, signal.

What this system explicitly rejects: warm-neutral AI portfolio aesthetics (cream/sand body, eyebrow labels over every section, identical icon card grids); creative agency showboating with scroll-jacking and visual spectacle; personal developer blog minimalism that reads as personal-project-scale; SaaS hero-metric templates with big stat numbers and gradient accents; freelancer excitement (neon accents, animated gradients, hire-me energy).

**Key Characteristics:**
- Monochromatic palette with a single chromatic signal (Command Blue)
- Monospace body typography as deliberate medium choice, not style decoration
- Flat-by-default surfaces; elevation is earned through interaction only
- Generous inter-section spacing that breathes at scale
- Light and dark theme parity — neither is the afterthought

## 2. Colors: The Operational Palette

One accent, two surfaces, one ink, two muted greys. Every color has one job.

### Primary
- **Command Blue** (`#0987f2`): The sole chromatic signal. Used on interactive elements (primary button background), emphasis text (hero tagline, card subtitles), and the nav hover underline. Forbidden as a decorative fill or background tint.

### Neutral
- **Arctic Canvas** (`#f3fffe`): Light theme body background. Near-white with the faintest cool trace — the color of clean technical environments, not warm hospitality. All light-theme surfaces descend from this.
- **Ink** (`#222222`): Primary text in light mode. High contrast against Arctic Canvas. Also the dark-mode button label.
- **Steel** (`#555555`): Form field placeholder and label text in light mode. Secondary text hierarchy.
- **Muted** (`#888888`): Footer text and form borders in light mode. Tertiary hierarchy. Footer text in dark mode shifts to `#bbbbbb`.
- **Deep Charcoal** (`#313131`): Dark theme body background. A neutral grey with no tint — no warmth, no cool bias. Surfaces in dark mode sit on this base.

**The One Signal Rule.** Command Blue appears on ≤3 elements per viewport: the primary CTA, the accent tagline or subtitle, and the nav hover indicator. A fourth blue element means one of the existing three is doing the wrong job. Rethink the hierarchy, not the color count.

**The Parity Rule.** Every design decision is made for both light and dark themes simultaneously, not retrofitted. If a component works in light but feels washed out in dark, the light version also has a problem — fix both.

## 3. Typography

**Display Font:** Rubik (sans-serif fallback)
**Body / UI Font:** Roboto Mono (monospace fallback)

**Character:** Rubik provides warmth and geometric confidence at display scale. Roboto Mono carries all body copy, subheadings, navigation, and labels — an engineering portfolio that writes in code-adjacent type. The pairing works because the contrast is axis-deep: humanist-geometric display vs. fixed-width technical body. Similar families (two geometric sans, two humanist sans) are prohibited.

### Hierarchy
- **Display** (Rubik, 400, `clamp(2rem, 3vw + 0.5rem, 3rem)`, line-height 1.1, uppercase): Full name in hero. Section titles. The only type that uses Rubik. Always uppercase.
- **Headline** (Roboto Mono, 400, `clamp(1.25rem, 2vw, 1.5rem)`, line-height 1.3, uppercase): Role and subtitle in hero. Card project names. Uppercase always — structural, not decorative.
- **Body** (Roboto Mono, 300, `clamp(1rem, 1.5vw, 1.25rem)`, line-height 1.6): Description paragraphs. Skill list items. Max line length ~65ch.
- **Label** (Roboto Mono, 500, `0.875rem`, letter-spacing `0.04em`): Accent tagline ("Enterprise AI | Headless Commerce | Cloud Infrastructure"), card subtitles in Command Blue. The one place weight 500 appears in body scale.

**The Mono-as-Medium Rule.** Roboto Mono is not used because it "looks developer". It's used because the content IS technical and the medium should match. Do not swap it for a neutral sans to "feel more approachable" — that undercuts the entire positioning.

**The Uppercase Ceiling Rule.** Uppercase is reserved for Display and Headline levels (h1, h2, h3). Body text and labels are sentence case. Never apply `text-transform: uppercase` to body paragraphs or nav labels in normal flow.

## 4. Elevation

This system is flat-by-default. Surfaces at rest carry no shadow. Depth emerges only when a user interacts with an element — hover and active states are the only contexts where elevation appears.

The light theme background (`#f3fffe`) is a single layer. Project cards use a thin border (`1px solid rgba(text, 0.2)`) and near-transparent fill (`rgba(text, 0.02)`) to define containment without adding visual weight. No card, panel, or section receives an ambient shadow at rest.

### Shadow Vocabulary
- **Touch Response — Button** (`0 4px 4px rgba(0, 0, 0, 0.25)`): Applied to primary and ghost CTA buttons at rest. Signals pressability.
- **Touch Response — Button (hover)** (`0 6px 8px rgba(0, 0, 0, 0.2)` + `translateY(-2px)`): On button hover/focus. Lifts the element toward the user.
- **Lift — Card (hover)** (`0 10px 24px rgba(0, 0, 0, 0.15)` + `translateY(-4px)`): On project card hover. The only shadow that communicates spatial depth (not just pressability).

**The Earned Elevation Rule.** Shadows are responses, not decoration. If an element isn't interactive and isn't being interacted with, it has no shadow. A decorative drop-shadow on a section heading or a card at rest is a violation.

## 5. Components

### Buttons
Clean pill-shaped CTAs. No icon dependency; text and weight do the work.
- **Shape:** Full pill (20px radius)
- **Primary:** Command Blue fill (`#0987f2`), white text (`#fff`), min-width 160px, height 50px, `font-size 18px`, `font-weight 600`. Shadow at rest: `0 4px 4px rgba(0,0,0,0.25)`. Hover: `translateY(-2px)` + deeper shadow. Active: `translateY(1px)` + reduced shadow.
- **Ghost (Download variant):** Transparent background, 2px solid Command Blue border, ink-colored text. Hover fills with Command Blue and shifts text to white. Same shape and dimensions as Primary. Dark mode: border stays Command Blue; text shifts to white at rest.
- **Transition:** `all 0.3s ease` — covers shadow, transform, and background in one declaration.

### Project Cards
Engineering case studies. Not decorative cards — structural cases.
- **Shape:** 24px radius
- **Background:** `rgba(text, 0.02)` — near-invisible fill that reads as "contained" without competing with content
- **Border:** `1px solid rgba(text, 0.2)` — structural definition, not decoration
- **Padding:** 24px (mobile) → 30px (desktop)
- **Image container:** 16px inner radius, `rgba(text, 0.04)` background, `padding: 14–18px`; images use `object-fit: contain` so logos render correctly
- **Subtitle:** Command Blue, `font-weight 500`, Roboto Mono — the one place blue appears inside a card
- **Hover:** `translateY(-4px)` + `0 10px 24px rgba(0,0,0,0.15)` — the only non-button elevation in the system
- **Transition:** `200ms ease-in-out` on transform and box-shadow

### Navigation
Flat, centered, monospace. The navbar disappears into the background at rest and activates on scroll and hover.
- **Typeface:** Roboto Mono, 15–18px (scales with viewport), weight 500
- **Default:** No background distinction from page (inherits `--background-color`). On scroll, `backdrop-filter: blur(8px)` subtly separates it — not a color change, a clarity shift.
- **Hover:** `rgba(text, 0.05)` fill, 6px radius. A sliding Command Blue underline extends from center — `0 2px wide → full width` over 0.3s.
- **Mobile:** Full-screen overlay (`position: fixed, inset: 0`), `rgba(background, 0.96)` fill + `backdrop-filter: blur(12px)`. Animated open: `opacity 0 → 1, translateY(-8px) → 0, scale(0.98) → 1` over 240ms ease-out.
- **Hamburger:** 44×44px touch target, 12px radius border, 2px bars with 0.28s transform animation to ×.

### Contact Fields
Form inputs follow the same pill language as buttons.
- **Shape:** 20px radius pill
- **Background:** Matches page background (`--background-color`)
- **Border:** `1px solid #888` at rest
- **Text:** `--form-text-color` (`#555` light / `#fff` dark)
- **Height:** 50px for text inputs; 250px fixed height for textarea (non-resizable)
- **Submit button:** Identical to Primary Button — inherits all button rules

## 6. Do's and Don'ts

### Do:
- **Do** use Command Blue exclusively for interactive targets, accent taglines, and hover indicators. One slot per viewport per role.
- **Do** use Roboto Mono for all subheadings, body copy, labels, and navigation. Rubik is for h1 display and section titles only.
- **Do** keep all interactive elements at 20px pill radius. Card containers at 24px. Inner image containers at 16px. These three radii are the entire radius vocabulary.
- **Do** apply `text-transform: uppercase` only to h1 (Display) and h2/h3 (Headline). Not labels, not nav text, not body.
- **Do** prefix all WCAG AA color combinations: body text (`#222` on `#f3fffe`) meets 4.5:1 minimum; verify any new color pairing before shipping.
- **Do** pair every animation with a `@media (prefers-reduced-motion: reduce)` fallback that collapses to an instant state change or crossfade.
- **Do** ensure shadows only appear on interactive elements in hover/active state. No ambient decorative shadows.

### Don't:
- **Don't** use a warm-neutral or cream/beige background. Arctic Canvas (`#f3fffe`) is the light surface — if it feels "too cold", that's the point. Warm tints undercut the technical positioning.
- **Don't** use `border-left` greater than 1px as a colored stripe on cards, callouts, or list items. Rewrite with full borders, background tints, or nothing.
- **Don't** apply `background-clip: text` with a gradient (gradient text). Single solid color only. Command Blue where emphasis is needed.
- **Don't** add a second sans-serif font. The pairing is Rubik + Roboto Mono. A third typeface — geometric sans, humanist sans, or display serif — pollutes the binary.
- **Don't** add eyebrow labels ("ABOUT", "PROCESS", "SKILLS") above section headings. Section titles are h1 display level. Kickers are a structural tell; avoid the pattern.
- **Don't** use numbered section markers (01 / 02 / 03) as decorative scaffolding. Numbers earn their place only when the order carries real information the reader needs.
- **Don't** use glassmorphism decoratively (blur cards, frosted panels). `backdrop-filter: blur()` is reserved for the scrolled navbar and mobile menu overlay — functional opacity contexts, not decoration.
- **Don't** ship a hero-metric template (big stat numbers, gradient accent strips, "95% operational autonomy" as a displayable metric tile). The outcome numbers belong in prose descriptions, not as styled counters.
- **Don't** add a third color to the palette without a structural reason. This is a one-accent system by design. A second accent is dilution, not richness.
- **Don't** remove the dark mode or treat it as secondary. Both themes are first-class. Every design decision applies to both surfaces simultaneously.
