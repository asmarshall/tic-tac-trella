/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

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


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);
const Trella = __webpack_require__(4)

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Board {
  constructor() {
    this.grid = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];
  }

  // place mark
  // has an x or o already?
  // game over (full board)

  placeMark(pos, mark, element) {
    if (this.isEmpty(pos) === true) {
      this.grid[pos[0]][pos[1]] = mark;
      element.append(mark);
    }
  }

  isEmpty(pos) {
    if (this.grid[pos[0]][pos[1]] === null) {
      return true;
    }
    return false;
  }

  emptyCells() {
    const emptyCellArr = [];

    this.grid.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (!cell) {
          emptyCellArr.push([rowIdx, colIdx]);
        }
      });
    });

    return emptyCellArr;
  }

  boardFull() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        if (cell === null) {
          return false;
        }
      })
    })
    return true;
  }

  boardWon(mark) {
    let winningCom = winningComb();
    for (let i=0; i<winningCom.length; i++) {
      let marked = true;
      let winRow = winningCom[i];
      for (let j=0; j<winningCom.length; j++) {
        let x = winRow[1];
        let y = winRow[0];
        if (this.grid[y][x] !== mark) {
          marked = false;
        }
      }
      if (marked) {
        return true;
      }
    }
    return false;
  }

  winningComb() {
    return [
      // horizontals
      [ [0, 0], [0, 1], [0, 2] ],
      [ [1, 0], [1, 1], [1, 2] ],
      [ [2, 0], [2, 1], [2, 2] ],
      // verticals
      [ [0, 0], [1, 0], [2, 0] ],
      [ [0 ,1], [1, 1], [2, 1] ],
      [ [0, 2], [1, 2], [2, 2] ],
      // diagnoals
      [ [0, 0], [1, 1], [2, 2] ],
      [ [0, 2], [1, 1], [2, 0] ]
    ]
  }

  cellMapping() {
    return {
      0: [0, 0], 1: [0, 1], 2: [0, 2],
      3: [1, 0], 4: [1, 1], 5: [1, 2],
      6: [2, 0], 7: [2, 1], 8: [2, 2]
    };
  }
}

module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Trella {
  constructor(board) {
    this.board = board;
    this.name = 'Trella';
    this.mark = 'x';
    this.cellMapping = board.cellMapping();
  }

  makeStartMark() {
    const cells = document.querySelectorAll('.cell');
    let randPos = Math.floor(Math.random() * 9);
    this.board.placeMark(this.cellMapping[randPos], this.mark, cells[randPos]);
  }

  makeMark() {
    // line 16-18 FIX rand number 
    const cells = document.querySelectorAll('.cell');
    const randNum = Math.floor(Math.random() * this.winningMoves().length);
    debugger
    const possiblePos = this.cellMapping[randNum];
    this.board.placeMark(possiblePos, this.mark, cells[randNum])
  }

  winningMoves() {
    const winningCom = this.board.winningComb();
    let possibleCom = [];
    outerCombo: for (let i=0; i<winningCom.length; i++) {
      let combo = winningCom[i];
      innerCombo: for (let j=0; j<combo.length; j++) {
        var coord = combo[j];
        if (this.board.grid[coord[0]][coord[1]] === "o" ) {
          continue outerCombo;
        }
      }
      possibleCom = possibleCom.concat(combo);
    }

    const emptyCoords = [];
    possibleCom.forEach( coord => {
      if (this.board.grid[coord[0]][coord[1]] !== "x") {
        emptyCoords.push(coord);
      }
    })

    return this.multiDimensionalUnique(emptyCoords);
  }

  multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
  }

}

module.exports = Trella;


/***/ })
/******/ ]);