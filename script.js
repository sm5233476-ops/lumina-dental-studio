/**
 * LUMINA DENTAL STUDIO — BEVERLY HILLS ATELIER (MASTER SCRIPT)
 * Motion Architecture: GSAP + ScrollTrigger + Lenis Smooth Scroll
 * Single Source of Truth: TREATMENTS Data Object
 * Exact Amortization Math (Formula in code comments)
 * Working 3-Step Booking Modal Engine + Accessible Macro Teeth Sliders
 */

// Define Formspree or Custom API Endpoint here. If left empty, runs in instant client-side demo mode.
const BOOKING_ENDPOINT = "";

// Canonical Clinic Address Constant (A12)
const CLINIC_ADDRESS = {
  name: "Lumina Dental Studio",
  suite: "Penthouse Suite 701",
  beverlyHills: "8920 Wilshire Blvd, Penthouse Suite 701, Beverly Hills, CA 90211",
  austin: "500 W 2nd St, Suite 1900, Austin, TX 78701",
  phoneDisplay: "(310) 555-0142",
  phoneTel: "+13105550142"
};

/* ==========================================================================
   PART A1: TREATMENTS DATA OBJECT (SINGLE SOURCE OF TRUTH)
   ========================================================================== */
const TREATMENTS = {
  allon4: {
    id: "allon4",
    name: "All-on-4 & Permanent Implants",
    badge: "MOST REQUESTED",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    imageAlt: "All-on-4 surgical dental implant model and restorations",
    cardPrice: "From $18,500 / arch",
    calcOptionName: "Full Arch All-on-4 Permanent Teeth-in-a-Day ($18,500)",
    unitPrice: 18500,
    calcTotal: 18500,
    category: "Restorative Surgery",
    summary: "Replace broken, missing, or decayed teeth with biocompatible titanium posts and immediate functional teeth. Warranty-backed restorations (terms apply).",
    points: [
      "3D CBCT guided computer micro-placement",
      "Same-day provisional teeth fitted immediately",
      "Helps preserve jawbone density and facial contours"
    ],
    ctaText: "Explore Implant Options →",
    isUrgent: false,
    featured: true
  },
  veneers: {
    id: "veneers",
    name: "Handcrafted Porcelain Veneers",
    badge: null,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Patient showing natural handcrafted porcelain veneers smile",
    cardPrice: "From $1,600 / tooth",
    calcOptionName: "Porcelain Veneers (Set of 6 Smile Makeover = $9,600)",
    unitPrice: 1600,
    calcTotal: 9600, // 6 * 1600
    category: "Cosmetic Artistry",
    summary: "Ultra-thin, micro-layered feldspathic and e.max veneers custom-shaded by master ceramists to correct gaps, chips, discoloration, and uneven tooth shapes.",
    points: [
      "Minimal to zero-prep tooth preservation",
      "Stain-resistant ceramic surface with natural light translucency",
      "Digital Smile Simulation preview before prep"
    ],
    ctaText: "Design Your Veneers →",
    isUrgent: false,
    featured: false
  },
  implants: {
    id: "implants",
    name: "Single Surgical Implant & Crown",
    badge: null,
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Precision titanium surgical implant and zirconia abutment instrument",
    cardPrice: "From $4,200",
    calcOptionName: "Single Surgical Implant & Zirconia Crown ($4,200)",
    unitPrice: 4200,
    calcTotal: 4200,
    category: "Restorative Surgery",
    summary: "Biocompatible surgical titanium fixture paired with a custom monolithic zirconia crown for permanent single-tooth replacement that blends seamlessly.",
    points: [
      "Computer-guided micro-surgical placement",
      "Custom anatomical shading by Master Ceramist",
      "Preserves adjacent natural healthy teeth"
    ],
    ctaText: "Explore Single Implants →",
    isUrgent: false,
    featured: false
  },
  invisalign: {
    id: "invisalign",
    name: "Clear Orthodontic Aligners",
    badge: null,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Patient holding clear removable orthodontic aligners",
    cardPrice: "From $3,400",
    calcOptionName: "Comprehensive Clear Aligner Therapy ($5,900)",
    unitPrice: 3400,
    calcTotal: 5900,
    category: "Orthodontics",
    summary: "Virtually invisible aligners digitally mapped to straighten crowded teeth, gaps, and overbites with gentle, predictable biomechanical force.",
    points: [
      "SmartTrack elastomeric material for accurate tooth movement",
      "Removable anytime for dining and daily oral hygiene",
      "Complimentary professional brightening included"
    ],
    ctaText: "See Aligner Simulation →",
    isUrgent: false,
    featured: false
  },
  whitening: {
    id: "whitening",
    name: "Laser Teeth Brightening",
    badge: null,
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80",
    imageAlt: "In-office clinical laser teeth brightening treatment",
    cardPrice: "Clinical Session $550",
    calcOptionName: "In-Office Laser Brightening ($550)",
    unitPrice: 550,
    calcTotal: 550,
    category: "Cosmetic Brightening",
    summary: "Noticeably brighter in one visit (results vary). Safely lifts coffee, tea, wine, and aging discoloration. Formulated with mineral desensitizers.",
    points: [
      "Noticeably brighter in a single 45-minute visit (results vary)",
      "Enamel-safe light wavelength technology",
      "Custom take-home maintenance kit included"
    ],
    ctaText: "Book Brightening Session →",
    isUrgent: false,
    featured: false
  },
  emergency: {
    id: "emergency",
    name: "Same-Day Emergency Appointments",
    badge: "SAME-DAY EMERGENCY APPOINTMENTS",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Sterile emergency dental triage bay and examination suite",
    cardPrice: "Triage & Exam $99",
    calcOptionName: "Emergency Triage & Stabilization ($99)",
    calcTotal: 99,
    category: "Trauma & Pain Unit",
    summary: "Severe tooth pain, chipped front teeth, lost crowns, or acute trauma receive rapid clinical triage. Our emergency bays provide prompt pain-relieving care.",
    points: [
      "Direct on-call doctor triage response",
      "Same-day emergency pain relief and repair",
      "Emergency surgery bays reserved daily"
    ],
    ctaText: "Call Emergency Dispatch →",
    isUrgent: true,
    featured: false
  }
};

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     C1: LENIS SMOOTH SCROLL ENGINE (Paused while modal is open)
     ========================================================================== */
  let lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ==========================================================================
     C2: TOP SCROLL PROGRESS BAR (ScaleX Only)
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? winScroll / height : 0;
      scrollProgressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }

  /* ==========================================================================
     C3: ZERO-STUTTER STICKY GLASS NAVBAR
     ========================================================================== */
  const mainHeader = document.getElementById('main-header');
  const handleNavbarScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 20) {
      if (mainHeader) mainHeader.classList.add('navbar-scrolled');
    } else {
      if (mainHeader) mainHeader.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ==========================================================================
     C4, C5, C6, C7: GSAP ANIMATIONS & STAT COUNTERS
     ========================================================================== */
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // C4: Hero Masked Line-by-Line Reveal
    const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });

    heroTl.from(".hero-title .line-inner", {
      y: "115%",
      duration: 1.1,
      stagger: 0.12,
      delay: 0.1
    })
    .from(".hero-pill-badge", {
      opacity: 0,
      y: 16,
      duration: 0.7
    }, "-=0.8")
    .from(".hero-description", {
      opacity: 0,
      y: 18,
      duration: 0.8
    }, "-=0.6")
    .from(".hero-cta-group .btn", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.7
    }, "-=0.6")
    .from(".hero-trust-strip", {
      opacity: 0,
      y: 16,
      duration: 0.7
    }, "-=0.5");

    // C5: Parallax on Hero Image and Doctor Portrait (Max 8% transform only)
    gsap.to(".hero-main-img", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".doctor-photo", {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: ".specialists-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // C6: Masked Section Headings Reveal & Gold Line ScaleX
    document.querySelectorAll('.masked-heading').forEach((heading) => {
      const lines = heading.querySelectorAll('.line-inner');
      const section = heading.closest('section');
      const goldLine = section ? section.querySelector('.section-gold-line') : null;

      gsap.from(lines, {
        y: "115%",
        duration: 1.0,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          once: true
        }
      });

      if (goldLine) {
        gsap.to(goldLine, {
          scaleX: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true
          }
        });
      }
    });

    // C7: Staggered Reveals for Cards
    ScrollTrigger.batch(".comfort-card, .treatment-card, .portfolio-card, .review-card", {
      start: "top 85%",
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 32,
          scale: 0.97,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out"
        });
      }
    });
  }

  // C4: Stat Numbers Count-Up Animation (rAF with expo-out)
  const counterElements = document.querySelectorAll('.counter-number');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetVal = parseFloat(el.getAttribute('data-target'));
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = easeProgress * targetVal;
            el.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = targetVal.toFixed(decimals);
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  /* ==========================================================================
     C8: MAGNETIC BUTTONS (Desktop fine pointers only)
     ========================================================================== */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const moveX = Math.max(-8, Math.min(8, x * 0.2));
        const moveY = Math.max(-8, Math.min(8, y * 0.2));
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     PART B1: ACCESSIBLE DIRECT MACRO TEETH COMPARISON SLIDERS (120fps)
     ========================================================================== */
  const sliders = document.querySelectorAll('.ba-slider');

  sliders.forEach((slider) => {
    let isDragging = false;
    const hint = slider.querySelector('.ba-drag-hint');

    const setPosition = (percentage) => {
      const clamped = Math.max(0, Math.min(100, percentage));
      slider.style.setProperty('--ba-pos', `${clamped}%`);
      slider.setAttribute('aria-valuenow', Math.round(clamped));

      if (hint && !hint.classList.contains('is-hidden')) {
        hint.classList.add('is-hidden');
      }
    };

    const handlePointerMove = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const pct = (offsetX / rect.width) * 100;
      setPosition(pct);
    };

    slider.addEventListener('pointerdown', (e) => {
      isDragging = true;
      slider.setPointerCapture(e.pointerId);
      handlePointerMove(e.clientX);
    });

    slider.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      handlePointerMove(e.clientX);
    });

    const stopDragging = (e) => {
      if (isDragging) {
        isDragging = false;
        try {
          slider.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    slider.addEventListener('pointerup', stopDragging);
    slider.addEventListener('pointercancel', stopDragging);

    // Keyboard accessibility: Left/Down -5%, Right/Up +5%, Home 0%, End 100%
    slider.addEventListener('keydown', (e) => {
      let currentVal = parseFloat(slider.getAttribute('aria-valuenow') || '50');

      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setPosition(currentVal - 5);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setPosition(currentVal + 5);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPosition(100);
      }
    });
  });

  /* ==========================================================================
     PART A1, A3 & C9: FINANCING CALCULATOR (Amortization Math & Smooth Tween)
     ========================================================================== */
  const calcSelect = document.getElementById('calcTreatmentSelect');
  const downSlider = document.getElementById('downPaymentSlider');
  const downDisplay = document.getElementById('downPaymentDisplay');
  const termChips = document.querySelectorAll('.term-chip');
  const monthlyNumberEl = document.getElementById('monthlyPaymentNumber');
  const totalValueEl = document.getElementById('calcTotalValue');
  const downValueEl = document.getElementById('calcDownValue');
  const aprValueEl = document.getElementById('calcAprValue');

  // Populate Calculator Select options from TREATMENTS single source of truth
  if (calcSelect) {
    calcSelect.innerHTML = `
      <option value="allon4" selected>${TREATMENTS.allon4.calcOptionName}</option>
      <option value="veneers">${TREATMENTS.veneers.calcOptionName}</option>
      <option value="implants">${TREATMENTS.implants.calcOptionName}</option>
      <option value="invisalign">${TREATMENTS.invisalign.calcOptionName}</option>
    `;
  }

  let currentTermMonths = 24;
  let currentApr = 0.0;
  let lastMonthlyPayment = 708;

  /**
   * Banking Amortization Formula:
   * For 0% APR:
   *   Monthly = Principal / n
   * For APR > 0%:
   *   r = (Annual APR % / 100) / 12
   *   Monthly = Principal * (r * (1 + r)^n) / ((1 + r)^n - 1)
   */
  function calculateMonthly(principal, months, annualAprPct) {
    if (principal <= 0) return 0;
    if (annualAprPct === 0) {
      return Math.round(principal / months);
    }
    const r = (annualAprPct / 100) / 12;
    const monthly = principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return Math.round(monthly);
  }

  function updateCalculator() {
    if (!calcSelect || !downSlider) return;

    const treatmentKey = calcSelect.value;
    const treatment = TREATMENTS[treatmentKey] || TREATMENTS.allon4;
    const totalCost = treatment.calcTotal;
    let downPayment = parseFloat(downSlider.value) || 0;

    // Clamp down payment: down payment can NEVER exceed total cost
    if (downPayment >= totalCost) {
      downPayment = Math.max(0, totalCost - 500);
      downSlider.value = downPayment;
    }

    downDisplay.textContent = `$${downPayment.toLocaleString()}`;
    downValueEl.textContent = `$${downPayment.toLocaleString()}`;
    totalValueEl.textContent = `$${totalCost.toLocaleString()}`;
    aprValueEl.textContent = `${currentApr.toFixed(2)}% APR`;

    const principal = Math.max(0, totalCost - downPayment);
    const targetMonthly = calculateMonthly(principal, currentTermMonths, currentApr);

    // C9: Smooth Tween of Monthly Payment value (~500ms)
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      const obj = { val: lastMonthlyPayment };
      gsap.to(obj, {
        val: targetMonthly,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          monthlyNumberEl.textContent = Math.round(obj.val).toLocaleString();
        }
      });
    } else {
      monthlyNumberEl.textContent = targetMonthly.toLocaleString();
    }

    lastMonthlyPayment = targetMonthly;
  }

  if (calcSelect) calcSelect.addEventListener('change', updateCalculator);
  if (downSlider) downSlider.addEventListener('input', updateCalculator);

  termChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      termChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');

      currentTermMonths = parseInt(chip.getAttribute('data-term'), 10) || 24;
      currentApr = parseFloat(chip.getAttribute('data-apr')) || 0.0;
      updateCalculator();
    });
  });

  updateCalculator();

  /* ==========================================================================
     PART B3 & C11: FAQ ACCORDION (One Item Open at a Time)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     PART B2: WORKING 3-STEP VIP BOOKING DRAWER
     ========================================================================== */
  const vipDrawer = document.getElementById('vipBookingDrawer');
  const vipOverlay = document.getElementById('vipDrawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const openDrawerButtons = document.querySelectorAll('.open-booking-drawer');
  const modalTreatmentGrid = document.getElementById('modalTreatmentGrid');

  // Populate Modal Treatments from TREATMENTS Object
  if (modalTreatmentGrid) {
    modalTreatmentGrid.innerHTML = `
      <label class="custom-radio-card">
        <input type="radio" name="d_treatment_goal" value="allon4" checked>
        <div class="radio-content">
          <span class="radio-title">${TREATMENTS.allon4.name}</span>
          <span class="radio-sub">Full Arch immediate permanent teeth</span>
        </div>
      </label>
      <label class="custom-radio-card">
        <input type="radio" name="d_treatment_goal" value="veneers">
        <div class="radio-content">
          <span class="radio-title">${TREATMENTS.veneers.name}</span>
          <span class="radio-sub">Bespoke cosmetic smile redesign</span>
        </div>
      </label>
      <label class="custom-radio-card">
        <input type="radio" name="d_treatment_goal" value="implants">
        <div class="radio-content">
          <span class="radio-title">${TREATMENTS.implants.name}</span>
          <span class="radio-sub">Permanent single titanium fixture & crown</span>
        </div>
      </label>
      <label class="custom-radio-card">
        <input type="radio" name="d_treatment_goal" value="invisalign">
        <div class="radio-content">
          <span class="radio-title">${TREATMENTS.invisalign.name}</span>
          <span class="radio-sub">Discreet orthodontic alignment</span>
        </div>
      </label>
      <label class="custom-radio-card">
        <input type="radio" name="d_treatment_goal" value="emergency">
        <div class="radio-content">
          <span class="radio-title">${TREATMENTS.emergency.name}</span>
          <span class="radio-sub">Immediate pain relief & trauma triage</span>
        </div>
      </label>
    `;
  }

  let previouslyFocusedElement = null;

  const openDrawer = (preselectedTreatmentKey) => {
    if (!vipDrawer || !vipOverlay) return;

    previouslyFocusedElement = document.activeElement;

    if (preselectedTreatmentKey) {
      const radio = vipDrawer.querySelector(`input[name="d_treatment_goal"][value="${preselectedTreatmentKey}"]`);
      if (radio) radio.checked = true;
    }

    vipOverlay.classList.add('active');
    vipDrawer.classList.add('open');
    vipDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    // Pause Lenis smooth scroll while modal is open (C1)
    if (lenis) lenis.stop();

    setTimeout(() => {
      closeDrawerBtn.focus();
    }, 100);
  };

  const closeDrawer = () => {
    if (!vipDrawer || !vipOverlay) return;

    vipOverlay.classList.remove('active');
    vipDrawer.classList.remove('open');
    vipDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';

    // Resume Lenis smooth scroll (C1)
    if (lenis) lenis.start();

    if (previouslyFocusedElement) previouslyFocusedElement.focus();
  };

  openDrawerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselect = btn.getAttribute('data-preselect');
      openDrawer(preselect);
    });
  });

  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (vipOverlay) vipOverlay.addEventListener('click', closeDrawer);

  // Focus trap & Escape Key
  window.addEventListener('keydown', (e) => {
    if (!vipDrawer.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = vipDrawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Wizard Step Navigation
  const dStep1 = document.getElementById('dStep1');
  const dStep2 = document.getElementById('dStep2');
  const dStep3 = document.getElementById('dStep3');
  const dStepSuccess = document.getElementById('dStepSuccess');

  const dInd1 = document.getElementById('dStepIndicator1');
  const dInd2 = document.getElementById('dStepIndicator2');
  const dInd3 = document.getElementById('dStepIndicator3');

  const dBtnToStep2 = document.getElementById('dBtnToStep2');
  const dBtnBackToStep1 = document.getElementById('dBtnBackToStep1');
  const dBtnToStep3 = document.getElementById('dBtnToStep3');
  const dBtnBackToStep2 = document.getElementById('dBtnBackToStep2');
  const dBookingForm = document.getElementById('drawerBookingForm');
  const dBtnReset = document.getElementById('dBtnReset');

  // Pre-fill tomorrow as min booking date
  const dBookingDate = document.getElementById('dBookingDate');
  if (dBookingDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dBookingDate.min = `${yyyy}-${mm}-${dd}`;
    dBookingDate.value = `${yyyy}-${mm}-${dd}`;
  }

  // Time Slot Chips
  const modalTimeChips = vipDrawer.querySelectorAll('.time-chip');
  const dSelectedTimeSlot = document.getElementById('dSelectedTimeSlot');

  modalTimeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      modalTimeChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');
      if (dSelectedTimeSlot) {
        dSelectedTimeSlot.value = chip.getAttribute('data-time');
      }
    });
  });

  // Step 1 -> 2
  if (dBtnToStep2) {
    dBtnToStep2.addEventListener('click', () => {
      dStep1.classList.remove('active');
      dStep2.classList.add('active');
      dInd1.classList.add('active');
      dInd1.querySelector('.step-num').textContent = '✓';
      dInd2.classList.add('active');
    });
  }

  // Step 2 -> 1
  if (dBtnBackToStep1) {
    dBtnBackToStep1.addEventListener('click', () => {
      dStep2.classList.remove('active');
      dStep1.classList.add('active');
      dInd1.querySelector('.step-num').textContent = '1';
      dInd2.classList.remove('active');
    });
  }

  // Step 2 -> 3: Validation & Mark Step 2 complete with checkmark
  if (dBtnToStep3) {
    dBtnToStep3.addEventListener('click', () => {
      const dateErr = document.getElementById('dateError');
      if (!dBookingDate.value) {
        dBookingDate.classList.add('is-invalid');
        if (dateErr) dateErr.textContent = "Please select a preferred date.";
        return;
      }
      dBookingDate.classList.remove('is-invalid');
      if (dateErr) dateErr.textContent = "";

      dStep2.classList.remove('active');
      dStep3.classList.add('active');
      dInd2.querySelector('.step-num').textContent = '✓';
      dInd3.classList.add('active');
    });
  }

  // Step 3 -> 2
  if (dBtnBackToStep2) {
    dBtnBackToStep2.addEventListener('click', () => {
      dStep3.classList.remove('active');
      dStep2.classList.add('active');
      dInd2.querySelector('.step-num').textContent = '2';
      dInd3.classList.remove('active');
    });
  }

  // Step 3: Form Validation & Submission
  if (dBookingForm) {
    dBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fNameInput = document.getElementById('dPatientFirstName');
      const lNameInput = document.getElementById('dPatientLastName');
      const phoneInput = document.getElementById('dPatientPhone');
      const emailInput = document.getElementById('dPatientEmail');
      const formAlertError = document.getElementById('formSubmissionError');

      const fName = fNameInput.value.trim();
      const lName = lNameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();

      let hasError = false;

      [fNameInput, lNameInput, phoneInput, emailInput].forEach(inp => inp.classList.remove('is-invalid'));
      document.querySelectorAll('.field-error').forEach(sp => sp.textContent = '');
      if (formAlertError) formAlertError.style.display = 'none';

      if (fName.length < 2) {
        fNameInput.classList.add('is-invalid');
        document.getElementById('firstNameError').textContent = "Please enter your first name.";
        hasError = true;
      }

      if (lName.length < 2) {
        lNameInput.classList.add('is-invalid');
        document.getElementById('lastNameError').textContent = "Please enter your last name.";
        hasError = true;
      }

      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        phoneInput.classList.add('is-invalid');
        document.getElementById('phoneError').textContent = "Please enter a valid telephone number.";
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        document.getElementById('emailError').textContent = "Please enter a valid email address.";
        hasError = true;
      }

      if (hasError) return;

      const submitBtn = document.getElementById('dBtnConfirm');
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      const selectedRadio = vipDrawer.querySelector('input[name="d_treatment_goal"]:checked');
      const treatmentKey = selectedRadio ? selectedRadio.value : 'allon4';
      const treatmentObj = TREATMENTS[treatmentKey] || TREATMENTS.allon4;
      const treatmentName = treatmentObj.name;
      const appointmentDate = dBookingDate.value;
      const timeSlot = dSelectedTimeSlot ? dSelectedTimeSlot.value : 'Morning (8:30 AM)';
      const sedationSelect = document.getElementById('dSedationPreference');
      const sedationName = sedationSelect ? sedationSelect.value : 'Gentle Painless Local Numbing';

      const payload = {
        patientName: `${fName} ${lName}`,
        phone: phone,
        email: email,
        treatment: treatmentName,
        date: appointmentDate,
        timeSlot: timeSlot,
        sedation: sedationName,
        suiteLocation: CLINIC_ADDRESS.suite,
        timestamp: new Date().toISOString()
      };

      try {
        if (BOOKING_ENDPOINT && BOOKING_ENDPOINT.trim() !== "") {
          const response = await fetch(BOOKING_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!response.ok) throw new Error("Submission network failure");
        } else {
          // Instant Demo Mode: Simulate 1.2s network roundtrip
          await new Promise(res => setTimeout(res, 1200));
        }

        // Render ACTUAL User-Entered Data into Confirmation Screen
        document.getElementById('dConfirmedName').textContent = `${fName} ${lName}`;
        document.getElementById('dReceiptTreatment').textContent = treatmentName;

        // Clean Date Formatting without double brackets
        try {
          const dObj = new Date(appointmentDate + 'T00:00:00');
          const formattedDate = dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const cleanSlot = timeSlot.replace(/[()]/g, '').replace('Morning', 'Morning,').replace('Afternoon', 'Afternoon,').replace('Late', 'Late,');
          document.getElementById('dReceiptDate').textContent = `${formattedDate} · ${cleanSlot}`;
        } catch (_) {
          document.getElementById('dReceiptDate').textContent = `${appointmentDate} · ${timeSlot}`;
        }

        document.getElementById('dReceiptSedation').textContent = sedationName;
        document.getElementById('dReceiptLocation').textContent = CLINIC_ADDRESS.suite;

        // Switch to Confirmation Step
        dStep3.classList.remove('active');
        dStepSuccess.classList.add('active');
        dInd3.querySelector('.step-num').textContent = '✓';
        dStepSuccess.focus();

        showToast(`VIP Suite Request Received for ${fName}!`);

      } catch (err) {
        if (formAlertError) {
          formAlertError.style.display = 'block';
          formAlertError.innerHTML = 'Unable to submit request. <button type="button" id="btnRetrySubmit" style="text-decoration:underline;font-weight:700;margin-left:6px;cursor:pointer;">Retry</button>';
          const retryBtn = document.getElementById('btnRetrySubmit');
          if (retryBtn) {
            retryBtn.addEventListener('click', () => {
              submitBtn.click();
            });
          }
        }
      } finally {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }
    });
  }

  // Reset Booking Form
  if (dBtnReset) {
    dBtnReset.addEventListener('click', () => {
      dBookingForm.reset();
      dStepSuccess.classList.remove('active');
      dStep1.classList.add('active');
      dInd1.querySelector('.step-num').textContent = '1';
      dInd2.querySelector('.step-num').textContent = '2';
      dInd3.querySelector('.step-num').textContent = '3';
      dInd2.classList.remove('active');
      dInd3.classList.remove('active');
      dInd1.classList.add('active');
    });
  }

  /* ==========================================================================
     MOBILE DRAWER TOGGLE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = mobileDrawer.style.display === 'block';
      mobileDrawer.style.display = isVisible ? 'none' : 'block';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.style.display = 'none';
      });
    });
  }

  /* ==========================================================================
     TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4200);
  }

  /* ==========================================================================
     SMOOTH ANCHOR LINK ROUTING WITH STICKY NAVBAR OFFSET (Lenis Compatible)
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navOffset = 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;

        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -navOffset });
        } else {
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    });
  });

});