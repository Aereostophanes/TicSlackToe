var routes = module.exports = {
	ttt : function(request, reply) {
		console.log(request.params.token);
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
};