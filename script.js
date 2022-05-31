'use strict';

//------------Selecting---elements-------------
const score0 = document.querySelector('#score--0');
const currentScore0 = document.querySelector('#current--0');
const player0 = document.querySelector('.player--0');
const score1 = document.querySelector('#score--1');
const currentScore1 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const rollButton = document.querySelector('.btn--roll');
const newGameButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');
// --------------------------------------------

let scores, currentScore, currentPlayer, isPlaying, currentRoll;

const init = function () {
  // Array of scores
  scores = [0, 0];
  // Basic variabels
  currentScore = 0;
  currentPlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  isPlaying = true;
  // Visual settings
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  // Hiding dice
  diceElement.classList.add('hidden');
};

init();

const swapPlayers = function () {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const rollDice = function () {
  if (isPlaying) {
    // Generating random number
    currentRoll = Math.trunc(Math.random() * 6) + 1;
    // Uploading image of coresponding dice
    diceElement.src = `dice-${currentRoll}.png`;

    // Case when roll is 1 (swaping players)
    if (currentRoll === 1) {
      currentScore = 0;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
      swapPlayers();
    }
    // Case when roll is higher than 1 (increasing score)
    else {
      currentScore += currentRoll;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    }
    score0.textContent = scores[0];
    score1.textContent = scores[1];

    diceElement.classList.remove('hidden');
  }
};

// Event listener, coresponding to rolling dice button
rollButton.addEventListener('click', rollDice);

holdButton.addEventListener('click', function () {
  if (isPlaying) {
    scores[currentPlayer] += currentScore;
    currentScore += currentRoll;
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentScore = 0;
    score0.textContent = scores[0];
    score1.textContent = scores[1];
    if (scores[currentPlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      player0.classList.remove('player--active');
      player1.classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else swapPlayers();
  }
});

newGameButton.addEventListener('click', init);
