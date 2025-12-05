// noinspection LanguageDetectionInspection

import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <h1>JavaScript DOM</h1>
    <input type="text">
    <button type="button" class="one two">
        Click Me!
    </button>
`;
//----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------> Attributes, Styles and Classes <-------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Element Properties versus HTML Attributes
const input = document.querySelector('input')
input.value = 2;

console.log(input)
console.log(input.type)
console.log(input.value)

console.dir(input)
//----------------------------------------------------------------------------------------------------------------------
// Setting and Getting HTML Attributes
// u ovoj cjelini ćemo da pređemo načine kako da postavimo nestandardne HTML atribute,
// kao i način na koji vraćamo njihove vrijednosti
const button = document.querySelector('button')
console.dir(button)

// Set an attribute:
button.setAttribute('aria-label', 'Close this modal')

// Get an attribute:
const value = button.getAttribute('aria-label')
console.log(value)

// .attributes
console.log(button.attributes)
//----------------------------------------------------------------------------------------------------------------------
// Setting and Getting Inline Styles
// u ovoj cjelini ćemo preko ”style” svojstva podešavati ”inline” stilove

// koristimo "button" koji je već deklarisan
console.dir(button.style)

// cssText
button.style.cssText = 'padding: 25px; margin: 10px 0; font-size: 20px'

// direct property access
button.style.fontSize = '22px'
button.style.marginTop = '15px'

console.log(button.style.fontSize)
//----------------------------------------------------------------------------------------------------------------------
// Setting and Getting Classes

// opet koristimo "button" koji je već deklarisan
console.dir(button)

// Old way: Set
button.className += ' three'
// Old way: Get
console.log(button.className.split(' '))

// New way: ClassList
// Add
button.classList.add('four')

// Remove
button.classList.remove('one')

// Toggle
button.classList.toggle('five')
setTimeout(() => button.classList.toggle('five'), 2500)

// Replace
button.classList.replace('two', 'six')

