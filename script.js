/**
 * LUMINA DENTAL & IMPLANT STUDIO — BEVERLY HILLS ATELIER EDITION
 * Flagship Agency Interaction Engine:
 * 1. Beverly Hills Scroll-Reveal Animation Engine (Intersection Observer)
 * 2. Navbar Dynamic Glass Blur
 * 3. Before & After Macro Dental Slider (Mouse + Touch)
 * 4. Slide-Over VIP Booking Drawer
 * 5. Interactive Smile Investment & Financing Calculator
 * 6. Mobile Drawer & Toast Dispatcher
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
          observer.unobserve(entry.target); // Animate once cleanly
        }
      });
    }, {
      root: null,
      threshold: 0.12, // Triggers slightly before element enters view
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      // Add slight staggered delay to adjacent elements for liquid flow
      const delay = (index % 3) * 0.1;
      el.style.transitionDelay = `${delay}s`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     2. NAVBAR GLASS BLUR ON SCROLL
     ========================================================================== */
  const mainHeader = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
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
     4. BEFORE & AFTER GENUINE DENTAL MACRO SLIDER (MOUSE + TOUCH)
     ========================================================================== */
  const sliderContainer = document.getElementById('baSliderContainer');
  const beforeWrapper = document.getElementById('baBeforeWrapper');
  const handle = document.getElementById('baHandle');

  if (sliderContainer && beforeWrapper && handle) {
    let isSliding = false;

    const setSliderPosition = (xPos) => {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      
      // Clamp values between 0 and container width
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      
      beforeWrapper.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
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

    // Mobile / Tablet Touch Drag Events
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
     5. SLIDE-OVER VIP BOOKING MODAL DRAWER
     ========================================================================== */
  const vipDrawer = document.getElementById('vipBookingDrawer');
  const vipOverlay = document.getElementById('vipDrawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const openDrawerButtons = document.querySelectorAll('.open-booking-drawer');

  const openDrawer = () => {
    if (vipDrawer && vipOverlay) {
      vipOverlay.classList.add('active');
      vipDrawer.classList.add('open');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
  };

  const closeDrawer = () => {
    if (vipDrawer && vipOverlay) {
      vipOverlay.classList.remove('active');
      vipDrawer.classList.remove('open');
      document.body.style.overflow = ''; // Re-enable background scrolling
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

  // Pre-fill tomorrow as default booking date
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

  // Time slot chips selection
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

  // Step 1 -> Step 2
  if (dBtnToStep2) {
    dBtnToStep2.addEventListener('click', () => {
      dStep1.classList.remove('active');
      dStep2.classList.add('active');
      dInd1.classList.remove('active');
      dInd2.classList.add('active');
    });
  }

  // Step 2 -> Step 1
  if (dBtnBackToStep1) {
    dBtnBackToStep1.addEventListener('click', () => {
      dStep2.classList.remove('active');
      dStep1.classList.add('active');
      dInd2.classList.remove('active');
      dInd1.classList.add('active');
    });
  }

  // Step 2 -> Step 3
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

  // Step 3 -> Step 2
  if (dBtnBackToStep2) {
    dBtnBackToStep2.addEventListener('click', () => {
      dStep3.classList.remove('active');
      dStep2.classList.add('active');
      dInd3.classList.remove('active');
      dInd2.classList.add('active');
    });
  }

  // Final Submission inside Drawer
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

      // Update Confirmation Screen
      const nameEl = document.getElementById('dConfirmedName');
      const treatEl = document.getElementById('dReceiptTreatment');
      const dateEl = document.getElementById('dReceiptDate');

      if (nameEl) nameEl.textContent = `${fName} ${lName}`;
      if (treatEl) treatEl.textContent = treatmentVal;
      if (dateEl) dateEl.textContent = `${dateVal} (${timeVal})`;

      // Switch to success view
      dStep3.classList.remove('active');
      dStepSuccess.classList.add('active');
      dInd3.classList.add('active');

      showToast(`VIP Suite Reserved for ${fName}! SMS dispatched.`);
    });
  }

  // Reset Drawer Wizard
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
     6. INTERACTIVE SMILE INVESTMENT & FINANCING CALCULATOR
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

    // Cap down payment if higher than total cost
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

  // Initial Calculation Run
  updateCalculator();

  /* ==========================================================================
     7. TOAST NOTIFICATION HELPER
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