// Scroll effect: the couple photo moves a little slower than the page (parallax).
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const photo = document.querySelector(".photo-couple");
  if (!photo) return;
  let queued = false;
  const update = () => {
    queued = false;
    const r = photo.getBoundingClientRect();
    if (r.bottom > -150 && r.top < innerHeight + 150) {
      const off = r.top + r.height / 2 - innerHeight / 2;
      photo.style.setProperty("--py", Math.max(-48, Math.min(48, -off * 0.18)).toFixed(1) + "px");
    }
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();