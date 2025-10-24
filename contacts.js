// Hamburger Menu
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector("nav ul");
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });

      // Highlight Active Nav Link
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        if (link.href === window.location.href) link.classList.add("active");
      });

      // Contact Form Submit
      const form = document.getElementById("contact-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert(
          "Thank you! Your message has been sent. We will get back to you shortly."
        );
        form.reset();
      });

      // Sticky Quote Button Click
      document.querySelector(".sticky-quote").addEventListener("click", () => {
        window.location.href = "contacts.html";
      });