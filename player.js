var stack;
var bet;
var active;
var inHand;

function player(stack, bet, active, inHand) {
  this.stack = stack;
  this.bet = bet;
  this.active = active;
  this.inHand = inHand;
}

module.exports = { player };
