const board = [];
let score = 0;

function initBoard() {
  for (let i = 0; i < 4; i++) {
    board[i] = [];
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }
  addRandomTile();
  addRandomTile();
  drawBoard();
}

function drawBoard() {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const tile = document.createElement("div");
      tile.className = "tile tile-" + board[i][j];
      tile.textContent = board[i][j] === 0 ? "" : board[i][j];
      boardContainer.appendChild(tile);
    }
  }
  document.getElementById("score-value").textContent = score;
}

function addRandomTile() {
  const empty = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) empty.push({ i, j });
    }
  }
  if (empty.length === 0) return;
  const { i, j } = empty[Math.floor(Math.random() * empty.length)];
  board[i][j] = Math.random() < 0.9 ? 2 : 4;
}

function slideAndCombine(array) {
  let arr = array.filter(val => val !== 0);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
    }
  }
  arr = arr.filter(val => val !== 0);
  while (arr.length < 4) arr.push(0);
  return arr;
}

function moveLeft() {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    const newRow = slideAndCombine(board[i]);
    if (board[i].toString() !== newRow.toString()) moved = true;
    board[i] = newRow;
  }
  if (moved) {
    addRandomTile();
    drawBoard();
  }
}

function moveRight() {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    let reversed = board[i].slice().reverse();
    let newRow = slideAndCombine(reversed).reverse();
    if (board[i].toString() !== newRow.toString()) moved = true;
    board[i] = newRow;
  }
  if (moved) {
    addRandomTile();
    drawBoard();
  }
}

function moveUp() {
  let moved = false;
  for (let j = 0; j < 4; j++) {
    let col = [board[0][j], board[1][j], board[2][j], board[3][j]];
    let newCol = slideAndCombine(col);
    for (let i = 0; i < 4; i++) {
      if (board[i][j] !== newCol[i]) moved = true;
      board[i][j] = newCol[i];
    }
  }
  if (moved) {
    addRandomTile();
    drawBoard();
  }
}

function moveDown() {
  let moved = false;
  for (let j = 0; j < 4; j++) {
    let col = [board[3][j], board[2][j], board[1][j], board[0][j]];
    let newCol = slideAndCombine(col);
    for (let i = 0; i < 4; i++) {
      if (board[3 - i][j] !== newCol[i]) moved = true;
      board[3 - i][j] = newCol[i];
    }
  }
  if (moved) {
    addRandomTile();
    drawBoard();
  }
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft": moveLeft(); break;
    case "ArrowRight": moveRight(); break;
    case "ArrowUp": moveUp(); break;
    case "ArrowDown": moveDown(); break;
  }
});

function resetGame() {
  score = 0;
  initBoard();
}

initBoard();
