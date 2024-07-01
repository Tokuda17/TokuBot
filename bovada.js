var board;
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

function getStack(seat) {
  var stack;
  if (seat == myPlayer) {
    stack = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1ay1w8p.leftPlayer.notZone.fimvvv > div > span"
    );
  } else {
    stack = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1ay1w8p.leftPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
    );
    if (!stack) {
      stack = playersContainers[seat].querySelector(
        "div > div:nth-child(2) > div:nth-child(2) > div.f1ay1w8p.rightPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
      );
    }
    if (!stack) {
      stack = playersContainers[seat].querySelector(
        "div > div:nth-child(2) > div:nth-child(3) > div.f1ay1w8p.leftPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
      );
    }
    if (!stack) {
      stack = playersContainers[seat].querySelector(
        "div > div:nth-child(2) > div:nth-child(3) > div.f1ay1w8p.rightPlayer.notZone > div.f11rr7sf.isNotMyPlayer > span"
      );
    }
  }
  if (stack) return stack.innerText;
}

function getBet(seat) {
  var bet;
  bet = playersContainers[seat].querySelector(
    "div > div:nth-child(2) > div.fhwmucx > div > div"
  );
  if (bet) return bet.innerText;
  else return "0";
}

function getInHand(seat) {
  var hand;
  hand = playersContainers[seat].querySelector(
    "div > div:nth-child(2) > div:nth-child(2) > div.f1itp13a.Left > div > div > div:nth-child(2) > div > div > div > svg"
  );
  if (!hand) {
    hand = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1itp13a.Left > div > div > div:nth-child(4) > div > div > div > svg"
    );
  }
  if (!hand) {
    hand = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1itp13a.Right > div > div > div:nth-child(2) > div > div > div > svg"
    );
  }
  if (!hand) {
    hand = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(2) > div.f1itp13a.Right > div > div > div:nth-child(4) > div > div > div > svg"
    );
  }

  if (hand) hand = hand.dataset.qa;
  return hand != "card-1";
}

function getCards(seat) {
  var cards = [];

  var card1 = playersContainers[seat].querySelector(
    "div > div:nth-child(2) > div:nth-child(2) > div.f1itp13a.Left > div > div > div:nth-child(2) > div > div > div.landscape.f1jmqybh.f169eucp.f45h > svg"
  );
  if (!card1) {
    card1 = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(3) > div.f1itp13a.Left > div > div > div:nth-child(2) > div > div > div.landscape.f1jmqybh.f169eucp.f45h > svg"
    );
  }
  var card2 = playersContainers[seat].querySelector(
    "div > div:nth-child(2) > div:nth-child(2) > div.f1itp13a.Left > div > div > div:nth-child(4) > div > div > div.landscape.f1jmqybh.f1x351eq.f45h > svg"
  );
  if (!card2) {
    card2 = playersContainers[seat].querySelector(
      "div > div:nth-child(2) > div:nth-child(3) > div.f1itp13a.Left > div > div > div:nth-child(4) > div > div > div.landscape.f1jmqybh.f1x351eq.f45h > svg"
    );
  }

  cards.push(new Card(card1.dataset.qa));
  cards.push(new Card(card2.dataset.qa));

  return cards;
}

function initPlayer(seat) {
  var player;
  var stack = getStack(seat);
  var bet = getBet(seat);
  var inHand = getInHand(seat);

  if (seat != myPlayer) {
    player = new Player(bet, stack, true, inHand, false);
  } else if (inHand) {
    var cards = getCards(myPlayer);
    player = new MyPlayer(bet, stack, true, inHand, false, cards[0], cards[1]);
  } else {
    player = new MyPlayer(bet, stack, true, inHand, false);
  }

  return player;
}

function getButton(seat) {
  var button;
  button = playersContainers[seat].querySelector(
    "div > div:nth-child(2) > div.fm87pe9.Desktop"
  );

  return button.style.visibility != "hidden";
}

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
      player = new Player(0, 0, false, false, false);
    } else {
      player = initPlayer(i);
    }
    players[i] = player;
    players[i].button = getButton(i);
  }
  console.log(players);
}

//returns when activePlayer is user
function activePlayer() {
  var isActive = game.querySelector(
    `#root > div > div.frlfvhr > div.f1l5nl24 > div.fmyv4dc > div.f1qy5s7k > div:nth-child(1) > div.fsusjyu.Desktop.landscape.f1u9jrie > div.f1so0fyt > div:nth-child(${
      myPlayer + 2
    }) > div > div:nth-child(2) > div:nth-child(3) > div.f1p7lubp.Desktop.landscape.leftPlayer.notZone.myPlayer > div.f1qbx4ty.Desktop.f1cwv3sl`
  );
  if (isActive) return true;
  return false;
}

function getPlayers() {
  return players;
}

//returns whether or not a given player is in the hand

function main() {
  init();
  initSeats();

  if (activePlayer()) {
    const response = chrome.runtime.sendMessage({
      message: "getPlayers",
      players: getPlayers(),
    });
  } else {
    chrome.runtime.sendMessage({
      message: "resetBoard",
    });
  }
}

// Run the check every 1 seconds (1000 milliseconds)
setInterval(main, 1000);

class Player {
  constructor(bet, stack, isActive, inHand, button) {
    this.bet = bet;
    this.stack = stack;
    this.isActive = isActive;
    this.inHand = inHand;
    this.button = button;
  }
}

class MyPlayer extends Player {
  constructor(bet, stack, isActive, inHand, button, card1, card2) {
    super(bet, stack, isActive, inHand, button);

    this.card1 = card1;
    this.card2 = card2;
  }
}

class Card {
  constructor(card) {
    card = parseInt(card.substring(4));
    var suit = card / 13;
    var num = card % 13;

    if (suit < 1) this.suit = "c";
    else if (suit < 2) this.suit = "d";
    else if (suit < 3) this.suit = "h";
    else this.suit = "s";

    if (num == 0) this.num = "A";
    else if (num == 10) this.num = "J";
    else if (num == 11) this.num = "Q";
    else if (num == 12) this.num = "K";
    else this.num = (num + 1).toString();
  }
}
