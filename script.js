"use strict";

const cards = [
    {frontImage: "./images/forest.jpg"},
    {frontImage: "./images/plains.jpg"},
    {frontImage: "./images/island.jpg"},
    {frontImage: "./images/swamp.jpg"},
    {frontImage: "./images/mountain.jpg"},
    {frontImage: "./images/waste.jpg"},
    {frontImage: "./images/saproling.jpg"},
    {frontImage: "./images/goblin.jpg"}
];

// Duplicate the array of items in the object cards
const allCards = cards.concat(cards);


// Shuffle the array 
const shuffle = (cards) => {
    var ctr = cards.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = cards[ctr];
        cards[ctr] = cards[index];
        cards[index] = temp;
    }
    return cards;
};



// Create a card template 
const createCard = (frontImage, index) => {
    return `<div class="memory-card">
    <img class="front-image" src="${frontImage}" data-card-index="${index}" alt="">
    <img class="back-image" src="./images/cardbackground.jpg" alt="Magic the Gathering card back">
    </div>`;
};


// Print the cards intoo the html 
const generateCards = () => {
    shuffle(allCards);
    const memoryBoard = document.querySelector(".memory-board");
    allCards.forEach((card, index) => {
        const element = createCard(card.frontImage, index);
        memoryBoard.innerHTML += element;
    })
};


generateCards();

// Flips the card when clicked 
const memoryCards = document.querySelectorAll('.memory-card');

// The reason why im not using an arrow function here is because an arrow function is an anonymous function and could not use "this"
function flipCard() {
    this.classList.toggle('flip');
};

memoryCards.forEach(memoryCard => memoryCard.addEventListener('click', flipCard));