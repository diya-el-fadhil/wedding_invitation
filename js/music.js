// Background music: tries to start as soon as the page opens. Browsers often block sound until the guest
// touches the page, so if it is blocked it starts on the first tap/click/key press anywhere.
// The round button mutes / unmutes. It is hidden if audio/music.mp3 cannot be loaded.
(() => {
  const audio = document.getElementById("bg-music"), btn = document.getElementById("music-btn");
  if (!audio || !btn) return;
  audio.volume = 0.6;
  let wanted = true, resume = false;               // wanted = the guest has not muted it
  const set = on => { btn.classList.toggle("playing", on); btn.setAttribute("aria-pressed", on); btn.setAttribute("aria-label", on ? "Mute music" : "Play music"); };
  const events = ["pointerup", "touchend", "click", "keydown"];
  const stopWaiting = () => events.forEach(e => removeEventListener(e, onGesture, true));
  const start = () => audio.play().then(() => { set(true); stopWaiting(); }).catch(() => set(false));
  function onGesture(e) { if (btn.contains(e.target)) return; if (wanted && audio.paused) start(); }

  events.forEach(e => addEventListener(e, onGesture, true));
  audio.addEventListener("error", () => { btn.hidden = true; stopWaiting(); });
  audio.addEventListener("ended", () => set(false));
  audio.addEventListener("play", () => set(true));          // keep the button in step with what is really playing
  audio.addEventListener("pause", () => set(false));
  btn.addEventListener("click", () => {
    if (audio.paused) { wanted = true; start(); }
    else { wanted = false; audio.pause(); set(false); stopWaiting(); }
  });
  document.addEventListener("visibilitychange", () => {   // pause when the guest switches app or tab
    if (document.hidden && !audio.paused) { audio.pause(); resume = true; set(false); }
    else if (!document.hidden && resume && wanted) { resume = false; start(); }
  });
  start();                                                 // try straight away
})();