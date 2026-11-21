// Music button: plays only when tapped (browsers block autoplay). Hidden if audio/music.mp3 is missing.
(() => {
  const audio = document.getElementById("bg-music"), btn = document.getElementById("music-btn");
  if (!audio || !btn) return;
  audio.volume = 0.6;
  audio.addEventListener("loadedmetadata", () => { btn.hidden = false; });
  audio.addEventListener("error", () => { btn.hidden = true; });
  if (audio.readyState >= 1) btn.hidden = false;
  const set = on => { btn.classList.toggle("playing", on); btn.setAttribute("aria-pressed", on); btn.setAttribute("aria-label", on ? "Mute music" : "Play music"); };
  btn.addEventListener("click", () => {
    if (audio.paused) audio.play().then(() => set(true)).catch(() => set(false));
    else { audio.pause(); set(false); }
  });
})();
