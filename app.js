const Game = require("./game.js");

document.addEventListener('DOMContentLoaded', () => {
  new Game().setup();

    var popup = document.getElementById('popup');
    var span = document.getElementsByClassName("close")[0];
    var button = document.getElementsByClassName("button");
    span.onclick = function() {
      popup.style.display = "none";
    }

    button.onclick = function() {
      popup.style.display = "none";
    }

    // window.onclick = function(event) {
    //   if (event.target == popup) {
    //     popup.style.display = "none";
    //   }
    // }

})
