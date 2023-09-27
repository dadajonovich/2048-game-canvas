class Vector2 {
  x;

  y;

  setX(value) {
    this.x = value;
  }

  setY(value) {
    this.y = value;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Vector2;
