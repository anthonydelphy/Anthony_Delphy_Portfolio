// Mouse-follow gradient with counter-clockwise rotation
const gradient = document.getElementById('gradient');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let tx = window.innerWidth / 2;
let ty = window.innerHeight / 2;
let angle = 0;
let hasMouse = false;

gradient.style.left = mx + 'px';
gradient.style.top = my + 'px';

document.addEventListener('mousemove', (e) => {
  hasMouse = true;
  tx = e.clientX;
  ty = e.clientY;
});

window.addEventListener('resize', () => {
  if (!hasMouse) {
    tx = window.innerWidth / 2;
    ty = window.innerHeight / 2;
    mx = tx;
    my = ty;
  }
});

function animate() {
  // Ease current position toward target for smooth fly-over
  mx += (tx - mx) * 0.13;
  my += (ty - my) * 0.13;
  angle -= 0.25;
  gradient.style.left = mx + 'px';
  gradient.style.top = my + 'px';
  gradient.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  requestAnimationFrame(animate);
}
animate();

// Dark / Light mode toggle
const toggle = document.getElementById('toggle');
const tooltip = document.getElementById('tooltip');
const icon = document.getElementById('icon');

const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const sunPath = `
  <circle cx="12" cy="12" r="4"/>
  <line x1="12" y1="2" x2="12" y2="5"/>
  <line x1="12" y1="19" x2="12" y2="22"/>
  <line x1="2" y1="12" x2="5" y2="12"/>
  <line x1="19" y1="12" x2="22" y2="12"/>
  <line x1="4.5" y1="4.5" x2="6.6" y2="6.6"/>
  <line x1="17.4" y1="17.4" x2="19.5" y2="19.5"/>
  <line x1="4.5" y1="19.5" x2="6.6" y2="17.4"/>
  <line x1="17.4" y1="6.6" x2="19.5" y2="4.5"/>
`;

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  tooltip.textContent = isLight ? 'Enable Dark Mode' : 'Disable Dark Mode';
  icon.innerHTML = isLight ? sunPath : moonPath;
});
