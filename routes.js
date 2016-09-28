var routes = module.exports = {
	ttt : function(request, reply) {
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
};