const game = new Game();

/*
 * Listens for click on `#begin-game` and calls startGame() on game object
 */

document.getElementById('begin-game').addEventListener('click', function() {
  game.startGame();
  this.style.display = 'none';
  document.getElementById('play-area').style.opacity = '.5';
  document.getElementById('math-type').style.opacity = '1';
});

/**
*Listen for keyboard presses
*/
document.addEventListener('keydown', function(event){
  game.handleKeydown(event);
});

/**
*Listen for keyboard presses
*/
document.getElementById('enter-answer').addEventListener('click', function(){
  game.handleMathButton();
});
