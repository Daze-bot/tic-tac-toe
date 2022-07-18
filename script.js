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
    if (array[0] == array[1] && array[0] == array[2]) {
      return array[0];
    } else if (array[3] == array[4] && array[3] == array[5]) {
      return array[3];
    } else if (array[6] == array[7] && array[6] == array[8]) {
      return array[6];
    } else if (array[0] == array[3] && array[0] == array[6]) {
      return array[0];
    } else if (array[1] == array[4] && array[1] == array[7]) {
      return array[1];
    } else if (array[2] == array[5] && array[2] == array[8]) {
      return array[2];
    } else if (array[0] == array[4] && array[0] == array[8]) {
      return array[0];
    } else if (array[2] == array[4] && array[2] == array[6]) {
      return array[2];
    } else {
      return "";
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
    let winner = gameBoard.checkWinner(gameBoard.gameArray);
    if (winner === "") {
      return
    } else if (winner === player1.getMarker()) {
      console.log("The winner is: " + player1.getName());
      gameSquares.forEach(square => square.removeEventListener('click', addMark));
    } else if (winner === player2.getMarker()) {
      console.log("The winner is: " + player2.getName());
      gameSquares.forEach(square => square.removeEventListener('click', addMark)); 
    }
  }
})();