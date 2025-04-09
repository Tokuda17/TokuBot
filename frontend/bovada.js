import { Player } from "./player.js";
import { Seat } from "./seat.js";
import { Table } from "./table.js";

const PLAYER_CONTAINER_HTML_TAG = ".f1phzx2y";
const STAKES_HTML_TAG = ".mainContent";
const STACK_HTML_TAG = "fxfcmpu";
const BET_SIZE_HTML_TAG = "flytr4";
const BUTTON_HTML_TAG = "fm87pe9";
const FOLDED_CARD_TAG = '[data-qa="card-1"]';

/*
Extracts HTML element with the following htmlTag
Params: htmlTag (str)
Returns: list of elements with the corrosponding htmlTag (list[])
*/
function extractElementsFromIframes(htmlTag) {
  const iframes = document.querySelectorAll("iframe");
  for (const iframe of iframes) {
    try {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const elements = innerDoc.querySelectorAll(htmlTag);
      if (elements.length > 0) {
        return elements;
      }
    } catch (error) {
      console.error(`extractElementsFromIframes() failed:`, error);
    }
  }
  return null;
}

//Params: None
//Returns: the small and big blind
function getStakes() {
  const stakesElements = extractElementsFromIframes(STAKES_HTML_TAG);
  const blinds = parseStakesString(stakesElements[0].innerText);
  return blinds;
}

/*
Extracts the stakes from the title string
Params: title -> (str)
Returns: small, big blind -> (double[2])
*/
function parseStakesString(title) {
  const stakes = title.split(" ")[0];
  const blinds = stakes.split("/");
  return blinds;
}

//Returns a List of Player Containers where each container contains information about a specific player
function getPlayerContainers() {
  return extractElementsFromIframes(PLAYER_CONTAINER_HTML_TAG);
}

/*
converts a container into a player Object
Params: player container (HTML)
Returns: player (Player Object)
*/
function containerToPlayer(container, i) {
  const stack = getStack(container);
  const bet = getBet(container);
  const button = getButton(container);
  const in_hand = isInHand(container) && stack != null;
  console.log(
    `Idx = ${i} Bet = ${bet} Stack = ${stack} Button = ${button} in_hand = ${in_hand}`
  );
  const player = new Player(stack, bet, button, in_hand);
  console.log(player);
}

/*
Extracts stack from container
Params: player container (HTML)
Returns: stack size (double)
*/
function getStack(container) {
  const stack = container.getElementsByClassName(STACK_HTML_TAG)[0];
  if (stack) {
    return parseFloat(stack.innerText.replace(/,/g, ""));
  } else {
    return null;
  }
}

/*
Extracts bet size from container
Params: player container (HTML)
Returns: bet size (double)
*/
function getBet(container) {
  const betSize = container.getElementsByClassName(BET_SIZE_HTML_TAG)[0];
  if (betSize) {
    return parseFloat(betSize.innerText.replace(/,/g, ""));
  } else {
    return null;
  }
}

/*
Extracts if given seat has the button
Params: player container (HTML)
Returns: Is Seat the button (boolean)
*/
function getButton(container) {
  const button = container.getElementsByClassName(BUTTON_HTML_TAG)[0];
  return button.style.visibility != "hidden";
}

/*
Extracts if seat folded from hand
Params: player container (HTML)
Returns: if player folded from hand (boolean)
*/
function isInHand(container) {
  const foldedCards = container.querySelector(FOLDED_CARD_TAG);
  if (foldedCards) {
    return false;
  } else {
    return true;
  }
}

//functions that updates the board and potsize
function getBoard() {}

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
async function main() {
  // init();
  // initSeats();
  // addMoveNode();
  const playerContainers = getPlayerContainers();
  playerContainers.forEach((container, i) => {
    const player = containerToPlayer(container, i);
  });
  getStakes();
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
