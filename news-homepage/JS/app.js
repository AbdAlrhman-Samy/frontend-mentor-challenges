const menuBtn = document.querySelector(".navbar__menu-button");
// const menuCloseBtn = document.querySelector(".navbar__menu-close-button");
const menu = document.querySelector(".navbar__links");

let isMenuOpen = false;

menuBtn.addEventListener("click", ()=>{

    //if the menu is closed and open button is pressed, open menu and change button to close icon
    if (!isMenuOpen) {
        menuBtn.classList.remove("navbar__menu-button--open")
        menuBtn.classList.add("navbar__menu-button--closed")
        menu.style.right = "0px"
        isMenuOpen = true
    }

    //if the menu is open and close button is pressed, close menu and change button back to hamburger icon
    else if(isMenuOpen) { 
        menuBtn.classList.add("navbar__menu-button--open")
        menuBtn.classList.remove("navbar__menu-button--closed")
        menu.style.right = "-1000px"
        isMenuOpen = false
    }

})
