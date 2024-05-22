const x = document.getElementsByClassName("card");

for (var i = 0; i < 2; i++) {
  let y = x[i].getElementsByTagName("span");
  for (let j = 0; j < y.length; j += 2) {
    console.log(y[j].innerText);
  }
}
