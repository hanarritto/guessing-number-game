// Guess the Number Game
// The computer chooses a random whole number from 0 to 10.

// Run one complete round of the game.
function playRound() {
  const secretNumber = Math.floor(Math.random() * 11);
  let attempts = 0;
  let guessedCorrectly = false;

  // Keep asking until the player guesses correctly or cancels.
  while (!guessedCorrectly) {
    const userInput = window.prompt("Guess a number between 0 and 10:");

    // If the player presses Cancel, end this round.
    if (userInput === null) {
      document.getElementById("message").textContent =
        "Game cancelled. Press Start game to play again.";
      return false;
    }

    const guess = Number(userInput);

    // Validate the input before checking the answer.
    if (userInput.trim() === "" || !Number.isInteger(guess) || guess < 0 || guess > 10) {
      window.alert("Please enter a whole number from 0 to 10.");
      continue;
    }

    attempts++;
    document.getElementById("attempts").textContent = attempts;

    if (guess === secretNumber) {
      window.alert("Yeah, you guessed it!");
      document.getElementById("message").textContent =
        `Correct! The secret number was ${secretNumber}. You guessed it in ${attempts} attempt(s).`;
      document.getElementById("message").className = "message success";
      guessedCorrectly = true;
    } else if (guess < secretNumber) {
      window.alert("Too low, try again.");
    } else {
      window.alert("Too high, try again.");
    }
  }

  return true;
}

// Start the game and ask whether the player wants another round.
function startGame() {
  let playAgain = true;

  document.getElementById("attempts").textContent = "0";
  document.getElementById("message").textContent = "Game started! Check the prompt.";
  document.getElementById("message").className = "message";

  while (playAgain) {
    const completed = playRound();

    if (!completed) {
      playAgain = false;
    } else {
      playAgain = window.confirm("Would you like to play again?");
      if (playAgain) {
        document.getElementById("attempts").textContent = "0";
        document.getElementById("message").textContent = "New round! Check the prompt.";
      }
    }
  }

  if (!playAgain) {
    document.getElementById("message").textContent += " Thanks for playing!";
  }
}

// Connect the Start Game button to the main function.
document.getElementById("startButton").addEventListener("click", startGame);