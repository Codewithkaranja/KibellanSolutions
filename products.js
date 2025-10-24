/* ====== Utilities & initial state ====== */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const WA_NUMBER = "254704498509"; // client's WhatsApp number

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ====== Mobile nav (hamburger) ====== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () =>
      navLinks.classList.toggle("active")
    );
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter") navLinks.classList.toggle("active");
    });
  }

  /* ====== Category filter ====== */
  const categoryBtns = document.querySelectorAll(".category-btn");
  const productCards = document.querySelectorAll(".product-card");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const prev = document.querySelector(".category-btn.active");
      if (prev) prev.classList.remove("active");
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      productCards.forEach((card) => {
        card.style.display =
          category === "all" || card.dataset.category === category
            ? "block"
            : "none";
      });
    });
  });

  /* ====== Modal logic ====== */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const modalWhats = document.getElementById("modalWhats");
  const modalClose = document.getElementById("modalClose");
  const modalQuoteInline = document.getElementById("modalQuoteInline");

  function openModalFromCard(card) {
    if (!modal) return;

    const name =
      card.dataset.name || card.querySelector("h3")?.innerText || "Product";
    const desc =
      card.dataset.desc || card.querySelector("p")?.innerText || "";
    const price = card.dataset.price || "";
    const img =
      card.dataset.img ||
      card.querySelector("img")?.src ||
      "https://source.unsplash.com/800x600/?medical";

    if (modalImg) {
      modalImg.src = img;
      modalImg.alt = name;
    }
    if (modalTitle) modalTitle.textContent = name;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalPrice) modalPrice.textContent = price;

    if (modalWhats) {
      modalWhats.onclick = () => {
        const msg = encodeURIComponent(
          `Hello Kibellan Universal Solutions, I’d like a quote for: ${name} (${price}).`
        );
        window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
      };
    }

    if (modalQuoteInline) {
  modalQuoteInline.onclick = () => {
    // Redirect to PayWithMe page
    window.location.href = "https://codewithkaranja.github.io/kibellan-Pay/";
  };
}


    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  productCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const isBtn = e.target.closest(".btn-quote");
      if (isBtn) {
        e.stopPropagation();
        openModalFromCard(card);
        return;
      }
      openModalFromCard(card);
    });
  });

  if (modal && modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  /* ====== Sticky quote opens general WA chat ====== */
  const stickyQuote = document.getElementById("stickyQuote");
  if (stickyQuote) {
    stickyQuote.addEventListener("click", () => {
      const msg = encodeURIComponent(
        "Hello Kibellan Universal Solutions, I would like a general quote / inquiry."
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    });
  }

  /* ====== Newsletter subscribe ====== */
  document.querySelectorAll(".newsletter button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      const val = input?.value?.trim();
      if (!val) {
        alert("Please enter your email address.");
        return;
      }
      alert("Thanks — subscribed: " + val);
      input.value = "";
    });
  });

  /* ====== Accessibility ====== */
  productCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModalFromCard(card);
    });
  });

  /* ====== Search filter ====== */
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const query = searchInput.value.toLowerCase();
      productCards.forEach((card) => {
        const name = (card.dataset.name || "").toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
      });
    });
  }

  /* ====== Product slider ====== */
  const slider = document.querySelector(".products-grid.slider");
  if (slider) {
    const cards = slider.querySelectorAll(".product-card");
    if (cards.length) {
      const cardWidth = cards[0].offsetWidth + 16;

      // Swipe / drag support
      let isDown = false, startX, scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("dragging");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener("mouseleave", () => (isDown = false));
      slider.addEventListener("mouseup", () => (isDown = false));
      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
      });

      // Auto-scroll
      let autoScrollInterval;
      function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
          slider.scrollBy({ left: cardWidth, behavior: "smooth" });
        }, 3000);
      }
      function stopAutoScroll() {
        clearInterval(autoScrollInterval);
      }
      slider.addEventListener("mouseenter", stopAutoScroll);
      slider.addEventListener("mouseleave", startAutoScroll);
      startAutoScroll();
    }
  }
});
