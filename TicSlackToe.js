var Player = require("./Player.js");

/** 
 * TicSlackToe
 * This class maintains the components of the game and controls the
 * functions of the game, such as making moves and displaying the board.
 */
var TicSlackToe = function(p1, p2) {
	this.p1 = new Player(p1, "X", true);
	this.p2 = new Player(p2, "O", false);
	this.board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
	this.numMoves = 0;
};

/**
 * displayBoard
 * This function displays the board.
 */
TicSlackToe.prototype.displayBoard = function() {
	var board = "";

	// This concatenates the board format into one string. Could be optimized later to
	// accomodate MxN boards using for loops.
	board += " --- --- ---\n";
	board += "| " + this.board[0] + " | " + this.board[1] + " | " + this.board[2] + " |\n";
	board += " --- --- ---\n";
	board += "| " + this.board[3] + " | " + this.board[4] + " | " + this.board[5] + " |\n";
	board += " --- --- ---\n";
	board += "| " + this.board[6] + " | " + this.board[7] + " | " + this.board[8] + " |\n";
	board += " --- --- ---\n";

	return board;
};

/**
 * makeMove
 * This function updates the board with the move that was made.
 * param tile - number of desired tile to occupy
 */
TicSlackToe.prototype.makeMove = function(tile) {
	var player = this.p1.getTurn() ? this.p1 : this.p2;

	this.board[tile - 1] = player.getMark();

	// Swap player 1's turn with player 2's, since we know that they can't both have the same turn.
	var tempTurn = this.p1.getTurn();
	this.p1.setTurn(this.p2.getTurn());
	this.p2.setTurn(tempTurn);

	this.numMoves += 1;
};

/**
 * checkWinner
 * This function checks if their was a winner for the game.
 */
TicSlackToe.prototype.checkWinner = function() {
	var isWon = false;

	// There are only 8 possibilities for traditional TicTacToe, so we just check them all here.
	// This could be expanded in the future to check for MxN sized boards.
	if (this.board[0] == this.board[1] && this.board[1] == this.board[2]) {
		isWon = true;
	} else if (this.board[3] == this.board[4] && this.board[4] == this.board[5]) {
		isWon = true;
	} else if (this.board[6] == this.board[7] && this.board[7] == this.board[8]) {
		isWon = true;
	} else if (this.board[0] == this.board[3] && this.board[3] == this.board[6]) {
		isWon = true;
	} else if (this.board[1] == this.board[4] && this.board[4] == this.board[7]) {
		isWon = true;
	} else if (this.board[2] == this.board[5] && this.board[5] == this.board[8]) {
		isWon = true;
	} else if (this.board[0] == this.board[4] && this.board[4] == this.board[8]) {
		isWon = true;
	} else if (this.board[2] == this.board[4] && this.board[4] == this.board[6]) {
		isWon = true;
	}

	return isWon;
};

/**
 * getCurrentPlayer
 * This function returns the player whose turn it is.
 */
TicSlackToe.prototype.getCurrentPlayer = function() {
	return this.p1.getTurn() ? this.p1 : this.p2;
};

/**
 * getNextPlayer
 * This function returns the player whose turn it is about to be.
 */
TicSlackToe.prototype.getNextPlayer = function() {
	return this.p1.getTurn() ? this.p2 : this.p1;
};

/**
 * getPlayers
 * This function returns an array of the players in this game.
 */
TicSlackToe.prototype.getPlayers = function() {
	return [this.p1, this.p2];
};

/**
 * getNumMoves
 * This function returns the number of moves that have been made.
 */
TicSlackToe.prototype.getNumMoves = function() {
	return this.numMoves;
};

/**
 * isOccupied
 * This function returns whether or not a specific tile is occupied.
 * param tile - number of desired tile to check
 */
TicSlackToe.prototype.isOccupied = function(tile) {
	return this.board[tile - 1] == this.p1.getMark() || this.board[tile - 1] == this.p2.getMark();
};

module.exports = TicSlackToe;