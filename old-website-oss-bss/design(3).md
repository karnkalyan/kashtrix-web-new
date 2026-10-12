# Kashtrix Website Theme Specification

## 1. Scope

Apply this theme across the **entire website UI** while preserving the current product design.

### Do not change

- Component shapes
- Border-radius values
- Spacing and layout
- Grid structure
- Typography scale
- Button dimensions
- Card dimensions
- Icon style
- Navigation structure
- Illustrations or dashboard composition
- Existing responsive behavior

### Update only

- Colors
- Backgrounds
- Text hierarchy
- Borders
- Shadows
- Gradients
- Focus states
- Hover and active states
- Chart colors
- Decorative network-line colors
- Form states

The result should feel premium, intelligent, modern, clean, and strongly associated with AI, telecom, connected systems, and enterprise software.

---

## 2. Core Brand Palette

| Token | Hex | Primary use |
|---|---:|---|
| Brand Ink | `#2B0F3D` | Main headings, primary dark text, primary buttons, footer |
| Brand Deep | `#2B0D3A` | Dark surfaces, navigation panels, rich gradient depth |
| Brand Violet | `#4A1B7A` | Secondary actions, active states, charts, icons |
| Brand Pink | `#E11D72` | Accent text, highlights, badges, data emphasis, active indicators |

### Color roles

- `#2B0F3D` is the main brand color.
- `#2B0D3A` is the deepest surface color and should not compete with `#2B0F3D`.
- `#4A1B7A` supports the primary purple and adds dimension.
- `#E11D72` is an accent, not a dominant page background.
- White and soft lavender neutrals should remain the dominant page surfaces.

---

## 3. Global Theme Tokens

```css
:root {
  /* Brand */
  --brand-ink: #2B0F3D;
  --brand-deep: #2B0D3A;
  --brand-violet: #4A1B7A;
  --brand-pink: #E11D72;

  /* Brand interaction colors */
  --brand-ink-hover: #3A1452;
  --brand-ink-active: #210A30;
  --brand-violet-hover: #5B2393;
  --brand-violet-active: #3B1464;
  --brand-pink-hover: #F02C82;
  --brand-pink-active: #BE145D;

  /* Main surfaces */
  --page-bg: #FCFBFE;
  --surface-1: #FFFFFF;
  --surface-2: #F9F6FC;
  --surface-3: #F4EFF8;
  --surface-purple: #F7F2FB;
  --surface-pink: #FFF3F8;
  --surface-dark: #2B0D3A;
  --surface-dark-soft: #351046;

  /* Text */
  --text-primary: #2B0F3D;
  --text-secondary: #64566E;
  --text-tertiary: #8B7D94;
  --text-muted: #A99FAF;
  --text-inverse: #FFFFFF;
  --text-accent: #E11D72;
  --text-link: #4A1B7A;
  --text-link-hover: #E11D72;

  /* Borders and dividers */
  --border-default: #E9E1EE;
  --border-subtle: #F0EAF4;
  --border-strong: #D7C9E0;
  --border-brand: #BFA6D4;
  --divider: #EEE7F2;

  /* States */
  --success: #168A5B;
  --success-bg: #ECF8F2;
  --warning: #B46A08;
  --warning-bg: #FFF6E8;
  --danger: #D92D5B;
  --danger-bg: #FFF0F4;
  --info: #4A1B7A;
  --info-bg: #F3EDFA;

  /* Focus */
  --focus-ring: rgba(225, 29, 114, 0.28);
  --focus-border: #E11D72;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(43, 15, 61, 0.05);
  --shadow-sm: 0 4px 12px rgba(43, 15, 61, 0.07);
  --shadow-md: 0 10px 30px rgba(43, 15, 61, 0.10);
  --shadow-lg: 0 20px 55px rgba(43, 15, 61, 0.14);
  --shadow-brand: 0 12px 34px rgba(74, 27, 122, 0.20);

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #2B0D3A 0%, #4A1B7A 100%);
  --gradient-brand: linear-gradient(135deg, #4A1B7A 0%, #E11D72 100%);
  --gradient-hero-text: linear-gradient(90deg, #E11D72 0%, #F24B95 100%);
  --gradient-soft: linear-gradient(135deg, #FBF7FD 0%, #FFF4F9 100%);
  --gradient-footer: linear-gradient(135deg, #2B0D3A 0%, #2B0F3D 60%, #4A1B7A 100%);
}
```

