chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("popup.js");
  if (request.message === "getTable") {
    printBoard(request.table);
  }
  if (request.message === "resetBoard") {
    resetBoard();
  }
  if (request.message === "highlightCards") {
    highlightCards(request.x, request.y);
  }
});

function printBoard(pokerArray) {
  console.log("popup.js** " + pokerArray);
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      var id = i * 13 + j;
      if (pokerArray[i][j] == "r") {
        var element = document.getElementById(id);
        element.style.color = "red";
      }
      if (pokerArray[i][j] == "c") {
        var element = document.getElementById(id);
        element.style.color = "lawngreen";
      }
      if (pokerArray[i][j] == "b") {
        var element = document.getElementById(id);
        element.style.color = "blue";
      }
      if (pokerArray[i][j] == "f") {
        var element = document.getElementById(id);
        element.style.color = "black";
      }
    }
  }
}

function highlightCards(x, y) {
  console.log("Highlight Cards");
  var id = x * 13 + y;
  var element = document.getElementById(id);
  element.style.backgroundColor = "yellow";
}

function resetBoard() {
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      var id = i * 13 + j;
      var element = document.getElementById(id);
      element.style.color = "black";
      element.style.backgroundColor = "white";
    }
  }
}
