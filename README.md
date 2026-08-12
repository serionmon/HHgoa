# Hacker House Goa 2026 — Builder Identity Studio 🌴⚡

> Frame your build and ship your identity at **Hacker House Goa 2026**. 100% client-side, zero signup, instant PNG export with `#FrameInGoa`.

**Live Demo:** [https://h-hgoa.vercel.app/](https://h-hgoa.vercel.app/)  
**GitHub Repository:** [https://github.com/serionmon/HHgoa](https://github.com/serionmon/HHgoa)

---

## ✦ Overview

The **HH Goa 2026 Builder Identity Studio** is an original, privacy-preserving web application designed for hackathon attendees and builders. It allows users to generate two custom identity graphics:

1. **3:4 Builder ID Card** — A vintage Goa beach pass featuring your photo, name, optional team name, selected builder title, and a stable event ID.
2. **1:1 PFP Frame Collectible Badge** — A square profile picture badge with layered screen-print borders, custom Goa beach poster artwork, and the signature **"GOA SUN + CODE"** emblem.

All image processing and graphic generation happen directly in your browser using HTML5 Canvas.

---

## ✦ Key Features

- **Dual Output Formats**: Seamlessly switch between **3:4 Builder ID Card** and **1:1 PFP Frame** without losing your uploaded photo or details.
- **Interactive Photo Positioning**:
  - Drag & drop or click upload (JPG, PNG, WebP, HEIC supported up to 15MB).
  - Fine-grained photo scale slider (0.5×–3.0×).
  - Horizontal & vertical pan controls (-200px to +200px).
  - One-click frame reset, photo replacement, and removal.
- **Compact Builder Title Selector**: Select from 15 curated title options (e.g. *AI Engineer, Full Stack Developer, Code Architect, Indie Hacker, Problem Solver*) or type your own, with a quick **SHUFFLE** feature.
- **Native Web Share API**:
  - **Mobile**: Shares the generated PNG directly using native device share sheets (`navigator.share`).
  - **Desktop / Fallback**: Opens X (Twitter) compose intent pre-filled with `"Building under the sun 🌴 #FrameInGoa"`.
- **100% Client-Side Privacy**: Zero image data sent to any backend server.
- **Responsive Mobile Flow**: Smooth auto-scroll to credentials form on mobile screens upon photo upload.

---

## ✦ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: JavaScript (ESNext)
- **Styling**: Vanilla CSS3 (Custom CSS Custom Properties, Flexbox, Grid, 3D flat shadows)
- **Graphic Engine**: HTML5 Offscreen Canvas Double-Buffered Renderer
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## ✦ Project Structure

```text
HHgoa/
├── src/
│   ├── components/
│   │   ├── ActionButtons.jsx     # Download, Share on X, and Reset controls
│   │   ├── BuilderPreview.jsx    # Live canvas preview wrapper
│   │   ├── ContactSection.jsx    # Unified social & email links
│   │   ├── DetailsForm.jsx       # Credentials form & Builder Title popover
│   │   ├── Footer.jsx            # Event subtext & branding
│   │   ├── ModeSelector.jsx      # 3:4 ID Card ↔ 1:1 PFP segmented toggle
│   │   └── UploadPanel.jsx       # Dropzone & photo scale/pan sliders
│   ├── utils/
│   │   ├── imageGenerator.js     # Offscreen canvas renderer & Goa beach artwork
│   │   ├── imageValidator.js     # File validation & image preloader cache
│   │   └── titleGenerator.js     # 15 Builder titles list & stable ID generator
│   ├── App.jsx                   # Central application state & validation
│   ├── App.css                   # Responsive layout & theme stylesheet
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── .gitignore
```

---

## ✦ Local Setup & Installation

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/serionmon/HHgoa.git
   cd HHgoa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## ✦ Screenshots & Design Aesthetics

The application follows the approved **HH Goa Visual Identity**:
- **Palette**: Forest Green (`#0F5132`), Paper Cream (`#F5F0DC`), Hot Pink (`#E8177D`), Yellow (`#F5C518`).
- **Typography**: Vintage serif headings (`Cinzel`/`Playfair Display`) paired with crisp monospace metadata (`JetBrains Mono`).
- **Artwork**: Hand-drawn palm fronds, beach shacks, ocean waves, setting suns, and code brackets.

---

## ✦ Connect With The Builder

Created with ❤️ for Hacker House Goa 2026.

- **GitHub:** [github.com/serionmon](https://github.com/serionmon)
- **X (Twitter):** [x.com/Serionmon](https://x.com/Serionmon)
- **Instagram:** [instagram.com/irl.rohiit](https://www.instagram.com/irl.rohiit/)
- **LinkedIn:** [linkedin.com/in/rohit-291080429](https://www.linkedin.com/in/rohit-291080429/)
- **Email:** [rohitbmu141@gmail.com](mailto:rohitbmu141@gmail.com)

---

## ✦ Privacy Statement

This application runs **100% client-side** in your web browser. No uploaded photos, names, or credentials are saved, transmitted, or logged to any external server or database.
