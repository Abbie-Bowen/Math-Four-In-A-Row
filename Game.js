class Game {
  constructor () {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }
  /*
 * Creates two player objects
 * @return  {Array}    An array of two Player objects.
 */
  createPlayers(){
    const players = [new Player('player one', 1, '#e15258', active = true);
                    new Player('player two', 2, '#e59a13')];
    return players;
  }
  /*
  *Gets game ready to play
  */
  startGame() {}
}