---

## 4. Theme Hierarchy

### Page background

Use `--page-bg` for the website canvas. Major sections can alternate between:

- `--surface-1`
- `--surface-2`
- `--surface-purple`
- `--gradient-soft`

Avoid large solid pink backgrounds. Pink is reserved for visual emphasis.

### Text hierarchy

```css
h1, h2, h3, h4, h5, h6 {
  color: var(--text-primary);
}

body,
p,
li {
  color: var(--text-secondary);
}

small,
.helper-text,
.meta-text {
  color: var(--text-tertiary);
}

a {
  color: var(--text-link);
}

a:hover {
  color: var(--text-link-hover);
}
```

Use `#E11D72` for highlighted words in hero headings, metrics, badges, and selected visual moments only.

---

## 5. Header and Navigation

### Header

- Background: white with slight transparency when sticky
- Bottom border: `--border-subtle`
- Sticky shadow: `--shadow-xs`
- Logo remains unchanged

```css
.site-header {
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid var(--border-subtle);
  backdrop-filter: blur(14px);
}
```

### Navigation links

- Default: `--text-primary`
- Hover: `--brand-violet`
- Active: `--brand-ink`
- Active underline or indicator: `--brand-pink`

### Header primary CTA

- Background: `--gradient-primary`
- Text: white
- Hover: slightly brighter violet depth
- Shadow: `--shadow-brand`

### Header secondary action

- White background
- Text: `--brand-ink`
- Border: `--border-strong`
- Hover border: `--brand-violet`

---

## 6. Hero Section

### Hero background

Keep the current layout and artwork. Use:

- Base: `--surface-1`
- Very subtle lavender/pink radial glow
- Network-line illustrations at low opacity

```css
.hero {
  background:
    radial-gradient(circle at 84% 28%, rgba(74, 27, 122, 0.08), transparent 32%),
    radial-gradient(circle at 18% 82%, rgba(225, 29, 114, 0.08), transparent 30%),
    var(--surface-1);
}
```

### Hero title

- Main title: `--brand-ink`
- Highlighted phrase: `--brand-pink` or `--gradient-hero-text`

```css
.hero-title {
  color: var(--brand-ink);
}

.hero-title .accent {
  color: var(--brand-pink);
}
```

### Hero badge

- Background: `--surface-pink`
- Border: soft pink-violet border
- Text: `--brand-ink`
- Icon: `--brand-pink`

### Hero dashboard preview

Do not change the component shape or internal layout.

Update:

- Sidebar: `--gradient-primary`
- Active menu item: translucent white overlay
- Chart lines: violet and pink
- Positive metrics: success green
- Negative metrics: brand pink or danger red
- Dashboard card borders: `--border-subtle`
- Dashboard card shadows: `--shadow-sm`

---

## 7. Buttons

### Primary button

```css
.btn-primary {
  color: #FFFFFF;
  background: var(--gradient-primary);
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #351046 0%, #5B2393 100%);
  box-shadow: var(--shadow-brand);
}

.btn-primary:active {
  background: var(--brand-ink-active);
}
```

### Secondary button

```css
.btn-secondary {
  color: var(--brand-violet);
  background: #FFFFFF;
  border-color: #A98BC4;
}

.btn-secondary:hover {
  color: var(--brand-ink);
  background: var(--surface-purple);
  border-color: var(--brand-violet);
}
```

### Accent button

Use sparingly for campaign or high-emphasis actions.

```css
.btn-accent {
  color: #FFFFFF;
  background: var(--brand-pink);
  border-color: var(--brand-pink);
}

.btn-accent:hover {
  background: var(--brand-pink-hover);
}
```

### Ghost button

- Text: `--brand-violet`
- Hover background: `--surface-purple`
- Active text: `--brand-pink`

### Disabled buttons

- Background: `#ECE6F0`
- Text: `#A99FAF`
- Border: `#E2DAE7`
- No brand shadow

---

## 8. Cards and Panels

Do not alter card shapes, padding, radius, or layout.

### Default card

