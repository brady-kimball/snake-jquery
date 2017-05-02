const Coord = require("./coord.js");

class Snake {
  constructor() {
    this.direction = "E"; // ["N", "E", "S", "W"]
    this.segments = [this.toCoord("E")]; // array of coordinates
    this.length = 1;
  }

  move() {
    this.segments.unshift(this.segments[0].plus(this.toCoord(this.direction)));
    this.segments = this.segments.slice(0,this.length);
  }

  turn(newDirection) {
    this.direction = newDirection;
  }

  toCoord(direction) {
    let pos;
    switch(direction) {
      case "N":
        return new Coord(-1, 0);
      case "E":
        return new Coord(0, 1);
      case "S":
        return new Coord(1, 0);
      case "W":
        return new Coord(0, -1);
    }
  }
}

// let snake = new Snake();
// snake.move();
// snake.move();
// snake.turn("S");
// snake.move();
// console.log(snake.segments)



module.exports = Snake;
