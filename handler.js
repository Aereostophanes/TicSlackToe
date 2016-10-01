var Games = require('./Games.js');
var games = new Games();

var commands = {
	'create' : games.create,
	'move' : games.move,
	'show' : games.show,
	'help' : games.help,
	'remind' : games.remind
};

module.exports = {
	getResponse : function(request, reply) {
		console.log(request);
		if (request.query.token != 'AnRhdE7ComIJAecIcy6ciPjx') {
			reply(request.query.token + ' ' + request.payload.token);
		} else {
			var command = request.query.text.split(' ')[0];
			if (commands[command] != undefined) {
				commands[command](request, reply);
			} else {
				reply('Invalid command. Call "/ttt help" for your options.');
			}
		}
	}
};