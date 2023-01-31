let theme;

(function() {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    let savedTheme = localStorage.getItem("theme")
    if(savedTheme){
        theme = savedTheme
    } else {
        if(prefersDarkTheme) {
            localStorage.setItem("theme", "dark")
            theme = "dark"
        }

        else{
            localStorage.setItem("theme", "light")
            theme = "light"
        }  
        
    }
    document.documentElement.setAttribute("data-theme", theme)
}())

const toggleTheme = () => {
    theme = theme==="dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", document.documentElement.getAttribute("data-theme"))
}