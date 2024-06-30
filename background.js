import { getMove } from "./preflop.js";
var players;

// async function main() {
//   const [tab] = await chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true,
//   });

//   const response =
// }

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "getPlayers") {
    getPreFlopMove(request.players);
  }
});

//setInterval(main, 1000);

function getPreFlopMove(players) {
  const move = getMove(players);
  console.log(move);
}
