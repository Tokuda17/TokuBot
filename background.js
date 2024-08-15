import { getCards, getChart, getMove } from "./preflop.js";
var players;
//tester
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "getPlayers") {
    const table = getPreFlopChart(request.players);
    const cards = getCards(request.players);
    const move = getMove(table, cards);
    sendResponse(move);
    printTable(table);
  }
  if (request.message === "getCards") {
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

function getPreFlopChart(players) {
  const move = getChart(players);
  return move;
  // console.log(move);
}

print("hello world");
