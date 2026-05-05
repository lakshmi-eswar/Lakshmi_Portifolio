# Lakshmi Pandranki — Portfolio Website

A production-ready, fully responsive personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript.
Maintains and enhances the **GlowFolio** glassmorphism theme — pastel mesh gradients (light) and deep space purples (dark).

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main single-page portfolio
├── css/
│   └── style.css           # All styles (theme, components, animations)
├── js/
│   └── main.js             # All interactions & animations
├── assets/
│   └── Lakshmi_Pandranki_Resume.pdf   # Downloadable resume
└── README.md               # This file
```

---

## ✨ Features

- **GlowFolio Theme Preserved** — Same glassmorphism, pastel mesh, and purple/pink gradient
- **Dark / Light Mode** toggle (persists across sessions via localStorage)
- **Typed role animation** in the hero section
- **Scroll-triggered reveal animations** for all sections
- **Animated skill bars** that fill on scroll
- **Project filtering** by category (ML/AI, Web Dev, NLP)
- **Tilt effect** on project cards (desktop)
- **Counter animation** on hero stats
- **Navbar auto-hide** on scroll down, reappear on scroll up
- **Active nav link** tracking via IntersectionObserver
- **Cursor glow** effect (desktop)
- **Scroll progress bar** at the top
- **Hamburger mobile menu** with full-screen overlay
- **Contact form** with validation and success state
- **Resume download** button in navbar
- **Social sidebar** (LinkedIn, GitHub, Email)
- **ARIA labels** throughout for accessibility
- **Semantic HTML5** structure
- **SEO meta tags**
- **No dependencies** — pure HTML/CSS/JS, zero build step required

---

## 🚀 Running Locally

### Option 1: Just open the file
```bash
# Simply open index.html in your browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option 2: Use a local server (recommended for best results)
```bash
# Using Python 3
cd portfolio
python -m http.server 3000
# Then open http://localhost:3000

# Using Node.js (npx)
npx serve .
# Then open the URL shown in terminal

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 🌐 Deploying

### GitHub Pages (Free)
1. Create a new GitHub repository (e.g. `my-portfolio`)
2. Upload the entire `portfolio/` folder contents to the repo root
3. Go to **Settings → Pages**
4. Set source to **Deploy from branch** → `main` → `/ (root)`
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/my-portfolio/`

### Netlify (Recommended — Instant + Free)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop the entire `portfolio/` folder onto the Netlify dashboard
4. Your site is live instantly at a `*.netlify.app` URL
5. You can add a custom domain in Site Settings

### Vercel (Alternative)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside the portfolio folder
3. Follow prompts — your site deploys instantly

---

## 🎨 Customization

### Update Personal Info
Edit `index.html` — all content is clearly labeled with comments:
- Name, email, phone in the Hero and Contact sections
- LinkedIn / GitHub URLs in the Social Sidebar and Contact
- Project titles and descriptions in the Projects section

### Update Colors / Theme
Edit `css/style.css` — all design tokens are in CSS variables at the top of `:root {}`:
```css
--primary: oklch(0.55 0.22 285);    /* Main purple */
--primary-glow: oklch(0.72 0.18 320); /* Pink accent */
--mesh-bg: ...;                       /* Background gradient */
```

### Add a New Project
In `index.html`, find the `projects-grid` div and add a new `<article>`:
```html
<article class="project-card half glass tilt-card reveal"
         data-category="web"
         aria-labelledby="proj6-title">
  <div class="project-card-inner">
    <div class="project-tags-row">
      <div style="display:flex;gap:0.375rem;">
        <span class="project-tag">React</span>
        <span class="project-tag">Node.js</span>
      </div>
      <div class="project-arrow">...</div>
    </div>
    <div>
      <h3 class="project-title" id="proj6-title">My New Project</h3>
      <p class="project-desc">Description here.</p>
    </div>
  </div>
</article>
```

### Update Resume
Replace `assets/Lakshmi_Pandranki_Resume.pdf` with your updated resume file (keep the same filename, or update the `href` in the navbar).

---

## 📱 Browser Support
- Chrome / Edge 90+ ✅
- Firefox 88+ ✅
- Safari 15+ ✅
- Mobile Chrome/Safari ✅

> **Note:** The glassmorphism `backdrop-filter` effect requires a modern browser. Older browsers will fall back gracefully with a solid semi-transparent background.

---

## 📬 Making the Contact Form Actually Send Emails

The form currently simulates sending (no backend). To make it functional:

### Option A: Formspree (Easiest, no backend needed)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → get your endpoint URL
3. In `js/main.js`, replace the `setTimeout` simulation with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Option B: EmailJS (Free tier available)
Follow the [EmailJS docs](https://www.emailjs.com/docs/) to send directly from the browser.

---

Built with ❤️ by Pandranki Lakshmi · Rajam, Andhra Pradesh
