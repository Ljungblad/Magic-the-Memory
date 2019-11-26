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

const memoryBoard = document.querySelector(".memory-board");

// Create a card template 

const createCard = (frontImage) => {
    return `<div class="memory-card">
    <img class="front-image" src="${frontImage}" alt="">
    <img class="back-image" src="./images/cardbackground.jpg" alt="">
    </div>`;
};

const generateCards = () => {
    cards.forEach(item => {
        const element = createCard(item.frontImage);
        memoryBoard.innerHTML += element;
    })
}

generateCards();