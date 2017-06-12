const Board = require("./board.js");
const Trella = require("./trella.js")

class Game {
  constructor() {
    this.board = new Board();
    this.player2 = {name: "p2", mark: "o"};
    this.playerTrella = new Trella(this.board);
    this.currentPlayer = "";
  }

  // reset
  // start
  // switch player

  setup() {
    this.listenForMarkPlacement();
    this.listenForPlayerStart();
  }

  listenForMarkPlacement() {
    const cells = document.querySelectorAll('.cell');
    const cellMapping = this.board.cellMapping()
    cells.forEach((cell, idx) => {
      cell.addEventListener('click', (ev) => {
        this.board.placeMark(cellMapping[idx], "o", cell)
        console.log("button is clicked");

        this.playerTrella.makeMark();
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

  }


}

module.exports = Game;
