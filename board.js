class Board {
  constructor() {
    this.grid = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];
    this.cellMapping = this.cellMapping();
    this.tttMapping = this.tttMapping();
  }

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

  tttMapping() {
    const cells = document.querySelectorAll(".cell");
    const tttMap = {}
    cells.forEach((el, idx) => {
      tttMap[idx] = cells[idx]
    })
    return tttMap;
  }

  reset() {
    this.grid = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];
  }

}

module.exports = Board;
