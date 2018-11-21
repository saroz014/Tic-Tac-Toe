// Design the board
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Assign value to players
var HUMAN = -1;
var COMP = +1;

// Evaluate the state of board
function evalute(state) {
	var score = 0;

	if (gameOver(state, COMP)) {
		score = +1;
	}
	else if (gameOver(state, HUMAN)) {
		score = -1;
	} else {
		score = 0;
	}

	return score;
}

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
	return gameOver(state, HUMAN) || gameOver(state, COMP);
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

// Minimax algorithm to select the best move for computer
function minimax(state, depth, player) {
	var best;

	if (player == COMP) {
		best = [-9, -1000];
	}
	else {
		best = [-9, +1000];
	}

	if (depth == 0 || gameOverAll(state)) {
		var score = evalute(state);
		return [-9, score];
	}

	emptyCells(state).forEach(function (cell) {
		state[cell] = player;
		var score = minimax(state, depth - 1, -player);
		state[cell] = 0;
		score[0] = cell;

		if (player == COMP) {
			if (score[1] > best[1])
				best = score;
		}
		else {
			if (score[1] < best[1])
				best = score;
		}
	});

	return best;
}

// Function to place computer's move
function aiTurn() {
	var x;
	var move;
	var cell;
  var depth = emptyCells(board).length;

	if (depth == 9) {
		x = parseInt(Math.random() * 3);
	}
	else {
		move = minimax(board, depth, COMP);
		x = move[0];
	}

	if (setMove(x, COMP)) {
		cell = document.getElementById(String(x));
		cell.innerHTML = "O";
	}
}

// Function to handle clickEvent of human in human vs AI mode
function clickedCellAI(cell) {
	var button = document.getElementById("b");
	button.disabled = true;
	var conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;

	if (conditionToContinue == true) {
    var j = cell.id;
		for(var i=0; i<9; i++) {
			if (j==i)
			var x=i;
		}
		var move = setMove(x, HUMAN);
		if (move == true) {
			cell.innerHTML = "X";
			if (conditionToContinue)
				aiTurn();
		}
	}
	if (gameOver(board, COMP)) {
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
		msg.innerHTML = "You lose!";
	}
	if (emptyCells(board).length == 0 && !gameOverAll(board)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
	}
	if (gameOverAll(board) == true || emptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

// Restart the game
function restartBnt(button) {
	for (var i=0; i<9; i++) {
		cell = document.getElementById(String(i));
		cell.style.color = "black";
	}

	if (button.value == "Start AI") {
		aiTurn();
		button.disabled = true;
	}
	else if (button.value == "Restart") {
		var htmlBoard;
		var msg;

		for (var x = 0; x < 9; x++) {
				board[x] = 0;
				htmlBoard = document.getElementById(String(x));
				htmlBoard.innerHTML = "";
		}
		button.value = "Start AI";
		msg = document.getElementById("message");
		msg.innerHTML = "";
	}
}
