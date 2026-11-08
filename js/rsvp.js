// RSVP button: becomes a circle, expands to fill the screen, then fades in the thank-you message.
(() => {
  const btn = document.getElementById("rsvp-btn");
  if (!btn) return;
  const wait = ms => new Promise(r => setTimeout(r, ms));

  btn.addEventListener("click", async () => {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const d = r.height;                                   // diameter of the circle
    const far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const scale = (far * 2) / d + 0.1;                    // enough to cover every corner

    const bubble = document.createElement("div");
    bubble.className = "rsvp-bubble";
    Object.assign(bubble.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    document.body.append(bubble);
    document.body.classList.add("rsvp-open");
    btn.style.visibility = "hidden";                      // the bubble now stands in for the button

    await wait(30);                                       // 1) button shape -> circle, same centre
    Object.assign(bubble.style, { left: cx - d / 2 + "px", top: cy - d / 2 + "px", width: d + "px", height: d + "px", borderRadius: "50%" });
    await wait(320);

    bubble.classList.add("grow");                         // 2) expand to fill the screen
    bubble.style.transform = `scale(${scale})`;
    await wait(850);

    const thanks = document.createElement("div");         // 3) fade in the message
    thanks.className = "rsvp-thanks";
    thanks.innerHTML = '<h2>THANK YOU FOR COMING!</h2><button type="button" class="rsvp-close" aria-label="Close">&times;</button>';
    document.body.append(thanks);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {   // soft falling petals
      const box = document.createElement("div");
      box.className = "rsvp-petals";
      const colors = ["#7b011e", "#a8324f", "#f6d5da", "#fbdcc8", "#dfd6f0", "#d3ebdd"];
      for (let i = 0; i < 22; i++) {
        const p = document.createElement("i");
        p.className = "petal";
        const s = 8 + Math.random() * 10;
        p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s * 1.3}px;background:${colors[i % colors.length]};` +
          `animation-duration:${7 + Math.random() * 6}s;animation-delay:${-Math.random() * 10}s;--sway:${(Math.random() - .5) * 120}px`;
        box.append(p);
      }
      thanks.prepend(box);
    }
    thanks.offsetWidth;
    thanks.classList.add("show");

    thanks.querySelector(".rsvp-close").addEventListener("click", async () => {
      thanks.classList.remove("show");
      bubble.style.transition = "opacity .6s ease";
      bubble.style.opacity = "0";
      await wait(650);
      thanks.remove(); bubble.remove();
      btn.style.visibility = "";
      document.body.classList.remove("rsvp-open");
    });
  });
})();