class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  }

  equals(coord2) {
    return (this.i === coord2.i && this.j === coord2.j);
  }

  isOpposite(coord2) {
    return ((this.i === (coord2.i * -1)) && (this.j === (coord2.j * -1)));
  }
}

module.exports = Coord;