```css
.card {
  background: var(--surface-1);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-xs);
}

.card:hover {
  border-color: #D2C0DF;
  box-shadow: var(--shadow-md);
}
```

### Featured card

- Border: violet or pink-tinted
- Top accent: `--brand-pink`
- Icon container: `--surface-purple`
- Icon: `--brand-violet`

### Dark promotional card

- Background: `--gradient-primary`
- Heading: white
- Body text: lavender-white at 78–84% opacity
- Border: transparent white
- Decorative line art: pink and lavender at low opacity

### Pricing cards

- Standard cards: white background and default border
- Featured card: subtle violet-tinted border and stronger shadow
- “Most Popular” label: `--gradient-brand`
- Price: `--brand-ink`
- Feature check icons: `--brand-violet`
- Selected button: primary gradient

Do not fill the whole featured pricing card with pink.

---

## 9. Section Treatments

### Light sections

Use alternating whites and tinted neutrals to separate content without heavy dividers.

### Dark CTA sections

```css
.section-dark {
  color: #FFFFFF;
  background: var(--gradient-footer);
}
```

- Headings: white
- Paragraphs: `rgba(255,255,255,0.76)`
- Primary action: white button with dark-purple text
- Secondary action: transparent with translucent white border

### Decorative network pattern

Use the existing pattern style with no geometry change.

Recommended colors:

- Primary lines: `rgba(74, 27, 122, 0.18)`
- Secondary lines: `rgba(225, 29, 114, 0.18)`
- Soft lines: `rgba(191, 166, 212, 0.24)`
- Large nodes: `#4A1B7A`
- Accent nodes: `#E11D72`
- Soft nodes: `#C8A9E0`

---

## 10. Tabs, Segmented Controls, and Filters

### Default state

- Text: `--text-secondary`
- Background: transparent or white
- Border: `--border-default`

### Hover state

- Text: `--brand-violet`
- Background: `--surface-purple`

### Selected state

- Text: white
- Background: `--brand-violet` or `--gradient-primary`
- Border: transparent

For underline tabs:

- Selected text: `--brand-ink`
- Underline: `--brand-pink`

---

## 11. Forms and Inputs

Do not change field dimensions, shapes, labels, or spacing.

```css
.input,
.textarea,
.select {
  color: var(--text-primary);
  background: #FFFFFF;
  border-color: var(--border-default);
}

.input::placeholder,
.textarea::placeholder {
  color: var(--text-muted);
}

.input:hover,
.textarea:hover,
.select:hover {
  border-color: var(--border-strong);
}

.input:focus,
.textarea:focus,
.select:focus {
  border-color: var(--focus-border);
  box-shadow: 0 0 0 4px var(--focus-ring);
}
```

### Field labels

- Default: `--text-primary`
- Optional/helper label: `--text-tertiary`
- Required indicator: `--brand-pink`

### Validation

- Success border/icon: `--success`
- Error border/icon: `--danger`
- Error message background: `--danger-bg`

### Checkbox and radio

- Selected fill: `--brand-violet`
- Selected indicator: white
- Focus ring: pink transparent ring

### Toggle

- Off: `#D8CFDE`
- On: `--brand-violet`
- Hover/on accent: `--brand-pink`

---

## 12. Tables and Data Views

### Table header

- Background: `--surface-2`
- Text: `--text-primary`
- Bottom border: `--border-default`

### Rows

- Background: white
- Hover: `--surface-purple`
- Selected: `--surface-pink`
- Divider: `--divider`

### Status pills

- Active/success: green text on green-tinted surface
- Pending: warning text on warm-tinted surface
- Error: danger text on pink-red surface
- AI/automation: violet text on lavender surface
- Featured/new: pink text on pink surface

---

## 13. Dashboard and Analytics Colors

Use a controlled chart palette led by the brand colors.

```css
:root {
  --chart-1: #4A1B7A;
  --chart-2: #E11D72;
  --chart-3: #7D4AB0;
  --chart-4: #C85AA0;
  --chart-5: #A98BC4;
  --chart-6: #F39AC0;
  --chart-grid: #EEE7F2;
  --chart-axis: #8B7D94;
  --chart-tooltip-bg: #2B0D3A;
  --chart-tooltip-text: #FFFFFF;
}
```

### Chart rules

