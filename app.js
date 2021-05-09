let game;
let players = [];
let currentPlayer = 1;
let playerForm = document.getElementById("player-selections-form");

/*
 * Listens for click on `#begin-game` and calls beginGameOrCreatePlayers()
 */
const beginGameButton = document.getElementById("begin-game");
updateTextContent();
beginGameButton.addEventListener("click", beginGameOrCreatePlayers);

function updateTextContent() {
  document.getElementById(
    "player"
  ).textContent = `Hello, player ${currentPlayer}`;
  beginGameButton.textContent = `Player ${currentPlayer} is ready`;
}
/**
 *Listen for keyboard presses for token
 */
document.addEventListener("keydown", function (event) {
  if (game) {
    game.handleKeydown(event);
  }
});
/**
 *Listen for click on math input
 */
document.getElementById("enter-answer").addEventListener("click", function () {
  game.handleMathButton();
});

/*
 * depending on the current number of players, calls createPlayer() or
 * calls beginGame()
 */
function beginGameOrCreatePlayers() {
  if (currentPlayer === 1) {
    createPlayer();
    document.getElementById("player-selections").reset();
    updateTextContent();
  } else if (currentPlayer === 2) {
    createPlayer();
    document.getElementById("player-selections").reset();
    playerForm.style.display = "none";
  } else if (currentPlayer === 3) {
    beginGame(players);
  }
}
/*
 * creates new Player object using input from user
 * pushes new Player object to @param players {array}
 */
function createPlayer() {
  //set value of playerId
  let playerNameInput = document.getElementById("name").value;
  let playerId = "";
  if (playerNameInput.value !== "") {
    playerId = playerNameInput;
  } else if (playerNameInput === "") {
    playerId = `Player ${currentPlayer}`;
  }
  //set value of playerMath
  let playerMath = document.getElementById("math").value;
  //set value of player token color
  let playerColor = document.getElementById("color").value;
  //sets boolean for first player to active
  let playerActive = "";
  if (currentPlayer === 1) {
    playerActive = true;
  } else {
    playerActive = false;
  }
  const player = new Player(
    playerId,
    `${currentPlayer}`,
    playerColor,
    playerActive,
    playerMath
  );
  players.push(player);
  currentPlayer++;
}

/*
 * creates a new Game object and passes in the players Array
 * calls startGame() on the new Game object
 */
function beginGame(players) {
  beginGameButton.style.display = "none";
  document.getElementById("play-area").style.opacity = "1";
  game = new Game(players);
  game.startGame();
}
