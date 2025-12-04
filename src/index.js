// noinspection LanguageDetectionInspection

import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <h1>JavaScript DOM</h1>
`;

//----------------------------------------------------------------------------------------------------------------------
// DOM je JavaScript objekat preko kog pristupamo sadržaju, strukturi i stilu web stranice, odnosno dokumenta
// odnosno, DOM predstavlja API u okviru browsera, a preko JavaScripta vršimo rad sa browserom

// svaki put kada pristupamo nekoj web stranici, browser će parsirati HTML source kod i kreirati DOM čvorove
// DOM čvorovi formiraju "DOM Tree"

// "window" objekat je glavni globalni objekat u JavaScript-u kada se kod izvršava u browseru
// “window” sadrži referencu ka DOM-u preko promjenjive “document”
// naredna dva primjera su analogni jedan drugom:
const input1 = document.querySelector('input')
const input2 = window.document.querySelector('input')

// BOM (Browser Object Model) nam služi da direktno komuniciramo sa browserom
// on sadrži elemente poput:
// - navigator
// - screen
// - location
// - history
// - XMLHttpRequest

// recimo, možemo da vršimo navigaciju preko JS-a tako što ćemo pristupati History objektu
history.back()
history.forward()

window.history.back()
window.history.forward()
//----------------------------------------------------------------------------------------------------------------------
// kako bi razumjeli način na koji browser renderuje našu web-stranicu,
// trebamo da znamo da se unutar svakog browsera nalazi ”rendering engine”
// on će da parsira svaki HTML element jedan po jedan



// čim dođe do dna .html fajla, dobićemo event – "DOM Content Loaded"
// "DOMContentLoaded" event se izvršava kad se učita i parsira čitav HTML dokument
// neće se čekati na učitavanje slika, stylesheetova, JS fajlova i sličnih stvari
// korišćenje ovog eventa predstavlja najsigurniji način za pisanje JavaScripta, pošto znamo da je učitan sav DOM
document.addEventListener('DOMContentLoaded', () => {
    alert('DOM Content Loaded')
})

// postoji još jedan bitan event koji treba da se spomene - "load" event
// “load” event označava da su učitane sve slike, sav CSS, svi frejmovi, sav JS kod,
// kao i svaki eksterni resurs
// window.addEventListener('load', () => alert('load'))
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------> DOM Nodes In-Depth <------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// DOM Nodes explained

// JavaScript pristupa DOM čvorovima preko "document" objekta
// "document" je JavaScript objekat koji opisuje naš čitav dokument, njegovu lokaciju, mjesto izvršavanja
// i još mnogo informacija – character set, content type, document type,…

// taj objekat u našem slučaju sadrži reference ka čitavom "index.html" fajlu

// "index.html" iz HTML perspektive
console.log(document)
// "index.html" iz "document" perspektive
console.dir(document)

// <html>
// "documentElement" se odnosi na HTML
// pristupamo mu preko "document.documentElement"
console.log(document.documentElement)
console.dir(document.documentElement)

// <head>
console.dir(document.head)
// <body>
console.dir(document.body)

// constructor name
console.log(document.body.constructor.name)

/*
    Postoji 12 tipova čvorova:
        1: Element
        2: Attribute
        3: Text
        4: CDATASection
        5: EntityReference
        6: Entity
        7: ProcessingInstruction
        8: Comment
        9: Document
        10: DocumentType
        11: DocumentFragment
 */

// looking up the prototype chain
console.log(document.body instanceof HTMLBodyElement)
console.log(document.body instanceof HTMLElement)
console.log(document.body instanceof Element)
console.log(document.body instanceof Node)
console.log(document.body instanceof EventTarget)

// na sledeći način utvrđujemo da li određeni DOM čvor predstavlja DOM element ili čak i sami dokument
// svojstvo "nodeType" će da vraća određeni broj, koji označava kategoriju
console.log(document.body.nodeType); // 1
console.log(document.nodeType); // 9

// "nodeName" koristimo za utvrđivanje Node tipa
console.log(document.body.nodeName); // BODY
// "tagName" koristimo za utvrđivanje "Element" tipa
console.log(document.body.tagName); // BODY
//----------------------------------------------------------------------------------------------------------------------
// Creating DOM Nodes
const div1 = document.createElement('div')
const text = document.createTextNode('DOM!')
const comment = document.createComment('No comment')

div1.append(comment)
div1.append(text)
app.append(div1)

/*
    <div id="app">
        <div><!--No comment!-->DOM!</div>
    </div>
*/
//----------------------------------------------------------------------------------------------------------------------
// Changing Content of DOM Elements
const h1 = document.createElement('h1')
h1.innerText = 'Ultimate Courses'
h1.innerText += ' - Learning JS DOM'
// h1.style.display = 'none'

app.append(h1)

console.log(app.innerHTML)
console.log(app.innerText)
console.log(app.textContent)
//----------------------------------------------------------------------------------------------------------------------
// "innerHTML" vs. "createElement"

// napravićemo poređenje dva načina preko kojih ubacujemo sadržaj u DOM, tačnije njihove prednosti i mane
// možemo da koristimo "document.createElement()" ili string unutar "innerHTML"

// prvi način - "document.createElement()":
function createInputDOM({ label, type = "text"}) {
    const labelEl = document.createElement('label')
    const inputEl = document.createElement('input')

    inputEl.type = type
    labelEl.innerText = label

    labelEl.append(inputEl)

    return labelEl
}

const inputFromDOM = createInputDOM({label: 'Name'})
console.log(inputFromDOM)
app.append(inputFromDOM)

// string templates
// unutar stringa ćemo da podesimo HTML, odnosno input, label i type, pa ćemo odraditi interpolaciju stringova
function createInputTemplate({label, type="text"}) {
    return `
        <label>
            ${label}
            <input type=${type}>
        </label>
    `;
}

const inputFromTemplate = createInputTemplate({label: 'Email', type: 'email'})
// pošto naša funkcija vraća string, ne možemo da koristimo "document.createElement()"
// zbog toga koristimo "app.innerHTML"
app.innerHTML += inputFromTemplate
//----------------------------------------------------------------------------------------------------------------------
// using DocumentFragments
// predstavlja još jedan pristup za ubacivanja sadržaja u DOM

// umjesto da čitamo i pišemo po DOM-u jednostavno treba da sastavimo Fragment, odradimo što nam je
// potrebno (dodamo jedan po jedan element u Fragment) i na kraju dodamo Fragment u DOM
const data = ['Earth', 'Fire', 'Water', 'Air']

const fragment = document.createDocumentFragment();

const ul2 = document.createElement('ul');
data.forEach(name => {
    const li = document.createElement('li')
    li.innerText = name

    ul2.append(li)
})

fragment.append(ul2)
app.append(fragment)
//----------------------------------------------------------------------------------------------------------------------
// Inserting DOM Elements
const div2 = document.createElement('div')
const span = document.createElement('span')
const p = document.createElement('p')
const i = document.createElement('i')
const b = document.createElement('b')

// ukoliko želimo da dodamo na sam kraj, onda koristimo "append"
div2.append(span);
// ukoliko želimo da dodamo na početak, onda koristimo ”prepend”
// recimo da želimo da dodamo ”p” na sami početak:
div2.prepend(p);
// ako želimo da dodamo direktno iza ”p”, onda koristimo metodu ”after”:
// osim nje ima i metoda "before"
p.after(i);

// Before: old way using "insertBefore"
i.parentNode.insertBefore(b, i)
// After: old way using insertBefore + nextSibling
// i.parentNode.insertBefore(b, i.nextSibling)

// rezultat:
// <div>
//      <p></p>
//      <b></b>
//      <i></i>
//      <span></span>
// </div>
//----------------------------------------------------------------------------------------------------------------------
// Inserting DOM as String Templates

// ukoliko želimo da ubacimo određeni String template, onda to radimo preko metode "insertAdjacentHTML"
const ul = app.querySelector('ul')

ul.insertAdjacentHTML('beforebegin', '<p>Before</p>')
ul.insertAdjacentHTML('afterbegin', '<li>First</li>')
ul.insertAdjacentHTML('beforeend', '<li>Last</li>')
ul.insertAdjacentHTML('afterend', '<p>After</p>')

// <div id="app">
//     <h1>JavaScript DOM</h1>
//     <p>Before</p> //1
//     <ul>
//         <p>First</p> //2
//         <li>1</li>
//         <p>Last</p> //3
//     </ul>
//     <p>After</p> //4
// </div>
//----------------------------------------------------------------------------------------------------------------------
// Replacing DOM Elements
const replaceDiv = document.createElement('div')
replaceDiv.id = 'div3'
replaceDiv.textContent = 'Replace me!'
app.append(replaceDiv)

const div3 = document.querySelector('#div3')

const newDiv = document.createElement('div')
newDiv.innerText = 'I have been replaced'

// new way"
div3.replaceWith(newDiv)

// old way:
const anotherDiv = document.createElement('div')
anotherDiv.innerText = 'I replace all'

setTimeout(() => {
    newDiv.parentNode.replaceChild(anotherDiv, newDiv)
}, 2000)
//----------------------------------------------------------------------------------------------------------------------
// Cloning DOM Elements
const div4 = document.createElement('div')
const span2 = document.createElement('span')

span2.innerText = "Can you clone me?"
div4.append(span2)

app.append(div4)

// cloneNode(false) - only clones the top element
const clone = div4.cloneNode()

// cloneNode(true) - clones all elements and subtrees
const newClone = div4.cloneNode(true)
console.log(newClone)

app.append(newClone)
//----------------------------------------------------------------------------------------------------------------------
// Removing DOM Elements
const div5 = document.createElement('div')
div5.innerText = 'I am a message'

app.append(div5)

// new way:
setTimeout(() => {
    div5.remove()
}, 2500)

// old way:
setTimeout(() => {
    div5.parentNode.removeChild(div5)
}, 2500)