- Primary data series: `#4A1B7A`
- Comparison/highlight series: `#E11D72`
- Area fills: 8–16% opacity
- Gridlines: very light lavender
- Tooltip background: `#2B0D3A`
- Tooltip key values: pink or white
- Avoid using more than two high-saturation colors in one chart

---

## 14. Sidebar and Application Navigation

### Main sidebar

- Background: `--gradient-primary`
- Default text/icon: `rgba(255,255,255,0.72)`
- Hover: `rgba(255,255,255,0.10)`
- Active background: `rgba(255,255,255,0.14)`
- Active text/icon: white
- Active indicator: `--brand-pink`
- Divider: `rgba(255,255,255,0.10)`

### Light secondary sidebar

- Background: `--surface-2`
- Active item: `--surface-purple`
- Active text: `--brand-violet`
- Active border or icon: `--brand-pink`

---

## 15. Icons and Illustrations

### Icons

- Default: `--brand-violet`
- Muted: `--text-tertiary`
- Active: `--brand-pink`
- Icons on dark surfaces: white or soft lavender

### Icon containers

- Default: `--surface-purple`
- Accent: `--surface-pink`
- Dark: translucent white over purple surface

### Illustrations

Retain their current line weight, geometry, and composition. Recolor only:

- Main strokes: violet
- Secondary strokes: pink
- Background strokes: lavender
- Nodes: mixed violet, pink, and soft lilac

---

## 16. Modals, Drawers, Dropdowns, and Tooltips

### Modal and drawer

- Overlay: `rgba(24, 8, 34, 0.48)`
- Panel: white
- Border: `--border-default`
- Shadow: `--shadow-lg`
- Title: `--brand-ink`

### Dropdown menu

- Background: white
- Border: `--border-default`
- Item hover: `--surface-purple`
- Item active: `--surface-pink`
- Item active text: `--brand-violet`

### Tooltip

- Background: `--brand-deep`
- Text: white
- Accent values: `--brand-pink`

---

## 17. Alerts, Toasts, and Notifications

Do not redesign these components.

### Informational

- Background: `--info-bg`
- Border/icon: `--brand-violet`
- Title: `--brand-ink`

### Success

- Background: `--success-bg`
- Border/icon: `--success`

### Warning

- Background: `--warning-bg`
- Border/icon: `--warning`

### Error

- Background: `--danger-bg`
- Border/icon: `--danger`

### Notification badge

- Background: `--brand-pink`
- Text: white

---

## 18. Footer

### Main footer

Use either:

1. White surface with a soft top border for content-heavy pages, or
2. `--gradient-footer` for marketing pages and strong final CTA sections.

### White footer

- Background: white
- Headings: `--brand-ink`
- Links: `--text-secondary`
- Link hover: `--brand-pink`
- Top border: `--border-default`

### Dark footer

- Background: `--gradient-footer`
- Headings: white
- Links: `rgba(255,255,255,0.72)`
- Link hover: white or pink
- Divider: `rgba(255,255,255,0.12)`
- Status indicator: success green

---

## 19. Accessibility Rules

- `#2B0F3D` on white provides very strong contrast and is suitable for body text and headings.
- `#4A1B7A` on white is suitable for text, links, and buttons.
- `#E11D72` on white is suitable for normal text at approximately WCAG AA contrast, but use it mainly for emphasis rather than long paragraphs.
- White text is acceptable on all four core brand colors.
- Never use pale lavender text on white for important content.
- Focus rings must remain visible on white and tinted surfaces.
- Do not communicate state by color alone; keep icons, labels, and text.

---

## 20. Responsive Theme Behavior

No responsive layout changes are required.

On smaller screens:

- Reduce decorative line-art opacity to avoid visual clutter.
- Keep gradients but reduce glow intensity.
- Preserve button colors and hierarchy.
- Keep cards on white or lightly tinted surfaces.
- Do not convert all mobile surfaces to dark mode.
- Maintain the same active navigation and form focus states.

---

## 21. Suggested CSS Utility Classes

