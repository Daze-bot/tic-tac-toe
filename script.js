const createPlayer = (name, marker, turn) => {
  getName = () => name;
  getMarker = () => marker;
  return {getName, getMarker, turn};
};

const newGame = (() => {
  let playerGame = document.querySelector('.vsPlayer');
  playerGame.addEventListener('click', choosePlayers);

  let gameStart = document.querySelector('.startGame');
  gameStart.addEventListener('click', showGame);

  let returnBtn = document.querySelector('.returnButton');
  returnBtn.addEventListener('click', backToStart);

  function choosePlayers() {
    let newGameDiv = document.querySelector('.newGameOptions');
    newGameDiv.classList.add('hidden');
    let vsPlayerDiv = document.querySelector('.vsPlayerOptions');
    vsPlayerDiv.classList.remove('hidden');
  }

  function showGame() {
    let player1Name = document.querySelector('#player1Name').value;
    let player2Name = document.querySelector('#player2Name').value;

    if (player1Name === "") {
      player1Name = "Player 1";
    }
    if (player2Name === "") {
      player2Name = "Player 2";
    }

    let vsPlayerDiv = document.querySelector('.vsPlayerOptions');
    vsPlayerDiv.classList.add('hidden');
    let gameSpace = document.querySelector('.gameSpace');
    gameSpace.classList.remove('hidden');

    gameFlow(player1Name, player2Name);
  }

  function backToStart() {
    let newGameDiv = document.querySelector('.newGameOptions');
    newGameDiv.classList.remove('hidden');
    let vsPlayerDiv = document.querySelector('.vsPlayerOptions');
    vsPlayerDiv.classList.add('hidden');
  }
})();

const gameBoard = (() => {
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  function displayMarks(array) {
    for (let i = 0; i < array.length; i++) {
      let currentSpace = document.getElementById(`${i}`);
      currentSpace.textContent = array[i];
    }
  }

  function checkWinner(array) {
    if (array[0] == array[1] && array[0] == array[2] && array[0] !== "") {
      return array[0];
    } else if (array[3] == array[4] && array[3] == array[5] && array[3] !== "") {
      return array[3];
    } else if (array[6] === array[7] && array[6] === array[8] && array[6] !== "") {
      return array[6];
    } else if (array[0] == array[3] && array[0] == array[6] && array[0] !== "") {
      return array[0];
    } else if (array[1] == array[4] && array[1] == array[7] && array[1] !== "") {
      return array[1];
    } else if (array[2] == array[5] && array[2] == array[8] && array[2] !== "") {
      return array[2];
    } else if (array[0] == array[4] && array[0] == array[8] && array[0] !== "") {
      return array[0];
    } else if (array[2] == array[4] && array[2] == array[6] && array[2] !== "") {
      return array[2];
    } else {
      if (array.includes("")) {
        return "";
      } else {
        return "draw";
      }
    }
  }

  return {gameArray, displayMarks, checkWinner};
})();

const gameFlow = (a, b) => {

  let player1 = createPlayer(a, "X", true);
  let player2 = createPlayer(b, "O", false);

  let gameSquares = document.querySelectorAll('.gameSquare');
  gameSquares.forEach(square => square.addEventListener('click', addMark));

  let resetBtn = document.querySelector('.restartGame');
  resetBtn.addEventListener('click', resetGame);

  let newGameBtn = document.querySelector('.newGame');
  newGameBtn.addEventListener('click', startNewGame);

  function addMark() {
    if (this.textContent !== "") {
      return
    } else if (player1.turn) {
      gameBoard.gameArray.splice(this.id, 1, player1.getMarker());
      this.classList.add('taken');
      player1.turn = false;
      player2.turn = true;
    } else if (player2.turn) {
      gameBoard.gameArray.splice(this.id, 1, player2.getMarker());
      this.classList.add('taken');
      player1.turn = true;
      player2.turn = false;
    }
    gameBoard.displayMarks(gameBoard.gameArray);
    displayWinner(gameBoard.checkWinner(gameBoard.gameArray));
  }

  function displayWinner(result) {
    let winScreen = document.querySelector('.winnerScreen');

    if (result === "") {
      return
    } else if (result === player1.getMarker()) {
      winScreen.textContent = "The winner is " + player1.getName() + "!";
      winScreen.classList.remove('hidden');
    } else if (result === player2.getMarker()) {
      winScreen.textContent = "The winner is " + player2.getName() + "!";
      winScreen.classList.remove('hidden');
    } else if (result === "draw") {
      winScreen.textContent = "The game ends in a DRAW";
      winScreen.classList.remove('hidden');
    }
    gameSquares.forEach(square => {
      square.removeEventListener('click', addMark);
      square.classList.add('taken');
    });
  }

  function resetGame() {
    let winScreen = document.querySelector('.winnerScreen');
    winScreen.textContent = "";
    winScreen.classList.add('hidden');
    gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
    gameBoard.displayMarks(gameBoard.gameArray);
    gameSquares.forEach(square => {
      square.addEventListener('click', addMark);
      square.classList.remove('taken');
    });
    player1.turn = true;
    player2.turn = false;
  }

  function startNewGame() {
    window.location.reload();
  }
};