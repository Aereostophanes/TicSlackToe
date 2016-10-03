const Hapi = require("hapi");
var routes = require("./routes.js");

/**
 * Initial server set up. Can be run locally for testing as well as using app deployment
 * platforms such as Heroku.
 */ 
const server = new Hapi.Server();
server.connection({port : process.env.PORT || 8080});

server.route({
	method : "POST",
	path : "/ttt",
	handler : routes.ticSlackToe
});

server.start((err) => {
	if (err) throw err;
	console.log("Server running at: " + server.info.uri);
});

module.exports = server;