const game = new Game();

/*
 * Listens for click on `#begin-game` and calls startGame() on game object
 */

document.getElementById("begin-game").addEventListener("click", function () {
  game.startGame();
  this.style.display = "none";
  document.getElementById("play-area").style.opacity = ".2";
  document.getElementById("player-selections-form").style.visibility =
    "visible";
});

/**
 *Listen for keyboard presses for token
 */
document.addEventListener("keydown", function (event) {
  game.handleKeydown(event);
});

/**
 *Listen for click on math input
 */
document.getElementById("enter-answer").addEventListener("click", function () {
  game.handleMathButton();
});
