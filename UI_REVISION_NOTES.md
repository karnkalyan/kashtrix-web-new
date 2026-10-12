# Kashtrix V4 UI Revision Notes

## Design direction

V4 uses a quieter enterprise palette: white / soft-gray surfaces, charcoal text, black product UI frames and a single Kashtrix magenta accent. The previous multi-accent product homepage treatment was removed.

## Mega menus

The desktop header is now state controlled instead of HTML `<details>` menus. Products, Solutions and Industries open by click. An almost-opaque backdrop starts immediately below the sticky header and visually suppresses the current page/hero while the menu is open. Route changes automatically close the menu.

## Product hardware asset system

`src/components/ProductHardwareMockup.tsx` creates a reusable visual treatment inspired by the supplied Kashtrix mockups:

- product interface on a monitor
- neutral metallic monitor chin/stand
- branded 1U rack server
- status LEDs and technical server details
- product-specific server labels

The product UI screenshot itself remains the real matching product screenshot.

## Background motion

`AnimatedBrandShapes.tsx` + CSS creates restrained moving translucent X/ribbon shapes and signal lines. It is used on the homepage and the primary landing pages. It does not use large colorful gradients.

## OSS/BSS information architecture

The dedicated `/platform` page now contains detailed module descriptions for:

- Subscriber Management
- Billing & Revenue
- CRM & Customer Care
- Service Provisioning
- Network Inventory
- Fault & Ticketing
- Usage & Analytics
- Payment Collection
- API & Integration
- Security & Access

It also covers the operator lifecycle, AAA/service activation context, network-to-business handoffs, role-based change control, operator models and reporting.

## Screenshot discipline

No combined screenshot gallery was added. Homepage product sections use one matching visual per product family. Existing V3 application-level screenshot mapping remains intact.
