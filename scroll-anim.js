document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.slide-in, .slide-in-left, .slide-in-right, .fade-in, .scale-in'
  );

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If reduced motion is preferred, make all elements visible immediately
    animatedElements.forEach(el => el.classList.add('visible'));
    return;
  }

  // Create intersection observer with optimized settings
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');

          // Optional: Stop observing this element after it's animated
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
    }
  );

  // Observe all animated elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Optional: Add parallax-like effect for hero sections
  const heroElements = document.querySelectorAll('.hero-parallax');

  if (heroElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      heroElements.forEach(el => {
        el.style.transform = `translateY(${rate}px)`;
      });
    });
  }
});

// Optional: Add a function to manually trigger animations
function triggerAnimation(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.add('visible');
  });
}