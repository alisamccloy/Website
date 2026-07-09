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

  /* ---- Home: hero slideshow -------------------------------- */
  const slides = document.querySelectorAll(".hero-slideshow__slide");
  const dots = document.querySelectorAll(".hero-slideshow__dot");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length) {
    let current = [...slides].findIndex((s) => s.classList.contains("is-active"));
    if (current === -1) current = 0;
    let timer = null;

    const goTo = (index) => {
      slides[current].classList.remove("is-active");
      dots[current] && dots[current].classList.remove("is-active");
      current = index;
      const slide = slides[current];
      slide.classList.add("is-active");
      dots[current] && dots[current].classList.add("is-active");
      if (!reduceMotion) {
        slide.style.animation = "none";
        void slide.offsetHeight; // restart the Ken Burns zoom from the start
        slide.style.animation = "";
      }
    };

    const startTimer = () => {
      if (reduceMotion) return;
      timer = setInterval(() => goTo((current + 1) % slides.length), 4000);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(timer);
        goTo(i);
        startTimer();
      });
    });

    startTimer();
  }

  /* ---- Scroll-reveal: fade elements up into view ----------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
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
    const prevBtn = lb.querySelector(".lightbox__arrow--prev");
    const nextBtn = lb.querySelector(".lightbox__arrow--next");
    let lastFocused = null;
    let current = 0;

    const visibleWorks = () => [...works].filter((w) => !w.hidden);

    const show = (work) => {
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
    };

    const open = (work) => {
      lastFocused = work;
      const list = visibleWorks();
      current = list.indexOf(work);
      show(work);
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

    const step = (dir) => {
      const list = visibleWorks();
      if (!list.length) return;
      current = (current + dir + list.length) % list.length;
      show(list[current]);
    };

    works.forEach((w) => w.addEventListener("click", () => open(w)));
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }
})();
