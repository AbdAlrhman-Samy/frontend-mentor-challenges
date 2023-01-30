const todoList = document.querySelector(".todo__list")
const todoInput = document.querySelector(".data__input")
const remainingTodos = document.querySelector(".todo__count")
const form = document.querySelector(".data")
let todoCount;
let TODOS = [];

window.addEventListener("load", () => {
    document.documentElement.style.height = window.innerHeight
})

const updateRemaining = (TODOS) => {
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

const renderTodos = (TODOS) => {
    todoList.innerHTML = ''
    TODOS.forEach(todo => createTodo(todo))
    updateRemaining(TODOS)
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
    renderTodos(TODOS)
})

const getTodos = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"))
    if(savedTodos){
        TODOS = savedTodos
        savedTodos.forEach(todo => createTodo(todo))
        renderTodos(TODOS)
    }
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
    renderTodos(TODOS)
}


const removeTodo = (e) => {
    const id = e.target.parentElement.getAttribute("data-id")
    TODOS = TODOS.filter(todo => todo.id !== Number(id))
    const element = e.target.parentElement
    element.remove()
    localStorage.setItem("todos", JSON.stringify(TODOS))
    updateRemaining(TODOS)
}

const clearCompleted = () => {
    TODOS = TODOS.filter(todo => !todo.isDone)
    renderTodos(TODOS)
    localStorage.setItem("todos", JSON.stringify(TODOS))
}





const filterTodos = (e, filter) => {
    if(filter === "all"){
        renderTodos(TODOS)
    }

    else if(filter === "active"){
        const activeTodos = TODOS.filter(todo => !todo.isDone)
        renderTodos(activeTodos)
    }

    else if(filter === "completed"){
        const completedTodos = TODOS.filter(todo => todo.isDone)
        renderTodos(completedTodos)
    }

    const filterBtns = document.querySelectorAll(".todo__filter-button--active")
    filterBtns.forEach(btn => btn.classList.remove("todo__filter-button--active"))

    e.target.classList.add("todo__filter-button--active")

}

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