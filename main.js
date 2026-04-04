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
        experienceTabs.forEach(t => t.classList.remove('experience_tab--active'));
        experiencePanels.forEach(p => p.classList.remove('experience_panel--active'));

        tab.classList.add('experience_tab--active');
        document.querySelector(`.experience_panel[data-panel="${tab.dataset.tab}"]`)
            .classList.add('experience_panel--active');
    });
});

  