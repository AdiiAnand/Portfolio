const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 70);
      });
      const id = entry.target.id;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.18 });
sections.forEach(section => observer.observe(section));

const typed = document.getElementById('typed-text');
const words = ['Java', 'JavaScript', 'Python', 'Web Development', 'Problem Solving'];
let wi = 0, ci = 0, deleting = false;

function typeLoop() {
  const word = words[wi];
  typed.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 55 : 90;
  if (!deleting && ci > word.length) { deleting = true; delay = 1300; }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; delay = 350; }
  setTimeout(typeLoop, delay);
}
typeLoop();

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.animate(
    { left: `${e.clientX}px`, top: `${e.clientY}px` },
    { duration: 500, fill: 'forwards' }
  );
});
