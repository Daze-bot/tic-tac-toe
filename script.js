const gameBoard = (() => {
  let gameArray = [];
  function displayMarks(array) {
    array.forEach((marker, index) => {
    let currentSpace = document.getElementById(`${index}`);
    currentSpace.appendChild(document.createTextNode(`${marker}`));
    });
  }
  return {gameArray, displayMarks};
})();

gameBoard.gameArray = ["X", "O", "O", "O", "O"];
gameBoard.displayMarks(gameBoard.gameArray);