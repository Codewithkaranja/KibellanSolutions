// Highlight nav link for current page
      const navLinks = document.querySelectorAll("nav ul li a");
      navLinks.forEach((link) => {
        if (link.href === window.location.href)
          link.style.background = "rgba(255,255,255,0.2)";
      });

      // Partnership form submit
      const form = document.getElementById("partnership-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert(
          "Thank you for submitting your partnership inquiry! We will get back to you shortly."
        );
        form.reset();
      });

      // Sticky quote click
      document.querySelector(".sticky-quote").addEventListener("click", () => {
        window.location.href = "contacts.html";
      });
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector("nav ul");

      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });
      const testimonials = document.querySelectorAll(".testimonial");
      let currentTestimonial = 0;

      setInterval(() => {
        testimonials[currentTestimonial].classList.remove("active");
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add("active");
      }, 4000); // change every 4 seconds