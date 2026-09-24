/**
 * AURA Flagship Product Catalog
 * Rich dataset for high-performance e-commerce platform
 */

const PRODUCTS_DATA = [
  {
    id: "aura-studio-max",
    name: "AURA Studio Max ANC",
    tagline: "Ultra-Fidelity Spatial Audio with Adaptive Hybrid ANC",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewCount: 142,
    badge: "Flagship",
    badgeType: "flagship",
    image: "assets/products/headphones.jpg",
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    colors: [
      { name: "Obsidian Black", hex: "#121316" },
      { name: "Gunmetal Slate", hex: "#3b4252" },
      { name: "Titanium Silver", hex: "#d8dee9" }
    ],
    specs: {
      "Acoustic Driver": "50mm Custom Beryllium Diaphragm",
      "Frequency Response": "5Hz - 48,000Hz (Hi-Res Certified)",
      "Active Noise Cancellation": "Hybrid 4-Mic Quad-Core DSP (-42dB)",
      "Battery Life": "Up to 55 Hours (ANC On) / 70h (ANC Off)",
      "Wireless Connectivity": "Bluetooth 5.4 + LDAC / aptX Lossless",
      "Latency": "22ms Ultra-Low Gaming Mode",
      "Weight": "278 grams",
      "Fast Charge": "10 min charge = 8 hours playback"
    },
    description: "The AURA Studio Max represents the pinnacle of personal acoustic engineering. Featuring custom 50mm beryllium drivers, active spatial head-tracking, and aerospace-grade aluminum gimbals, it delivers studio-grade mastering accuracy anywhere you go.",
    highlights: [
      "Lossless 24-bit/96kHz wireless streaming",
      "Real-time acoustic seal compensation",
      "Memory-foam ear cushions wrapped in breathable ballistic mesh",
      "Custom companion EQ presets with on-device DSP memory"
    ]
  },
  {
    id: "aura-aether-chrono",
    name: "AURA Aether Chrono Titanium",
    tagline: "Holographic AMOLED Smartwatch with Aerospace Titanium Chassis",
    category: "wearables",
    categoryName: "Wearables",
    price: 399,
    originalPrice: 479,
    rating: 4.8,
    reviewCount: 98,
    badge: "Bestseller",
    badgeType: "bestseller",
    image: "assets/products/smartwatch.jpg",
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    colors: [
      { name: "Titanium Gray", hex: "#4c566a" },
      { name: "Midnight Black", hex: "#1e1e24" },
      { name: "Neon Cyber Teal", hex: "#00f0ff" }
    ],
    specs: {
      "Display": "1.47-inch Borderless Ultra-AMOLED 120Hz (2500 nits)",
      "Case Material": "Grade 5 Aerospace Titanium & Sapphire Crystal",
      "Battery Life": "14 Days Typical / 5 Days Always-On",
      "Sensors": "ECG, SpO2, Skin Temp, Dual-Freq GPS, Bio-Impedance",
      "Water Resistance": "10 ATM (100 meters dive-rated)",
      "Connectivity": "eSIM 5G + Wi-Fi 6 + Bluetooth 5.4",
      "Weight": "46 grams (without strap)",
      "Compatibility": "iOS & Android universal sync"
    },
    description: "Built for pioneers, athletes, and modern professionals. The AURA Aether Chrono blends titanium durability with biometric precision, military-grade outdoor mapping, and a hyper-responsive 120Hz sapphire display.",
    highlights: [
      "Titanium Grade 5 CNC-machined body",
      "Dual-frequency L1/L5 GPS positioning",
      "Comprehensive sleep architecture analysis",
      "Customizable tactile crown with haptic engine"
    ]
  },
  {
    id: "avalon-75-pro",
    name: "AVALON 75 Pro Wireless Mechanical",
    tagline: "Gasket-Mounted CNC Aluminum Keyboard with Smoked Keycaps",
    category: "workstation",
    categoryName: "Workstation & Peripherals",
    price: 189,
    originalPrice: 229,
    rating: 4.9,
    reviewCount: 86,
    badge: "Staff Pick",
    badgeType: "special",
    image: "assets/products/keyboard.jpg",
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    colors: [
      { name: "Space Grey", hex: "#2e3440" },
      { name: "Anodized Silver", hex: "#e5e9f0" },
      { name: "Deep Navy", hex: "#1e293b" }
    ],
    specs: {
      "Layout": "75% Compact (82 Keys) with Rotary Volume Dial",
      "Switches": "Pre-lubed Factory Tuned Linear Quartz (45g force)",
      "Mounting Style": "Poron Gasket Mount + Flex-cut FR4 Plate",
      "Keycaps": "Double-shot Smoked PBT Cherry Profile",
      "Connectivity": "Tri-Mode: 2.4GHz (1000Hz) + BT 5.3 + USB-C",
      "Battery": "4000mAh (Up to 240 hours without RGB)",
      "RGB Backlight": "Per-key South-facing with 18 animations",
      "Weight": "1.32 kg (Solid Aluminum)"
    },
    description: "Typing redefined. The AVALON 75 Pro provides an acoustic experience that feels creamy, muted, and precise. Built from a solid block of 6063 aluminum with silicone dampening and hot-swappable PCB sockets.",
    highlights: [
      "Custom CNC aluminum anodized case",
      "Hot-swappable 3-pin / 5-pin switch sockets",
      "Multi-device pairing with instant toggle switch",
      "Open-source VIA / QMK key remapping support"
    ]
  },
  {
    id: "aura-pulse-buds",
    name: "AURA Pulse Transparent Wireless Earbuds",
    tagline: "Transparent Architecture with Dual-Driver Hybrid Sound",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 179,
    originalPrice: 219,
    rating: 4.7,
    reviewCount: 114,
    badge: "New Release",
    badgeType: "new",
    image: "assets/products/earbuds.jpg",
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    colors: [
      { name: "Smoked Glass", hex: "#1a1a24" },
      { name: "Glacier Clear", hex: "#f0f4f8" }
    ],
    specs: {
      "Drivers": "11mm Dynamic Bass Driver + Balanced Armature Tweeter",
      "ANC Performance": "-45dB Smart Adaptive Environmental Cancelling",
      "Microphones": "6 High-SNR Microphones with Wind Isolation",
      "Battery Life": "9 Hours (Earbuds) + 33 Hours (Charging Case)",
      "Charging": "Qi Wireless Charging + USB-C Fast Charge",
      "Water Protection": "IP55 Sweat and Rain Resistant",
      "Latency": "38ms Gaming Low Latency",
      "Weight": "4.6g per earbud"
    },
    description: "Exposing internal beauty through optical-grade smoked polycarbonate. The AURA Pulse buds combine dual-driver high-resolution audio with intelligent noise suppression and an iconic transparent magnetic charging chamber.",
    highlights: [
      "Clear transparent smoked charging chamber",
      "Custom dynamic soundstage with Spatial 3D Audio",
      "Pinch & slide stem touch gestures",
      "Multi-point connection to two devices simultaneously"
    ]
  },
  {
    id: "aurora-sphere-speaker",
    name: "AURORA Sphere 360 Spatial Speaker",
    tagline: "Sculptural Omnidirectional Hi-Fi Ambient Sound Pod",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 279,
    originalPrice: 329,
    rating: 4.9,
    reviewCount: 67,
    badge: "Design Award",
    badgeType: "special",
    image: "assets/products/speaker.jpg",
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    colors: [
      { name: "Obsidian Black", hex: "#0f1115" },
      { name: "Chalk White", hex: "#f8f9fa" }
    ],
    specs: {
      "Acoustic Architecture": "1x 4.5\" Neodymium Subwoofer + 3x 1.25\" Silk Tweeters",
      "Output Power": "85W RMS / 140W Peak Room-Filling Audio",
      "Frequency Range": "32Hz - 24,000Hz with Room Acoustic Tuning",
      "Ambient Lighting": "Diffused Halo LED Ring with Music Sync",
      "Connectivity": "Wi-Fi AirPlay 2 + Spotify Connect + BT 5.3 + AUX",
      "Multi-Room": "Pair stereo or link up to 16 units throughout home",
      "Dimensions": "210mm x 210mm x 225mm",
      "Weight": "2.8 kg"
    },
    description: "A statement piece for the modern interior. The AURORA Sphere radiates pristine 360-degree sound while hovering on an acoustic isolation base with reactive atmospheric ambient backlighting.",
    highlights: [
      "True 360-degree room acoustic calibration",
      "Reactive ambient halo ring with circadian color modes",
      "Touch-sensitive capacitive top dial with brushed aluminum",
      "Lossless Wi-Fi multi-room streaming support"
    ]
  },
  {
    id: "velocity-cx-mouse",
    name: "VELOCITY CX Carbon Ultralight Mouse",
    tagline: "49g Carbon-Fiber Honeycomb Optical Gaming Mouse",
    category: "workstation",
    categoryName: "Workstation & Peripherals",
    price: 129,
    originalPrice: 159,
    rating: 4.8,
    reviewCount: 92,
    badge: "Save 20%",
    badgeType: "sale",
    image: "assets/products/mouse.jpg",
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    colors: [
      { name: "Carbon Black", hex: "#16161a" },
      { name: "Arctic White", hex: "#f1f5f9" }
    ],
    specs: {
      "Sensor": "AURA Focus-Pro Optical Sensor (32,000 DPI)",
      "Tracking Speed": "750 IPS / 50G Acceleration",
      "Polling Rate": "True 8,000Hz Wireless & Wired HyperPolling",
      "Switches": "Optical Micro Switches Gen-3 (100M Clicks)",
      "Weight": "49 grams ultralight structural skeleton",
      "Battery Life": "90 Hours continuous at 1000Hz",
      "Feet": "100% Virgin Grade PTFE Glides",
      "Cable": "Superflex Paracord USB-C charging cord"
    },
    description: "Milled with an aerospace carbon-fiber lattice. The VELOCITY CX gives you unmatched agility and 8000Hz polling precision without sacrificing structural rigidity or palm ergonomics.",
    highlights: [
      "49-gram structural carbon fiber exoskeleton",
      "Near-zero click latency with optical beam actuation",
      "8000Hz polling rate for sub-0.125ms responsiveness",
      "Onboard memory for 5 DPI profiles and lighting effects"
    ]
  },
  {
    id: "aura-flux-dock",
    name: "AURA Flux 3-in-1 Magnetic Dock",
    tagline: "Architectural Fast-Charging Station for Apple & Qi2 Ecosystem",
    category: "power",
    categoryName: "Power & Docks",
    price: 119,
    originalPrice: 149,
    rating: 4.9,
    reviewCount: 78,
    badge: "Essential",
    badgeType: "bestseller",
    image: "assets/products/charger.jpg",
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    colors: [
      { name: "Slate Aluminum", hex: "#334155" },
      { name: "Silver Frost", hex: "#cbd5e1" }
    ],
    specs: {
      "Total Power Output": "45W GaN Multi-Port Output",
      "Phone Charging": "15W MagSafe / Qi2 Official Certified Fast Charge",
      "Watch Charging": "Fast Charger Module (0-80% in 45 mins)",
      "Earbuds Pad": "5W Magnetic Recessed Base Pad",
      "Material": "Solid Anodized CNC Aerospace Aluminum Base",
      "Ambient Lighting": "Warm Underglow Nightstand LED with tap toggle",
      "Safety": "Foreign Object Detection, Thermal Sentinel, Overvoltage",
      "Weight": "410g Weighted Anti-Slip Base"
    },
    description: "Declutter your workspace. The AURA Flux holds your phone at the ideal viewing angle for StandBy mode, charges your smartwatch fast, and powers your earbuds with a gentle glowing nightstand underglow.",
    highlights: [
      "Solid weighted base keeps it planted when detaching phone",
      "Official 15W Qi2 wireless protocol with strong N52 neodymium magnets",
      "Rotates effortlessly between portrait and landscape modes",
      "Built-in thermal dissipation GaN architecture"
    ]
  }
];

