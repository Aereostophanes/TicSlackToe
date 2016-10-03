var TicSlackToe = require("./TicSlackToe.js");

/** 
 * Games
 * This class keeps track of the games going on between channels (object with
 * key, value pairs between channel IDs and games).
 */
var Games = function() {
	this.games = {};
};

/**
 * create
 * This function creates a TicSlackToe game between the specified users.
 * param request - a request
 * param reply - reply object that will send response to server
 */
Games.prototype.create = function(request, reply) {
	var id = request.payload.channel_id;

	// Don't create a game if one already exists.
	if (this.games != undefined && this.games[id] != undefined) {
		reply("A game has already been created in this channel.");
	} else {
		// The reason for this line is because of a minor niggle in which this.games is not
		// initialized to an empty object upon initialization.
		if (this.games == undefined) {
			this.games = {};
		}
		this.games[id] = new TicSlackToe("@" + request.payload.user_name, request.payload.text.split(" ")[1]);
		this.show(request, reply);
	}
};

/**
 * show
 * This function displays the board and the current player's turn to anyone in the channel
 * that wants to see.
 * param request - a request
 * param reply - reply object that will send response to server
 */
Games.prototype.show = function(request, reply) {
	var id = request.payload.channel_id;

	if (this.games == undefined || this.games[id] == undefined) {
		return reply("There is no game in this channel to show.");
	}

	var currentGame = this.games[id];
	var board = currentGame.displayBoard();
	var player = currentGame.getPlayers()[0].getTurn() ? currentGame.getPlayers()[0] : currentGame.getPlayers()[1];

	// Append the appropriate text to the message posted to the channel (the board) and reply
	// with pre-formatted text.
	var nextTurn = "\n" + player.getName() + "(" + player.getMark() + "), it is your turn.";
	board += nextTurn;
	reply({"text" : "```" + board + "```", "response_type" : "in_channel"});
};

/**
 * move
 * This function records a move on the TicSlackToe board from the user.
 * param request - a request
 * param reply - reply object that will send response to server
 */
Games.prototype.move = function(request, reply) {
	var id = request.payload.channel_id;

	if (this.games == undefined || this.games[id] == undefined) {
		return reply("There is no game in this channel, so a move cannot be made.");
	}

	var currentGame = this.games[id];
	var playerNames = [currentGame.getPlayers()[0].getName(), currentGame.getPlayers()[1].getName()];
	var currentUser = "@" + request.payload.user_name;

	// Only allow a move to be made if the player is in the game and it's their turn.
	if (playerNames[0] != currentUser && playerNames[1] != currentUser) {
		return reply("You are not an active participant in this game. Only " + playerNames[0] + " and " + playerNames[1] + " can make moves.");
	} else if ("@" + request.payload.user_name != currentGame.getCurrentPlayer().getName()) {
		return reply("It is not your turn yet. Wait for " + currentGame.getCurrentPlayer().getName() + " to make a move.");
	}

	var move = parseInt(request.payload.text.split(" ")[1]);

	// Moves that are not on the board or are occupied are invalid.
	if (move < 1 || move > 9) {
		return reply("That is an invalid move. Try again.");
	} else if (currentGame.isOccupied(move)) {
		return reply("This space has already been taken. Try again.");
	}

	currentGame.makeMove(move);
	var board = currentGame.displayBoard();

	// Display a draw, the winner, or the next player's turn and terminate the game accordingly.
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
		var winText = winner.getName() + " is the winner! Game over!";
		board += winText;
		delete this.games[id];
	}
	reply({"text" : "```" + board + "```", "response_type" : "in_channel"});
};

/**
 * help
 * This function displays the available commands to a user.
 * param request - a request
 * param reply - reply object that will send response to server
 */
Games.prototype.help = function(request, reply) {
	var help = "Here are the commands you can use:\n";
	help += "create [@opponent-user] - this command allows you to create a game with the specified user.\n";
	help += "show - this command displays the board\n";
	help += "move [tile-num] - this command simulates making a move on the specified tile number.\n";
	help += "end - this command ends the game.\n";
	help += "help - this command shows you what commands are available to you."

	reply("```" + help + "```");
};

/**
 * end
 * This function ends a TicSlackToe game.
 * param request - a request
 * param reply - reply object that will send response to server
 */
Games.prototype.end = function(request, reply) {
	var id = request.payload.channel_id;

	if (this.games == undefined || this.games[id] == undefined) {
		return reply("There is no game in this channel to end.");
	}
	// Delete the game object being stored for this channel so that it won't appear any more
	// (moves can't be made, show can't be called, etc.).
	delete this.games[id];
	reply({"text" : "The Tic Tac Toe game in this channel has been terminated.", "response_type" : "in_channel"});
};

module.exports = Games;