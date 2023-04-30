"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1E1 = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player-winner");
  player1E1.classList.remove("player-winner");
  player0El.classList.add("player--active");
  player1E1.classList.remove("player--active");
};

initialization();

/**
 * Switch Player function
 */
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // showing score to active player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1E1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  // 1. Generating a random dice roll
  if (playing) {
    // checking if playing = true
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1; if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // showing score to active player
    } else {
      // switch player
      switchPlayer();
    }
  }
});

/**
 * Hold Button Event
 */
btnHold.addEventListener("click", function () {
  // 1. Add current soore to active player's score;
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if players's score is >=100;
    if (scores[activePlayer] >= 100) {
      // 3. Finish the game\
      playing = false;
      diceEl.classList.add("hidden"); // hide the dice if any player has won
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
    } else {
      // Switch to the other player
      switchPlayer();
    }
  }
});

/**
 * Reset the Game
 */
btnNew.addEventListener("click", initialization);
