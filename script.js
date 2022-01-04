var arr = Array.from(Array(9), () => new Array(9));
function getMatrix() {
  var counter = 1;
  var text = "input";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var id = text + counter.toString();
      counter++;
      if (document.getElementById(id).value == "") {
        arr[i][j] = ".";
      } else {
        arr[i][j] = parseInt(document.getElementById(id).value);
      }
    }
  }

  solve(arr);
  populateAnswer(arr);
}
function nextEmptySpot(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === ".") return [i, j];
    }
  }
  return [-1, -1];
}
function checkRow(board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}
function checkColumn(board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}
function checkSquare(board, row, column, value) {
  var boxRow = Math.floor(row / 3) * 3;
  var boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}
function checkValue(board, row, column, value) {
  if (
    checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
}
function solve(board) {
  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  // there is no more empty spots
  if (row === -1) {
    return board;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValue(board, row, col, num)) {
      board[row][col] = num;
      solve(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) board[row][col] = ".";

  return board;
}

function populateAnswer(arr) {
  var counter1 = 1;
  var text1 = "input";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var id1 = text1 + counter1.toString();
      counter1++;
      document.getElementById(id1).value = arr[i][j];
    }
  }
}
