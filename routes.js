var handler = require("./handler.js");

module.exports = {
	ticSlackToe : function(request, reply) {
		handler.getResponse(request, reply);
	}
};