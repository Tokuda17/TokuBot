var board;
var seats = new Array(9);
const playersContainers = new Array(9);
const players = new Array(9);
var myPlayer;
var game;

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
      .contentDocument.getElementsByTagName("html")[0];
    for (var i = 0; i < 9; i++) {
      const player = game.querySelector(
        `#root > div > div.frlfvhr > div.f1l5nl24 > div.fmyv4dc > div.f1qy5s7k > div:nth-child(1) > div.fsusjyu.Desktop.landscape.f1u9jrie > div.f1so0fyt > div:nth-child(${
          i + 2
        })`
      );
      if (player.getElementsByClassName("myPlayer")[0]) myPlayer = i;
      playersContainers[i] = player;
    }
  } catch (error) {
    console.log("Trying Again");
  }
}

//functions that updates the board and potsize
function getBoard() {}

function isInHand() {}

function getBalance(seat) {
  var balance;
  if (seat == myPlayer) {
    balance = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1ay1w8p.leftPlayer.notZone.fimvvv > div > span"
    );
  } else {
    balance = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1ay1w8p.leftPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
    );
    if (!balance) {
      balance = playersContainers[seat].querySelector(
        "div > div:nth-child(2) > div:nth-child(2) > div.f1ay1w8p.rightPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
      );
    }
    if (!balance) {
      balance = playersContainers[seat].querySelector(
        "div > div:nth-child(2) > div:nth-child(3) > div.f1ay1w8p.leftPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
      );
    }
    if (!balance) {
      balance = playersContainers[seat].querySelector(
        "div > div:nth-child(2) > div:nth-child(3) > div.f1ay1w8p.rightPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
      );
    }
  }
  if (balance) return balance.innerText;
}

function getBet(seat) {
  var bet;
  bet = playersContainers[seat].querySelector(
    "div > div:nth-child(2) > div.fhwmucx > div > div"
  );
  if (bet) return bet.innerText;
  else return "0";
}

function getInHand(seat) {}

function initPlayer(seat) {
  var player = new Player(0, 0, "ACTIVE", "INHAND");
  player.stack = getBalance(seat);
  player.bet = getBet(seat);

  return player;
}

function getButton(seat) {}

//function that initializes the seats and players in each seat.
function initSeats() {
  var player;
  var button;
  for (var i = 0; i < playersContainers.length; i++) {
    if (
      playersContainers[i].querySelector(
        "div > div:nth-child(2) > div.feis0ob.Desktop"
      )
    ) {
      player = new Player(0, 0, "NOT IN HAND", "INACTIVE");
    } else {
      player = initPlayer(i);
    }
    players[i] = player;
    // console.log(playersContainers[i]);
  }
  console.log(players);
}

//returns when activePlayer is user
function activePlayer() {
  isActive = game.querySelector(
    `#root > div > div.frlfvhr > div.f1l5nl24 > div.fmyv4dc > div.f1qy5s7k > div:nth-child(1) > div.fsusjyu.Desktop.landscape.f1u9jrie > div.f1so0fyt > div:nth-child(${
      myPlayer + 2
    }) > div > div:nth-child(2) > div:nth-child(3) > div.f1p7lubp.Desktop.landscape.leftPlayer.notZone.myPlayer > div.f1qbx4ty.Desktop.f1cwv3sl`
  );

  return true;
}

//returns whether or not a given player is in the hand

function main() {
  init();
  initSeats();
}
// Run the check every 1 seconds (1000 milliseconds)
//setInterval(activePlayer, 1000);
setInterval(main, 1000);

class Player {
  constructor(bet, stack, isActive, inHand) {
    this.bet = bet;
    this.stack = stack;
    this.isActive = isActive;
    this.inHand = inHand;
  }
}

class Seat {
  constructor(seatNumber, player, button) {
    this.seatNumber = seatNumber;
    this.player = player;
    this.button = button;
  }
}
