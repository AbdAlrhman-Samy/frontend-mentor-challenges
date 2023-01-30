const todoList = document.querySelector(".todo__list")
const todoInput = document.querySelector(".data__input")
const remainingTodos = document.querySelector(".todo__count")
const form = document.querySelector(".data")
let todoCount;
let TODOS = [];

window.addEventListener("load", () => {
    document.documentElement.style.height = window.innerHeight
})

const updateRemaining = () => {
    remainingTodosCount = TODOS.filter(todo => todo.isDone === false).length
    remainingTodos.innerHTML = `<b>${remainingTodosCount}</b> items remaining`
}

function Todo(text){
    this.text = text
    this.isDone = false
    this.id = Math.round(Math.random() * 10000)
}


const createTodo = (todo) => {
    const todoTemplate = `
    <li class="todo__item ${todo.isDone? "todo__item--checked" : ""}" data-id=${todo.id}>
        <button class="todo__check-button ${todo.isDone? "todo__check-button--checked" : ""}" onclick="checkTodo(event)"></button>
        <span class="todo__text">${todo.text}</span>
        <button class="todo__remove-button" onclick="removeTodo(event)">
        </button>
    </li>
    `;

    todoList.insertAdjacentHTML("beforeend", todoTemplate)

}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(!todoInput.value.trim()) {
        alert("Please add some text.")
        return
    }
    const newTodo = new Todo(todoInput.value.trim());    
    createTodo(newTodo)
    TODOS = [...TODOS, newTodo]
    localStorage.setItem("todos", JSON.stringify(TODOS))
    todoInput.value = ''
    updateRemaining()
})

const getTodos = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"))
    if(savedTodos){
        TODOS = savedTodos
        savedTodos.forEach(todo => createTodo(todo))
        updateRemaining()
    } else console.log('none :(');
}
getTodos()

const checkTodo = (e) => {
    const id = e.target.parentElement.getAttribute("data-id")
    e.target.classList.toggle("todo__check-button--checked")
    e.target.parentElement.classList.toggle("todo__item--checked")
    TODOS = TODOS.map(todo => {
        if(todo.id === Number(id)){
            return {...todo, isDone: !todo.isDone}
        } return todo
    })
    localStorage.setItem("todos", JSON.stringify(TODOS))
    updateRemaining()
}


const removeTodo = (e) => {
    const id = e.target.parentElement.getAttribute("data-id")
    TODOS = TODOS.filter(todo => todo.id !== Number(id))
    console.log(id);
    const element = e.target.parentElement
    element.remove()
    localStorage.setItem("todos", JSON.stringify(TODOS))
    updateRemaining()
}

const clearCompleted = () => {
    console.log('clear');
    TODOS = TODOS.filter(todo => !todo.isDone)
    localStorage.setItem("todos", JSON.stringify(TODOS))

}



// const filterTodos = (filter) => {
//     if(filter === "all"){

//     }
// }

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