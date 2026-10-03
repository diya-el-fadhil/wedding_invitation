// Reveals sections once as they scroll into view.
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
