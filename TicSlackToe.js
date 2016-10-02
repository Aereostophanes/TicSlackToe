var Player = require("./Player.js");

var TicSlackToe = function(p1, p2) {
	this.p1 = new Player(p1, "X", true);
	this.p2 = new Player(p2, "O", false);
	this.board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
	this.numMoves = 0;
};

TicSlackToe.prototype.displayBoard = function() {
	var board = "";

	board += " --- --- --- \n";
	board += "| " + this.board[0] + " | " + this.board[1] + " | " + this.board[2] + " |\n";
	board += " --- --- ---\n";
	board += "| " + this.board[3] + " | " + this.board[4] + " | " + this.board[5] + " |\n";
	board += " --- --- ---\n";
	board += "| " + this.board[6] + " | " + this.board[7] + " | " + this.board[8] + " |\n";
	board += " --- --- --- \n";

	return board;
};

TicSlackToe.prototype.makeMove = function(tile) {
	var player = this.p1.getTurn() ? this.p1 : this.p2;

	this.board[tile - 1] = player.getMark();

	var tempTurn = this.p1.getTurn();
	this.p1.setTurn(this.p2.getTurn());
	this.p2.setTurn(tempTurn);

	this.numMoves += 1;
};

TicSlackToe.prototype.checkWinner = function() {
	var isWon = false;

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

TicSlackToe.prototype.getCurrentPlayer = function() {
	return this.p1.getTurn() ? this.p1 : this.p2;
};

TicSlackToe.prototype.getNextPlayer = function() {
	return this.p1.getTurn() ? this.p2 : this.p1;
};

TicSlackToe.prototype.getPlayers = function() {
	return [this.p1, this.p2];
};

TicSlackToe.prototype.getNumMoves = function() {
	return this.numMoves;
};

TicSlackToe.prototype.isOccupied = function(tile) {
	return this.board[tile - 1] == this.p1.getMark() || this.board[tile - 1] == this.p2.getMark();
};

module.exports = TicSlackToe;