'use strict';

const Hapi = require('hapi');
var routes = require('./routes.js');

const server = new Hapi.Server();
server.connection({port : 8080});

server.route({
	method : 'GET',
	path : '/ttt',
	handler : routes.ttt
});

server.start((err) => {
	if (err) throw err;
	console.log('Server running at: ' + server.info.uri);
});


