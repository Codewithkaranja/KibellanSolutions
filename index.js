document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Mobile Viewport Height Fix - CRITICAL FIX
  // =====================
  function fixViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Apply to hero section immediately
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.height = window.innerHeight + 'px';
      hero.style.minHeight = window.innerHeight + 'px';
    }
    
    console.log('Viewport height fixed:', window.innerHeight, 'px');
  }

  // Initialize viewport height immediately
  fixViewportHeight();

  // Fix on all relevant events
  window.addEventListener('load', fixViewportHeight);
  window.addEventListener('resize', fixViewportHeight);
  window.addEventListener('orientationchange', function() {
    setTimeout(fixViewportHeight, 150);
  });

  // Fix after any user interaction
  document.addEventListener('touchstart', fixViewportHeight);
  document.addEventListener('click', fixViewportHeight);

  // Additional safety timeout
  setTimeout(fixViewportHeight, 500);

  // =====================
  // Mobile Menu
  // =====================
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
      document.body.classList.toggle("menu-open");
      
      // Fix viewport when menu opens/closes
      setTimeout(fixViewportHeight, 100);
    });

    // Close when clicking nav links
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        document.body.classList.remove("menu-open");
        fixViewportHeight(); // Fix viewport after menu close
      })
    );

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest("nav") && !e.target.closest(".mobile-menu-btn")) {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  // =====================
  // Header scroll effect
  // =====================
  const header = document.getElementById("header");
  if (header) {
    function handleHeaderScroll() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleHeaderScroll();
          scrollTimeout = null;
        }, 10);
      }
    });
    
    // Initial check
    handleHeaderScroll();
  }

  // =====================
  // Hero Animation
  // =====================
  const heroAnimation = document.getElementById("hero-animation");
  if (heroAnimation) {
    // Wait for viewport to be stable before creating animations
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        const element = document.createElement("div");
        element.classList.add("floating-element");

        const size = Math.random() * 30 + 10;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;

        const duration = Math.random() * 20 + 10;
        element.style.animation = `float ${duration}s infinite ease-in-out`;
        element.style.animationDelay = `${Math.random() * 5}s`;

        heroAnimation.appendChild(element);
      }

      for (let i = 0; i < 5; i++) {
        const pulse = document.createElement("div");
        pulse.classList.add("pulse-element");

        const size = Math.random() * 100 + 50;
        pulse.style.width = `${size}px`;
        pulse.style.height = `${size}px`;
        pulse.style.left = `${Math.random() * 100}%`;
        pulse.style.top = `${Math.random() * 100}%`;

        const duration = Math.random() * 5 + 3;
        pulse.style.animation = `pulse ${duration}s infinite ease-in-out`;
        pulse.style.animationDelay = `${Math.random() * 2}s`;

        heroAnimation.appendChild(pulse);
      }
    }, 300); // Delay animation creation for better mobile performance
  }

  // =====================
  // Hero Background Slider
  // =====================
  const hero = document.querySelector(".hero");
  const heroImages = [
    "https://plus.unsplash.com/premium_photo-1672759455911-d51421fe442c?w=1200&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1690787628851-d36e285c29b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMwfHxoZWFsdGhjYXJlJTIwYW5kJTIwbWVkaWNpbmUlMjAzRHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    "https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxoZWFsdGhjYXJlJTIwYW5kJTIwbWVkaWNpbmUlMjAzRHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"
  ];

  let currentImageIndex = 0;
  let backgroundSlider;

  if (hero) {
    // Preload images for better performance
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    function changeBackground() {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      hero.style.setProperty("--hero-bg", `url(${heroImages[currentImageIndex]})`);
      
      // Fix viewport after background change (for mobile stability)
      setTimeout(fixViewportHeight, 50);
    }

    // Start slider only after page is fully loaded and stable
    window.addEventListener('load', () => {
      setTimeout(() => {
        backgroundSlider = setInterval(changeBackground, 3000);
      }, 1000);
    });

    // Pause slider when page is not visible (for mobile performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(backgroundSlider);
      } else {
        backgroundSlider = setInterval(changeBackground, 3000);
      }
    });
  }

  // =====================
  // Testimonial Slider
  // =====================
  if (typeof Swiper !== "undefined") {
    // Initialize Swiper only when needed and after viewport is stable
    setTimeout(() => {
      new Swiper(".testimonial-slider", {
        loop: true,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          init: function() {
            fixViewportHeight(); // Fix viewport after slider init
          }
        }
      });
    }, 500);
  }

  // =====================
  // Counters Animation
  // =====================
  function animateCounter(elementId, finalValue, duration, suffix = "+") {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startValue = 0;
    const increment = Math.ceil(finalValue / (duration / 16));
    let currentValue = startValue;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        clearInterval(timer);
        currentValue = finalValue;
      }
      element.textContent = currentValue + suffix;
    }, 16);
  }

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Fix viewport before starting animations
            fixViewportHeight();
            
            setTimeout(() => {
              animateCounter("counter-1", 50, 2000, "+");
              animateCounter("counter-2", 250, 2000, "+");
              animateCounter("counter-3", 500, 2000, "+");
              animateCounter("counter-4", 100, 2000, "%");
            }, 200);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.4,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly earlier
      }
    );
    observer.observe(statsSection);
  }

  // =====================
  // Product category filtering
  // =====================
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      console.log(`Filtering by: ${this.textContent}`);
    });
  });

  // =====================
  // Add to Cart / Quote
  // =====================
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-file-alt"></i> Quote';
      }, 2000);
    });
  });

  // =====================
  // Page Switcher
  // =====================
  function showPage(pageId) {
    document.querySelectorAll(".page-content").forEach((page) => {
      page.style.display = "none";
    });
    document.getElementById(pageId).style.display = "block";
    window.scrollTo(0, 0);
    
    // Fix viewport after page switch (important for mobile)
    setTimeout(fixViewportHeight, 100);
  }
  window.showPage = showPage;

  // =====================
  // Form Submission
  // =====================
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Thank you for your submission! In a real application, this would send your data to our server."
      );
      this.reset();
    });
  });

  // =====================
  // Additional Mobile Optimizations
  // =====================
  
  // Prevent zoom on double-tap (iOS)
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Force redraw on mobile for stability
  function forceRedraw() {
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  }

  // Initial redraw after everything loads
  window.addEventListener('load', () => {
    setTimeout(forceRedraw, 100);
    setTimeout(fixViewportHeight, 200);
  });

  console.log('Kibellan Universal Solutions - JavaScript initialized with mobile optimizations');
});