const gameBoard = (() => {
  let gameArray = ["X", "O", "X", "O", "X", "O","X", "O", "X"];
  gameArray.forEach((marker, index) => {
    let currentSpace = document.getElementById(`${index}`);
    currentSpace.appendChild(document.createTextNode(`${marker}`));
  })
})();