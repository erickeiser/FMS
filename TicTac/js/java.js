/*
 * Tic Tac Toe
 */
$(function () {

	var N_SIZE = 3,
		EMPTY = "&nbsp;",
		boxes = [],
		turn = "X",
		score,
		moves;

	/*
	 * Creates and attaches the DOM elements for the board as an
	 * HTML table, assigns the identifiers for each cell, and starts
	 * a new game.
	 */
	function init() {
		var board = $("<table border=1 cellspacing=0>"),
			identifier = 1;
		for (var i = 0; i < N_SIZE; i++) {
			var row = $("<tr>");
			board.append(row);
			for (var j = 0; j < N_SIZE; j++) {
				var cell = $("<td height=120 width=120 align=center valign=center></td>");
				cell.addClass('col' + j).addClass('row' + i);
				cell[0].identifier = identifier;
				cell.click(set);
				row.append(cell);
				boxes.push(cell);
				identifier += identifier;
			}
		}

		$(document.getElementById("tictactoe") || document.body).append(board);
		startNewGame();
	}

	/*
	 * New game
	 */
	function startNewGame() {
		score = {
			"X": 0,
			"O": 0
		};
		moves = 0;
		turn = "X";
		boxes.forEach(function (square) {
			square.html(EMPTY);
		});
	}

	/*
	 * Check if a win or not
	 */
	function win(clicked) {
		// Get all cell classes
		var memberOf = clicked[0].className.split(/\s+/);
		for (var i = 0; i < memberOf.length; i++) {
			var testClass = '.' + memberOf[i];
			// winning condition: turn == N_SIZE,
			if ($('#tictactoe').find(testClass + ':contains(' + turn + ')').length == N_SIZE) {
				return true;
			}
		}
		return false;
	}

	/*
	 * Sets clicked square and also updates the turn.
	 */
	function set() {
		if ($(this).html() !== EMPTY) {
			return;
		}
		$(this).html(turn);
		moves += 1;
		score[turn] += $(this)[0].identifier;
		//console.log(score[turn]);
		if (win($(this))) {
			alert(turn + " wins the game!");
			startNewGame();
		} else if (moves === N_SIZE * N_SIZE) {
			alert("Draw game!");
			startNewGame();
		} else {
			turn = turn === "X" ? "O" : "X";
			$('#turn').text(turn + ' to play')
		}
	}

	init();
});
