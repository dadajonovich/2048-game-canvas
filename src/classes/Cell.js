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
    if (this.value === 0) return;

    // Drawable.ctx.beginPath();
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
    Drawable.ctx.fillStyle = 'black';
    Drawable.ctx.textAlign = 'center';
    Drawable.ctx.textBaseline = 'middle';
    Drawable.ctx.fillText(
      2 ** this.value,
      this.position.x + this.size / 2,
      this.position.y + this.size / 2,
    );
    // Drawable.ctx.closePath();
  }
}

export default Cell;
