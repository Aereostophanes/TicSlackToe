var Games = require('./Games.js');
var game = new Games();

var commands = {
	'create' : game.create,
	'move' : game.move,
	'show' : game.show,
	'help' : game.help,
	'remind' : game.remind
};

module.exports = {
	getResponse : function(request, reply) {
		if (request.query.token != 'AnRhdE7ComIJAecIcy6ciPjx') {
			reply(request);
		} else {
			var command = request.query.text.split(' ')[0];
			if (commands[command] != undefined) {
				commands[command](request, reply);
			} else {
				return reply('Invalid command. Call "/ttt help" for your options.');
			}
		}
	}
};