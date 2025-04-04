var board;
const playersContainers = new Array(9);
const players = new Array(9);
var myPlayer;
var game;

const PLAYER_CONTAINER_HTML_TAG = ".f1phzx2y";

//Returns a List of Player Containers where each container contains information about a specific player
function getPlayerContainers() {
  //Queries all iframes
  const iframes = document.querySelectorAll("iframe");

  //Loops through iframes
  iframes.forEach((iframe, index) => {
    try {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      //Select all Elements with the player_container tag
      const iframeElements = innerDoc.querySelectorAll(
        PLAYER_CONTAINER_HTML_TAG
      );
      if (iframeElements.length > 0) {
        return iframeElements;
      }
    } catch (error) {
      console.error(`getPlayerContainers() Failed`, error);
    }
  });
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

  if (card1) cards.push(new Card(card1.dataset.qa));
  if (card2) cards.push(new Card(card2.dataset.qa));

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

function displayMove(move) {
  var element = game.querySelector(
    "#root > div > div.frlfvhr > div.f1l5nl24 > div.fw2rl7w > div:nth-child(4)"
  );
  if (element) {
    var text;
    if (move == "f") text = "Fold";
    if (move == "c") text = "Call";
    if (move == "r") text = "Raise";
    if (move == "b") text = "Bluff";
    element.innerText = text;
  }
}

function addMoveNode() {
  if (
    !game.querySelector(
      "#root > div > div.frlfvhr > div.f1l5nl24 > div.fw2rl7w > div:nth-child(4)"
    )
  ) {
    var element = game.querySelector(
      "#root > div > div.frlfvhr > div.f1l5nl24 > div.fw2rl7w"
    );
    var x = element.appendChild(document.createElement("div"));
    x.innerText = "Hello World";
    x.style.textAlign = "center";
    x.style.color = "white";
  }
}

//returns whether or not a given player is in the hand
//"8ed4c725-2fa0-43d7-a49c-fb3b98a9589a"
async function main() {
  // init();
  // initSeats();
  // addMoveNode();
  getPlayerData2();
  // displayMove();

  // if (activePlayer()) {
  //   const response = await chrome.runtime.sendMessage({
  //     message: "getPlayers",
  //     players: getPlayers(),
  //   });
  //   console.log(response);
  //   displayMove(response);
  // } else {
  //   chrome.runtime.sendMessage({
  //     message: "resetBoard",
  //   });
  // }
  // chrome.runtime.sendMessage({
  //   message: "getCards",
  //   cards: { card1: players[myPlayer].card1, card2: players[myPlayer].card2 },
  // });
}

// Run the check every 1 seconds (1000 milliseconds)
setInterval(main, 1000);
