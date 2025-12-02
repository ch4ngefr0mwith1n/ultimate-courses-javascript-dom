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
window.addEventListener('load', () => alert('load'))
//----------------------------------------------------------------------------------------------------------------------





