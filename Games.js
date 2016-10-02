var TicSlackToe = require("./TicSlackToe.js");

var Games = function() {
	this.games;
};

Games.prototype.create = function(request, reply) {
	var id = request.payload.channel_id;
	if (this.games != undefined && this.games[id] != undefined) {
		reply("A game has already been created in this channel.");
	} else {
		if (this.games == undefined) {
			this.games = {};
		}
		this.games[id] = new TicSlackToe("@" + request.payload.user_name, request.payload.text.split(" ")[1]);
		this.show(request, reply);
	}
};

Games.prototype.show = function(request, reply) {
	var id = request.payload.channel_id;
	if (this.games == undefined || this.games[id] == undefined) {
		return reply("There is no game in this channel to show.");
	}
	var currentGame = this.games[id];
	var board = currentGame.displayBoard();
	var player = currentGame.getPlayers()[0].getTurn() ? currentGame.getPlayers()[0] : currentGame.getPlayers()[1];
	var nextTurn = "\n" + player.getName() + "(" + player.getMark() + "), it is your turn.";
	board += nextTurn;
	//reply({"text" : board, "response_type" : "in_channel"});
	reply(board);
};

Games.prototype.move = function(request, reply) {
	var id = request.payload.channel_id;
	if (this.games == undefined || this.games[id] == undefined) {
		return reply("There is no game in this channel, so a move cannot be made.");
	}
	var currentGame = this.games[id];
	var playerNames = [currentGame.getPlayers()[0].getName(), currentGame.getPlayers()[1].getName()];
	var currentUser = "@" + request.payload.user_name;
	if (playerNames[0] != currentUser && playerNames[1] != currentUser) {
		return reply("You are not an active participant in this game. Only " + playerNames[0] + " and " + playerNames[1] + " are.");
	} else if ("@" + request.payload.user_name != currentGame.getCurrentPlayer().getName()) {
		return reply("It is not your turn yet. Wait for " + currentGame.getCurrentPlayer().getName() + " to make a move.");
	}
	var move = parseInt(request.payload.text.split(" ")[1]);
	if (move < 1 || move > 9) {
		return reply("That is an invalid move. Try again.");
	} else if (currentGame.isOccupied(move)) {
		return reply("This space has already been taken. Try again.");
	}
	currentGame.makeMove(move);
	var board = currentGame.displayBoard();
	if (!currentGame.checkWinner()) {
		var player = currentGame.getCurrentPlayer();
		if (currentGame.getNumMoves() == 9) {
			var draw = "\nIt was a draw game!";
			board += draw;
			delete this.games[id];
		} else {
			var nextTurn = "\n" + player.getName() + "(" + player.getMark() + "), it is your turn.";
			board += nextTurn;
		}
	} else {
		var winner = currentGame.getNextPlayer();
		var winText = winner.getName() + " is the winner!";
		board += winText;
		delete this.games[id];
	}
	reply({"text" : board, "response_type" : "in_channel"});
};

Games.prototype.help = function(request, reply) {
	var help = "Here are the commands you can use:\n";
	help += "create [@opponent-user] - this command allows you to create a game with the specified user.\n";
	help += "show - this command displays the board\n";
	help += "move [tile-num] - this command simulates making a move on the specified tile number.\n";
	help += "remind - this command reminds your opponent to make a move.\n";
	help += "help - this command shows you what commands are available to you."

	reply(help);
};

Games.prototype.end = function(request, reply) {
	var id = request.payload.channel_id;
	if (this.games == undefined || this.games[id] == undefined) {
		return reply("There is no game in this channel to end.");
	}
	var currentGame = this.games[id];
	var playerNames = [currentGame.getPlayers()[0].getName(), currentGame.getPlayers()[1].getName()];
	var currentUser = "@" + request.payload.user_name;
	if (playerNames[0] != currentUser && playerNames[1] != currentUser) {
		return reply("You are not an active participant in this game, so you can't end it. Only " + playerNames[0] + " and " + playerNames[1] + " can end it.");
	} else {
		delete this.games[id];
		reply({"text" : "The Tic Tac Toe game in this channel has been terminated.", "response_type" : "in_channel"});
	}
};

module.exports = Games;