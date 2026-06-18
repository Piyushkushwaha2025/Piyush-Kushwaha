# 🚀 Piyush Kushwaha — Digital Innovator Portfolio

A premium, 3D-animated personal portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. Features interactive 3D tilt cards, a warp-field particle canvas, multi-theme switching, and an AI-powered chatbot.

![Portfolio Preview](https://images.unsplash.com/photo-1555952517-2e8af104f7e5?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **3D Interactive Cards** — GPU-accelerated tilt effects with real-time glare
- **Warp-Field Background** — Animated particle canvas with plexus network connections
- **6 Color Themes** — Dynamically switch accent colors across the entire site
- **AI Chatbot** — Powered by Google Gemini API
- **Custom Cursor** — Desktop-only custom cursor with hover states
- **Scroll Reveal** — IntersectionObserver-based reveal animations
- **Typewriter Effect** — Dynamic text cycling in the hero section
- **Responsive Design** — Mobile-first, works flawlessly on all devices
- **SEO Optimized** — Open Graph, Twitter Cards, semantic HTML

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS 3 | Utility-First Styling |
| Vite 5 | Build Tool & Dev Server |
| Lucide React | Icon Library |
| GitHub Actions | CI/CD Pipeline |
| GitHub Pages | Hosting |

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/Piyushkushwaha2025/Piyush-Kushwaha.git
cd Piyush-Kushwaha

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site locally.

## 📦 Build & Deploy

### Automatic (GitHub Actions)

Every push to `main` automatically builds and deploys to GitHub Pages via the included CI/CD workflow.

### Manual

```bash
# Build production bundle
npm run build

# Preview the build locally
npm run preview

# Deploy to GitHub Pages manually
npm run deploy
```

## ⚙️ Configuration

### AI Chatbot

To enable the AI chatbot, add your [Google Gemini API key](https://aistudio.google.com/apikey) in `src/App.tsx`:

```typescript
const apiKey = "YOUR_GEMINI_API_KEY_HERE";
```

> ⚠️ **Important**: For production, use environment variables instead of hardcoding the API key. Consider using a backend proxy to keep the key secure.

### Custom Theme Colors

Edit the `THEMES` array in `src/App.tsx` to customize available themes:

```typescript
const THEMES = [
  { name: 'Orange', hex: '#FF6B00', rgb: '255, 107, 0' },
  // Add more themes...
];
```

## 📁 Project Structure

```
Piyush-Kushwaha/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI/CD
├── public/
│   └── 404.html              # SPA fallback for GitHub Pages
├── src/
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global styles + Tailwind
│   └── main.tsx               # React entry point
├── index.html                 # HTML template with SEO tags
├── package.json               # Dependencies & scripts
├── postcss.config.js          # PostCSS config
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── vite.config.ts             # Vite build config
```

## 🌐 Live Site

**[https://piyushkushwaha2025.github.io/Piyush-Kushwaha/](https://piyushkushwaha2025.github.io/Piyush-Kushwaha/)**

## 📝 License

© 2026 Piyush Kushwaha. All rights reserved.

---

Built with 🔥 by **Piyush Kushwaha**
