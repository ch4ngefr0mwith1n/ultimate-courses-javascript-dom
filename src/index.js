// noinspection LanguageDetectionInspection

import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <h1>JavaScript DOM</h1>
    <form name="order">
        <label>
            Your name
            <input type="text" name="fullname">
        </label>
        <label>
            Which pizza would you like?
            <select name="pizza">
                <option value="pepperoni">Pepperoni</option>
                <option value="meaty">Meaty</option>
                <option value="cheesey">Cheesy</option>
            </select>
        </label>
        <div>
            What size?
            <label>
                Small
                <input type="radio" name="size" value="small" checked>
            </label>
            <label>
                Medium
                <input type="radio" name="size" value="medium">
            </label>
            <label>
                Large
                <input type="radio" name="size" value="large">
            </label>
        </div>
        <label>
            Quantity
            <input type="number" name="quantity" value="1">
        </label>
        <button type="submit" id="submit-button">
            Submit
        </button>
    </form>
    <form name="example">
        <input type="text" name="myInput" value="Hello">
        <div class="container">
            <label>
                Blue
                <input type="radio" name="color" value="blue" checked>
            </label>
            <label>
                Red
                <input type="radio" name="color" value="red">
            </label>
            <label>
                Green
                <input type="radio" name="color" value="green">
            </label>
        </div>
        <label>
            Accept Marketing
            <input type="checkbox" name="marketing">
        </label>
        <select name="drink">
            <option value="">Select your drink</option>
            <option value="lemonade" selected>Lemonade</option>
            <option value="cola">Cola</option>
            <option value="water">Water</option>
        </select>
    </form>
`;
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------> Forms and Events <--------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Accessing Forms and Elements
// const form = document.querySelector('form')

// BITNO:
// najbolji način pristupanja formi je preko "documents.form" pa naziv forme
// naziv naše forme je "order"
const form = document.forms.order

// "form.elements" će vratiti listu svih elemenata koji se nalaze unutar naše forme
// const fullname = form.elements.fullName;
const { fullname } = form.elements

function handleInput(event) {
    // access the value
    console.log(event.target.value)

    // access the form:
    console.log(event.target.form)
}

fullname.addEventListener('input', handleInput)
//----------------------------------------------------------------------------------------------------------------------
// Form Submit Event and FormData

// const form = document.forms.order
// kada pritisnemo "Submit", "event" će da odradi "bubble-up" sve do "form" elementa
// function handleSubmit(event) {
//     event.preventDefault()
//     console.log(new FormData(event.target))
// }

function handleFormData(event) {
    // event.preventDefault()
    console.log([...event.formData])
    console.log([...event.formData.values()])

    const entries = event.formData.entries()
    for (const entry of entries) {
        console.log(entry)
    }
}

// form.addEventListener('submit', handleSubmit)
form.addEventListener('formdata', handleFormData)
//----------------------------------------------------------------------------------------------------------------------
// Transforming FormData for the Server & Posting FormData via Fetch API

// u ovoj cjelini ćemo da pređemo transformaciju "formData" objekta u format koji može da se šalje ka serveru
function handlePizzaSubmit(event) {
    event.preventDefault()

    // "query string" approach
    // Content-Type = application/x-www-form-urlencoded
    // fullname=Todd+Motto&pizza=pepperoni&size=large&quantity=2
    const formData = new FormData(event.target)
    // const data = [...formData.entries()]
    // const asString = data
    //     .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    //     .join('&')

    const asString = new URLSearchParams(formData).toString()
    console.log(asString)

    // JSON:
    const asJSON = JSON.stringify(Object.fromEntries(formData))
    console.log(asJSON)

    // Fetch API
    fetch('/fakeapi', {
        method: 'post',
        headers: {
            // 'Content-Type':'application/x-www-form-urlencoded'
            'Content-Type':'application/json',
        },
        // body: asString,
        body: asJSON,
    })
}

form.addEventListener('submit', handlePizzaSubmit)
//----------------------------------------------------------------------------------------------------------------------
// Handling Input Elements
const exampleForm = document.forms.example
const input = exampleForm.myInput

// 1. Properties that are useful
console.dir(input)
// set
input.value = 'Goodbye'
//get
console.log(input.value)

// 2. Events
// other events: cut, copy and paste
input.addEventListener('focus', () => console.log('Focus'))
input.addEventListener('blur', () => console.log('Blur'))
input.addEventListener('input', () => console.log('Input'))
input.addEventListener('change', () => console.log('Change'))

// 3. Methods
// focus an input:
input.focus()
setTimeout(() => input.blur(), 2500)
//----------------------------------------------------------------------------------------------------------------------
// Handling Radio Input Elements

// "radio" forma ima naziv "color"
const radios = [...exampleForm.elements.color]

// 1. Properties that are useful
radios.forEach(radio => {
    console.log(radio.value)
    console.log(radio.checked)
})
radios[2].checked = true

// 2. Events
const container = exampleForm.querySelector('.container')

container.addEventListener('change', () => {
    // const checked = radios.find(radio => radio.checked).value
    // console.log(checked)
    console.log(exampleForm.elements.color.value)
})

// 3. Methods
radios[2].select()
//----------------------------------------------------------------------------------------------------------------------
// Handling Checkbox Input Elements

// "checkbox" ima naziv "marketing"
const checkbox = exampleForm.elements.marketing

// 1. Properties that are useful
console.dir(checkbox)
// set
checkbox.checked = true
// get
console.log(checkbox.checked)

// 2. Events
checkbox.addEventListener('change', () => {
    console.log(checkbox.checked)
    console.log(checkbox.value)
})

// 3. Methods
checkbox.select()
//----------------------------------------------------------------------------------------------------------------------
// Handling Select Elements
const select = exampleForm.elements.drink

// 1. Selected value
select.value = 'water'
console.log(select.value)

// 2. Selected index
const id = 2
select.selectedIndex = id
console.log(select.selectedIndex)

// 3. Selected DOM Element
console.log(select.options[select.selectedIndex])

// 4. Events
select.addEventListener('change', () => {
    console.log(select.value)
    console.log(select.selectedIndex)
    console.log(select.options[select.selectedIndex])
})

// 5. Add new <option>
const option = document.createElement('option')
option.value = 'milk'
option.text = 'Milk'

// select.append(option)
select.add(option, 1)