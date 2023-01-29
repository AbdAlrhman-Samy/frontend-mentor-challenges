window.addEventListener("load", ()=>{
    const body = document.documentElement.style.height = window.innerHeight
})

const checkBtns = document.querySelectorAll(".todo__check-button")
console.log(checkBtns);

Array.from(checkBtns).forEach(btn => {
    btn.addEventListener("click", (e)=>{
        e.target.classList.toggle("todo__check-button--checked")
        e.target.parentElement.classList.toggle("todo__item--checked")
    })
})

// Theme Handler
let theme;

const checkTheme = () => {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    let savedTheme = localStorage.getItem("theme")
    if(savedTheme){
        document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
        if(prefersDarkTheme) {
            localStorage.setItem("theme", "dark")
            theme = "dark"
        }

        else{
            localStorage.setItem("theme", "light")
            theme = "light"
        }  
        
        document.documentElement.setAttribute("data-theme", theme)

    }
}

const toggleTheme = () => {
    theme = theme==="dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", document.documentElement.getAttribute("data-theme"))
}

checkTheme()