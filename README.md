# Mushtaq Ahmad Saqi — Personal Portfolio

A premium, fully responsive personal portfolio website with cinematic animations, 3D interactive elements, and a dark theme design.

## 🚀 Quick Start

Simply open `index.html` in any modern browser — no build step required!

```bash
# Or use a local server for best results:
npx serve .
# Then visit http://localhost:3000
```

## 📁 File Structure

```
portfolio/
├── index.html    # Main HTML — all sections and structure
├── style.css     # Complete stylesheet — dark theme, responsive
├── main.js       # All JavaScript — animations, 3D, cursor, effects
└── README.md     # This file
```

## 🎨 Customization Guide

### Personal Info
Edit `index.html` and update:
- **Name**: Search for "Mushtaq Ahmad Saqi" and replace with your name
- **Title/Role**: Update the `.hero__title` paragraph
- **Bio**: Edit the text in the `#about` section
- **Stats**: Change numbers in `.about__stat-number`
- **Vision quote**: Update text in `.vision__quote`
- **Email**: Replace `mushtaq@example.com` globally

### Social Links
Find these IDs in `index.html` and update the `href`:
- `#githubLink` — Your GitHub URL
- `#linkedinLink` — Your LinkedIn URL
- `#emailLink` — Your email (mailto:)

### Projects
Each project is a `.project-card` div. To add/remove/edit:
1. Copy an existing card block
2. Update the icon, tag, title, description, meta, and stack badges
3. Add `data-tilt` attribute for the 3D hover effect

### Colors & Theme
Edit the CSS custom properties at the top of `style.css`:
```css
:root {
  --bg-primary:    #0a0a0f;    /* Main background */
  --accent:        #6C63FF;    /* Primary accent color */
  --accent-light:  #8B83FF;    /* Hover/glow accent */
  /* ...etc */
}
```

### Typography
Fonts are loaded from Google Fonts in `index.html`. Change the `<link>` tag and update:
```css
--font-heading: 'Space Grotesk', sans-serif;
--font-body:    'Inter', sans-serif;
```

### 3D Element
The Three.js scene in `main.js` → `initThreeScene()`:
- Adjust `particleCount` for density
- Change hex colors (`0x6C63FF`) to match your accent
- Modify `meshRotationSpeed` for animation speed

### Animations
All animation config is in `main.js` → `CONFIG` object:
```javascript
const CONFIG = {
  cursor: { lerpFactor: 0.12, dotLerp: 0.35 },
  three: { particleCount: 1200, meshRotationSpeed: 0.003 },
  nav: { hideThreshold: 80 },
  loader: { minDuration: 2200 },
};
```

## 🛠 Tech Stack

| Technology    | Purpose                        |
|---------------|--------------------------------|
| HTML5         | Semantic structure             |
| CSS3          | Custom properties, Grid, Flex  |
| Vanilla JS    | All interactions & logic       |
| Three.js      | 3D WebGL scene (CDN)          |
| GSAP          | Scroll & text animations (CDN) |
| Google Fonts  | Inter + Space Grotesk          |

## 📱 Responsive

- **Desktop**: Full experience with custom cursor, 3D tilt, all animations
- **Tablet**: Adapted layouts, simplified animations
- **Mobile**: Touch-friendly, hidden custom cursor, stacked layouts

## ⚡ Performance

- Three.js uses `setPixelRatio(min(devicePixelRatio, 2))` to cap GPU load
- Intersection Observer for scroll reveals (no scroll listener overhead)
- `requestAnimationFrame` for all continuous animations
- Debounced scroll handler with `ticking` flag

## 📄 License

Feel free to use and modify for your own portfolio. Attribution appreciated!

---

*Built with ❤️ by Mushtaq Ahmad Saqi*
