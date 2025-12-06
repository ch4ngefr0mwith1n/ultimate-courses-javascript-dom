// noinspection LanguageDetectionInspection

import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <h1>JavaScript DOM</h1>
    <div class="one">
        <div class="two">
            <button type="button" class="three">
                Click me!
            </button>
        </div>
    </div>
    <form>
        <label>
            Sign-up Email
            <input type="email">
        </label>
        <label>
            I agree to the terms
            <input type="checkbox">
        </label>
    </form>
    <button type="button" id="add-item">
        Add item
    </button>
    <ul id="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
    </ul>
    <div style="height: 1000px;"></div>
`;
//----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------> Events and Event listeners <---------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Adding Event Listeners and Event Object
const button = document.querySelector('button')
console.dir(button)

// "event.target" se odnosi na ono na šta smo kliknuli
function handleClick(event) {
    console.log(
        event.target
    )
}

button.addEventListener('click', handleClick)

function handleDoubleClick(event) {
    console.log(
        event.target,
        'Double-clicked!'
    )
}

// "once" - logika na event listeneru će da se odradi samo jednom
button.addEventListener('dblclick', handleDoubleClick, { once: true })

// arrow functions
// button.addEventListener('dblclick', () => {
//     console.log(
//         event.target,
//         'Double-clicked!'
//     )
// })
//----------------------------------------------------------------------------------------------------------------------
// Removing Event Listeners

// kada uklanjamo "event listener", moramo da uklonimo i "handle" funkciju koja je vezana uz njega
button.removeEventListener('dblclick', handleDoubleClick)
//----------------------------------------------------------------------------------------------------------------------
// Event Bubbling, Capturing and Propagation

// u ovoj cjelini ćemo preći način na koji "event"-ovi zapravo rade
// postoje tri faze unutar "event"-ova nakon što kliknemo na dugme ili odradimo neku sličnu radnju:
// o capturing phase – dok se event spušta do elementa
// o target phase – event dolazi do ciljanog elementa
// o bubbling phase – event ”odleprša” od elementa kog je tražio
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')

function anotherHandleClick(event) {
    // ukoliko želimo da zaustavimo "bubbling phase" kod elementa, onda za to koristimo metodu "stopPropagation()"
    // međutim, ovo neće obustaviti sve ostale "event listener"-ove na zadanom elementu
    event.stopPropagation()

    // ukoliko želimo da prekinemo sve ostale "event listener"-ove na zadatom elementu, onda koristimo sledeću metodu:
    event.stopImmediatePropagation()
    console.log(event.target)
}

// Event Bubbling kroz DOM tree:
// ↓  ↑
//  ↓  ↑
//   ↓  ↑
//   button
one.addEventListener('click', anotherHandleClick)
two.addEventListener('click', anotherHandleClick)
three.addEventListener('click', anotherHandleClick)

three.addEventListener('click', event => console.log(event), { capture: true })
//----------------------------------------------------------------------------------------------------------------------
// Preventing Default Event Actions
const form = document.querySelector('form')
const email = form.querySelector('input[type="email"]')
const checkbox = form.querySelector('input[type="checkbox"]')

// možemo da spriječimo slanje forme slučaju da email i checkbox nisu popunjeni kako valja
// to radimo preko metode "event.preventDefault()"
function handleSubmit(event) {
    if (!checkbox.checked) {
        event.preventDefault()
        console.log('I am not submitting...')
        console.log(event.defaultPrevented)

        return
    }

    console.log('Submitted', email.value)
}

form.addEventListener('submit', handleSubmit)
// checkbox.addEventListener('click', (event) => event.preventDefault())
//----------------------------------------------------------------------------------------------------------------------
// Event Delegation and Dynamic Events
const listButton = document.querySelector('#add-item')
const list = document.querySelector('#list')
// ako elemente liste prebacimo u niz, to nam omogućava da koristimo metode niza (poput "forEach")
// const items = [...list.querySelectorAll('li')]

function handleListItemClick(event) {
    // po default-u, kada kliknemo van liste, registrovaće se klik na "ul" elemnent i izlistaće sve elemente
    // želimo to da spriječimo, treba da se gađaju samo "li" elementi
    if (event.target.nodeName.toLowerCase() !== 'li') {
        return
    }

    console.log(event.target.innerText)
}

// Event delegation
// kada kliknemo na neki član liste, odradiće se "event bubble" sve do "ul"-a
// nema potrebe da dodajemo dodatnu "event listener" logiku za "listButton"
list.addEventListener('click', handleListItemClick)

// items.forEach(item => {
//     item.addEventListener('click', handleListItemClick)
// })

// ako ubacimo peti element preko DOM-a, na njemu neće raditi logika za kliktanje
// const li = document.createElement('li')
// li.innerText = 'Item 5'
// // tu logiku možemo da dodamo naknadno:
// list.addEventListener('click', handleListItemClick)
// list.append(li)

// međutim, bez obzira na to koliko članova lista ima, možemo da dodajemo nove članove i "event listener"-e dinamički
// koristićemo "Event Delegation" pristup
listButton.addEventListener('click', () => {
    const items = list.querySelectorAll('li')
    const li = document.createElement('li')
    li.innerText = `Item ${items.length + 1}`
    // tu logiku možemo da dodamo naknadno:
    // list.addEventListener('click', handleListItemClick)
    list.append(li)
})

//----------------------------------------------------------------------------------------------------------------------
// Keyboard Events
// "keydown" - kada korisnik pritisne dugme
// "keyup" - kada korisnik pusti dugme
document.addEventListener('keydown', event => {
    // console.log(event.key, event.code)
    switch (event.key) {
        case 'ArrowUp': {
            console.log('Up!')
            event.preventDefault()
            break
        }
        case 'ArrowDown': {
            console.log('Down!')
            event.preventDefault()
            break
        }
    }
})

document.addEventListener('keydown', event => console.log(event.key))
document.addEventListener('keyup', event => console.log(event.key))