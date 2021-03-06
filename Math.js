class MathQuestion {
  constructor(mathType) {
    this.answer = 0;
    this.mathType = mathType;
    this.question = this.buildMathProblem();
  }

  /**
   * Creates a randomly generated addition question.
   * set this.answer to sum
   *@return {string} string - addition question.
   */
  buildAdditionQuestion() {
    document.getElementById("answer").value = "";
    let numeralOne = Math.floor(Math.random() * 10);
    let numeralTwo = Math.floor(Math.random() * 10);
    this.answer = numeralOne + numeralTwo;
    document.getElementById(
      "math-question"
    ).textContent = `${numeralOne} + ${numeralTwo} =`;
  }

  /**
   * Creates a randomly generated subtraction question.
   * set this.answer to difference
   *@return {string} string - subtraction question.
   */
  buildSubtractionQuestion() {
    document.getElementById("answer").value = "";
    let numeralOne = Math.floor(Math.random() * 10);
    let numeralTwo = Math.floor(Math.random() * 10);
    let sum = numeralOne + numeralTwo;
    this.answer = sum - numeralOne;
    document.getElementById(
      "math-question"
    ).textContent = `${sum} - ${numeralOne} =`;
  }

  /**
   * Creates a randomly generated multiplication question.
   * set this.answer to product
   *@return {string} string - multiplication question.
   */
  buildMultiplicationQuestion() {
    document.getElementById("answer").value = "";
    let numeralOne = Math.floor(Math.random() * 10);
    let numeralTwo = Math.floor(Math.random() * 10);
    this.answer = numeralOne * numeralTwo;
    document.getElementById(
      "math-question"
    ).textContent = `${numeralOne} x ${numeralTwo} =`;
  }

  /**
   * Creates a randomly generated division question.
   * set this.answer to
   *@return {string} string - division question.
   */
  buildDivisionQuestion() {
    document.getElementById("answer").value = "";
    let numeralOne = Math.floor(Math.random() * 10);
    let numeralTwo = Math.floor(Math.random() * 10);
    let product = numeralOne * numeralTwo;
    this.answer = product / numeralOne;
    document.getElementById(
      "math-question"
    ).textContent = `${product} / ${numeralOne} =`;
  }
  /**
   * branches math problem set based on player.mathType selection
   */
  buildMathProblem() {
    let mathType = this.mathType;

    switch (mathType) {
      case "addition":
        return this.buildAdditionQuestion();
      case "subtraction":
        return this.buildSubtractionQuestion();
      case "multiplication":
        return this.buildMultiplicationQuestion();
      case "division":
        return this.buildDivisionQuestion();
    }
  }
}
