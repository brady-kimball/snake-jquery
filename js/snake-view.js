const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    // this.apple = new Apple();
    this.setupBoard();
    $(window).on("keydown", this.keyHandler.bind(this));
    window.setInterval(this.step.bind(this), 500);
  }

  keyHandler(event) {
    let dir = View.KEYS[event.originalEvent.key];
    if (dir) {
      this.board.snake.turn(dir);
    }
  }

  step() {
    this.board.snake.move();
    this.render();
  }

  render() {
    let $li = $('li');
    $li.removeClass();
    this.board.snake.segments.forEach((coord) => {
      const flatCoord = (coord.i * this.board.dim + coord.j);
      $li.eq(flatCoord).addClass("snakeSeg");
    });

  }

  setupBoard() {
    this.$el.addClass("group")
    for (let i = 0; i < this.board.dim; i++) {
      let $row = $("<ul>");
      $row.addClass("group")
      for (let j = 0; j < this.board.dim; j++) {
        let $cell = $("<li>");
        $row.append($cell);
      }
      this.$el.append($row);
    }
  }
}

View.KEYS = {
  "ArrowLeft": "W",
  "ArrowUp": "N",
  "ArrowRight": "E",
  "ArrowDown": "S",
  "w": "N",
  "a": "W",
  "s": "S",
  "d": "E"
};

module.exports = View;
