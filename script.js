const createPlayer = (name, marker) => {
  getName = () => name;
  getMarker = () => marker;
  return {getName, getMarker};
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
  let player1 = createPlayer("player1", "X");
  let player2 = createPlayer("player2", "O");
  let gameSquares = document.querySelectorAll('.gameSquare');
  gameSquares.forEach(square => square.addEventListener('click', addMark));
  function addMark() {
    gameBoard.gameArray.splice(this.id, 1, player1.getMarker());
    gameBoard.displayMarks(gameBoard.gameArray);
  }
})();