```css
.bg-brand-primary { background: var(--brand-ink); }
.bg-brand-deep { background: var(--brand-deep); }
.bg-brand-violet { background: var(--brand-violet); }
.bg-brand-pink { background: var(--brand-pink); }
.bg-brand-gradient { background: var(--gradient-primary); }
.bg-brand-soft { background: var(--gradient-soft); }

.text-brand { color: var(--brand-ink); }
.text-violet { color: var(--brand-violet); }
.text-pink { color: var(--brand-pink); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-tertiary); }

.border-default { border-color: var(--border-default); }
.border-brand { border-color: var(--border-brand); }
.border-pink { border-color: rgba(225, 29, 114, 0.35); }

.shadow-card { box-shadow: var(--shadow-sm); }
.shadow-floating { box-shadow: var(--shadow-md); }
.shadow-brand { box-shadow: var(--shadow-brand); }
```

---

## 22. Tailwind Theme Mapping

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#2B0F3D',
          deep: '#2B0D3A',
          violet: '#4A1B7A',
          pink: '#E11D72',
          lavender: '#F4EFF8',
          blush: '#FFF3F8',
        },
      },
      boxShadow: {
        'brand-xs': '0 1px 2px rgba(43, 15, 61, 0.05)',
        'brand-sm': '0 4px 12px rgba(43, 15, 61, 0.07)',
        'brand-md': '0 10px 30px rgba(43, 15, 61, 0.10)',
        'brand-lg': '0 20px 55px rgba(43, 15, 61, 0.14)',
      },
      backgroundImage: {
        'brand-primary': 'linear-gradient(135deg, #2B0D3A 0%, #4A1B7A 100%)',
        'brand-accent': 'linear-gradient(135deg, #4A1B7A 0%, #E11D72 100%)',
        'brand-soft': 'linear-gradient(135deg, #FBF7FD 0%, #FFF4F9 100%)',
      },
    },
  },
};
```

---

## 23. Component Theme Mapping Summary

| Component | Background | Text | Border/accent |
|---|---|---|---|
| Page | `#FCFBFE` | `#64566E` | — |
| Header | White | `#2B0F3D` | Soft lavender divider |
| Primary button | Purple gradient | White | None |
| Secondary button | White | `#4A1B7A` | Violet tint |
| Accent badge | Pale pink | `#E11D72` | Pink tint |
| Card | White | `#2B0F3D` | `#E9E1EE` |
| Featured card | White/lavender | `#2B0F3D` | Violet/pink accent |
| Sidebar | Purple gradient | White | Pink active marker |
| Input | White | `#2B0F3D` | Lavender; pink focus |
| Table header | Soft lavender | `#2B0F3D` | Lavender divider |
| Tooltip | `#2B0D3A` | White | None |
| Dark CTA | Purple gradient | White | Translucent white |
| Footer | White or dark gradient | Purple or white | Lavender divider |

---

## 24. Implementation Checklist

- [ ] Replace existing global brand colors with the four core colors.
- [ ] Apply the new CSS variables at root level.
- [ ] Update header, navigation, and all navigation states.
- [ ] Update hero heading accents and CTA buttons.
- [ ] Recolor dashboard sidebar, charts, metrics, and map markers.
- [ ] Update every button variant and state.
- [ ] Update all cards without altering dimensions or radius.
- [ ] Update pricing card emphasis and “Most Popular” treatment.
- [ ] Update forms, placeholders, borders, focus rings, and validation states.
- [ ] Update tabs, chips, badges, filters, and segmented controls.
- [ ] Update table headers, row hover, and selected states.
- [ ] Update icons and icon containers.
- [ ] Update modals, drawers, dropdowns, tooltips, and overlays.
- [ ] Update charts and data visualization palette.
- [ ] Update light and dark footer variants.
- [ ] Recolor all decorative network lines and nodes.
- [ ] Verify desktop, tablet, and mobile consistency.
- [ ] Verify accessibility contrast and keyboard focus states.
- [ ] Confirm no component geometry or layout has changed.

---

## 25. Final Visual Direction

The completed website should remain structurally identical to the current design, but the visual system should consistently communicate:

- Deep enterprise-purple authority
- Bright pink AI innovation
- Clean white and lavender surfaces
- Soft, premium depth through tinted shadows
- Connected network energy through purple and pink line art
- Clear information hierarchy
- Strong but restrained use of accent color

The theme must feel unified across the marketing website, pricing pages, resource pages, forms, dashboards, tables, AI-agent screens, integrations, navigation, and footer.
