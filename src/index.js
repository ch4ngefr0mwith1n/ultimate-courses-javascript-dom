// noinspection LanguageDetectionInspection

import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <div class="todos">
        <div class="todos-header">
            <h3 class="todos-title">Todo List</h3>
            <div>
                <p>You have <span class="todos-count"></span> items</p>
                <button type="button" class="todos-clear" style="display: none;">
                    Clear Completed
                </button>
            </div>
        </div>
        <form class="todos-form" name="todos">
            <input type="text" placeholder="What's next?" name="todo">
        </form>
        <ul class="todos-list"></ul>
    </div>  
`;

// state management
let todos = JSON.parse(localStorage.getItem('todos')) || []

// selectors
const root = document.querySelector('.todos')
const list = root.querySelector('.todos-list')
const count = root.querySelector('.todos-count')
const clear = root.querySelector('.todos-clear')

const form = document.forms.todos
const input = form.elements.todo

// functions
function saveToStorage(todos) {
    // localStorage je JSON baza unutar browsera
    localStorage.setItem('todos', JSON.stringify(todos))
}

function renderTodos(todos) {
    // svaki put kad dodamo novi "to-do", obrisaćemo staru listu i izrenderovati novu
    // <li>
    let todoString = ''
    todos.forEach((todo, index) => {
        todoString += `
            <!-- custom atributi su uvedeni u HTML5 -->
            <!-- počinju sa "data" -->
            <li data-id="${index}"${todo.complete ? ' class="todos-complete"':''}>
                <input type="checkbox"${todo.complete ? ' checked' : ''}>
                <span>${todo.label}</span>
                <button type="button"></button>
            </li>
        `
    })

    list.innerHTML = todoString
    count.innerText = todos.filter(todo => !todo.complete).length
    clear.style.display = todos.filter(todo => todo.complete).length ? 'block' : 'none'
}

function addTodo(event) {
    event.preventDefault()

    const label = input.value.trim()
    // indikator koji označava da li je "to-do item" odrađen ili ne
    const complete = false;

    todos = [
        ...todos,
        {
            label,
            complete
        }
    ]

    // console.log(todos)
    renderTodos(todos)
    saveToStorage(todos)

    // kada se pritisne Enter i doda "to-do" item, treba da se očisti tekstualno polje
    input.value = ''
}

function updateTodo(event) {
    // "id" od "to-do"-a kom se pristupilo
    const idAsString = event.target.parentNode.getAttribute('data-id') // string
    const id = parseInt(idAsString, 10)

    // provjeravamo da li je "to-do" odrađen ili ne, tako što pristupamo "checked" property-ju 
    const complete = event.target.checked

    // ažuriranje zadatog "to-do"-a unutar liste
    todos = todos.map((todo, index) => {
        if (index === id) {
            return {
                ...todo,
                complete
            }
        }

        return todo
    })

    renderTodos(todos)
    saveToStorage(todos)
}

function editTodo(event) {
    // gdje god da kliknemo na "span", upaliće se "edit" opcija
    if (event.target.nodeName.toLowerCase() !== 'span') {
        return
    }

    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10)
    // naziv "to-do"-a
    const todoLabel = todos[id].label

    const input = document.createElement('input')
    input.type = 'text'
    input.value = todoLabel



    function handleEdit(event) {
        event.stopPropagation()
        // input.value
        const label = this.value

        if (label !== todoLabel) {
            todos = todos.map((todo, index) => {
                if (index === id) {
                    return {
                        ...todo,
                        label: label
                    }
                }

                return todo;
            })

            renderTodos(todos)
            saveToStorage(todos)
        }

        // clean up
        // ne treba da se re-renderuje čitava "ul" kolekcija nakon edit-a
        event.target.style.display = ''
        this.removeEventListener('change', handleEdit)
        this.remove()
    }

    // "input" trebamo da ubacimo u DOM
    // "event.target" je "span" sa kojim radimo
    event.target.style.display = 'none'
    event.target.parentNode.append(input)
    input.addEventListener('change', handleEdit)
    input.focus()
}

function deleteTodo(event) {
    // ukoliko se ne pritisne "button", logika se ne izvršava
    if (event.target.nodeName.toLowerCase() !== 'button') {
        return
    }

    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10)
    const label = event.target.previousElementSibling.innerText // "span" tag
    if (window.confirm(`Delete ${label}?`)) {
        todos = todos.filter((todo, index) => index !== id)

        renderTodos(todos)
        saveToStorage(todos)
    }
}

function clearCompleteTodos() {
    const count = todos.filter(todo => todo.complete).length
    if (count === 0) {
        return
    }

    if (window.confirm(`Delete ${count} todos?`)) {
        todos = todos.filter(todo => !todo.complete)

        renderTodos(todos)
        saveToStorage(todos)
    }
}

// initializing application
function init() {
    renderTodos(todos)
    // Add To-do
    form.addEventListener('submit', addTodo)
    // Update To-do
    // kada čekiramo "to-do", "event" će da odradi "bubble" ka "ul" listi
    list.addEventListener('change', updateTodo)
    //Edit To-do
    list.addEventListener('dblclick', editTodo)
    //Delete To-Do
    list.addEventListener('click', deleteTodo)
    // Complete All To-Dos
    clear.addEventListener('click', clearCompleteTodos)
}

init()