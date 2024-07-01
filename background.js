import { getMove } from "./preflop.js";
var players;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "getPlayers") {
    const table = getPreFlopMove(request.players);
    printTable(table);
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

function getPreFlopMove(players) {
  const move = getMove(players);
  return move;
  // console.log(move);
}
