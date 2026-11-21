// Countdown to the wedding + "Add to calendar" button.
(() => {
  const target = new Date(2027, 0, 31, 10, 0, 0);          // 31 Jan 2027, 10:00 AM (guest's local time)
  const box = document.getElementById("countdown");
  if (box) {
    const el = u => box.querySelector(`[data-unit="${u}"]`);
    const left = () => Math.max(0, target - Date.now());
    const parts = ms => ({ days: Math.floor(ms / 864e5), hours: Math.floor(ms / 36e5) % 24, mins: Math.floor(ms / 6e4) % 60, secs: Math.floor(ms / 1e3) % 60 });
    const show = (p, f = 1) => Object.keys(p).forEach(u => el(u).textContent = Math.round(p[u] * f));
    const refresh = () => {
      if (Date.now() >= target) { box.outerHTML = '<p class="countdown-done">Thank you for celebrating with us</p>'; return false; }
      show(parts(left())); return true;
    };
    let started = false;
    const start = () => {
      if (started) return; started = true;
      const p = parts(left());
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { if (refresh()) setInterval(refresh, 1000); return; }
      const t0 = performance.now();                          // numbers count up once
      const tick = now => {
        const k = Math.min((now - t0) / 1500, 1), e = 1 - Math.pow(1 - k, 3);
        show(p, e);
        if (k < 1) requestAnimationFrame(tick); else if (refresh()) setInterval(refresh, 1000);
      };
      requestAnimationFrame(tick);
    };
    if (Date.now() >= target) refresh();
    else new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { start(); o.disconnect(); } }), { threshold: .4 }).observe(box);
  }

  const btn = document.getElementById("add-cal");
  if (btn) btn.addEventListener("click", () => {
    const esc = s => s.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN", "BEGIN:VEVENT",
      "UID:wedding-nihala-fazil-20270131@invitation",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]|\.\d+/g, ""),
      "DTSTART:20270131T100000", "DTEND:20270131T140000",
      "SUMMARY:" + esc("Wedding of Nihala & Fazil"),
      "LOCATION:" + esc("SB Convention Centre, RBM Arcade"),
      "DESCRIPTION:" + esc("Guest gathering 10:00 AM\nNikkah 10:30 AM\nWedding ceremony 11:30 AM\nEnd of event 2:00 PM\nMap: https://share.google/xT1fxPGbIpf49phXD"),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = "nihala-and-fazil-wedding.ics";
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });
})();