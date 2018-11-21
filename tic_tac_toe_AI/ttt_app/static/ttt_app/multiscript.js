// Design the board
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Assign value to players
var HUMAN1 = -1;
var HUMAN2 = +1;

// Detect if a player wins
function gameOver(state, player) {
  if(state[0]==player && state[1]==player && state[2]==player ||
     state[3]==player && state[4]==player && state[5]==player ||
     state[6]==player && state[7]==player && state[8]==player ||
     state[0]==player && state[3]==player && state[6]==player ||
     state[1]==player && state[4]==player && state[7]==player ||
     state[2]==player && state[5]==player && state[8]==player ||
     state[0]==player && state[4]==player && state[8]==player ||
     state[6]==player && state[4]==player && state[2]==player)

      return true;

  else
      return false;
}

// Test whether the human or computer wins
function gameOverAll(state) {
	return gameOver(state, HUMAN1) || gameOver(state, HUMAN2);
}

// Find the number of empty cells
function emptyCells(state) {
	var cells = [];
	for (var x = 0; x < 9; x++) {
			if (state[x] == 0)
				cells.push(x);
	}

	return cells;
}

// Check if a move is valid or not
function validMove(x) {
		if (board[x] == 0) {
			return true;
		}
		else {
			return false;
		}
	}

// Set the move is the position is valid
function setMove(x, player) {
	if (validMove(x)) {
		board[x] = player;
		return true;
	}
	else {
		return false;
	}
}

// Make the restart button disabled at the beginning
var button = document.getElementById("b");
button.disabled = true;

// Declare the first player and sign
var player=HUMAN1;
sign="X";

// Change the player alternately
function changePlayer() {
  if (player==HUMAN1) {
    player=HUMAN2;
    sign="O";
  }

  else {
    player=HUMAN1;
    sign="X";
  }
}
// Function to handle clickEvent of human in human vs AI mode
function clickedCell(cell) {

	var conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;

	if (conditionToContinue == true) {
    var j = cell.id;
		for(var i=0; i<9; i++) {
			if (j==i)
			var x=i;
		}
		var move = setMove(x, player);
		if (move == true) {
			cell.innerHTML = sign;
			if (conditionToContinue)
				changePlayer();
		}
	}
	if (gameOver(board, HUMAN2)) {
		var lines;
		var cell;
		var msg;

		if (board[0] == 1 && board[1] == 1 && board[2] == 1)
			lines = [0, 1, 2];
		else if (board[3] == 1 && board[4] == 1 && board[5] == 1)
			lines = [3, 4, 5];
		else if (board[6] == 1 && board[7] == 1 && board[8] == 1)
			lines = [6, 7, 8];
		else if (board[0] == 1 && board[3] == 1 && board[6] == 1)
			lines = [0, 3, 6];
		else if (board[1] == 1 && board[4] == 1 && board[7] == 1)
			lines = [1, 4, 7];
		else if (board[2] == 1 && board[5] == 1 && board[8] == 1)
			lines = [2, 5, 8];
		else if (board[0] == 1 && board[4] == 1 && board[8] == 1)
			lines = [0, 4, 8];
		else if (board[6] == 1 && board[4] == 1 && board[2] == 1)
			lines = [6, 4, 2];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i]));
			cell.style.color = "red";
		}

		msg = document.getElementById("message");
		msg.innerHTML = "Human2 won!";
	}

  if (gameOver(board, HUMAN1)) {
		var lines;
		var cell;
		var msg;

		if (board[0] == -1 && board[1] == -1 && board[2] == -1)
			lines = [0, 1, 2];
		else if (board[3] == -1 && board[4] == -1 && board[5] == -1)
			lines = [3, 4, 5];
		else if (board[6] == -1 && board[7] == -1 && board[8] == -1)
			lines = [6, 7, 8];
		else if (board[0] == -1 && board[3] == -1 && board[6] == -1)
			lines = [0, 3, 6];
		else if (board[1] == -1 && board[4] == -1 && board[7] == -1)
			lines = [1, 4, 7];
		else if (board[2] == -1 && board[5] == -1 && board[8] == -1)
			lines = [2, 5, 8];
		else if (board[0] == -1 && board[4] == -1 && board[8] == -1)
			lines = [0, 4, 8];
		else if (board[6] == -1 && board[4] == -1 && board[2] == -1)
			lines = [6, 4, 2];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i]));
			cell.style.color = "red";
		}

		msg = document.getElementById("message");
		msg.innerHTML = "Human1 won!";
	}

	if (emptyCells(board).length == 0 && !gameOverAll(board)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
	}
	if (gameOverAll(board) == true || emptyCells(board).length == 0) {
		button.disabled = false;
	}
}

// Restart the game
function restartBnt(button) {
	for (var i=0; i<9; i++) {
		cell = document.getElementById(String(i));
		cell.style.color = "black";
	}

		var htmlBoard;
		var msg;

		for (var x = 0; x < 9; x++) {
				board[x] = 0;
				htmlBoard = document.getElementById(String(x));
				htmlBoard.innerHTML = "";
		}

		msg = document.getElementById("message");
		msg.innerHTML = "";
  button.disabled=true;
}
