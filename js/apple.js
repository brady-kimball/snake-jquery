const Coord = require("./coord");

class Apple {
  constructor(board) {
    this.board = board;
  }

  generate() {
    let i = Math.floor(Math.random() * this.board.dim);
    let j = Math.floor(Math.random() * this.board.dim);

    while (this.board.snake.isOccupying(i, j)) {
      i = Math.floor(Math.random() * this.board.dim);
      j = Math.floor(Math.random() * this.board.dim);
    }

    this.pos = new Coord(i,j);
  }
}
