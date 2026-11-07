// Guess the Number Game
// The computer randomly chooses a whole number from 0 to 10.

let secretNumber;
let attempts = 0;
let gameFinished = false;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

// Start a new round and reset all game values.
function startGame() {
  secretNumber = Math.floor(Math.random() * 11);
  attempts = 0;
  gameFinished = false;

  attemptsDisplay.textContent = attempts;
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  message.className = "message";
  message.innerHTML = '<span class="message-icon" aria-hidden="true">🐻</span> New number, new chance! Make a guess.';
  guessInput.focus();
}

// Check the user's number and display the result directly on the webpage.
function checkGuess() {
  if (gameFinished) return;

  const userInput = guessInput.value.trim();
  const guess = Number(userInput);

  // Check that the input is a whole number between 0 and 10.
  if (userInput === "" || !Number.isInteger(guess) || guess < 0 || guess > 10) {
    message.className = "message error";
    message.innerHTML = '<span class="message-icon" aria-hidden="true">🐻‍❄️</span> Please enter a whole number from 0 to 10.';
    guessInput.focus();
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    message.className = "message success";
    message.innerHTML = '<span class="message-icon" aria-hidden="true">🎉</span> You got it! The secret number was ' +
      secretNumber + '. You guessed it in ' + attempts + ' attempt(s)!';
    gameFinished = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (guess < secretNumber) {
    message.className = "message";
    message.innerHTML = '<span class="message-icon" aria-hidden="true">🍯</span> Too low! Try a higher number.';
  } else {
    message.className = "message";
    message.innerHTML = '<span class="message-icon" aria-hidden="true">🐾</span> Too high! Try a lower number.';
  }

  if (!gameFinished) {
    guessInput.select();
  }
}

// Submit a guess when the player clicks the button or presses Enter.
guessButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") checkGuess();
});

// Start another round when the player clicks New Game.
restartButton.addEventListener("click", startGame);

// Prepare the first round as soon as the page loads.
startGame();