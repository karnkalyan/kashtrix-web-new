# Kashtrix Modern Website — V4

Next.js 16 / React 19 website for Kashtrix Broadcast Playout, StreamOps, Kashtrix Studio and telecom OSS/BSS.

## V4 changes

- Rebuilt the global header as a controlled click mega-menu system.
- Opening Products, Solutions or Industries now places an opaque blurred backdrop over page content, so the hero does not remain visually active behind the menu.
- Added a restrained animated Kashtrix background-shape system using translucent magenta X/ribbon forms and signal lines.
- Added a reusable `ProductHardwareMockup` component that presents the correct product UI on a monitor with a branded Kashtrix rack server below it.
- Rebuilt the homepage around four clearly separated product families without mixing unrelated product screenshots.
- Updated Broadcast Playout, StreamOps and Kashtrix Studio landing-page heroes to use the same hardware/product presentation language while preserving different product content.
- Added a dedicated, information-rich `/platform` OSS/BSS page based on the existing Kashtrix OSS/BSS content architecture: subscriber management, billing, CRM, service provisioning, network inventory, fault/ticketing, analytics, payments, APIs and security.
- Unified typography to one system sans-serif family and reduced over-heavy font weights.
- Reduced excessive card roundness and kept cards mostly square/soft-cornered.
- Preserved existing application-specific pages and screenshot mappings from V3.

## Run locally

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run typecheck
npm run build
```

## Main routes

- `/`
- `/broadcast-playout`
- `/broadcast-playout/[application]`
- `/streamops`
- `/streamops/[module]`
- `/studio`
- `/platform`
- `/oss`
- `/bss`
- `/billing`
- `/crm`
- `/network-management`
- `/network-automation`
- `/inventory`

All product screenshots are served from `public/media` and remain mapped to their respective products.
