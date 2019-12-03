"use strict";

const cards = [
    { frontImage: "./images/forest.jpg", type: "forest" },
    { frontImage: "./images/plains.jpg", type: "plains" },
    { frontImage: "./images/island.jpg", type: "island" },
    { frontImage: "./images/swamp.jpg", type: "swamp" },
    { frontImage: "./images/mountain.jpg", type: "mountain" },
    { frontImage: "./images/waste.jpg", type: "waste"},
    { frontImage: "./images/saproling.jpg", type: "saproling" },
    { frontImage: "./images/goblin.jpg", type: "goblin" },
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
const createCard = (frontImage, type) => {
    return `<div class="memory-card">
    <img class="front-image" src="${frontImage}" data-type="${type}" alt="">
    <img class="back-image" src="./images/cardbackground.jpg" alt="Magic the Gathering card back">
    </div>`;
};


// Print the cards intoo the html 
const generateCards = () => {
    shuffle(allCards);
    const memoryBoard = document.querySelector(".memory-board");
    allCards.forEach((card) => {
        const element = createCard(card.frontImage, card.type);
        memoryBoard.innerHTML += element;
    });
};


generateCards();

const memoryCards = document.querySelectorAll('.memory-card');
let isFlipped = false;
let firstCard, secondCard;

// Flips the card when clicked 
const flipCard = (event) => {
    let targetCard = event.target.parentElement;
    targetCard.classList.add('flip');
        
        if (!isFlipped) {
            isFlipped = true;
            firstCard = targetCard.children[0];
            return;
            
        } else {
            secondCard = targetCard.children[0];
            isFlipped = false;
        }

        
    checkMatch();
    
};

            
const checkMatch = () => {

    if (firstCard.dataset.type === secondCard.dataset.type) {
        disableCards();
        return;
        } else {
            unflipCards();
        }


};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

const unflipCards = () => {
    setTimeout(() => {
        firstCard.parentElement.classList.remove('flip');
        secondCard.parentElement.classList.remove('flip');
    }, 1500);
};


memoryCards.forEach(memoryCard => memoryCard.addEventListener('click', flipCard));