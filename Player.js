/** 
 * Player
 * This class that holds the player name, their mark (X or O), and
 * whether or not it's their turn.
 */
var Player = function(player, mark, isTurn) {
	this.player = player;
	this.mark = mark;
	this.isTurn = isTurn;
};

/**
 * getTurn
 * This function returns whether or not it's this player's turn.
 */
Player.prototype.getTurn = function() {
	return this.isTurn;
};

/**
 * getMark
 * This function returns the mark of this player ("X" or "O" for 2-player games).
 */
Player.prototype.getMark = function() {
	return this.mark;
};

/**
 * getName
 * This function returns the name of this player.
 */
Player.prototype.getName = function() {
	return this.player;
};

/**
 * setTurn
 * This function sets the turn of this player.
 */
Player.prototype.setTurn = function(isTurn) {
	this.isTurn = isTurn;
};

module.exports = Player;