# Public Service SSO - Keycloakify React Theme

> A production-grade, accessible Single Sign-On (SSO) authentication and transactional email theme built with **React 18**, **TypeScript**, **Keycloakify 11**, and **Storybook**. Designed for high-concurrency public service platforms, municipal portals, and civic identity providers.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Keycloakify](https://img.shields.io/badge/Keycloakify-11.8-red.svg)](https://www.keycloakify.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-8.1-pink.svg)](https://storybook.js.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## Architecture Overview

This project provides a comprehensive, modern front-end theme replacing legacy Keycloak FreeMarker templates with component-driven React architecture. It integrates client-side state management, native DOM validation, and strict accessibility standards to deliver an effortless login journey for citizens and administrative users.

```
src/
├── assets/
│   ├── images/              # Optimized SVG and raster brand assets
│   └── styles/              # Global Less stylesheet & design tokens
├── base/
│   └── components/          # Reusable UI layout containers & headers
├── email/
│   ├── templates/           # JSX transactional email templates (jsx-email)
│   ├── i18n.ts              # Localized email string definitions
│   └── layout.tsx           # Responsive multi-client email container
├── login/
│   ├── pages/               # 11 fully typed authentication screens
│   ├── KcContext.ts         # Keycloak context schema & typings
│   ├── KcPage.tsx           # Dynamic page router
│   ├── Template.tsx         # Master auth card layout & navigation
│   └── i18n.ts              # UI internationalization (English & Indonesian)
└── types/                   # Shared TypeScript declarations
```

---

## Front-End & UX Engineering Highlights

### 1. Accessible, Semantic Form Engineering
- Implements strict **WCAG 2.1 AA** accessibility standards: explicit form labels, ARIA live regions for server validation errors, and high-contrast focus rings.
- Built with semantic HTML5 elements and progressive enhancement, ensuring full functionality across modern and legacy mobile browsers.

### 2. Comprehensive Multi-Factor Auth (MFA) Workflows
- **TOTP Configuration (`LoginConfigTotp.tsx`):** Dynamic QR code rendering with clear copyable secret keys for authenticators (Google Authenticator, Microsoft Authenticator).
- **OTP Verification (`LoginOtp.tsx`):** Low-friction numeric input fields with auto-focus and paste detection.
- **Self-Service Recovery:** Streamlined password reset (`LoginResetPassword.tsx`) and email verification (`LoginVerifyEmail.tsx`) flows.

### 3. Storybook UI Playground & Visual Testing
- Every authentication view includes isolated Storybook stories (`*.stories.tsx`) simulating various server response payloads, validation failures, and localization states.
- Enables rapid UI iteration and automated visual regression testing without requiring a live Keycloak server.

### 4. Responsive Styling & Custom Properties
- Combines modern Less preprocessors with CSS Custom Properties for theme tokens (colors, radii, spacing).
- Fluid mobile-first grid layout tested across smartphones, tablets, and enterprise desktop viewports.

### 5. Transactional React Email System
- Email templates built in React via `jsx-email` (`email-verification.tsx`, `password-reset.tsx`, `event-login_error.tsx`).
- Renders bulletproof HTML tested for Apple Mail, Gmail (including Dark Mode contrast), and Outlook clients.

---

## Getting Started

### Prerequisites
- Node.js `^18.0.0 || >=20.0.0`
- Yarn `1.22+`

### Installation
```bash
git clone https://github.com/safwatch/public-service-sso-keycloakify.git
cd public-service-sso-keycloakify
yarn install
```

### Local Development
Run the Vite development server with simulated Keycloak mock context:
```bash
yarn dev
```

### Component Playground (Storybook)
Launch Storybook to inspect all 11 authentication screens in isolation:
```bash
yarn storybook
```

### Building the Keycloak Theme JAR
Compiles the React application into a production-ready Keycloak theme archive (`.jar`):
```bash
yarn build-keycloak-theme
```
The compiled archive is generated in `dist_keycloak/` ready for deployment into your Keycloak `providers/` directory or container image.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
