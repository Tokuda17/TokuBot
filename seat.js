var player;
var seatNumber;

function seat(player, seatNumber) {
  this.player = player;
  this.seatNumber = seatNumber;
}

module.exports = { seat };
