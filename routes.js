var handler = require("./handler.js");

/**
 * This file handles responses to requests from a server. The reason this functionality
 * is abstracted into a file of its own is to accomodate more potential types of
 * games that may have different responses.
 */
module.exports = {
	// TicSlackToe-specific response
	ticSlackToe : function(request, reply) {
		// setUsers() is called here every time just in case people leave or join the game at any point.
		handler.setUsers();

		setTimeout(function() {
			handler.getTicSlackToeResponse(request, reply);
		}, 1000);
	}
};