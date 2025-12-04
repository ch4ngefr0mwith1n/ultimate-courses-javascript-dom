// noinspection LanguageDetectionInspection

import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <h1>JavaScript DOM</h1>
    <div class="item"></div>
    <ul id="list"></ul>
`;

//----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------> Querying and Traversing the DOM <------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Querying DOM Nodes (HTMLCollections)
// HTML Live Collection - možemo da pravimo "live" izmjene
// svaki put kad želimo da vidimo stanje unutar DOM-a ne moramo da pravimo novi upit
const data = ['Earth', 'Wind', 'Fire', 'Water']
const fragment = document.createDocumentFragment()

data.forEach(item => {
    const li = document.createElement('li')
    li.className = 'list-item'
    li.innerText = item

    fragment.append(li)
})

// getElementById: HTMLElement
const ulFromId = document.getElementById("list")
console.log(ulFromId)
ulFromId.append(fragment)

// getElementByClassName: HTMLCollection
// "HTMLCollection" može da sadrži samo element čvorove
// za razliku od "HTMLCollection", "NodeLists" mogu da sadrže bilo kakav tip čvorova
const listItemsFromClassName = ulFromId.getElementsByClassName("list-item")
console.log(listItemsFromClassName)

// getElementByTagName:
const listItemsFromTagName = ulFromId.getElementsByTagName('li')
console.log(listItemsFromTagName)

// Demonstrate live collection:
const newListItem1 = document.createElement('li')
newListItem1.className = 'list-item'
newListItem1.innerText = 'Air'
ulFromId.append(newListItem1)
//----------------------------------------------------------------------------------------------------------------------
// Querying DOM Nodes (NodeLists)

// u ovom poglavlju ćemo da odrađujemo "querySelector"
// "querySelector" nam vraća kopiju DOM-a kog pokušavamo da referenciramo
// vraća ga kao statički element, nemamo benefite koje pruža "HTML Live Collection"
const ulFromQuerySelector = document.querySelector('#list')
console.log(ulFromQuerySelector)

ulFromQuerySelector.append(fragment)

// odnosno, svaki put kad želimo da vidimo stanje unutar DOM-a moramo da napravimo novi upit
// postoji velika razlika između HTMLCollection i NodeList:
// - "querySelectorAll" koristi NodeList
// - "HTMLCollection" može da prihvata HTML čvorove i element čvorove
const listItemsFromQSA = ulFromQuerySelector.querySelectorAll('.list-item')
console.log(listItemsFromQSA)

const newListItem2 = document.createElement('li')
newListItem2.className = 'list-item'
newListItem2.innerText = 'Air'
ulFromQuerySelector.append(newListItem2)

console.log(
    listItemsFromQSA,
    ulFromQuerySelector.querySelectorAll('.list-item')
)
//----------------------------------------------------------------------------------------------------------------------
// Looping over DOM Elements
const listItems = document.querySelectorAll('#list li')
console.log(listItems)

// for (let i = 0; i < listItems.length; i++) {
//     console.log(listItems[i])
// }

// for (const item of listItems) {
//     console.log(item)
// }

// Array.from(listItems).forEach(item => console.log(item))

listItems.forEach(item => console.log(item))
//----------------------------------------------------------------------------------------------------------------------
// Finding Child Elements
const list = document.querySelector('#list')

// querySelectorAll: NodeList
const queryChildren = list.querySelectorAll('li')

console.log(
    queryChildren,
    queryChildren.length
)

// .children: HTMLCollection
console.log(list.children)

// .childNodes: NodeList
console.log(list.childNodes)

// first/last
console.log(
    list.firstChild,
    list.firstElementChild
)

console.log(
    list.lastChild,
    list.lastElementChild
)
//----------------------------------------------------------------------------------------------------------------------
// Finding Parent Elements
const item = document.querySelector('.item')

console.log(item)
console.log(item.parentNode)
console.log(item.parentElement)
console.log(item.parentElement.parentElement)

// closest:
console.log(item.closest('body'))
//----------------------------------------------------------------------------------------------------------------------
// Finding Sibling Elements
const listItem = document.querySelector('#list li')

// Any DOM Nodes
console.log(listItem.nextSibling)
console.log(listItem.previousSibling)

// Any Element Nodes
console.log(listItem.nextElementSibling)
console.log(listItem.previousElementSibling)


