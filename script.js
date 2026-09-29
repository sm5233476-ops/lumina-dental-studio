/**
 * LUMINA DENTAL & IMPLANT STUDIO — MASTER JAVASCRIPT (BEVERLY HILLS ATELIER)
 * 1. Beverly Hills Scroll-Reveal Animation Engine (Intersection Observer)
 * 2. Navbar Dynamic Dark Glass Blur on Scroll
 * 3. Before & After Macro Teeth Slider (Clip-Path Powered - Zero Mobile Overflow)
 * 4. Ultra-Compact Social Proof Ticker Engine (Dynamic Rotation)
 * 5. Slide-Over VIP Booking Drawer Engine
 * 6. Interactive Smile Investment & Financing Calculator
 * 7. Mobile Drawer & Centered Toast Notification Helper
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BEVERLY HILLS SCROLL-REVEAL ANIMATION ENGINE
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el, index) => {
      const delay = (index % 3) * 0.08;
      el.style.transitionDelay = `${delay}s`;
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     2. NAVBAR GLASS BLUR ON SCROLL
     ========================================================================== */
  const mainHeader = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      mainHeader.classList.add('navbar-scrolled');
    } else {
      mainHeader.classList.remove('navbar-scrolled');
    }
  }, { passive: true });

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
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
     4. CLIP-PATH DENTAL TEETH SLIDER (ZERO MOBILE OVERFLOW)
     ========================================================================== */
  const sliderContainer = document.getElementById('baSliderContainer');
  const handle = document.getElementById('baHandle');

  if (sliderContainer && handle) {
    let isSliding = false;

    const setSliderPosition = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      sliderContainer.style.setProperty('--clip-pos', `${percentage}%`);
    };

    // Desktop Mouse Drag Events
    sliderContainer.addEventListener('mousedown', (e) => {
      isSliding = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isSliding = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      setSliderPosition(e.clientX);
    });

    // Mobile / Tablet Touch Events
    sliderContainer.addEventListener('touchstart', (e) => {
      isSliding = true;
      if (e.touches.length > 0) {
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isSliding = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isSliding || e.touches.length === 0) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });
  }

  /* ==========================================================================
     5. ULTRA-COMPACT LIVE SOCIAL PROOF TICKER ROTATOR
     ========================================================================== */
  const tickerTextEl = document.getElementById('tickerText');
  const tickerEl = document.getElementById('socialProofTicker');

  const compactSocialProof = [
    "Dr. Sterling booked All-on-4 • 6m ago",
    "Elena R. reserved 10 Veneers • 14m ago",
    "Sir Charles W. booked IV Sedation • 22m ago",
    "Marcus V. confirmed Implants • 31m ago",
    "VIP Patient intake confirmed • 4m ago"
  ];

  if (tickerTextEl && tickerEl) {
    let tickerIndex = 0;

    setInterval(() => {
      tickerEl.style.opacity = '0';
      tickerEl.style.transform = 'translateY(6px)';

      setTimeout(() => {
        tickerIndex = (tickerIndex + 1) % compactSocialProof.length;
        tickerTextEl.textContent = compactSocialProof[tickerIndex];
        
        tickerEl.style.opacity = '1';
        tickerEl.style.transform = 'translateY(0)';
      }, 300);
    }, 6000); // Smoothly rotates every 6 seconds
  }

  /* ==========================================================================
     6. SLIDE-OVER VIP BOOKING MODAL DRAWER
     ========================================================================== */
  const vipDrawer = document.getElementById('vipBookingDrawer');
  const vipOverlay = document.getElementById('vipDrawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const openDrawerButtons = document.querySelectorAll('.open-booking-drawer');

  const openDrawer = () => {
    if (vipDrawer && vipOverlay) {
      vipOverlay.classList.add('active');
      vipDrawer.classList.add('open');
      vipDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (vipDrawer && vipOverlay) {
      vipOverlay.classList.remove('active');
      vipDrawer.classList.remove('open');
      vipDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  openDrawerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (vipOverlay) vipOverlay.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* --- 3-Step Wizard Logic Inside VIP Drawer --- */
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

  const timeChips = document.querySelectorAll('.time-chip');
  const dSelectedTimeSlot = document.getElementById('dSelectedTimeSlot');

  timeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (dSelectedTimeSlot) {
        dSelectedTimeSlot.value = chip.getAttribute('data-time');
      }
    });
  });

  if (dBtnToStep2) {
    dBtnToStep2.addEventListener('click', () => {
      dStep1.classList.remove('active');
      dStep2.classList.add('active');
      dInd1.classList.remove('active');
      dInd2.classList.add('active');
    });
  }

  if (dBtnBackToStep1) {
    dBtnBackToStep1.addEventListener('click', () => {
      dStep2.classList.remove('active');
      dStep1.classList.add('active');
      dInd2.classList.remove('active');
      dInd1.classList.add('active');
    });
  }

  if (dBtnToStep3) {
    dBtnToStep3.addEventListener('click', () => {
      if (!dBookingDate.value) {
        showToast('Please select your preferred appointment date.');
        return;
      }
      dStep2.classList.remove('active');
      dStep3.classList.add('active');
      dInd2.classList.remove('active');
      dInd3.classList.add('active');
    });
  }

  if (dBtnBackToStep2) {
    dBtnBackToStep2.addEventListener('click', () => {
      dStep3.classList.remove('active');
      dStep2.classList.add('active');
      dInd3.classList.remove('active');
      dInd2.classList.add('active');
    });
  }

  if (dBookingForm) {
    dBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fName = document.getElementById('dPatientFirstName').value.trim();
      const lName = document.getElementById('dPatientLastName').value.trim();
      const phone = document.getElementById('dPatientPhone').value.trim();
      const email = document.getElementById('dPatientEmail').value.trim();

      if (!fName || !lName || !phone || !email) {
        showToast('Please enter all required contact fields.');
        return;
      }

      const treatmentRadio = document.querySelector('input[name="d_treatment_goal"]:checked');
      const treatmentVal = treatmentRadio ? treatmentRadio.value : 'Consultation';
      const dateVal = dBookingDate.value;
      const timeVal = dSelectedTimeSlot ? dSelectedTimeSlot.value : 'Morning';

      const nameEl = document.getElementById('dConfirmedName');
      const treatEl = document.getElementById('dReceiptTreatment');
      const dateEl = document.getElementById('dReceiptDate');

      if (nameEl) nameEl.textContent = `${fName} ${lName}`;
      if (treatEl) treatEl.textContent = treatmentVal;
      if (dateEl) dateEl.textContent = `${dateVal} (${timeVal})`;

      dStep3.classList.remove('active');
      dStepSuccess.classList.add('active');
      dInd3.classList.add('active');

      showToast(`VIP Suite Reserved for ${fName}! SMS sent.`);
    });
  }

  if (dBtnReset) {
    dBtnReset.addEventListener('click', () => {
      dBookingForm.reset();
      dStepSuccess.classList.remove('active');
      dStep1.classList.add('active');
      dInd2.classList.remove('active');
      dInd3.classList.remove('active');
      dInd1.classList.add('active');
    });
  }

  /* ==========================================================================
     7. INTERACTIVE SMILE INVESTMENT & FINANCING CALCULATOR
     ========================================================================== */
  const calcSelect = document.getElementById('calcTreatmentSelect');
  const downSlider = document.getElementById('downPaymentSlider');
  const downDisplay = document.getElementById('downPaymentDisplay');
  const termChips = document.querySelectorAll('.term-chip');
  
  const monthlyNumberEl = document.getElementById('monthlyPaymentNumber');
  const totalValueEl = document.getElementById('calcTotalValue');
  const downValueEl = document.getElementById('calcDownValue');

  let currentTermMonths = 24;

  const updateCalculator = () => {
    if (!calcSelect || !downSlider) return;

    const selectedOption = calcSelect.options[calcSelect.selectedIndex];
    const totalCost = parseFloat(selectedOption.getAttribute('data-price')) || 18500;
    let downPayment = parseFloat(downSlider.value) || 0;

    if (downPayment >= totalCost) {
      downPayment = totalCost - 500;
      downSlider.value = downPayment;
    }

    downDisplay.textContent = `$${downPayment.toLocaleString()}`;
    downValueEl.textContent = `$${downPayment.toLocaleString()}`;
    totalValueEl.textContent = `$${totalCost.toLocaleString()}`;

    const financedAmount = Math.max(0, totalCost - downPayment);
    const monthlyPayment = Math.round(financedAmount / currentTermMonths);

    monthlyNumberEl.textContent = monthlyPayment.toLocaleString();
  };

  if (calcSelect) calcSelect.addEventListener('change', updateCalculator);
  if (downSlider) downSlider.addEventListener('input', updateCalculator);

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      termChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTermMonths = parseInt(chip.getAttribute('data-term'), 10) || 24;
      updateCalculator();
    });
  });

  updateCalculator();

  /* ==========================================================================
     8. CENTERED TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});