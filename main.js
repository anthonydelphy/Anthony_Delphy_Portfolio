/*==== MOUSE-FOLLOW GRADIENT ====*/
const gradientEl = document.getElementById('gradient');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let tx = window.innerWidth / 2;
let ty = window.innerHeight / 2;
let gradientAngle = 0;
let hasMouse = false;

if (gradientEl) {
  gradientEl.style.left = mx + 'px';
  gradientEl.style.top  = my + 'px';

  document.addEventListener('mousemove', (e) => {
    hasMouse = true;
    tx = e.clientX;
    ty = e.clientY;
  });

  window.addEventListener('resize', () => {
    if (!hasMouse) {
      tx = window.innerWidth / 2;
      ty = window.innerHeight / 2;
      mx = tx; my = ty;
    }
  });

  (function animateGradient() {
    mx += (tx - mx) * 0.13;
    my += (ty - my) * 0.13;
    gradientAngle -= 0.25;
    gradientEl.style.left      = mx + 'px';
    gradientEl.style.top       = my + 'px';
    gradientEl.style.transform = `translate(-50%, -50%) rotate(${gradientAngle}deg)`;
    requestAnimationFrame(animateGradient);
  })();
}

/*==== DARK / LIGHT MODE TOGGLE ====*/
const darkToggle = document.getElementById('dark-toggle');
const darkIcon   = document.getElementById('dark-icon');

const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const sunPath  = `
  <circle cx="12" cy="12" r="4"/>
  <line x1="12" y1="2"  x2="12" y2="5"/>
  <line x1="12" y1="19" x2="12" y2="22"/>
  <line x1="2"  y1="12" x2="5"  y2="12"/>
  <line x1="19" y1="12" x2="22" y2="12"/>
  <line x1="4.5"  y1="4.5"  x2="6.6"  y2="6.6"/>
  <line x1="17.4" y1="17.4" x2="19.5" y2="19.5"/>
  <line x1="4.5"  y1="19.5" x2="6.6"  y2="17.4"/>
  <line x1="17.4" y1="6.6"  x2="19.5" y2="4.5"/>
`;

// Restore saved mode before first paint
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.documentElement.classList.add('light');
  if (darkIcon) darkIcon.innerHTML = sunPath;
  if (darkToggle) darkToggle.setAttribute('aria-label', 'Switch to dark mode');
}

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.documentElement.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    darkIcon.innerHTML = isLight ? sunPath : moonPath;
    darkToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/*==== HOME PROFILE PARALLAX ====*/
const homeProfile = document.querySelector('.home_profile');
if (homeProfile) {
  window.addEventListener('scroll', () => {
    homeProfile.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, { passive: true });
}

/*==== SHOW MENU ====*/
const navMenu =  document.getElementById('nav-menu');


/*==== PROFILE PICTURE TILT ====*/
(function () {
  const image = document.querySelector('.about_image');
  if (!image) return;

  const MAX_TILT = 18; // degrees
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let rafId = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);
    image.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
      rafId = requestAnimationFrame(animate);
    } else {
      image.style.transform = `rotateY(${targetX}deg) rotateX(${targetY}deg)`;
      rafId = null;
    }
  }

  function startAnimate() {
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    targetX = dx * MAX_TILT;
    targetY = -dy * MAX_TILT;
    startAnimate();
  });

  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    startAnimate();
  });
})();

/*==== PROJECT FILTER ====*/
(function () {
  const pills = document.querySelectorAll('.filter_pill');
  const cards = document.querySelectorAll('.project_cont[data-categories]');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.categories.split(' ').includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/*==== TYPEWRITER EFFECT ====*/
(function () {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Contribute to Open Source Projects.',
    'Create Virtual-Reality Experiences.',
    'Facilitate Change from Data Insights.',
    'Create Good Looking Websites.',
    'Improve Brand Standards.',
    'Create Political Impact.',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED   = 100;  // ms per character while typing
  const DELETE_SPEED = 55;   // ms per character while deleting
  const PAUSE_END    = 2400; // ms to pause at full phrase
  const PAUSE_START  = 500;  // ms to pause before typing next phrase

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  setTimeout(tick, 800);
})();

/*==== CONTACT FORM STATUS ====*/
const params = new URLSearchParams(window.location.search);
if (params.get('status') === 'sent') {
  const form = document.querySelector('.contact_form');
  if (form) {
    form.innerHTML = '<p class="contact_form_success">Message sent! I\'ll be in touch soon.</p>';
  }
} else if (params.get('status') === 'error') {
  const form = document.querySelector('.contact_form');
  if (form) {
    const msg = document.createElement('p');
    msg.className = 'contact_form_error';
    msg.textContent = 'Something went wrong — please check all fields and try again.';
    form.prepend(msg);
  }
}

const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinkAbout = document.getElementById('nav_link_about');

 /*==== SHOW MENU ====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add("show-menu");
    })
}

  /*==== CLOSE MENU ====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove("show-menu");
    })
    navLinkAbout.addEventListener('click', () =>{
        navMenu.classList.remove("show-menu");
    })
}


/*==== EXPERIENCE TABS ====*/
const experienceTabs = document.querySelectorAll('.experience_tab');
const experiencePanels = document.querySelectorAll('.experience_panel');

experienceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        experienceTabs.forEach(t => {
            const isActive = t === tab;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        experiencePanels.forEach(panel => {
            const isActive = panel.getAttribute('data-panel') === target;
            panel.classList.toggle('active', isActive);
            if (isActive) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
    });
});
