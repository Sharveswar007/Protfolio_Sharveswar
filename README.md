# Sharveswar Madasamy - Software Engineering Portfolio

![Astro](https://img.shields.io/badge/Astro-000000?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

A high-performance, statically generated developer portfolio engineered to showcase complex software systems, artificial intelligence pipelines, and full-stack architectures. Built on a modern tech stack prioritizing rendering speed, accessibility, and search engine optimization.

<br>

<div align="center">
  <img src="public/images/my_image.jpg" alt="Sharveswar Madasamy" width="200" height="266" style="border-radius: 12px; margin-bottom: 20px;">
  
  **[Access the Live Production Environment](https://portfolio-sharveswar.vercel.app)**
</div>

<br>

---

## Architectural Overview

This portfolio leverages a component-driven architecture using the Astro framework to minimize client-side JavaScript delivery. It incorporates React for interactive state management and Framer Motion for hardware-accelerated animations.

### Core Capabilities

*   **Zero-JS by Default**: Static HTML generation via Astro ensures near-instantaneous page loads and optimal Core Web Vitals.
*   **Hardware-Accelerated Animation**: Complex, scroll-linked parallax effects and dynamic page transitions are offloaded to the GPU using Framer Motion and Lenis Scroll.
*   **Enterprise-Grade SEO**: Configured with automated XML sitemap generation, canonical URLs, and dynamic Open Graph metadata injection for comprehensive search engine indexing.
*   **Responsive State Management**: Flawless interface adaptation across devices, ranging from ultra-wide 4K monitors to mobile viewports, managed via Tailwind CSS.

---

## Technical Stack Configuration

*   **Static Site Generator**: [Astro v5.0+](https://astro.build/)
*   **Component Library**: [React 19](https://react.dev/)
*   **Utility-First CSS**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation Engine**: [Framer Motion](https://www.framer.com/motion/)
*   **Scroll Virtualization**: [Lenis](https://lenis.darkroom.engineering/)

---

## Repository Structure

```text
/
├── public/                 # Unprocessed static assets (images, fonts, robots.txt)
├── src/
│   ├── components/         # Modular React and Astro UI components
│   ├── data/               # Centralized project configuration data (projects.ts)
│   ├── layouts/            # Global layouts enforcing SEO metadata standards
│   ├── pages/              # File-based routing configuration
│   └── styles/             # Global CSS variables and Tailwind directives
├── astro.config.mjs        # Astro build pipeline and integration configuration
└── tailwind.config.mjs     # Tailwind design system tokens
```

---

## Local Development Initialization

To initialize a local development environment, execute the following commands:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sharveswar007/Portfolio_Sharveswar.git
   cd Portfolio_Sharveswar
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Initialize the local development server:**
   ```bash
   npm run dev
   ```
   *The local server will bind to `http://localhost:4321`*

4. **Compile for production deployment:**
   ```bash
   npm run build
   ```

---

## License & Attribution

Designed and engineered by Sharveswar Madasamy. All rights reserved.
