# 🌌 AURA — Next-Gen Cybernetic Tech & Gear
### Apex Web Development Internship — Final Capstone Project (Task 5)

A complete, high-performance, modern, and fully responsive e-commerce web application engineered from the ground up using **Vanilla HTML5, CSS3, and JavaScript (ES6+)**.

---

## 🌟 Executive Overview
**AURA** is a flagship tech storefront and ecosystem showcase inspired by modern minimalist industrial design (e.g., Apple, Nothing, Teenage Engineering). It combines cutting-edge sensory computing hardware with a fast, fluid, and intuitive user experience.

### 🌐 Live Architecture Highlights
* **Zero Heavy Frameworks:** 100% Native Vanilla JavaScript, Semantic HTML5, and Modular CSS3.
* **Native Web Audio Engine:** Synthesizes futuristic UI feedback in real time using the browser's native `AudioContext` — requiring **0 external audio asset downloads**.
* **Zero Icon Latency:** All UI icons are crafted with scalable inline SVGs for crisp rendering on retina displays with zero HTTP overhead.
* **Persistent State Management:** Real-time synchronization for Cart items, Wishlist, Order History, Community Reviews, Audio preferences, and Dark/Light themes using `localStorage`.

---

## 🚀 Key Features & Interactive Systems

### 1. 🛍️ Dynamic Flagship Catalog & Multi-Facet Filtering
- **Category Navigation:** Instant tab switching between *All Ecosystem, Audio & Sound, Wearables, Workstation & Peripherals, and Power & Docks*.
- **Dynamic Price Range Slider:** Real-time price cap filter ($100 – $500) with live counter feedback.
- **Stock Filter Switch:** Instant toggle to show in-stock products only.
- **Sorting Options:** Sort products by *Curated/Featured, Price (Low to High), Price (High to Low), Top Rated, and Most Reviewed*.
- **Live Search Autocomplete:** Instant drop-down search suggestions matching device titles, categories, and technical specs.

### 2. 🔍 Interactive Quick View / Product Detail Modal
- **High-Resolution Product Showcase:** Generative commercial-grade product photography.
- **Interactive Color Swatches:** Switch between colorways (*Obsidian Black, Gunmetal Slate, Titanium Silver*) with live active state updates.
- **Technical Specification Sheet:** Detailed breakdown of frequency response, battery life, weight, DAC/DSP, and connectivity.
- **Direct Action Buttons:** One-click "Add to Cart" and immediate "Buy Now" flow.

### 3. ⚖️ Side-by-Side Hardware Comparison Matrix (`#compare`)
- Compare up to **3 products simultaneously** in a clean comparative grid.
- Compares acoustic drivers, frequency ranges, noise cancellation DSP, battery endurance, wireless latency, and chassis materials.
- Add items directly to your cart or remove slots with one click.

### 4. 🛒 Slide-Out Shopping Cart Drawer
- **Free Shipping Progress Meter:** Dynamic visual progress bar indicating how much more is needed to unlock complimentary Express Courier ($150 threshold).
- **Cart Management:** Quantity increment/decrement, item removal, and subtotal calculation.
- **Promo Code Engine:**
  - `APEX20` — 20% discount on order
  - `AURA10` — 10% welcome discount
  - `FREESHIP` — Complimentary worldwide courier

### 5. 💳 3-Step Guided Checkout Wizard
- **Step 1 (Shipping):** Form validation for recipient name, email, street address, and postal code.
- **Step 2 (Payment Simulator):** Credit card formatting, CVV security simulator, and alternative options (Apple Pay / Web3).
- **Step 3 (Order Confirmation):** Generates a unique tracking identifier (e.g. `AURA-78241`), printable receipt trigger, and instant transition to order tracking.

### 6. 📦 Real-Time Order Tracking & Dispatch Dashboard (`#orders`)
- Input any 5-digit Order ID to track dispatch milestones.
- Visual stepper timeline: **Ordered → Processing & Quality Check → In Transit (Air Courier) → Delivered**.
- Displays the complete package manifest and retains full past order history in `localStorage`.

### 7. ⭐ Verified Community Reviews System (`#reviews`)
- Aggregated customer satisfaction rating (**4.9 / 5.0**) with interactive star rating distribution bars.
- Interactive **Write a Review** form with dynamic star selector, model dropdown, and instant publication to the reviews feed.

### 8. 🌓 Dual Theme Engine (Dark Cybernetic & Minimalist Light)
- Obsidian cybernetic dark mode with glowing cyan/violet accents (default).
- Clean, high-contrast light mode for daytime reading.
- Theme preference is remembered across sessions via `localStorage`.

### 9. 📱 Mobile-First Responsive Experience & Bottom Bar
- Custom floating bottom navigation bar on mobile devices (< 768px) with thumb-accessible buttons (*Store, Compare, Cart, Track*).
- Touch-friendly tap targets and collapsible navigation menus.

---

## 📁 Project Structure

```
Task5/
├── index.html                 # Semantic, accessible HTML5 entry point
├── README.md                  # Detailed documentation & architecture overview
├── css/
│   └── style.css              # Design tokens, variables, glassmorphism, responsive queries
├── js/
│   ├── products.js            # Rich product catalog dataset & initial reviews
│   ├── audio.js               # Web Audio API sound synthesizer engine
│   └── app.js                 # State management, router, filtering, cart & checkout logic
└── assets/
    └── products/              # High-resolution optimized product photography
        ├── headphones.jpg     # AURA Studio Max ANC
        ├── smartwatch.jpg     # AURA Aether Chrono Titanium
        ├── keyboard.jpg       # AVALON 75 Pro Mechanical
        ├── earbuds.jpg        # AURA Pulse Transparent Earbuds
        ├── speaker.jpg        # AURORA Sphere 360 Spatial Speaker
        ├── mouse.jpg          # VELOCITY CX Carbon Mouse
        └── charger.jpg        # AURA Flux 3-in-1 Magnetic Dock
```

---

## ⚡ Performance Optimizations Implemented

1. **Reduced HTTP Requests:**
   - Bundled styles into a single unified `style.css`.
   - Inline SVGs eliminating external icon font or sprite requests.
   - Built-in Web Audio synthesis eliminating external MP3/WAV requests.
2. **Optimized Imagery:**
   - Commercial-grade product assets saved locally in `assets/products/`.
   - Native lazy-loading (`loading="lazy"`) and asynchronous image decoding (`decoding="async"`).
3. **Smooth 60FPS UI Animations:**
   - Hardware-accelerated CSS transforms (`transform: translateY()`, `scale()`, `opacity`).
   - Efficient event delegation for dynamic product cards, cart adjustments, and filter events.
4. **Accessible & SEO Compliant:**
   - Fully qualified OpenGraph and Twitter card meta tags.
   - Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
   - Accessible ARIA attributes (`aria-label`, `aria-hidden`, `aria-live`).

---

## 🖥️ How to Run Locally

You can run this project with any local HTTP server:

```powershell
# Option 1: Using Node npx serve (already pre-installed)
npx -y serve -l 5500

# Option 2: Using VS Code Live Server extension
# Right click index.html -> "Open with Live Server"

# Option 3: Using Python (if installed)
python -m http.server 5500
```

Once running, visit:
👉 **`http://localhost:5500`**

---

## 📱 Cross-Browser & Device Compatibility
Tested and fully functional across:
- **Google Chrome** (v110+)
- **Microsoft Edge** (v110+)
- **Mozilla Firefox** (v115+)
- **Apple Safari** (iOS 16+ & macOS Ventura+)
- **Mobile & Tablet Views** (320px, 375px, 768px, 1024px, 1440px+)
