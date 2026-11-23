const cards = [...document.querySelectorAll('.card-spring')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const state = cards.map((_, index) => ({ position: 0, velocity: 0, strength: 0.08 + index * 0.015 }));
let lastScroll = window.scrollY;
let frame;

function animate() {
  let moving = false;

  cards.forEach((card, index) => {
    const item = state[index];
    item.velocity = (item.velocity - item.position * item.strength) * 0.8;
    item.position += item.velocity;
    if (Math.abs(item.position) > 0.05 || Math.abs(item.velocity) > 0.05) moving = true;
    card.style.transform = `translateY(${item.position}px)`;
  });

  frame = moving ? requestAnimationFrame(animate) : null;

  if (!moving) cards.forEach(card => { card.style.transform = ''; });
}

window.addEventListener('scroll', () => {

  const delta = Math.max(-25, Math.min(25, window.scrollY - lastScroll));
  lastScroll = window.scrollY;

  if (reducedMotion.matches) return;

  state.forEach((item, index) => { item.velocity -= delta * (0.025 + index * 0.006); });

  if (!frame) frame = requestAnimationFrame(animate);
}, { passive: true });

reducedMotion.addEventListener('change', () => {

  if (reducedMotion.matches) {
    cancelAnimationFrame(frame);

    frame = null;
    state.forEach(item => { item.position = 0; item.velocity = 0; });
    cards.forEach(card => { card.style.transform = ''; });
  }
});
