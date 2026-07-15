const intro = document.getElementById('page-intro');
const elements = document.querySelectorAll('.fade-in');

const revealContent = () => {
  document.body.classList.add('content-ready');

  elements.forEach((element, index) => {
    const baseDelay = Number(element.dataset.delay || 0);
    const totalDelay = baseDelay;

    element.style.transitionDelay = `${totalDelay}ms`;
    element.classList.add('visible');
  });
};

if (intro) {
  intro.addEventListener('click', () => {
    intro.classList.add('hidden');
    setTimeout(revealContent, 450);
  });
} else {
  revealContent();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const delay = target.dataset.delay || 0;

      target.style.transitionDelay = `${delay}ms`;
      target.classList.add('visible');
      observer.unobserve(target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

elements.forEach((element) => observer.observe(element));
