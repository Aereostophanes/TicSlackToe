/** 
 * Player class that holds the player name, their mark (X or O), and
 * whether or not it's their turn.
 */

var Player = function(player, mark, isTurn) {
	this.player = player;
	this.mark = mark;
	this.isTurn = isTurn;
};

// Getters for Player class

Player.prototype.getTurn = function() {
	return this.isTurn;
};

Player.prototype.getMark = function() {
	return this.mark;
};

Player.prototype.getName = function() {
	return this.player;
};

// Setters for Player class

Player.prototype.setTurn = function(isTurn) {
	this.isTurn = isTurn;
};

module.exports = Player;