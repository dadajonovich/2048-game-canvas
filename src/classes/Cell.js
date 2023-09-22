import Drawable from './Drawable';
import Vector2 from './Vector2';

class Cell extends Drawable {
  static colors = [
    'transparent',
    '#ece2d7',
    '#ebdec5',
    '#f7b275',
    '#fd9a5f',
    '#c86948',
    '#ea6133',
    '#e6c361',
    '#ddb954',
    '#f1c34a',
    '#f0bf38',
    '#f0bc28',
  ];

  position = new Vector2(0, 0);

  size = 0;

  value = 0;

  constructor(value) {
    super();
    this.value = value;
  }

  setPosition(position) {
    this.position = position;
  }

  setSize(size) {
    this.size = size;
  }

  setValue(value) {
    this.value = value;
  }

  draw() {
    Drawable.ctx.beginPath();
    Drawable.ctx.fillStyle = Cell.colors[this.value];
    Drawable.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size,
      this.size,
    );
    Drawable.ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size,
      this.size,
    );
    Drawable.ctx.closePath();
  }
}

export default Cell;
