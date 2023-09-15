const gameContainer = document.getElementById("game");

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

let flippedCards = []

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

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  // Flip the card
  if (flippedCards.length < 2) { // We don't have enough flipped cards. Keep flipping. 
    event.target.classList.add(event.target.dataset.color)
    flippedCards.push(event.target)
  }
  if (flippedCards.length === 2) { // We have enough cards. Check if they match
    console.log('We have two cards!')
    // Check if cards are a match
    if (flippedCards[0].className === flippedCards[1].className) {
      console.log('We have a match!')
    } else {
      console.log('We DO NOT have a match!')
      const mismatchedCards = flippedCards
      setTimeout(function() {
        console.log('Reseting cards')
        for (let card of mismatchedCards) {
          console.log(card)
          card.className = ''
        }
      }, 1000)
    }
    // Reset the counter
    flippedCards = []

  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
