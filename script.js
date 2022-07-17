const createPlayer = (name, marker, turn) => {
  getName = () => name;
  getMarker = () => marker;
  return {getName, getMarker, turn};
};

const gameBoard = (() => {
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  function displayMarks(array) {
    for (let i = 0; i < array.length; i++) {
      let currentSpace = document.getElementById(`${i}`);
      currentSpace.textContent = array[i];
    }
  }
  return {gameArray, displayMarks};
})();

const gameFlow = (() => {
  let player1 = createPlayer("A", "X", true);
  let player2 = createPlayer("B", "O", false);

  let gameSquares = document.querySelectorAll('.gameSquare');
  gameSquares.forEach(square => square.addEventListener('click', addMark));

  function addMark() {
    if (player1.turn) {
      if (this.textContent === "") {
        gameBoard.gameArray.splice(this.id, 1, player1.getMarker());
        gameBoard.displayMarks(gameBoard.gameArray);
      } else {
        return;
      }
      player1.turn = false;
      player2.turn = true;
    } else {
      if (this.textContent === "") {
        gameBoard.gameArray.splice(this.id, 1, player2.getMarker());
        gameBoard.displayMarks(gameBoard.gameArray);
      } else {
        return;
      }
      player1.turn = true;
      player2.turn = false;
    }
  }
})();