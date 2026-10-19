// Fade-in on scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const checkVisibility = () => {
    const triggerHeight = window.innerHeight / 1.4;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerHeight) section.classList.add("visible");
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

// Initialize particles
particlesJS('particles-js', {
  particles: {
    number: { value: 70, density: { enable: true, value_area: 400 } },
    color: { value: "#a5f3fc" },
    shape: { type: "circle", stroke: { width: 1, color: "#22d3ee" } },
    opacity: { value: 0.28 },
    size: { value: 1, random: true },
    line_linked: { enable: true, distance: 90, color: "#67e8f9", opacity: 0.24, width: 1 }
  },
  retina_detect: true
});
