class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
    this.mathReady = false;
    this.mathQuestion = new MathQuestion();
  }

  /*
   * Creates two player objects
   * @return  {Array}    An array of two Player objects.
   */
  createPlayers() {
    const players = [];
    document.getElementById("player").textContent = "Hello, player 1!";
    let clickedOnce = false;

    document
      .getElementById("finalize-player")
      .addEventListener("click", function () {
        if (!clickedOnce) {
          //set value of playerId
          let playerNameInput = document.getElementById("name").value;
          if (playerNameInput !== "") {
            let playerId = playerNameInput;
          } else if (playerNameInput === "") {
            let playerId = "Player One";
          }
          //set value of playerMath
          let playerMath = document.getElementById("math").value;
          //set value of player token color
          let playerColorInput = document.getElementById("player-color").value;
          const playerOne = new Player(
            playerId,
            1,
            playerColor,
            true,
            playerMath
          );
          players.push(playerOne);
          document.getElementById("player").textContent = "Hello, player 2!";
          clickedOne = true;
        } else if (clickedOnce) {
          //set value of playerId
          let playerNameInput = document.getElementById("name").value;
          if (playerNameInput !== "") {
            let playerId = playerNameInput;
          } else if (playerNameInput === "") {
            let playerId = "Player Two";
          }
          //set value of playerMath
          let playerMath = document.getElementById("math").value;
          //set value of player token color
          let playerColorInput = document.getElementById("player-color").value;
          const playerTwo = new Player(
            playerId,
            2,
            playerColor,
            false,
            playerMath
          );
          players.push(playerTwo);
          document.getElementById("player-selections").style.opacity = "0";
        }
      });
    return players;
  }

  /**
   *returns active player.
   *@return {object} player -The active player.
   */
  get activePlayer() {
    return this.players.find((player) => player.active);
  }

  /**
   *Gets game ready to play
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.showMathQuestion();
  }

  /**
   * Displays a math question for the user to answer.
   */
  showMathQuestion() {
    this.ready = false;
    this.mathReady = true;
    this.mathQuestion = new MathQuestion(this.activePlayer.mathType);
    console.log(this.mathQuestion.answer);
    document.querySelector("div.math-problem").style.visibility = "visible";
    document.getElementById("game-scene").style.opacity = ".5";
    document.getElementById(
      "math-question"
    ).textContent = this.mathQuestion.question;
    document.querySelector("div.math-problem").style.opacity = "1";
  }

  /**
   * hides math question.
   */
  hideMathQuestion() {
    document.querySelector("div.math-problem").style.opacity = "0";
    document.getElementById("game-scene").style.opacity = "1";
    this.mathReady = false;
    this.ready = true;
  }

  /**
   *Branches code, depending on what key player presses
   *@param {object} e - Keydown event objects
   */
  handleKeydown(e) {
    if (this.ready && !this.mathReady) {
      if (e.key === "ArrowLeft") {
        this.activePlayer.activeToken.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (e.key === "ArrowDown") {
        this.playToken();
      }
    }
  }

  /**
   *Branches code, depending on what player enters into the text input.
   */
  handleMathButton() {
    let input = document.getElementById("answer").value;
    let currentTokenId = this.activePlayer.activeToken.id;
    let currentTokenElement = document.getElementById(currentTokenId);
    if (!this.ready && this.mathReady) {
      if (input == this.mathQuestion.answer) {
        this.mathFeedback("Correct!");
        this.hideMathQuestion();
      } else if (input !== this.mathQuestion.answer) {
        this.mathFeedback("Incorrect. Next player's turn.");
        document
          .getElementById("game-board-underlay")
          .removeChild(currentTokenElement);
        this.ready = true;
        this.switchPlayers();
        this.activePlayer.activeToken.drawHTMLToken();
        this.showMathQuestion();
      }
    }
  }

  /**
   *Finds Space object to drop Token into, drops Token.
   */
  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;
    let gameObject = this;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }

    if (targetSpace !== null) {
      game.ready = false;
      activeToken.drop(targetSpace, function () {
        gameObject.updateGameState(activeToken, targetSpace);
      });
    }
  }

  /**
   * Checks if there a winner on the board after each token drop.
   * @param   {Object}    Targeted space for dropped token.
   * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */
  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;
    // vertical
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner
        ) {
          win = true;
        }
      }
    }
    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner
        ) {
          win = true;
        }
      }
    }
    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner
        ) {
          win = true;
        }
      }
    }
    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    return win;
  }

  /**
   * Switches active player.
   */
  switchPlayers() {
    for (let player of this.players) {
      player.active = player.active === true ? false : true;
    }
  }

  /**
   * Displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver(message) {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-over").textContent = message;
  }

  /**
   * Displays math message.
   * @param {string} message - correct or incorrect and remaining tries.
   */
  mathFeedback(message) {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-over").textContent = message;
  }

  /**
   * Updates game state after token is dropped.
   * @param   {Object}  token  -  The token that's being dropped.
   * @param   {Object}  target -  Targeted space for dropped token.
   */
  updateGameState(token, target) {
    target.mark(token);

    if (this.checkForWin(target)) {
      this.gameOver(`${target.owner.name} wins!`);
    } else {
      this.switchPlayers();
      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.showMathQuestion();
      } else {
        this.gameOver("No more tokens.");
      }
    }
  }
}
