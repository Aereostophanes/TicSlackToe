var Games = require("./Games.js");

var token = process.env.SLASH_TOKEN || "";
var games = new Games();

var commands = {
	"create" : games.create,
	"move" : games.move,
	"show" : games.show,
	"help" : games.help
};

function validate(request) {
	var isValid = true;
	var command = request.payload.text.split(" ");
	switch (command[0]) {
		case "create":
			if (command.length != 2) {
				isValid = false;
			} else {
				if (command[1][0] != "@") {
					isValid = false;
				}
			}
			break;
		case "move":
			var currentUser = request.payload.user_name;
			if (command.length != 2) {
				isValid = false;
			} else {
				if (!Number.isInteger(parseInt(command[1]))) {
					isValid = false;
				}
			}
			break;
		case "show":
		case "help":
		case "remind":
			if (command.length != 1) {
				isValid = false;
			}
			break;
		default:
			isValid = false;
	}
	return isValid;
};

module.exports = {
	getResponse : function(request, reply) {
		if (request.payload.token !== token) {
			reply("Invalid token.");
		} else {
			if (!validate(request)) {
				reply("Invalid command. Call '/ttt help' for your options.");
			} else {
				var command = request.payload.text.split(" ")[0];
				commands[command](request, reply);
			}
		}
	}
};