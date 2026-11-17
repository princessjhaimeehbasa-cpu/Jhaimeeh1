# Plantform Tech — Glassy Monochrome Portfolio

A portfolio web application built with high-contrast **Black & White** aesthetics, **Frosted Glassmorphism**, and **user-friendly interactions**.

---

## ✨ Key Features & Architectural Highlights

### 1. 💎 Glassmorphic Design System ("Glassy")
- **Multi-layered Frosted Glass Surfaces**: `backdrop-filter: blur(20px) saturate(180%)` with subtle specular reflections and high-definition gradient rim lighting.
- **Dynamic Mouse-Tracking Sheen**: Hovering cards creates a subtle radial light refraction that follows your cursor coordinates.
- **Ambient Canvas Particles**: High-performance background simulation of floating monochrome nodes connected by delicate optical threads, reacting organically to mouse movement.
- **Deep Glass Modals & Lightboxes**: Case study views and command palettes render over a multi-layered blurred backdrop.

### 2. 🖤 High-Contrast Black & White Theme ("Theme Black White")
- **Obsidian Dark Glass (Default)**: Deep obsidian backgrounds (`#08080a`), smoked glass panels (`rgba(22, 23, 30, 0.65)`), crisp white typography, and silver glows.
- **Crystalline White Glass (Toggleable)**: Pristine ceramic white surfaces, crystalline frosted glass panels (`rgba(255, 255, 255, 0.72)`), stark black typography, and soft diffuse ambient shadows.
- **Instant 1-Click Toggle**: Switch between dark obsidian and pure white glass with persistent `localStorage` preference.

### 3. 🎯 Professional Engineering
- **Production-Ready Layout**:
  - Sticky glass header with auto-shrinking and section spy.
  - Active project status indicator with live pulsing emerald beacon.
  - Animated stats counters (Years of Experience, Projects Shipped, Client Satisfaction, Commits).
  - Selected Works portfolio grid with category filter tabs and instant live search.
  - Technical Matrix with categorized skill progress bars.
  - Interactive career timeline & client recommendations carousel.
  - Direct contact channels with one-click clipboard copying.
  - Interactive contact form with budget range selectors and simulated transmission.

### 4. 🚀 User-Friendly Experience
- **Quick Spotlight Command Palette (`Ctrl + K` or `Cmd + K`)**:
  - Jump directly to any section, copy contact details, or toggle themes in seconds.
- **Live Profile Customizer**:
  - Click the floating **"Customize Portfolio"** button to update your Name, Brand, Title, Bio, and Email live directly in your browser.
  - Automatically persists to your browser's `localStorage` with a 1-click reset to defaults.
- **Sound Design (Web Audio API)**:
  - Subtle glassy chimes and tactile click feedback generated via the browser's native audio synthesizer (zero external audio files, zero lag, toggleable mute).
- **Responsive & Accessible**:
  - Optimized from 320px mobile devices to 4K displays.
  - High contrast WCAG AA/AAA compliant text ratios.
  - Clean print styles for saving as a clean PDF resume.

---

## 📂 Project Structure

```
Plantform Tech/
│
├── index.html              # Semantic HTML5 layout and modal overlays
├── README.md               # Project documentation
│
├── css/
│   └── styles.css          # Glassmorphic design tokens, monochrome themes & animations
│
└── js/
    ├── projects-data.js    # Data source for profile, projects, skills & timeline
    └── app.js              # Canvas particles, filtering, modal system, sound & customizer
```

---

## 🚀 How to Open and View

1. Double click `index.html` to open directly in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
2. No Node.js, npm, or web server is required. Everything runs 100% offline and standalone.
3. Use `Ctrl + K` (or `Cmd + K` on Mac) anywhere on the page to open the quick navigation search.
4. Click the floating **"Customize Portfolio"** pill in the lower-left corner to personalize the information.
