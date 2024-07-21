'use strict';

// Selecting elements
const player1Element = document.querySelector(".player--0");
const player2Element = document.querySelector(".player--1");
const player1ScoreElement = document.querySelector("#score--0");
const player2ScoreElement = document.querySelector("#score--1");
const player1CurrentElement = document.querySelector("#current--0");
const player2CurrentElement = document.querySelector("#current--1");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");

// Game variables
let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0
  activePlayer = 0;
  playing = true;

  player1ScoreElement.textContent = '0';
  player2ScoreElement.textContent = '0';
  player1CurrentElement.textContent = '0';
  player2CurrentElement.textContent = '0';

  player1Element.classList.add('player--active');
  player2Element.classList.remove('player--active');
  player1Element.classList.remove('player--winner');
  player2Element.classList.remove('player--winner');
  document.querySelector('.dice').src = ` `;
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Element.classList.toggle('player--active');
  player2Element.classList.toggle('player--active');
}

// Initialize the game
init();

// Roll dice functionality
rollDiceButton.addEventListener('click', function() {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the dice image
    document.querySelector('.dice').src = `./image/dice-${dice}.png`;

    // 3. Check if rolled number is 1
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Reset current score and switch to next player
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      switchPlayer();
    }
  }
});

// Hold functionality
holdButton.addEventListener('click', function() {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      playing = false;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// New game functionality
newGameButton.addEventListener('click', init);
