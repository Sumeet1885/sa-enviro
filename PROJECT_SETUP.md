# SA Enviro Solutions (SAES) - Project Setup & Handover Documentation

This document serves as the single source of truth for the SA Enviro Solutions (SAES) website. It contains local environment configuration, production deployment instructions, cloud infrastructure setups, ownership transfer procedures, and troubleshooting guidelines.

---

## 1. Project Overview

### Project Name
* **SA Enviro Solutions (SAES) Website**
* **Official Domain:** [saenvirosolutions.com](https://saenvirosolutions.com)

### Purpose of the Project
The SAES website is a premium, highly responsive enterprise portal designed to showcase the company's leading water & wastewater treatment solutions, engineering services, certifications, and portfolio. It provides potential clients with clean, interactive paths to inquire about environmental engineering projects (such as Effluent Treatment Plants, Sewage Treatment Plants, Reverse Osmosis, and Zero Liquid Discharge systems).

### Technology Stack
This project is built using a clean frontend architecture with no server-side database. It connects directly to third-party APIs for email delivery and image hosting.
* **Frontend Library:** React (v18.3.1)
* **Programming Language:** TypeScript
* **Build System & Local Server:** Vite (v5.4.19)
* **Styling Framework:** Tailwind CSS (v3.4.19) + Vanilla CSS Modules
* **UI Components:** shadcn/ui + Radix UI Primitives + Framer Motion
* **Email Delivery:** EmailJS Client SDK (`@emailjs/browser` v4.4.1)
* **Media Optimization:** Cloudinary CDN (image delivery optimization)
* **Routing:** React Router DOM (v6)

---

## 2. Repository Structure

Below is the directory layout of the application showing the roles of the core directories:

```
sa-environment/
├── public/                   # Static site assets (Favicon, sitemap.xml)
├── scripts/                  # Task automation scripts
│   └── generate-sitemap.js   # Automated SEO sitemap generation script
├── src/                      # Source directory containing the application code
│   ├── assets/               # Local graphical resources and fallback images
│   ├── components/           # Reusable UI elements
│   │   ├── Sections/         # Major page layouts (ProductPage, Team, Services, etc.)
│   │   ├── home/             # Home page modular layout sections
│   │   ├── layout/           # Shared layouts (Header, Footer, Layout wrapper, SEO engine)
│   │   ├── motion/           # Motion layout templates and dynamic wrappers
│   │   └── ui/               # Core low-level design controls (buttons, tooltips, dialogs)
│   ├── constants/            # Site specifications and content dictionary
│   │   ├── siteData.ts       # Central source of truth for products, team, SEO data, and media links
│   │   └── type.ts           # Shared TypeScript interfaces
│   ├── hooks/                # Custom React hooks (e.g. useSlideInParallax)
│   ├── lib/                  # Library bindings (e.g. tailwind cn class merger utility)
│   ├── pages/                # Top-level view configurations
│   ├── App.tsx               # Main routing orchestrator
│   ├── main.tsx              # DOM bootstrapper file
├── .env.example              # Template configuration file for variables
├── package.json              # Main project description and script manifests
├── tailwind.config.ts        # Tailwind stylesheet layout and design settings
├── tsconfig.json             # Root TypeScript compilation preferences
├── vercel.json               # Path redirect configurations for Vercel SPA routing
└── vite.config.ts            # Vite compile and build configurations
```

---

## 3. Environment Variables

This frontend application relies on client-side environment variables to authenticate the EmailJS service. In Vite projects, environment variables must be prefixed with `VITE_` to be exposed to the client bundle.

### Required Environment Variables

| Variable | Required | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `VITE_EMAILJS_SERVICE` | Yes | `service_______` | The unique Service ID linked to the SMTP/email integration in the EmailJS dashboard. |
| `VITE_EMAILJS_TEMPLATE` | Yes | `template________` | The Template ID defining the layout and fields of the outgoing notification email. |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes | `_____Lc_2rBTgS1` | The Public API Key used to authenticate direct client-side API requests. |

---

## 4. EmailJS Client Setup Guide

EmailJS is used to handle contact form submissions directly from the browser without a backend server.

### Client Setup Actions:
1. **Create Account:**
   * Go to [emailjs.com](https://www.emailjs.com/) and click **Sign Up** to create an account.
2. **Add Email Service:**
   * In your EmailJS dashboard, click **Add New Service**.
   * Select your email provider (e.g., Gmail or custom business email SMTP).
   * Link your email account and copy the generated **Service ID** (e.g., `service_xxxxxxx`). This value will map to the `VITE_EMAILJS_SERVICE` environment variable.
3. **Create Email Template:**
   * Navigate to **Email Templates** -> **Create New Template**.
   * Design your email template layout has bee Given in the EmailJsSetup.md Docs
   * Click **Save** and copy the generated **Template ID** (e.g., `template_xxxxxxx`). This value will map to the `VITE_EMAILJS_TEMPLATE` environment variable.
4. **Get Public Key:**
   * Go to **Account** -> **API Keys** tab.
   * Copy your **Public Key** (also called user ID / API Key). This value will map to the `VITE_EMAILJS_PUBLIC_KEY` environment variable.
5. **Update Environment Variables:**
   * Save these three variables in your project production deployment environment configurations (such as Vercel).

---

## 5. Cloudinary Client Setup & Migration Guide

Cloudinary hosts and serves all product and gallery images via high-performance CDN URLs.

### Current Situation
All media assets are currently delivered from the developer's public cloud workspace folder path:
`https://res.cloudinary.com/dwttz8kvz/image/upload/...`

### Client Setup & Transfer Actions:
1. **Create Cloudinary Account:**
   * Go to [cloudinary.com](https://www.cloudinary.com/) and register a free or premium account.
2. **Retrieve Cloud Name:**
   * Locate your **Cloud Name** displayed on your Cloudinary dashboard.
3. **Upload Media Assets:**
   * Download the current images from the website gallery and upload them to your new Cloudinary Media Library, preserving the exact folder structure and filenames.
4. **Update the Application Codebase:**
   * Open the file [src/constants/siteData.ts](file:///d:/Dev/saEnviro/sa-environment/src/constants/siteData.ts).
   * Perform a global search and replace to update the cloud identifier:
     - Replace: `/dwttz8kvz/`
     - With: `/[YOUR_NEW_CLOUD_NAME]/` (Replace `[YOUR_NEW_CLOUD_NAME]` with the actual Cloud Name obtained from step 2).
5. **Verify the Migration:**
   * Visit your website pages, verify that all images load correctly, and inspect the image source URLs using the browser developer console to ensure they point to your new Cloud Name.

---

## 6. Troubleshooting Guide

### 1. Form Fails to Send (EmailJS Errors)
* **Check developer console:** If EmailJS fails, error codes appear in the browser Console.
* **Verify variables:** Verify that the keys added to the environment variables (`VITE_EMAILJS_SERVICE`, `VITE_EMAILJS_TEMPLATE`, and `VITE_EMAILJS_PUBLIC_KEY`) match your EmailJS dashboard keys.
* **Account limit:** Verify EmailJS account usage limits (free tiers permit up to 200 emails per month).

### 2. Images Fail to Load (CDN 404/403)
* Verify that the path variables in `src/constants/siteData.ts` use the correct Cloud Name.
* Ensure URL structures don't have spelling mistakes or duplicate folder designations in Cloudinary.

### 3. Route Refresh Returns 404
* In single-page applications, routes (like `/about`, `/services`) are handled by browser memory. If a user refreshes the page directly, the hosting server tries to find a physical folder.
* **Fix:** Ensure the `vercel.json` file is present in the repository root. Vercel uses this configuration file to automatically rewrite all paths to `index.html`.

---

## 9. Client Handover Summary

### Services Client Must Own
* Domain registrar subscription (`saenvirosolutions.com`).
* Hosting account subscription (Vercel Team or VPS host).
* Dedicated EmailJS account billing.
* Cloudinary asset server account.

### Billing & Renewals
* Client is responsible for all domain renewal fees and third-party hosting subscription costs.
