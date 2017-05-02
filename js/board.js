const Snake = require('./snake.js');

class Board {
  constructor(dim) {
    this.snake = new Snake();
    this.dim = dim;
  }

  static emptyGrid(dim) {
    const grid = [];

    for (let i = 0; i < dim; i++) {
      let row = [];
      for (let j = 0; j < dim; i++) {
        row.push(Board.EMPTY);
      }
      grid.push(row);
    }

    return grid;
  }
}

Board.EMPTY = ".";

module.exports = Board;
