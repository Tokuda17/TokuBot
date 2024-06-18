import { getMove } from "./preflop.js";
var players;

async function main() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  players = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
  getPreFlopMove();
}

function getPreFlopMove() {
  const move = getMove(players);
}

setInterval(main, 1000);
