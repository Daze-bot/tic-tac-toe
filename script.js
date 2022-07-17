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

  function checkWinner(array) {
    if (array[0] === array[1] && array[0] === array[2]) {
      if (gameFlow.player1.getMarker() === array[0]) {
        console.log("The Winner is: " + gameFlow.player1.getName());
      } else {
        console.log("The Winner is: " + gameFlow.player2.getName());
      }
    }
  }

  return {gameArray, displayMarks, checkWinner};
})();

const gameFlow = (() => {
  let player1 = createPlayer("A", "X", true);
  let player2 = createPlayer("B", "O", false);

  let gameSquares = document.querySelectorAll('.gameSquare');
  gameSquares.forEach(square => square.addEventListener('click', addMark));

  function addMark() {
    if (this.textContent !== "") {
      return
    } else if (player1.turn) {
      gameBoard.gameArray.splice(this.id, 1, player1.getMarker());
      player1.turn = false;
      player2.turn = true;
    } else if (player2.turn) {
      gameBoard.gameArray.splice(this.id, 1, player2.getMarker());
      player1.turn = true;
      player2.turn = false;
    }
    gameBoard.displayMarks(gameBoard.gameArray);
    gameBoard.checkWinner(gameBoard.gameArray);
  }

  return {player1, player2};
})();