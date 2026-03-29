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
    color: { value: "#99ffcc" },
    shape: { type: "circle", stroke: { width: 2, color: "#00ff80" } },
    opacity: { value: 0.4 },
    size: { value: 1, random: true },
    line_linked: { enable: true, distance: 90, color: "#ffff00", opacity: 0.4, width: 3 }
  },
  retina_detect: true
});