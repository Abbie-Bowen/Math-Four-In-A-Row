class MathQuestion {
  constructor (){
    this.answer = 0;
    this.question = this.buildAdditionQuestion();
    this.attempt = 0;
  }

/**
* Creates a randomly generated addition question.
*@return {string} string - addition question.
*/
  buildAdditionQuestion(){
      let addendOne = Math.floor(Math.random() * (10));
      let addendTwo = Math.floor(Math.random() * (10));
      this.answer = addendOne + addendTwo;
      return `${addendOne}+${addendTwo}`;
  }

}
