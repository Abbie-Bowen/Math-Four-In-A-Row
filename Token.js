class Token {
  constructor(owner, index) {
    this.owner = owner;
    this.id = `token-${index}-${owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
    this.columnOffset = 76;
  }
  /**
   * Draws new HTML token.
   */
  drawHTMLToken() {
    const token = document.createElement("div");
    document.getElementById("game-board-underlay").appendChild(token);
    token.setAttribute("id", this.id);
    token.setAttribute("class", "token");
    token.style.backgroundColor = this.owner.color;
  }
  /**
   *Gets associated htmlToken.
   * @return {element} HTMl element associated with token object.
   */
  get htmlToken() {
    return document.getElementById(this.id);
  }

  /**
   *updates token position to new columnLocation
   */
  refreshPosition() {
    this.htmlToken.style.left = this.columnLocation * this.columnOffset + "px";
  }
  /**
   *Moves html token one column to left.
   */
  moveLeft() {
    if (this.columnLocation > 0) {
      this.columnLocation -= 1;
      this.refreshPosition();
    }
  }
  /**
   * Moves html token one column to right.
   * @ param {number} columns - number of columns in the game board
   */
  moveRight(columns) {
    if (this.columnLocation < columns - 1) {
      this.columnLocation += 1;
      this.refreshPosition();
    }
  }
  /**
   * Drops html token into targeted board space.
   * @param {Object} target - Targeted space for dropped token.
   * @param {function} reset - The reset function to call after the drop animation has completed.
   */
  drop(target, reset) {
    this.dropped = true;

    $(this.htmlToken).animate(
      {
        top: target.y * target.diameter,
      },
      750,
      "easeOutBounce",
      reset
    );
  }
}
