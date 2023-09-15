const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('#start')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let flippedCards = [];
let allowFlipping = true;

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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  // Start a new game
  startBtn.remove()
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

  // Flip the card
  if (flippedCards.length < 2) { // We don't have enough flipped cards. Keep flipping.  
    // console.log('flipping!')
    if (!flippedCards.includes(event.target) && !event.target.dataset.matched === true) {
      // The card has not been flipped yet. Flip it. 
      flippedCards.push(event.target)
      event.target.classList.add(event.target.dataset.color)
      // console.log('Flipped', event.target.dataset.color)
      console.log('flipped', flippedCards)
    }
  }
  if (flippedCards.length === 2 && allowFlipping) { // We have enough cards
    // Don't allow further flips
    allowFlipping = false;
    // Check if cards are a match
    if (flippedCards[0].className === flippedCards[1].className) {
      // Mark cards as flipped
      for (let card of flippedCards) { card.dataset.matched = true; }
      // Reset the counter
      flippedCards = [];
      allowFlipping = true;
    } else {
      const mismatchedCards = flippedCards
      setTimeout(function () {
        for (let card of mismatchedCards) { card.className = '' }

        // Reset the counter
        flippedCards = [];
        allowFlipping = true;

        console.log('reset', flippedCards)
      }, 1000)
    }
  }
}


// when the DOM loads
startBtn.addEventListener('click', function(e) {
  createDivsForColors(shuffledColors)
})
// createDivsForColors(shuffledColors);
