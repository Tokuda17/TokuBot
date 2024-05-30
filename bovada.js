var board;
var seats = [];

//function that finds the game html files for bovada
function init() {
  try {
    game = document
      .getElementById("root")
      .getElementsByClassName("f8wu152")[0]
      .getElementsByClassName("f5ukfdt")[0]
      .getElementsByClassName("f1djomsr")[0]
      .getElementsByTagName("div")[0]
      .getElementsByTagName("iframe")[0]
      .contentDocument.getElementsByTagName("html")[0]
      .getElementsByTagName("body")[0]
      .getElementsByTagName("div")[0]
      .getElementsByTagName("div")[0]
      .getElementsByClassName("f1l5nl24")[0]
      .getElementsByClassName("fmyv4dc")[0]
      .getElementsByClassName("f1qy5s7k")[0]
      .getElementsByTagName("div")[0]
      .getElementsByTagName("div")[3]
      .getElementsByClassName("f1so0fyt")[0];
  } catch (error) {
    console.log("Trying Again");
  }
  //console.log(game);
}

//functions that updates the board and potsize
function getBoard() {}

function isInHand(player) {
  var card;
  try {
    card = player
      .getElementsByTagName("div")[1]
      .getElementsByClassName("f1itp13a")[0]
      .getElementsByClassName("fcmecz0 fppooe4")[0]
      .getElementsByClassName("f1l8jkug")[0]
      .getElementsByClassName("f1jve9ln")[0]
      .getElementsByClassName("landscape f17v6pzz fplgmm0 f1yx1n71")[0]
      .getElementsByClassName("landscape f17v6pzz f1x351eq f45h")[0]
      .getElementsByTagName("svg")[0].dataset.qa;
  } catch (error) {
    return false;
  }
  //  console.log(card);
  if (card != "card-1") return true;
  else return false;
}

//function that initializes the seats and players in each seat.
function initSeats() {
  //gets position of myplayer
  const myPlayer = game.getElementsByClassName(
    "f1phzx2y Desktop landscape myPlayer"
  )[0];
  var playerPosition = myPlayer.dataset.qa.slice(-1);

  //gets all seats at the table
  const players = game.getElementsByClassName("f1phzx2y Desktop landscape");

  //initialize each seat and player
  for (let i = 0; i < players.length; i++) {
    var player;
    var seat;

    if (players[i].getElementsByClassName("feis0ob Desktop")[0]) {
      var player = new Player(0, 0, false, false);
      console.log(player);
    } else {
      var inHand = isInHand(players[i]);
      console.log("Active Player + " + (i + 1) + " " + inHand);
    }
  }
}

//returns whether or not a given player is in the hand

function main() {
  init();
  initSeats();
}

// Run the check every 1 seconds (1000 milliseconds)
setInterval(main, 1000);

class Player {
  constructor(bet, stack, isActive, inHand) {
    this.bet = bet;
    this.stack = stack;
    this.isActive = isActive;
    this.inHand = inHand;
  }
}
