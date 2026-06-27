(function () {
  "use strict";

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const homeImages = document.querySelectorAll(".home-image");
  document.querySelectorAll("[data-preview]").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      homeImages.forEach((image) => {
        image.classList.toggle("is-active", image.dataset.panel === link.dataset.preview);
      });
    });
    link.addEventListener("focus", () => {
      homeImages.forEach((image) => {
        image.classList.toggle("is-active", image.dataset.panel === link.dataset.preview);
      });
    });
  });

  const filterButtons = document.querySelectorAll(".filter__btn");
  const cards = document.querySelectorAll(".project-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      cards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.type !== filter;
      });
    });
  });

  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const image = lightbox.querySelector(".lightbox__image");
    const caption = lightbox.querySelector(".lightbox__caption");
    const close = lightbox.querySelector(".lightbox__close");
    let lastFocused;

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        lastFocused = card;
        image.src = card.dataset.full;
        image.alt = card.dataset.title;
        caption.textContent = `${card.dataset.title} - ${card.dataset.meta}`;
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
        close.focus();
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      image.src = "assets/images/photo-01.svg";
      if (lastFocused) lastFocused.focus();
    };

    close.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = "Please complete every field.";
        return;
      }
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
      window.location.href = `mailto:hello@alisamccloy.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email app...";
      form.reset();
    });
  }
})();
