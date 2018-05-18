//console.log('hello');
//console.info('hello');
//console.warn('hello');
//console.error('hello');

//Schema (Classe)

function Counter() {
    this.number = 0; /*this fait réf à l'instance courante
    c'est une pseudo variable , elle fait réf à la variable courante
    c'est un alias en fonction du contexte*/
    this.increase = function () {
        this.number++;
    };

    this.decrease = function () {
        this.number--;
    };

}

var counterTitle = new Counter();
var title = document.getElementById('title');

//on récupère un objet du DOM pour "l'écouter" avec addEventListener
title.addEventListener('mouseover', function () {
    counterTitle.increase();
    console.log(counterTitle.number);
}, false); 
// function () {} est une fonction anonyme

/**
 * * Afficher un nom saisi dans un champ text
 */
var inputName = document.getElementById('name');
var displayName = document.querySelector('#displayName');


inputName.addEventListener('keyup', function (event) {
    //console.log(event.target.value);
    var value = event.target.value;
    displayName.style.color = '#000';

    if (value.length >= 5) {
        displayName.style.color = 'red';
    }

    displayName.innerHTML = value;
});

/**
 * ToggleBox
 */

//var toggleBoxTitle = document.querySelector('.toggleBox h1');

//toggleBoxTitle.addEventListener('click', function (event) {
   // var p = toggleBoxTitle.nextElementSibling;
    
    //p.style;display = p.style.display !== 'none' ? 'none' : 'block'; ce qui suit écrit en condition ternaire

   // if (p.style.display !== 'none') {
    //toggleBoxTitle.nextElementSibling.style.display = 'none'; devient:
        //p.style.display = 'none';
    //} else {
        //p.style.display = 'block';
    //}

//}, false); 

/**
 * selector === .toggleBox h1
 */


function toggleBox (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (element) {
        element.addEventListener('click', function (event) {
            switchDisplay(element.nextElementSibling);
        }, false); 
    });
}
function switchDisplay(element) {
    element.style.display = element.style.display !== 'none' ? 'none' : 'block';
}

toggleBox('.toggleBox h1');
toggleBox('.switchBox h2');

