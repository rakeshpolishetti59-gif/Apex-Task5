/**
 * AURA Application Core Engine
 * High-performance state management, reactive rendering, interactive components
 */

(function () {
  'use strict';

  // Application State
  const state = {
    products: [...PRODUCTS_DATA],
    cart: JSON.parse(localStorage.getItem('aura_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('aura_wishlist')) || [],
    compare: JSON.parse(localStorage.getItem('aura_compare')) || [],
    orders: JSON.parse(localStorage.getItem('aura_orders')) || [
      {
        id: "AURA-78241",
        date: "Yesterday, 4:15 PM",
        total: 349,
        status: "in-transit",
        items: [{ id: "aura-studio-max", name: "AURA Studio Max ANC", qty: 1, price: 349 }],
        step: 3
      }
    ],
    reviews: JSON.parse(localStorage.getItem('aura_reviews')) || [...INITIAL_REVIEWS],
    promoCode: null,
    discountAmount: 0,
    filters: {
      category: 'all',
      search: '',
      maxPrice: 500,
      inStockOnly: false,
      sortBy: 'featured'
    },
    theme: localStorage.getItem('aura_theme') || 'dark',
    quickViewProduct: null,
    activeCheckoutStep: 1,
    currentOrderId: null
  };

  // DOM Elements Cache
  const DOM = {
    productsGrid: document.getElementById('products-grid'),
    resultsCount: document.getElementById('results-count'),
    categoryPills: document.getElementById('category-pills'),
    priceSlider: document.getElementById('price-slider'),
    priceDisplay: document.getElementById('price-display'),
    stockToggle: document.getElementById('stock-toggle'),
    sortSelect: document.getElementById('sort-select'),
    headerSearchInput: document.getElementById('header-search-input'),
    searchResultsDropdown: document.getElementById('search-results-dropdown'),
    
    // Cart
    cartBtn: document.getElementById('cart-btn'),
    mobileCartBtn: document.getElementById('mobile-cart-btn'),
    cartBadge: document.getElementById('cart-badge'),
    mobileCartBadge: document.getElementById('mobile-cart-badge'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartBackdrop: document.getElementById('cart-backdrop'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartItemsList: document.getElementById('cart-items-list'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartDiscount: document.getElementById('cart-discount'),
    cartShipping: document.getElementById('cart-shipping'),
    cartTotal: document.getElementById('cart-total'),
    promoInput: document.getElementById('promo-input'),
    applyPromoBtn: document.getElementById('apply-promo-btn'),
    promoAlertWrap: document.getElementById('promo-alert-wrap'),
    shippingMeterText: document.getElementById('shipping-meter-text'),
    shippingMeterFill: document.getElementById('shipping-meter-fill'),
    proceedCheckoutBtn: document.getElementById('proceed-checkout-btn'),

    // Wishlist
    wishlistBtn: document.getElementById('wishlist-btn'),
    wishlistBadge: document.getElementById('wishlist-badge'),

    // Quick View Modal
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalProductContent: document.getElementById('modal-product-content'),

    // Checkout Modal
    checkoutBackdrop: document.getElementById('checkout-backdrop'),
    checkoutCloseBtn: document.getElementById('checkout-close-btn'),
    checkoutSteps: document.querySelectorAll('.checkout-step-content'),
    stepIndicators: document.querySelectorAll('.step-indicator'),
    shippingForm: document.getElementById('shipping-form'),
    paymentForm: document.getElementById('payment-form'),
    toPaymentBtn: document.getElementById('to-payment-btn'),
    toConfirmationBtn: document.getElementById('to-confirmation-btn'),
    confirmedOrderId: document.getElementById('confirmed-order-id'),

    // Comparison Matrix
    compareTableWrap: document.getElementById('compare-table-wrap'),

    // Order Tracking
    trackerForm: document.getElementById('tracker-form'),
    trackerInput: document.getElementById('tracker-input'),
    trackerResultWrap: document.getElementById('tracker-result-wrap'),
    pastOrdersList: document.getElementById('past-orders-list'),

    // Reviews
    reviewsListWrap: document.getElementById('reviews-list-wrap'),
    writeReviewForm: document.getElementById('write-review-form'),
    reviewStarPicker: document.getElementById('review-star-picker'),
    reviewProductSelect: document.getElementById('review-product-select'),

    // Controls
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    toastContainer: document.getElementById('toast-container'),
    faqItems: document.querySelectorAll('.faq-item')
  };

  /* --------------------------------------------------------------------------
     1. Initialization & State Persistence
     -------------------------------------------------------------------------- */
  function init() {
    applyTheme(state.theme);
    updateAudioButton();
    renderProducts();
    renderCart();
    renderCompare();
    renderReviews();
    renderPastOrders();
    populateProductSelects();
    attachEventListeners();
    handleUrlHash();
  }

  function saveState() {
    localStorage.setItem('aura_cart', JSON.stringify(state.cart));
    localStorage.setItem('aura_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('aura_compare', JSON.stringify(state.compare));
    localStorage.setItem('aura_orders', JSON.stringify(state.orders));
    localStorage.setItem('aura_reviews', JSON.stringify(state.reviews));
  }

  /* --------------------------------------------------------------------------
     2. Theme & Audio Controls
     -------------------------------------------------------------------------- */
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aura_theme', theme);

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      DOM.themeToggleBtn.innerHTML = theme === 'dark' 
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  function toggleTheme() {
    Sound.playTap();
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme`, 'info');
  }

  function updateAudioButton() {
    if (!DOM.soundToggleBtn) return;
    const isMuted = !Sound.enabled;
    DOM.soundToggleBtn.setAttribute('aria-label', isMuted ? 'Unmute UI sounds' : 'Mute UI sounds');
    DOM.soundToggleBtn.innerHTML = isMuted 
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
  }

  function toggleAudio() {
    const isEnabled = Sound.toggle();
    updateAudioButton();
    showToast(isEnabled ? 'UI Audio activated' : 'UI Audio muted', 'info');
  }

  /* --------------------------------------------------------------------------
     3. Products Rendering & Filtering Engine
     -------------------------------------------------------------------------- */
  function getFilteredProducts() {
    return state.products.filter(p => {
      // Category filter
      if (state.filters.category !== 'all' && p.category !== state.filters.category) {
        return false;
      }
      // Price slider
      if (p.price > state.filters.maxPrice) {
        return false;
      }
      // In-stock toggle
      if (state.filters.inStockOnly && !p.inStock) {
        return false;
      }
      // Live search query
      if (state.filters.search.trim()) {
        const query = state.filters.search.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesCat = p.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }

  function renderProducts() {
    if (!DOM.productsGrid) return;
    const filtered = getFilteredProducts();

    if (DOM.resultsCount) {
      DOM.resultsCount.textContent = `Showing ${filtered.length} of ${state.products.length} products`;
    }

    if (filtered.length === 0) {
      DOM.productsGrid.innerHTML = `
        <div class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No matching gear found</h3>
          <p>Try broadening your filters or resetting the price threshold.</p>
          <button class="btn btn-secondary btn-sm" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) resetBtn.addEventListener('click', resetFilters);
      return;
    }

    DOM.productsGrid.innerHTML = filtered.map(p => {
      const isWishlisted = state.wishlist.includes(p.id);
      const isCompared = state.compare.includes(p.id);

      return `
        <article class="product-card" data-id="${p.id}">
          <div class="card-top">
            <span class="product-badge badge-${p.badgeType}">${p.badge}</span>
            <div class="card-action-btns">
              <button class="action-btn ${isWishlisted ? 'active' : ''}" 
                      data-action="wishlist" data-id="${p.id}" 
                      aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
                <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button class="action-btn ${isCompared ? 'active' : ''}" 
                      data-action="compare" data-id="${p.id}" 
                      aria-label="Compare specs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>
                </svg>
              </button>
            </div>
            <div class="card-img-wrap" data-action="quickview" data-id="${p.id}">
              <img src="${p.image}" alt="${p.name}" class="card-img" loading="lazy" decoding="async">
            </div>
            <button class="quick-view-overlay-btn" data-action="quickview" data-id="${p.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              Quick Specs
            </button>
          </div>
          <div class="card-body">
            <span class="card-category">${p.categoryName}</span>
            <h3 class="card-title">${p.name}</h3>
            <p class="card-desc">${p.tagline}</p>
            <div class="card-rating-wrap">
              <span class="star-rating">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span class="rating-num">${p.rating}</span>
              </span>
              <span class="review-count">(${p.reviewCount} reviews)</span>
            </div>
            <div class="card-footer">
              <div class="price-wrap">
                <span class="original-price">$${p.originalPrice}</span>
                <span class="current-price">$${p.price}</span>
              </div>
              <button class="add-cart-btn" data-action="add-cart" data-id="${p.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function resetFilters() {
    state.filters = {
      category: 'all',
      search: '',
      maxPrice: 500,
      inStockOnly: false,
      sortBy: 'featured'
    };
    if (DOM.priceSlider) DOM.priceSlider.value = 500;
    if (DOM.priceDisplay) DOM.priceDisplay.textContent = '$500';
    if (DOM.stockToggle) DOM.stockToggle.checked = false;
    if (DOM.sortSelect) DOM.sortSelect.value = 'featured';
    if (DOM.headerSearchInput) DOM.headerSearchInput.value = '';

    document.querySelectorAll('.pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });

    renderProducts();
    showToast('Filters cleared', 'info');
  }

  /* --------------------------------------------------------------------------
     4. Cart & Checkout System
     -------------------------------------------------------------------------- */
  function addToCart(productId, selectedColor = null, quantity = 1) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const variant = selectedColor || product.colors[0].name;
    const existingIndex = state.cart.findIndex(item => item.id === productId && item.variant === variant);

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: variant,
        qty: quantity
      });
    }

    saveState();
    renderCart();
    Sound.playAddToCart();

    // Visual pulse on badges
    [DOM.cartBadge, DOM.mobileCartBadge].forEach(b => {
      if (b) {
        b.classList.remove('badge-pulse');
        void b.offsetWidth; // trigger reflow
        b.classList.add('badge-pulse');
      }
    });

    showToast(`Added ${product.name} to cart`, 'success');
  }

  function updateCartQty(index, change) {
    Sound.playTap();
    if (state.cart[index]) {
      state.cart[index].qty += change;
      if (state.cart[index].qty <= 0) {
        state.cart.splice(index, 1);
        showToast('Item removed from cart', 'info');
      }
      saveState();
      renderCart();
    }
  }

  function removeFromCart(index) {
    Sound.playTap();
    if (state.cart[index]) {
      const removedName = state.cart[index].name;
      state.cart.splice(index, 1);
      saveState();
      renderCart();
      showToast(`Removed ${removedName} from cart`, 'info');
    }
  }

  function calculateCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discount = 0;

    if (state.promoCode && PROMO_CODES[state.promoCode]) {
      const codeInfo = PROMO_CODES[state.promoCode];
      discount = subtotal * (codeInfo.discount || 0);
    }

    const freeShippingUnlocked = subtotal >= 150 || (state.promoCode === 'FREESHIP');
    const shipping = subtotal === 0 ? 0 : (freeShippingUnlocked ? 0 : 15);
    const tax = Math.round((subtotal - discount) * 0.08); // 8% estimated tax
    const total = Math.max(0, subtotal - discount + shipping + tax);

    return { subtotal, discount, shipping, tax, total, freeShippingUnlocked };
  }

  function renderCart() {
    const totalCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
    if (DOM.cartBadge) DOM.cartBadge.textContent = totalCount;
    if (DOM.mobileCartBadge) DOM.mobileCartBadge.textContent = totalCount;

    const totals = calculateCartTotals();

    // Free shipping progress bar
    if (DOM.shippingMeterText && DOM.shippingMeterFill) {
      if (totals.subtotal >= 150) {
        DOM.shippingMeterText.innerHTML = `🎉 You've unlocked <strong>FREE Express Shipping!</strong>`;
        DOM.shippingMeterFill.style.width = '100%';
      } else {
        const remaining = 150 - totals.subtotal;
        const percent = Math.min(100, Math.round((totals.subtotal / 150) * 100));
        DOM.shippingMeterText.innerHTML = `Add <strong>$${remaining}</strong> more for Free Shipping`;
        DOM.shippingMeterFill.style.width = `${percent}%`;
      }
    }

    // Render items list
    if (DOM.cartItemsList) {
      if (state.cart.length === 0) {
        DOM.cartItemsList.innerHTML = `
          <div class="cart-empty-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p>Your gear cart is currently empty.</p>
            <button class="btn btn-secondary btn-sm" id="cart-explore-btn">Explore Flagship Store</button>
          </div>
        `;
        const exploreBtn = document.getElementById('cart-explore-btn');
        if (exploreBtn) {
          exploreBtn.addEventListener('click', () => {
            closeCart();
            window.location.hash = '#shop';
          });
        }
      } else {
        DOM.cartItemsList.innerHTML = state.cart.map((item, idx) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-thumb">
            <div class="cart-details">
              <h4 class="cart-details-title">${item.name}</h4>
              <span class="cart-details-variant">Color: ${item.variant}</span>
              <div class="cart-details-bottom">
                <div class="qty-control">
                  <button class="qty-btn" data-cart-action="dec" data-index="${idx}">−</button>
                  <span class="qty-val">${item.qty}</span>
                  <button class="qty-btn" data-cart-action="inc" data-index="${idx}">+</button>
                </div>
                <span class="cart-item-price">$${item.price * item.qty}</span>
              </div>
            </div>
            <button class="cart-remove-item" data-cart-action="remove" data-index="${idx}" aria-label="Remove item">
              ✕
            </button>
          </div>
        `).join('');
      }
    }

    // Update Totals
    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (DOM.cartDiscount) DOM.cartDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
    if (DOM.cartShipping) DOM.cartShipping.textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
    if (DOM.cartTotal) DOM.cartTotal.textContent = `$${totals.total.toFixed(2)}`;

    // Update Promo alert tag
    if (DOM.promoAlertWrap) {
      if (state.promoCode && PROMO_CODES[state.promoCode]) {
        DOM.promoAlertWrap.innerHTML = `
          <div class="promo-tag-applied">
            <span>✓ ${state.promoCode}: ${PROMO_CODES[state.promoCode].label}</span>
            <button id="remove-promo-btn" style="cursor:pointer;font-weight:bold;">✕</button>
          </div>
        `;
        const removePromoBtn = document.getElementById('remove-promo-btn');
        if (removePromoBtn) {
          removePromoBtn.addEventListener('click', () => {
            state.promoCode = null;
            renderCart();
            showToast('Promo code removed', 'info');
          });
        }
      } else {
        DOM.promoAlertWrap.innerHTML = '';
      }
    }

    if (DOM.proceedCheckoutBtn) {
      DOM.proceedCheckoutBtn.disabled = state.cart.length === 0;
      DOM.proceedCheckoutBtn.style.opacity = state.cart.length === 0 ? '0.5' : '1';
    }
  }

  function openCart() {
    Sound.playTap();
    if (DOM.cartDrawer && DOM.cartBackdrop) {
      DOM.cartDrawer.classList.add('active');
      DOM.cartBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (DOM.cartDrawer && DOM.cartBackdrop) {
      DOM.cartDrawer.classList.remove('active');
      DOM.cartBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function applyPromoCode(code) {
    const cleanCode = code.toUpperCase().trim();
    if (PROMO_CODES[cleanCode]) {
      state.promoCode = cleanCode;
      Sound.playSuccess();
      renderCart();
      showToast(`Promo "${cleanCode}" successfully applied!`, 'success');
      if (DOM.promoInput) DOM.promoInput.value = '';
    } else {
      Sound.playTap();
      showToast('Invalid promo code. Try APEX20 or AURA10', 'error');
    }
  }

  /* --------------------------------------------------------------------------
     5. Multi-Step Checkout Modal Flow
     -------------------------------------------------------------------------- */
  function openCheckout() {
    if (state.cart.length === 0) return;
    closeCart();
    setCheckoutStep(1);
    if (DOM.checkoutBackdrop) {
      DOM.checkoutBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckout() {
    if (DOM.checkoutBackdrop) {
      DOM.checkoutBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function setCheckoutStep(step) {
    state.activeCheckoutStep = step;

    DOM.checkoutSteps.forEach((el, idx) => {
      el.classList.toggle('active', idx + 1 === step);
    });

    DOM.stepIndicators.forEach((el, idx) => {
      el.classList.remove('active', 'completed');
      if (idx + 1 === step) el.classList.add('active');
      if (idx + 1 < step) el.classList.add('completed');
    });
  }

  function completeOrder() {
    const totals = calculateCartTotals();
    const orderId = `AURA-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: "Just now",
      total: totals.total,
      status: "processing",
      items: [...state.cart],
      step: 1
    };

    state.orders.unshift(newOrder);
    state.cart = [];
    state.promoCode = null;
    state.currentOrderId = orderId;

    saveState();
    renderCart();
    renderPastOrders();

    if (DOM.confirmedOrderId) {
      DOM.confirmedOrderId.textContent = orderId;
    }

    setCheckoutStep(3);
    Sound.playSuccess();
    showToast(`Order #${orderId} confirmed successfully!`, 'success');
  }

  /* --------------------------------------------------------------------------
     6. Wishlist Management
     -------------------------------------------------------------------------- */
  function toggleWishlist(productId) {
    Sound.playTap();
    const index = state.wishlist.indexOf(productId);
    const product = state.products.find(p => p.id === productId);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast(`Removed ${product ? product.name : 'item'} from Wishlist`, 'info');
    } else {
      state.wishlist.push(productId);
      showToast(`Saved ${product ? product.name : 'item'} to Wishlist`, 'success');
    }

    saveState();
    renderProducts();

    if (DOM.wishlistBadge) {
      DOM.wishlistBadge.textContent = state.wishlist.length;
    }
  }

  /* --------------------------------------------------------------------------
     7. Side-by-Side Product Comparison Tool
     -------------------------------------------------------------------------- */
  function toggleCompare(productId) {
    Sound.playTap();
    const index = state.compare.indexOf(productId);
    if (index > -1) {
      state.compare.splice(index, 1);
      showToast('Removed from comparison table', 'info');
    } else {
      if (state.compare.length >= 3) {
        showToast('You can compare a maximum of 3 devices at once', 'error');
        return;
      }
      state.compare.push(productId);
      showToast('Added to comparison table', 'success');
    }

    saveState();
    renderProducts();
    renderCompare();
  }

  function renderCompare() {
    if (!DOM.compareTableWrap) return;

    if (state.compare.length === 0) {
      DOM.compareTableWrap.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem; color: var(--text-muted);">
          <p>No products selected for comparison yet.</p>
          <p style="font-size:0.85rem; margin-top:0.5rem;">Click the ⚖️ icon on any product card in the catalog to compare hardware specs.</p>
        </div>
      `;
      return;
    }

    const comparedProducts = state.compare.map(id => state.products.find(p => p.id === id)).filter(Boolean);
    const specKeys = ["Acoustic Driver", "Frequency Response", "Active Noise Cancellation", "Battery Life", "Wireless Connectivity", "Latency", "Weight", "Case Material", "Water Resistance", "Sensor", "Tracking Speed"];

    DOM.compareTableWrap.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th class="feature-col">Hardware Spec</th>
            ${comparedProducts.map(p => `
              <th>
                <div class="compare-product-header">
                  <button class="compare-remove-btn" data-compare-remove="${p.id}" title="Remove">✕</button>
                  <img src="${p.image}" alt="${p.name}" class="compare-img">
                  <h4 class="compare-title">${p.name}</h4>
                  <span class="compare-price">$${p.price}</span>
                  <button class="btn btn-primary btn-sm" data-action="add-cart" data-id="${p.id}">Add to Cart</button>
                </div>
              </th>
            `).join('')}
            ${Array.from({ length: 3 - comparedProducts.length }).map(() => `
              <th>
                <div class="compare-empty-slot">
                  <span>+ Empty Slot</span>
                  <small>Select from catalog</small>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="feature-col">Category</td>
            ${comparedProducts.map(p => `<td>${p.categoryName}</td>`).join('')}
            ${Array.from({ length: 3 - comparedProducts.length }).map(() => `<td>—</td>`).join('')}
          </tr>
          <tr>
            <td class="feature-col">Rating Score</td>
            ${comparedProducts.map(p => `<td>⭐ ${p.rating} / 5.0 (${p.reviewCount} reviews)</td>`).join('')}
            ${Array.from({ length: 3 - comparedProducts.length }).map(() => `<td>—</td>`).join('')}
          </tr>
          ${specKeys.map(specKey => {
            const hasAny = comparedProducts.some(p => p.specs[specKey]);
            if (!hasAny) return '';
            return `
              <tr>
                <td class="feature-col">${specKey}</td>
                ${comparedProducts.map(p => `<td>${p.specs[specKey] || 'N/A'}</td>`).join('')}
                ${Array.from({ length: 3 - comparedProducts.length }).map(() => `<td>—</td>`).join('')}
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    DOM.compareTableWrap.querySelectorAll('[data-compare-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleCompare(btn.dataset.compareRemove);
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Quick View / Product Detail Modal
     -------------------------------------------------------------------------- */
  function openQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product || !DOM.modalProductContent) return;

    Sound.playTap();
    state.quickViewProduct = product;
    let selectedColor = product.colors[0].name;

    DOM.modalProductContent.innerHTML = `
      <div class="modal-content-grid">
        <div class="modal-gallery-wrap">
          <img src="${product.image}" alt="${product.name}" class="modal-main-img" id="modal-img">
        </div>
        <div class="modal-info-wrap">
          <span class="modal-badge">${product.categoryName} • ${product.badge}</span>
          <h2 class="modal-title">${product.name}</h2>
          <div class="modal-price-wrap">
            <span class="modal-price">$${product.price}</span>
            <span class="modal-original-price">$${product.originalPrice}</span>
            <span class="modal-save-pill">Save $${product.originalPrice - product.price}</span>
          </div>
          <p class="modal-desc">${product.description}</p>
          
          <div class="variant-selector-wrap">
            <span class="variant-label">Color: <strong id="modal-selected-color-name">${selectedColor}</strong></span>
            <div class="swatches-list">
              ${product.colors.map((c, i) => `
                <div class="color-swatch ${i === 0 ? 'active' : ''}" 
                     data-color-name="${c.name}" 
                     style="background-color: ${c.hex};" 
                     title="${c.name}"></div>
              `).join('')}
            </div>
          </div>

          <div class="modal-specs-wrap">
            <h4 class="specs-title">Hardware Specifications</h4>
            <div class="specs-grid">
              ${Object.entries(product.specs).slice(0, 6).map(([k, v]) => `
                <div class="spec-entry">
                  <span class="spec-k">${k}</span>
                  <span class="spec-v">${v}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn btn-primary" id="modal-add-cart-btn" style="flex: 1;">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Add to Cart
            </button>
            <button class="btn btn-secondary" id="modal-buy-now-btn">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    `;

    // Attach Color Swatch Listeners
    const swatches = DOM.modalProductContent.querySelectorAll('.color-swatch');
    const colorLabel = document.getElementById('modal-selected-color-name');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        Sound.playTap();
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        selectedColor = swatch.dataset.colorName;
        if (colorLabel) colorLabel.textContent = selectedColor;
      });
    });

    // Add to cart inside modal
    const modalAddBtn = document.getElementById('modal-add-cart-btn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        addToCart(product.id, selectedColor, 1);
        closeQuickView();
        openCart();
      });
    }

    const modalBuyNowBtn = document.getElementById('modal-buy-now-btn');
    if (modalBuyNowBtn) {
      modalBuyNowBtn.addEventListener('click', () => {
        addToCart(product.id, selectedColor, 1);
        closeQuickView();
        openCheckout();
      });
    }

    if (DOM.modalBackdrop) {
      DOM.modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuickView() {
    if (DOM.modalBackdrop) {
      DOM.modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* --------------------------------------------------------------------------
     9. Order Tracking Engine
     -------------------------------------------------------------------------- */
  function trackOrder(orderId) {
    Sound.playTap();
    const cleanId = orderId.toUpperCase().trim();
    const order = state.orders.find(o => o.id === cleanId);

    if (!DOM.trackerResultWrap) return;

    if (!order) {
      DOM.trackerResultWrap.innerHTML = `
        <div style="text-align:center; padding: 2rem; color: var(--danger);">
          <p>Order <strong>${orderId}</strong> could not be located in our dispatch registry.</p>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;">Please verify your 5-digit Order ID (Example: AURA-78241).</p>
        </div>
      `;
      return;
    }

    DOM.trackerResultWrap.innerHTML = `
      <div style="background:var(--bg-tertiary); padding:1.5rem; border-radius:var(--radius-md); margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="font-size:1.2rem;">Order <strong>${order.id}</strong></h3>
            <span style="font-size:0.82rem; color:var(--text-muted);">Placed: ${order.date} • Total: $${order.total}</span>
          </div>
          <span style="padding:0.35rem 0.85rem; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; background:var(--accent-gradient); color:#000;">
            ${order.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div class="tracker-stepper">
        <div class="tracker-step completed">
          <div class="tracker-step-icon">✓</div>
          <span class="tracker-step-label">Ordered</span>
          <span class="tracker-step-time">Verified</span>
        </div>
        <div class="tracker-step ${order.step >= 2 ? 'completed' : (order.step === 1 ? 'active' : '')}">
          <div class="tracker-step-icon">⚙️</div>
          <span class="tracker-step-label">Processing</span>
          <span class="tracker-step-time">Quality Check</span>
        </div>
        <div class="tracker-step ${order.step >= 3 ? 'completed' : (order.step === 2 ? 'active' : '')}">
          <div class="tracker-step-icon">✈️</div>
          <span class="tracker-step-label">In Transit</span>
          <span class="tracker-step-time">Air Courier</span>
        </div>
        <div class="tracker-step ${order.step >= 4 ? 'completed' : (order.step === 3 ? 'active' : '')}">
          <div class="tracker-step-icon">📦</div>
          <span class="tracker-step-label">Delivered</span>
          <span class="tracker-step-time">Doorstep</span>
        </div>
      </div>

      <h4 style="font-size:0.95rem; margin-bottom:0.75rem;">Package Manifest:</h4>
      <div style="display:flex; flex-direction:column; gap:0.5rem;">
        ${order.items.map(item => `
          <div style="display:flex; justify-content:space-between; font-size:0.88rem; padding:0.6rem; background:var(--bg-card); border-radius:var(--radius-sm);">
            <span>${item.name} × ${item.qty}</span>
            <strong>$${item.price * item.qty}</strong>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderPastOrders() {
    if (!DOM.pastOrdersList) return;
    if (state.orders.length === 0) {
      DOM.pastOrdersList.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted);">No recorded past purchases.</p>`;
      return;
    }

    DOM.pastOrdersList.innerHTML = state.orders.map(order => `
      <div class="past-order-row">
        <div>
          <strong style="color:var(--accent-cyan); font-family:var(--font-mono);">${order.id}</strong>
          <span style="color:var(--text-muted); font-size:0.8rem; margin-left:0.5rem;">(${order.date})</span>
        </div>
        <div>
          <span style="margin-right:1rem; font-weight:700;">$${order.total}</span>
          <button class="btn btn-secondary btn-sm" data-track-id="${order.id}">Track</button>
        </div>
      </div>
    `).join('');

    DOM.pastOrdersList.querySelectorAll('[data-track-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (DOM.trackerInput) DOM.trackerInput.value = btn.dataset.trackId;
        trackOrder(btn.dataset.trackId);
        window.location.hash = '#orders';
      });
    });
  }

  /* --------------------------------------------------------------------------
     10. Customer Reviews System
     -------------------------------------------------------------------------- */
  function renderReviews() {
    if (!DOM.reviewsListWrap) return;

    DOM.reviewsListWrap.innerHTML = state.reviews.map(rev => `
      <div class="review-card">
        <div class="review-card-header">
          <div class="reviewer-meta">
            <div class="reviewer-avatar">${rev.avatar}</div>
            <div>
              <div class="reviewer-name">${rev.author}</div>
              <span class="verified-badge">✓ Verified Enthusiast • ${rev.date}</span>
            </div>
          </div>
          <div class="star-rating">
            ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
          </div>
        </div>
        <h4 class="review-title">${rev.title}</h4>
        <p class="review-body">${rev.content}</p>
      </div>
    `).join('');
  }

  function populateProductSelects() {
    if (DOM.reviewProductSelect) {
      DOM.reviewProductSelect.innerHTML = state.products.map(p => `
        <option value="${p.id}">${p.name}</option>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     11. Live Header Search Autocomplete
     -------------------------------------------------------------------------- */
  function handleLiveSearch(query) {
    if (!DOM.searchResultsDropdown) return;
    const cleanQuery = query.toLowerCase().trim();

    if (!cleanQuery) {
      DOM.searchResultsDropdown.classList.remove('show');
      return;
    }

    const matches = state.products.filter(p => 
      p.name.toLowerCase().includes(cleanQuery) || 
      p.categoryName.toLowerCase().includes(cleanQuery) ||
      p.tagline.toLowerCase().includes(cleanQuery)
    );

    if (matches.length === 0) {
      DOM.searchResultsDropdown.innerHTML = `
        <div style="padding:1rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">
          No matching products for "${query}"
        </div>
      `;
    } else {
      DOM.searchResultsDropdown.innerHTML = matches.map(p => `
        <div class="search-item" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}" class="search-thumb">
          <div class="search-info">
            <h5 class="search-title">${p.name}</h5>
            <div class="search-meta">
              <span>${p.categoryName}</span>
              <strong style="color:var(--accent-cyan);">$${p.price}</strong>
            </div>
          </div>
        </div>
      `).join('');

      DOM.searchResultsDropdown.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
          DOM.searchResultsDropdown.classList.remove('show');
          openQuickView(item.dataset.id);
        });
      });
    }

    DOM.searchResultsDropdown.classList.add('show');
  }

  /* --------------------------------------------------------------------------
     12. Toast Notification Engine
     -------------------------------------------------------------------------- */
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = `ℹ️`;
    if (type === 'success') icon = `✓`;
    if (type === 'error') icon = `⚠️`;

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     13. URL Hash Router & Navigation
     -------------------------------------------------------------------------- */
  function handleUrlHash() {
    const hash = window.location.hash || '#shop';
    document.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === hash) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('href') === hash);
    });
  }

  /* --------------------------------------------------------------------------
     14. Event Listeners Setup
     -------------------------------------------------------------------------- */
  function attachEventListeners() {
    // Theme & Audio
    if (DOM.themeToggleBtn) DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    if (DOM.soundToggleBtn) DOM.soundToggleBtn.addEventListener('click', toggleAudio);

    // Cart Drawer Toggle
    if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', openCart);
    if (DOM.mobileCartBtn) DOM.mobileCartBtn.addEventListener('click', openCart);
    if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', closeCart);
    if (DOM.cartBackdrop) DOM.cartBackdrop.addEventListener('click', closeCart);

    // Cart Quantity & Removal Actions (Delegated)
    if (DOM.cartItemsList) {
      DOM.cartItemsList.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cart-action]');
        if (!btn) return;
        const action = btn.dataset.cartAction;
        const index = parseInt(btn.dataset.index, 10);
        if (action === 'inc') updateCartQty(index, 1);
        if (action === 'dec') updateCartQty(index, -1);
        if (action === 'remove') removeFromCart(index);
      });
    }

    // Apply Promo Code
    if (DOM.applyPromoBtn) {
      DOM.applyPromoBtn.addEventListener('click', () => {
        if (DOM.promoInput) applyPromoCode(DOM.promoInput.value);
      });
    }
    if (DOM.promoInput) {
      DOM.promoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyPromoCode(DOM.promoInput.value);
        }
      });
    }

    // Checkout Modal
    if (DOM.proceedCheckoutBtn) DOM.proceedCheckoutBtn.addEventListener('click', openCheckout);
    if (DOM.checkoutCloseBtn) DOM.checkoutCloseBtn.addEventListener('click', closeCheckout);
    if (DOM.toPaymentBtn) {
      DOM.toPaymentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Sound.playTap();
        // Validate form
        const form = document.getElementById('shipping-form');
        if (form && form.checkValidity()) {
          setCheckoutStep(2);
        } else if (form) {
          form.reportValidity();
        }
      });
    }

    const backToShippingBtn = document.getElementById('back-to-shipping-btn');
    if (backToShippingBtn) {
      backToShippingBtn.addEventListener('click', () => {
        Sound.playTap();
        setCheckoutStep(1);
      });
    }

    if (DOM.toConfirmationBtn) {
      DOM.toConfirmationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        completeOrder();
      });
    }

    const finishCheckoutBtn = document.getElementById('finish-checkout-btn');
    if (finishCheckoutBtn) {
      finishCheckoutBtn.addEventListener('click', () => {
        closeCheckout();
        if (state.currentOrderId) {
          if (DOM.trackerInput) DOM.trackerInput.value = state.currentOrderId;
          trackOrder(state.currentOrderId);
          window.location.hash = '#orders';
        }
      });
    }

    // Category Filter Pills
    if (DOM.categoryPills) {
      DOM.categoryPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-btn');
        if (!btn) return;
        Sound.playTap();
        DOM.categoryPills.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filters.category = btn.dataset.category;
        renderProducts();
      });
    }

    // Price Slider Filter
    if (DOM.priceSlider) {
      DOM.priceSlider.addEventListener('input', (e) => {
        state.filters.maxPrice = parseInt(e.target.value, 10);
        if (DOM.priceDisplay) DOM.priceDisplay.textContent = `$${state.filters.maxPrice}`;
        renderProducts();
      });
    }

    // Stock Filter Toggle
    if (DOM.stockToggle) {
      DOM.stockToggle.addEventListener('change', (e) => {
        Sound.playTap();
        state.filters.inStockOnly = e.target.checked;
        renderProducts();
      });
    }

    // Sort Dropdown
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        Sound.playTap();
        state.filters.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Live Header Search Autocomplete
    if (DOM.headerSearchInput) {
      DOM.headerSearchInput.addEventListener('input', (e) => {
        handleLiveSearch(e.target.value);
        state.filters.search = e.target.value;
        renderProducts();
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
          if (DOM.searchResultsDropdown) DOM.searchResultsDropdown.classList.remove('show');
        }
      });
    }

    // Product Card Delegated Actions (Quick View, Add to Cart, Wishlist, Compare)
    if (DOM.productsGrid) {
      DOM.productsGrid.addEventListener('click', (e) => {
        const target = e.target;
        const addBtn = target.closest('[data-action="add-cart"]');
        const quickViewTrigger = target.closest('[data-action="quickview"]');
        const wishlistBtn = target.closest('[data-action="wishlist"]');
        const compareBtn = target.closest('[data-action="compare"]');

        if (addBtn) {
          addToCart(addBtn.dataset.id);
          return;
        }

        if (wishlistBtn) {
          toggleWishlist(wishlistBtn.dataset.id);
          return;
        }

        if (compareBtn) {
          toggleCompare(compareBtn.dataset.id);
          return;
        }

        if (quickViewTrigger) {
          openQuickView(quickViewTrigger.dataset.id);
          return;
        }
      });
    }

    // Modal Close
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeQuickView);
    if (DOM.modalBackdrop) {
      DOM.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.modalBackdrop) closeQuickView();
      });
    }

    // Order Tracking Form
    if (DOM.trackerForm) {
      DOM.trackerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (DOM.trackerInput) trackOrder(DOM.trackerInput.value);
      });
    }

    // Reviews Form Submission
    let selectedRating = 5;
    if (DOM.reviewStarPicker) {
      DOM.reviewStarPicker.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          Sound.playTap();
          selectedRating = parseInt(btn.dataset.rating, 10);
          DOM.reviewStarPicker.querySelectorAll('.star-btn').forEach((b, idx) => {
            b.classList.toggle('active', idx < selectedRating);
          });
        });
      });
    }

    if (DOM.writeReviewForm) {
      DOM.writeReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Sound.playSuccess();
        const author = document.getElementById('review-author-input').value;
        const title = document.getElementById('review-title-input').value;
        const content = document.getElementById('review-content-input').value;
        const productId = DOM.reviewProductSelect ? DOM.reviewProductSelect.value : 'aura-studio-max';

        const newReview = {
          id: `rev-${Date.now()}`,
          productId: productId,
          author: author,
          role: "Verified Owner",
          avatar: author.slice(0, 2).toUpperCase(),
          rating: selectedRating,
          date: "Just now",
          title: title,
          content: content,
          verified: true
        };

        state.reviews.unshift(newReview);
        saveState();
        renderReviews();
        DOM.writeReviewForm.reset();
        showToast('Thank you! Your verified review has been published.', 'success');
      });
    }

    // FAQ Accordion
    DOM.faqItems.forEach(item => {
      const q = item.querySelector('.faq-question');
      if (q) {
        q.addEventListener('click', () => {
          Sound.playTap();
          const wasOpen = item.classList.contains('open');
          DOM.faqItems.forEach(i => i.classList.remove('open'));
          if (!wasOpen) item.classList.add('open');
        });
      }
    });

    // Hash Change
    window.addEventListener('hashchange', handleUrlHash);

    // Keyboard ESC to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
        closeQuickView();
        closeCheckout();
      }
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
