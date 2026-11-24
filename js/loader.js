// Loading screen. When the page has loaded (and ~2 seconds have passed) it shows "Tap to open".
// That tap lets the browser start the music (browsers will not play sound until the guest touches the page).
// If there is no music file, it opens by itself instead.
(() => {
  const loader = document.getElementById("loader");
  const root = document.documentElement;
  const audio = document.getElementById("bg-music");
  const start = performance.now();
  let noMusic = !audio, opened = false, ready = false;

  if (audio) audio.addEventListener("error", () => { noMusic = true; if (ready) open(); });

  function playMusic() {                             // must run inside the tap for the browser to allow sound
    if (!audio || noMusic) return;
    audio.muted = false;
    audio.volume = 0.6;
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
  }
  function open() {
    if (opened) return;
    opened = true;
    root.classList.add("is-loaded");                 // starts the hero animations
    if (loader) { loader.classList.add("hide"); setTimeout(() => loader.remove(), 900); }
  }
  function showGate() {
    if (ready) return;
    ready = true;
    if (!loader || noMusic) return open();
    loader.classList.add("ready");
    loader.addEventListener("click", () => { playMusic(); open(); });   // the tap itself starts the song
  }
  const wait = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : Math.max(0, 2000 - (performance.now() - start));
  const go = () => setTimeout(showGate, wait);
  if (document.readyState === "complete") go(); else addEventListener("load", go);
  setTimeout(showGate, 7000);                        // safety: never get stuck on the spinner
})();