// Scroll effects: ticket-strip lift, couple-photo parallax, and a plane that swoops across at the footer.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const tear = document.querySelector(".hero-bottom");
  const photo = document.querySelector(".photo-couple");
  let queued = false;
  const update = () => {
    queued = false;
    if (tear) tear.style.setProperty("--tear", Math.min(scrollY / 160, 1).toFixed(3));
    if (photo) {
      const r = photo.getBoundingClientRect();
      if (r.bottom > -150 && r.top < innerHeight + 150) {
        const off = r.top + r.height / 2 - innerHeight / 2;
        photo.style.setProperty("--py", Math.max(-32, Math.min(32, -off * 0.1)).toFixed(1) + "px");
      }
    }
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  const footer = document.querySelector(".footer");
  if (footer) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "swoop-plane");
    svg.setAttribute("viewBox", "-13 -10 26 20");
    svg.innerHTML = '<path d="M11 0C11-1.2 9-1.6 7-1.6L1-1.6-3-8-5.5-8-3.5-1.6-8-1.6-10-4.5-11.5-4.5-10.5 0-11.5 4.5-10 4.5-8 1.6-3.5 1.6-5.5 8-3 8 1 1.6 7 1.6C9 1.6 11 1.2 11 0Z"/>';
    document.body.append(svg);
    new IntersectionObserver((es, o) => es.forEach(e => {
      if (e.isIntersecting) { svg.classList.add("fly"); svg.addEventListener("animationend", () => svg.remove()); o.disconnect(); }
    }), { threshold: 0.5 }).observe(footer);
  }
})();
