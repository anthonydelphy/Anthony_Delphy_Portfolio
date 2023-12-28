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


  
  