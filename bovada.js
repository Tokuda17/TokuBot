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
  console.log(game);
}

function getStackSize() {}

// Run the check every 1 seconds (1000 milliseconds)
setInterval(init, 10000);
setInterval(getStackSize, 10000);

// Initial check when the script is loaded
getStackSize();
init();
