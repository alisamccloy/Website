/* ============================================================
   FILM PORTFOLIO — main.js  (vanilla JS, no dependencies)
   ============================================================ */
(function () {
  "use strict";

  /* ---- Nav: fade background in on scroll ------------------ */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Nav: mobile toggle --------------------------------- */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest(".nav__link")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Nav-hover background crossfade ---------------------- *
   * Hovering or focusing a nav link fades in that section's
   * image. Pointer-capable devices only (mobile = static).    */
  const stage = document.querySelector(".bg-stage");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (stage && canHover) {
    const layers = {
      home: stage.querySelector(".layer--home"),
      about: stage.querySelector(".layer--about"),
      portfolio: stage.querySelector(".layer--portfolio"),
      contact: stage.querySelector(".layer--contact"),
    };
    const current = stage.dataset.section; // page we're on; its layer is the resting state
    const setActive = (key) => {
      Object.entries(layers).forEach(([k, el]) => {
        if (!el) return;
        el.classList.toggle("is-active", k === key);
      });
    };
    const reset = () => setActive(current);
    reset();

    document.querySelectorAll(".nav__link[data-bg]").forEach((link) => {
      const key = link.dataset.bg;
      link.addEventListener("mouseenter", () => setActive(key));
      link.addEventListener("mouseleave", reset);
      link.addEventListener("focus", () => setActive(key));
      link.addEventListener("blur", reset);
    });
  }

  /* ---- Portfolio: filter Photography / Film --------------- */
  const filterBtns = document.querySelectorAll(".filter__btn");
  const works = document.querySelectorAll(".work");
  if (filterBtns.length && works.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        works.forEach((w) => {
          const show = f === "all" || w.dataset.type === f;
          w.hidden = !show;
        });
      });
    });
  }

  /* ---- Portfolio: lightbox (photos) + modal (film) -------- */
  const lb = document.querySelector(".lightbox");
  if (lb) {
    const stageEl = lb.querySelector(".lightbox__stage");
    const cap = lb.querySelector(".lightbox__cap");
    const closeBtn = lb.querySelector(".lightbox__close");
    let lastFocused = null;

    const open = (work) => {
      lastFocused = work;
      const title = work.dataset.title || "";
      const meta = work.dataset.meta || "";
      cap.textContent = meta ? `${title} — ${meta}` : title;

      if (work.dataset.type === "film" && work.dataset.embed) {
        stageEl.innerHTML =
          `<div class="lightbox__frame"><iframe src="${work.dataset.embed}" ` +
          `title="${title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
      } else {
        const src = work.dataset.full || work.querySelector("img")?.src || "";
        stageEl.innerHTML = `<img src="${src}" alt="${title}">`;
      }
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const close = () => {
      lb.classList.remove("is-open");
      stageEl.innerHTML = ""; // stop any playing video
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    works.forEach((w) => w.addEventListener("click", () => open(w)));
    closeBtn.addEventListener("click", close);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("is-open")) close();
    });
  }
})();
