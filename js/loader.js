// Hides the loading screen once the page has loaded (shown for at least ~2 seconds).
(() => {
  const loader = document.getElementById("loader");
  const root = document.documentElement;
  const start = performance.now();
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    root.classList.add("is-loaded");                 // starts the hero animations
    if (loader) { loader.classList.add("hide"); setTimeout(() => loader.remove(), 900); }
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const go = () => setTimeout(finish, reduce ? 0 : Math.max(0, 2000 - (performance.now() - start)));
  if (document.readyState === "complete") go(); else addEventListener("load", go);
  setTimeout(finish, 7000);                          // safety: never get stuck
})();
