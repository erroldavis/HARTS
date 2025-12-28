// ------------------------------------
// ROCK, PAPER, SCISSORS
// OPTIONAL CHALLENGE: BEST OF 3
// FUNCTIONS ONLY — NO LOOPS
// ------------------------------------

// SCORE VARIABLES
let playerScore = 0;
let computerScore = 0;

// GET PLAYER CHOICE
function getPlayerChoice() {
    return prompt("Choose rock, paper, or scissors:").toLowerCase();
}

// GET COMPUTER CHOICE
function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber === 0) {
        return "rock";
    } else if (randomNumber === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

// PLAY ONE ROUND
function playRound(roundNumber) {
    let playerChoice = getPlayerChoice();
    let computerChoice = getComputerChoice();

    if (playerChoice === computerChoice) {
        alert(
            "Round " + roundNumber + ": Tie!\n" +
            "You chose: " + playerChoice + "\n" +
            "Computer chose: " + computerChoice
        );
        return;
    }

    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        alert(
            "Round " + roundNumber + ": You win!\n" +
            "Score: Player " + playerScore + " - " + computerScore + " Computer"
        );
    } else {
        computerScore++;
        alert(
            "Round " + roundNumber + ": You lose!\n" +
            "Score: Player " + playerScore + " - " + computerScore + " Computer"
        );
    }
}

// FINAL RESULT
function showFinalResult() {
    if (playerScore > computerScore) {
        alert(
            "MATCH OVER!\nYou win the match!\n\n" +
            "Final Score:\nPlayer: " + playerScore +
            "\nComputer: " + computerScore
        );
    } else if (computerScore > playerScore) {
        alert(
            "MATCH OVER!\nComputer wins the match.\n\n" +
            "Final Score:\nPlayer: " + playerScore +
            "\nComputer: " + computerScore
        );
    } else {
        alert(
            "MATCH OVER!\nIt's a tie!\n\n" +
            "Final Score:\nPlayer: " + playerScore +
            "\nComputer: " + computerScore
        );
    }
}

// RUN THE GAME (NO LOOPS)
playRound(1);
playRound(2);
playRound(3);
showFinalResult();