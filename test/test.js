const Lab = require('lab');
const assert = require('assert');

const TicSlackToe = require("../TicSlackToe.js");
const Games = require("../Games.js");

const lab = exports.lab = Lab.script();
const server = require("../index.js");

lab.suite('tic slack toe', () => {
	lab.test('returns 2 as number of active players when game is created', (done) => {
		var game = new TicSlackToe("X", "O");
	    assert.deepEqual(game.getPlayers().length, 2);
	    done();
	});

	lab.test('correctly assigns the correct player to each turn', (done) => {
		var game = new TicSlackToe("X", "O");
	    assert.deepEqual(game.getCurrentPlayer(), {player: "X", mark: "X", isTurn: true});
	    assert.deepEqual(game.getNextPlayer(), {player: "O", mark: "O", isTurn: false});
	    done();
	});

	lab.test('returns whether or not a tile is occupied on the board', (done) => {
		var game = new TicSlackToe("X", "O");
		assert.deepEqual(game.isOccupied(1), false);
		game.makeMove(1);
		assert.deepEqual(game.isOccupied(1), true);
		done();
	});

	lab.test('returns whether or not someone has won', (done) => {
		var game = new TicSlackToe("X", "O");
		assert.deepEqual(game.checkWinner(), false);
		game.makeMove(1);
		game.makeMove(2);
		game.makeMove(4);
		game.makeMove(5);
		game.makeMove(7);
		assert.deepEqual(game.getNumMoves(), 5);
		assert.deepEqual(game.checkWinner(), true);
		done();
	});
});

lab.suite('server', () => {
	lab.test('makes sure the server is running', (done) => {
		var options = {
			method : "POST",
			url : "/ttt"
		};
		server.inject(options, function(response) {
			assert.deepEqual(response.statusCode, 200);
		});
		done();
	});
});