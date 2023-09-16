const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('#start');
const reloadBtn = document.querySelector('h1 i');
let scoreDisplay = document.querySelector('#score');
let numberOfCards = document.querySelector('h1 input');
let cardsType = document.querySelector('#cardsType');

let flippedCards = [];
let allowFlipping = true;
let score = 0;
let allFlippedCards = 0;
let inGameColors = [];

const DEFAULT_COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const IMAGES = [
  'images/Phineas_hey.png',
  'images/Candace_Flynn.png',
  'images/Ferb_Fletcher.png',
  'images/Heinz_Doofenshmirtz_5.png',
  'images/Major_Monogram_MM.png',
  'images/Profile_-_Isabella_Garcia-Shapiro.png',
  'images/Thereyouare.png'
];

const backOfCard = 'https://img.myloview.com/canvas-prints/a-playing-card-reverse-back-in-black-and-white-from-a-new-modern-original-complete-full-deck-design-standard-poker-size-400-139133369.jpg';


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDeck(num) {
  deck = [];

  for (i = 0; i <= (num / 2) - 1; i++) {
    let index = Math.floor(Math.random() * DEFAULT_COLORS.length);
    let color = '';
    if (cardsType.value === 'color') {
      color = DEFAULT_COLORS[index];

    } else if (cardsType.value === 'random color') {
      randomColor = Math.floor(Math.random() * 16777215).toString(16);
      color = `#${randomColor}`

    } else {
      let index = Math.floor(Math.random() * IMAGES.length)
      color = IMAGES[index]
    };
    deck.push(color);
    deck.push(color);
    inGameColors.push(color);

  }
  return deck;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(d) {
  // Start a new game
  let colorArray = shuffle(d);

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.dataset.color = color;
    newDiv.style.backgroundImage = `url(${backOfCard})`;
    newDiv.className = 'container';

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // Update the score
  if (allowFlipping && !flippedCards.includes(event.target)) {
    score++
    scoreDisplay.innerText = `SCORE: ${score}`
  }

  // Flip the card
  if (flippedCards.length < 2) { // We don't have enough flipped cards. Keep flipping.  
    if (!flippedCards.includes(event.target) && !event.target.dataset.matched === true) {
      // The card has not been flipped yet. Flip it. 
      flippedCards.push(event.target)
      if (event.target.dataset.color.startsWith('images')) {
        event.target.style.backgroundImage = `url("${event.target.dataset.color}")`;
        event.target.style.backgroundColor = 'white'
      } else {
        event.target.style.backgroundColor = event.target.dataset.color
        event.target.style.backgroundImage = ''

      }
    }
  }
  if (flippedCards.length === 2 && allowFlipping) { // We have enough cards
    // Don't allow further flips
    allowFlipping = false;
    // Check if cards are a match
    if (flippedCards[0].dataset.color === flippedCards[1].dataset.color) { // Cards are a match!
      // Mark cards as flipped
      for (let card of flippedCards) { card.dataset.matched = true; }

      // Reset the counter
      flippedCards = [];

      // Count flips
      allFlippedCards += 2
      if (inGameColors.length * 2 === allFlippedCards) {
        setTimeout(endGame, 1000)
      }

      allowFlipping = true;
    } else { // Cards are not a match
      const mismatchedCards = flippedCards
      setTimeout(function () {
        for (let card of mismatchedCards) {
          card.style.backgroundColor = '';
          card.style.backgroundImage = `url(${backOfCard})`;
        }

        // Reset the counter
        flippedCards = [];
        allowFlipping = true;
      }, 1000)
    }
  }
}

function clear() {
  let first = gameContainer.firstElementChild;
  while (first) {
    first.remove();
    first = gameContainer.firstElementChild;
  }

}
function endGame() {
  clear();
  const done = document.createElement('h1');
  done.id = 'start';
  done.innerText = 'ALL DONE!';
  gameContainer.append(done);


  if (score < localStorage.getItem('memoryGameScore')) {
    localStorage.setItem('memoryGameScore', score);
    const newRecord = document.createElement('h2');
    newRecord.innerText = `New Score: ${score}`;
    gameContainer.append(newRecord);
  }

}
function startGame(options) {
  if (options) { // We are starting a game with options
    // Check how many cards we need to make
    if (numberOfCards.value === '') { // The user didn't pick. Default to 10.
      numberOfCards.value = 10;
    }
    if (numberOfCards.value % 2 !== 0) { // We have an odd number of cards
      alert('Please pick an even number of cards!');
      numberOfCards.value = 10;
      return;
    }
  }

  // Clear the game
  clear();

  createDivsForColors(createDeck(numberOfCards.value));

  // Set defaults
  allFlippedCards = 0;
  score = 0;
  scoreDisplay.innerText = `SCORE: ${score}`;
  if (!localStorage.getItem('memoryGameScore')) {
    localStorage.setItem('memoryGameScore', 10000);
  }
}
// when the DOM loads
startBtn.addEventListener('click', function () { startGame(true) });

reloadBtn.addEventListener('click', function () {
  startGame(false);
});

