const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('#start')
const reloadBtn = document.querySelector('h1 i')
let scoreDisplay = document.querySelector('#score')
let numberOfCards = document.querySelector('h1 input')
let cardsType = document.querySelector('#cardsType')

const DEFAULT_COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

let flippedCards = [];
let allowFlipping = true;
let score = 0
let allFlippedCards = 0
let inGameColors = []


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
  deck = []
  
  for (i = 0; i <= (num / 2) - 1; i++) {
    let index = Math.floor(Math.random() * DEFAULT_COLORS.length)
    console.log(cardsType.value)
    if (cardsType.value === 'color') {
      deck.push(DEFAULT_COLORS[index])
      deck.push(DEFAULT_COLORS[index])
    } else if (cardsType.value === 'random color') {
      randomColor = Math.floor(Math.random()*16777215).toString(16);
      deck.push(`#${randomColor}`)
      deck.push(`#${randomColor}`)
      inGameColors.push(`#${randomColor}`)
    }
    
  }
  console.log(deck)
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
    // newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  score++
  scoreDisplay.innerText = `Score: ${score}`
  // Flip the card
  if (flippedCards.length < 2) { // We don't have enough flipped cards. Keep flipping.  
    // console.log('flipping!')
    if (!flippedCards.includes(event.target) && !event.target.dataset.matched === true) {
      // The card has not been flipped yet. Flip it. 
      flippedCards.push(event.target)
      event.target.style.backgroundColor = event.target.dataset.color
      console.log('flipped', flippedCards)
    }
  }
  if (flippedCards.length === 2 && allowFlipping) { // We have enough cards
    // Don't allow further flips
    allowFlipping = false;
    // Check if cards are a match
    if (flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor) { // Cards are a match!
      // Mark cards as flipped
      for (let card of flippedCards) { card.dataset.matched = true; }

      // Reset the counter
      flippedCards = [];

      // Count flips
      allFlippedCards += 2
      if (DEFAULT_COLORS.length * 2 === allFlippedCards) {
        endGame()
      }

      allowFlipping = true;
    } else { // Cards are note a match
      const mismatchedCards = flippedCards
      setTimeout(function () {
        for (let card of mismatchedCards) { card.style.backgroundColor = '' }

        // Reset the counter
        flippedCards = [];
        allowFlipping = true;

        console.log('reset', flippedCards)
      }, 1000)
    }
  }
}

function clear() {
  let first = gameContainer.firstElementChild
  while (first) {
    first.remove()
    first = gameContainer.firstElementChild
  }

}
function endGame() {
  clear()
  const done = document.createElement('h1')
  done.id = 'start'
  done.innerText = 'All done!'
  gameContainer.append(done)


  if (score < localStorage.getItem('memoryGameScore')) {
    localStorage.setItem('memoryGameScore', score)
    const newRecord = document.createElement('h2')
    newRecord.innerText = `Final Score: ${score}`
    gameContainer.append(newRecord)
  }


}
function startGame(options) {
  if (options) { // We are starting a game with options
    // Check how many cards we need to make
    if (numberOfCards.value === '') { // The user didn't pick. Default to 10.
      numberOfCards.value = 10
    }
    if (numberOfCards.value % 2 !== 0) { // We have an odd number of cards
      alert('Please pick an even number of cards!');
      numberOfCards.value = 10;
      return;
    }
  }

  // Clear the game
  clear();

  createDivsForColors(createDeck(numberOfCards.value))

  // Set defaults
  allFlippedCards = 0
  score = 0
  scoreDisplay.innerText = `Score: ${score}`
  if (!localStorage.getItem('memoryGameScore')) {
    localStorage.setItem('memoryGameScore', 10000)
  }
}
// when the DOM loads
startBtn.addEventListener('click', function() {startGame(true)})

reloadBtn.addEventListener('click', function() {
  startGame(false)
} )
