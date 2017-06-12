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
