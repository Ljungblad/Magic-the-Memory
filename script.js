"use strict";

const cards = [
    { frontImage: "./images/forest.png", type: "forest" },
    { frontImage: "./images/plains.png", type: "plains" },
    { frontImage: "./images/island.png", type: "island" },
    { frontImage: "./images/swamp.png", type: "swamp" },
    { frontImage: "./images/mountain.png", type: "mountain" },
    { frontImage: "./images/waste.png", type: "waste"},
    { frontImage: "./images/saproling.png", type: "saproling" },
    { frontImage: "./images/lotus.png", type: "lotus" },
    { frontImage: "./images/force.png", type: "force" },
];

// Duplicate the array of items in the object cards
const allCards = cards.concat(cards);


// Shuffle the array 
const shuffle = (cards) => {
    let ctr = cards.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = cards[ctr];
        cards[ctr] = cards[index];
        cards[index] = temp;
    }
    return cards;
}



// Create a card template 
const createCard = (frontImage, type) => {
    return `<div class="memory-card">
    <img class="front-image" src="${frontImage}" data-type="${type}" alt="">
    <img class="back-image" src="./images/cardbackground.png" alt="Magic the Gathering card back">
    </div>`;
}


// Print the cards into the html-page
const generateCards = () => {
    shuffle(allCards);
    const memoryBoard = document.querySelector(".memory-board");
    allCards.forEach((card) => {
        const element = createCard(card.frontImage, card.type);
        memoryBoard.innerHTML += element;
    });
}

generateCards();


const memoryCards = document.querySelectorAll('.memory-card');
let isFlipped = false;
let locked = false;
let firstCard, secondCard;

// Flips the card when clicked 
const flipCard = (event) => {
    if (locked) {
        return;
    }
    let targetCard = event.target.parentElement;
    targetCard.classList.add('flip');
        
        if (!isFlipped) {
            isFlipped = true;
            firstCard = targetCard.children[0];

            // Prevents the first card from being dubble clicked and matched 
            targetCard.classList.add('lock-pointer');
            return;
            
        } else {
            secondCard = targetCard.children[0];
            isFlipped = false;
        }

        
    checkMatch();
    
}

// Checks if the dataset of the cards match 
const checkMatch = () => {

    if (firstCard.dataset.type === secondCard.dataset.type) {
        disableCards();
        return;
    } else {
        unflipCards();
    }


}

// Prevents the cards from being unflipped and clicked at when matched 
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

// Unflips the cards if they do not match
const unflipCards = () => {
    locked = true;
    
    setTimeout(() => {
        firstCard.parentElement.classList.remove('lock-pointer');
        firstCard.parentElement.classList.remove('flip');
        secondCard.parentElement.classList.remove('flip');
        locked = false;
    }, 1000);
}

// Adds a click event to all cards 
memoryCards.forEach(memoryCard => memoryCard.addEventListener('click', flipCard));


// Resets the gameboard
const resetGame = () => {
    memoryCards.forEach(card => {
        card.classList.remove('flip');
        card.classList.remove('lock-pointer');
        isFlipped = false;
        setTimeout(() => {
            let shuffle = Math.floor(Math.random() * memoryCards.length);
            card.style.order = shuffle;
        }, 500);
    });
}

// Adds the resetGame function to the Replay button 
const replaytBtn = document.querySelector('.replay');
replaytBtn.addEventListener('click', resetGame);