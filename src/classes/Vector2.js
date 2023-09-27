class Vector2 {
  x;

  y;

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Vector2;
