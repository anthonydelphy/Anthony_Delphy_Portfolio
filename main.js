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
  if (darkIcon) darkIcon.innerHTML = sunPath;
  if (darkToggle) darkToggle.setAttribute('aria-label', 'Switch to dark mode');
}

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
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
