const Board = require("./board.js");
const Trella = require("./trella.js")

class Game {
  constructor() {
    this.board = new Board();
    this.player2 = {name: "p2", mark: "o"};
    this.playerTrella = new Trella(this.board);
    this.currentPlayer = "";
  }

  setup() {
    this.listenForMarkPlacement();
    this.listenForPlayerStart();
    this.start();
  }

  listenForMarkPlacement() {
    const cells = document.querySelectorAll('.cell');
    const cellMapping = this.board.cellMapping
    cells.forEach((cell, idx) => {
      cell.addEventListener('click', (ev) => {
        this.board.placeMark(cellMapping[idx], "o", cell)
        console.log("button is clicked");
        this.playerTrella.makeMark();
        this.didWin();
      })
    })
  }

  listenForPlayerStart() {
    const trella = document.querySelector('.trella');
    const you = document.querySelector('.you');
    trella.addEventListener('click', (ev) => {
      this.currentPlayer = this.playerTrella
      this.playerTrella.makeStartMark();
    })
    you.addEventListener('click', (ev) => {
      this.currentPlayer = this.player2
    })

  }

  start() {
    var popup = document.getElementById('popup');
    var span = document.getElementsByClassName("close")[0];
    var button = document.getElementById("players");
    var cell = document.getElementById("trella-quotes");

    span.onclick = function() {
      popup.style.display = "none";
    }

    button.onclick = function() {
      popup.style.display = "none";
    }
  }

// place this after a mark is made in order to check to see if it's a winning mark
// method for checking the winning coms to see if this completes one

  didWin() {
    var o = 'o';
    var x = 'x';
    this.board.winningComb().forEach( combo => {
      if (this.board.grid[combo[0][0]][combo[0][1]] === x && this.board.grid[combo[1][0]][combo[1][1]] === x && this.board.grid[combo[2][0]][combo[2][1]] === x) {
        window.alert("trella wins");
      } else if (this.board.grid[combo[0][0]][combo[0][1]] === o && this.board.grid[combo[1][0]][combo[1][1]] === o && this.board.grid[combo[2][0]][combo[2][1]] === o) {
        window.alert("you win");
      }
    })
  }

  gameOver() {
    window.alert("Game Over!!");
  }

}

module.exports = Game;
