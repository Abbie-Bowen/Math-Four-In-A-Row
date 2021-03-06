class Player {
  constructor(name, id, color, active = false, mathType) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createTokens(21);
    this.mathType = mathType;
  }

  /**
   * Creates token objects for player
   * @param   {integer}   num - Number of token objects to be created
   * @return  {array}     tokens - an array of new token objects
   */
  createTokens(num) {
    const tokens = [];

    for (let i = 1; i < num; i++) {
      let token = new Token(this, i);
      tokens.push(token);
    }

    return tokens;
  }

  get unusedTokens() {
    return this.tokens.filter((token) => !token.dropped);
  }

  get activeToken() {
    return this.unusedTokens[0];
  }

  /**
   * Check if a player has any undropped tokens left
   * @return {Boolean}
   */
  checkTokens() {
    return this.unusedTokens.length == 0 ? false : true;
  }
}
