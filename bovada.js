var game;

//function that finds the game html files for bovada
function init() {
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
  //console.log(game);
}

//functions that updates the board and potsize
function getBoard() {}

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
  for (let i = 0; i < players.length; i++) {}
}

function main() {
  init();
  initSeats();
}

// Run the check every 1 seconds (1000 milliseconds)
setInterval(main, 10000);
