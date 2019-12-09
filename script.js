"use strict";

const cards = [
  { frontImage: "./images/forest.png", type: "forest" },
  { frontImage: "./images/plains.png", type: "plains" },
  { frontImage: "./images/island.png", type: "island" },
  { frontImage: "./images/swamp.png", type: "swamp" },
  { frontImage: "./images/mountain.png", type: "mountain" },
  { frontImage: "./images/waste.png", type: "waste" },
  { frontImage: "./images/saproling.png", type: "saproling" },
  { frontImage: "./images/lotus.png", type: "lotus" },
  { frontImage: "./images/force.png", type: "force" }
];

// Overlay pop-up when the game is over
const congratOverlay = document.getElementById("congratulations-overlay");

const displayOverlay = (score, clicks) => {
  const finalScore = document.querySelector(".finalScore");
  const finalClicks = document.querySelector(".finalClicks");
  finalScore.innerHTML = score;
  finalClicks.innerHTML = clicks;
  congratOverlay.style.display = "block";
};

// Closes the overlay when click on the cross
const span = document.querySelector(".close");
span.onclick = () => {
  congratOverlay.style.display = "none";
};

// Closes the overlay when click outside the overlay frame
window.onclick = event => {
  if (event.target == congratOverlay) {
    congratOverlay.style.display = "none";
  }
};

// Duplicate the array of items in the object cards
const allCards = cards.concat(cards);

// Shuffle the array
const shuffle = cards => {
  let ctr = cards.length,
    temp,
    index;

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
    <img class="back-image" src="./images/cardbackground.png" alt="Magic the Gathering card back">
    </div>`;
};

// Print the cards into the html-page
const generateCards = () => {
  shuffle(allCards);
  const memoryBoard = document.querySelector(".memory-board");
  allCards.forEach(card => {
    const element = createCard(card.frontImage, card.type);
    memoryBoard.innerHTML += element;
  });
};

// Adds click count to the clickboard
const clickBoard = document.querySelector(".addClicks");
let clicks = 0;
const addClicks = () => {
  clickBoard.innerHTML = clicks;
};

// Adds score count to the scoreboard
const scoreBoard = document.querySelector(".addScore");
let score = 0;
const addScore = () => {
  scoreBoard.innerHTML = score;
};

// Genererate a card board and sets the clicks and score to zero when the page is loaded
generateCards();
addClicks();
addScore();

const memoryCards = document.querySelectorAll(".memory-card");
let isFlipped = false;
let locked = false;
let firstCard, secondCard;

// Flips the card when clicked
const flipCard = event => {
  if (locked) {
    return;
  }
  let targetCard = event.target.parentElement;
  targetCard.classList.add("flip");
  clicks++;
  addClicks();

  if (!isFlipped) {
    isFlipped = true;
    firstCard = targetCard.children[0];

    // Prevents the first card from being dubble clicked and matched
    targetCard.classList.add("lock-pointer");
    return;
  } else {
    secondCard = targetCard.children[0];
    isFlipped = false;
  }

  checkMatch();
};

// Checks if the dataset of the cards match
const checkMatch = () => {
  if (firstCard.dataset.type === secondCard.dataset.type) {
    score++;
    addScore();

    if (score === allCards.length / 2) {
      setTimeout(() => {
        displayOverlay(score, clicks);
      }, 700);
    }

    disableCards();
    return;
  } else {
    unflipCards();
  }
};

// Prevents the cards from being unflipped and clicked at when matched
const disableCards = event => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

// Unflips the cards if they do not match
const unflipCards = () => {
  locked = true;

  setTimeout(() => {
    firstCard.parentElement.classList.remove("lock-pointer");
    firstCard.parentElement.classList.remove("flip");
    secondCard.parentElement.classList.remove("flip");
    locked = false;
  }, 1000);
};

// Adds a click event to all cards
memoryCards.forEach(memoryCard =>
  memoryCard.addEventListener("click", flipCard)
);

// Resets the gameboard
const resetGame = () => {
  congratOverlay.style.display = "none";
  score = 0;
  clicks = 0;
  addScore();
  addClicks();
  memoryCards.forEach(card => {
    card.classList.remove("flip");
    card.classList.remove("lock-pointer");
    isFlipped = false;
    setTimeout(() => {
      let shuffle = Math.floor(Math.random() * memoryCards.length);
      card.style.order = shuffle;
    }, 500);
  });
};

// Adds the resetGame function to the Replay button
const replaytBtns = document.querySelectorAll(".replay-btn");
replaytBtns.forEach(replaytBtn =>
  replaytBtn.addEventListener("click", resetGame)
);
