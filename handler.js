var Games = require("./Games.js");
var WebClient = require("@slack/client").WebClient;

var token = process.env.SLASH_TOKEN || "";
var test_token = process.env.TEST_TOKEN || "xoxp-84138053015-84145090146-86399348640-3cbe0da8a69687c5c3a0e70a140213e6";
var games = new Games();

var web = new WebClient(test_token);
var users = {};

// All of the possible commands for the TicSlackToe game. This could hold
// commands for multiple different types of games in the future.
var commands = {
	"create" : games.create,
	"move" : games.move,
	"show" : games.show,
	"help" : games.help,
	"end" : games.end
};

/**
 * validate
 * This function validates the body text from a request.
 * param request - a request
 */
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
				} else if (command[1] == "@channel" || command[1] == "@slackbot" || command[1] == "@everyone") {
					isValid = false;
				// We don't want people who aren't in the team to be invited to play a game.
				} else if (users[command[1]] == undefined) {
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
		// These three commands have the same validation check, which is why the breaks are omitted here.
		case "show":
		case "help":
		case "end":
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
	// Calls the appropriate function based on the request text.
	getTicSlackToeResponse : function(request, reply) {
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
	},
	// Helper function that sets the users that are in the team.
	setUsers : function() {
		web.users.list(function userListCb(err, info) {
			if (err) {
				console.log(err);
			} else {
				var userList = info["members"];
				for (var i = 0; i < userList.length; i = i + 1) {
					// Puts users in a dictionary for quicker searching (in spite of the useless value).
					if (users["@" + userList[i]["name"]] == undefined) {
						users["@" + userList[i]["name"]] = true;
					}
				}
			}
		});
	}
};