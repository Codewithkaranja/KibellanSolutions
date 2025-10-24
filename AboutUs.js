 // Mobile nav toggle
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      // Smooth scroll for "Request a Quote" button
      document
        .getElementById("quote-btn")
        .addEventListener("click", function () {
          location.href = "contacts.html";
        });

      // Newsletter subscribe button
      document
        .getElementById("subscribe-btn")
        .addEventListener("click", function () {
          const email = document.getElementById("newsletter-email").value;
          if (email.trim() === "") {
            alert("Please enter your email address.");
          } else {
            alert("Thank you for subscribing, " + email + "!");
            document.getElementById("newsletter-email").value = "";
          }
        });