import { getCards, getMove } from "./preflop.js";
var players;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "getPlayers") {
    const table = getPreFlopMove(request.players);
    printTable(table);
  }
  if (request.message === "getCards") {
    console.log("getCards");
    highlightCards(request.cards);
  }
  if (request.message === "resetBoard") {
    resetBoard();
  }
});

function printTable(table) {
  console.log("printTable");
  chrome.runtime.sendMessage({
    message: "getTable",
    table: table,
  });
}

function resetBoard() {
  console.log("resetBoard");
  chrome.runtime.sendMessage({
    message: "resetBoard",
  });
}

function highlightCards(cards) {
  var x = 0;
  var y = 0;
  if (cards.card1.num == "A") x = 0;
  else if (cards.card1.num == "K") x = 1;
  else if (cards.card1.num == "Q") x = 2;
  else if (cards.card1.num == "J") x = 3;
  else x = 14 - parseInt(cards.card1.num);
  if (cards.card2.num == "A") y = 0;
  else if (cards.card2.num == "K") y = 1;
  else if (cards.card2.num == "Q") y = 2;
  else if (cards.card2.num == "J") y = 3;
  else y = 14 - parseInt(cards.card2.num);
  if (cards.card1.suit == cards.card2.suit) {
    chrome.runtime.sendMessage({
      message: "highlightCards",
      x: Math.min(x, y),
      y: Math.max(x, y),
    });
  } else {
    chrome.runtime.sendMessage({
      message: "highlightCards",
      x: Math.max(x, y),
      y: Math.min(x, y),
    });
  }
}

function getPreFlopMove(players) {
  const move = getMove(players);
  return move;
  // console.log(move);
}
