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
  console.log("printBoard " + pokerArray);
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      var id = i * 13 + j;
      if (pokerArray[i][j] == "r") {
        var element = document.getElementById(id);
        element.style.backgroundColor = "red";
        element.style.color = "white";
      }
      if (pokerArray[i][j] == "c") {
        var element = document.getElementById(id);
        element.style.backgroundColor = "lawngreen";
        element.style.color = "white";
      }
      if (pokerArray[i][j] == "b") {
        var element = document.getElementById(id);
        element.style.backgroundColor = "blue";
        element.style.color = "white";
      }
      if (pokerArray[i][j] == "f") {
        var element = document.getElementById(id);
        element.style.backgroundColor = "white";
      }
    }
  }
}

function highlightCards(x, y) {
  console.log("Highlight Cards");
  var id = x * 13 + y;
  var element = document.getElementById(id);
  element.style.fontWeight = "bold";
  element.style.textDecoration = "underline";
}

function resetBoard() {
  console.log("resetting board");
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      var id = i * 13 + j;
      var element = document.getElementById(id);
      console.log(element);
      element.style.color = "black";
      element.style.backgroundColor = "white";
    }
  }
}