// Initial reviews dataset for social proof and community rating
const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    productId: "aura-studio-max",
    author: "Julian Vance",
    role: "Sound Engineer & Audio Masterer",
    avatar: "JV",
    rating: 5,
    date: "2 days ago",
    title: "Best ANC and soundstage under $500 hands down",
    content: "The beryllium drivers deliver a crispness in the high-mid frequencies that usually only planar magnetics can achieve. The spatial audio tracking during movie editing is eerily realistic. 10/10 build quality.",
    verified: true
  },
  {
    id: "rev-2",
    productId: "aura-aether-chrono",
    author: "Elena Rostova",
    role: "Ultra-Marathoner & Triathlete",
    avatar: "ER",
    rating: 5,
    date: "1 week ago",
    title: "Titanium grade 5 case survived alpine rock climbs!",
    content: "The 2500 nits display is easily legible even under blinding direct high-altitude sunlight. The GPS accuracy matched my dedicated Garmin hand unit step-for-step across 42km.",
    verified: true
  },
  {
    id: "rev-3",
    productId: "avalon-75-pro",
    author: "Marcus Chen",
    role: "Software Architect",
    avatar: "MC",
    rating: 5,
    date: "2 weeks ago",
    title: "The acoustic dampening on this keyboard is pure magic",
    content: "Out of the box without any tape or switch modding, this sounds deeper and more satisfying than my $400 custom build. VIA support made my dev hotkeys a breeze.",
    verified: true
  },
  {
    id: "rev-4",
    productId: "aura-pulse-buds",
    author: "Sarah Lindqvist",
    role: "Creative Director",
    avatar: "SL",
    rating: 4,
    date: "3 weeks ago",
    title: "Stunning aesthetic and surprisingly deep bass",
    content: "The transparent case always turns heads during meetings. The fit is comfortable for 6+ hour design sessions and the dual-device pairing switches seamlessly between my MacBook and phone.",
    verified: true
  }
];

// Active promo codes
const PROMO_CODES = {
  "APEX20": { discount: 0.20, label: "20% Internship Capstone Special" },
  "AURA10": { discount: 0.10, label: "10% Welcome VIP Discount" },
  "FREESHIP": { discount: 0.00, freeShipping: true, label: "Free Worldwide Express Delivery" }
};
