// VARIABLE DECLARATIONS
let optionsArray = [
    "sunflower",
    "violet",
    "rose",
    "tulip",
    "daisy",
];

let answer;
let maxWrongGuess = 5;
let mistakes = 0;
let guessed = [];
let wordStatus; 

// DOCUMENT DECLARATIONS
let mistakeElement = document.getElementById("mistakes");
let maxWrongGuessElement = document.getElementById("maxWrongGuesses");

mistakeElement.innerHTML = mistakes;
maxWrongGuessElement.innerHTML = maxWrongGuess;

// INITIAL INTERFACE
// Builds out the keyboard for the game 
function generateButtons() {
    let keyboardContainerElement = document.getElementById('keyboardContainer');
    let keyboardButtons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => 
        `
            <button 
                class="keyboardLetter"
                id="` + letter + `"
                onClick="handleGuess('` + letter + `')"
            >
            ` + letter + `
            </button>
        `).join('');
    keyboardContainerElement.innerHTML = keyboardButtons; 
}


// GAME LOGIC
// Selects a random word from the array
function chooseRandomWord () {
    answer = optionsArray[Math.floor(Math.random() * optionsArray.length)];
    console.log(answer);
}

// Sets the random word
function setGuessWord () {
    wordStatus = answer.split('').map(letter =>
        (guessed.indexOf(letter) >= 0 ? letter : " _ ")
    ).join('');

    document.getElementById('letterContainer').innerHTML = wordStatus;
}

// Controls the player's guess
function handleGuess(selectedLetter) {
    if (guessed.indexOf(selectedLetter) === -1) {
        guessed.push(selectedLetter);
    }

    console.log(selectedLetter);
    console.log(guessed);

    if (answer.indexOf(selectedLetter) >= 0) {
        document.getElementById(selectedLetter).classList.add('correctLetter');
        setGuessWord();
        checkWin();
    } else {
        document.getElementById(selectedLetter).classList.add('incorrectLetter');
        mistakes++;
        updateMistakes();
        checkLoss();
    }
}



// Adds a mistake to the mistake counter
function updateMistakes() {
    mistakeElement.innerHTML = mistakes;
}

// GAME OVER LOGIC
// Runs if the player wins by guessing the word before reaching the max incorrect guesses
function checkWin() {
    if (wordStatus === answer) {
        document.getElementById('gameContainer').style.visibility = "hidden";
        document.getElementById('gameOverContainer').style.visibility = "visible";
        document.getElementById('gameOverStatus').innerHTML = "You win!";
    }
}

// Runs if the player loses by not guessing the word before reaching the max incorrect guesses
function checkLoss() {
    if (mistakes === maxWrongGuess) {
        document.getElementById('gameContainer').style.visibility = "hidden";
        document.getElementById('gameOverContainer').style.visibility = "visible";
        
        const gameOver = document.createElement("h3");
        const gameOverText = document.createTextNode("Game over...");
        gameOver.appendChild(gameOverText);
        
        const correctAnswer = document.createElement("p");
        const correctAnswerText = document.createTextNode("The answer was: " + answer);
        correctAnswer.appendChild(correctAnswerText);

        document.getElementById('gameOverStatus').appendChild(gameOver);
        document.getElementById('gameOverStatus').appendChild(correctAnswer);
    }
}

// Starts the game over
function startOver() {
    mistakes = 0;
    guessed = [];
    updateMistakes();
    generateButtons();
    chooseRandomWord();
    setGuessWord();
    document.getElementById('gameContainer').style.visibility = "visible";
    document.getElementById('gameOverContainer').style.visibility = "hidden";
    document.getElementById('gameOverStatus').replaceChildren();
}

// FUNCTION CALLS
generateButtons();
chooseRandomWord();
setGuessWord();
