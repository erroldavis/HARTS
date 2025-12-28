// ------------------------------------
// ROCK, PAPER, SCISSORS
// BASE REQUIRED SOLUTION (ONE ROUND)
// ------------------------------------

// STEP 1: PLAYER CHOICE
let playerChoice = prompt(
    "Choose rock, paper, or scissors:"
).toLowerCase();

// STEP 2: COMPUTER CHOICE (RANDOM NUMBER)
let randomNumber = Math.floor(Math.random() * 3);
let computerChoice;

// STEP 3: ASSIGN COMPUTER CHOICE
if (randomNumber === 0) {
    computerChoice = "rock";
} else if (randomNumber === 1) {
    computerChoice = "paper";
} else {
    computerChoice = "scissors";
}

// STEP 4: GAME LOGIC
if (playerChoice === computerChoice) {
    alert(
        "It's a tie!\n" +
        "You chose: " + playerChoice + "\n" +
        "Computer chose: " + computerChoice
    );

} else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
) {
    alert(
        "You win!\n" +
        "You chose: " + playerChoice + "\n" +
        "Computer chose: " + computerChoice
    );

} else {
    alert(
        "You lose!\n" +
        "You chose: " + playerChoice + "\n" +
        "Computer chose: " + computerChoice
    );
}