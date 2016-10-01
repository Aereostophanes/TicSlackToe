var TicSlackToe = require('./TicSlackToe.js');

var Games = function() {
	this.games;
};

Games.prototype.create = function(request, reply) {
	var id = request.query.channel_id;
	if (this.games != undefined && this.games[id] != undefined) {
		return reply('A game has already been created in this channel.');
	} else {
		if (this.games == undefined) this.games = {};
		this.games[id] = new TicSlackToe('@' + request.query.user, request.query.text.split(' ')[1]);
		return reply(this.games[id].displayBoard());
	}
};

Games.prototype.show = function(request, reply) {
	var id = request.query.channel_id;
	return reply(this.games[id].displayBoard());
};

Games.prototype.move = function(request, reply) {
	var id = request.query.channel_id;
	this.games[id].makeMove(parseInt(request.query.text.split(' ')[1]));
	return reply(this.games[id].displayBoard());
};

Games.prototype.help = function(request, reply) {
	var help = 'Here are the commands you can use:\n';
	help += 'create [@opponent-user] - this command allows you to create a game with the specified user.\n';
	help += 'show - this command displays the board\n';
	help += 'move [tile-num] - this command simulates making a move on the specified tile number.\n';
	help += 'remind - this command reminds your opponent to make a move.\n';
	help += 'help - this command shows you what commands are available to you.'

	var helpJSON = {
		'response-type' : 'ephemeral',
		'text' : help
	};

	return reply(helpJSON);
};

Games.prototype.remind = function(request, reply) {
	var id = request.query.channel_id;
	if (this.games[id] == undefined) {
		return reply('No one is playing a game in this channel.');
	} else {

	}
};

module.exports = Games;