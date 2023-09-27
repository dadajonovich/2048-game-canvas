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

  animatedPosition = null;

  fixed = false;

  size = 0;

  value = 0;

  constructor(value = 0) {
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

  setFixed(bool) {
    this.fixed = bool;
  }

  unfix() {
    this.fixed = false;
  }

  mergeWith(cell) {
    if (this === cell) return;
    if (this.value === 0 && cell.value !== 0) {
      this.setValue(cell.value);
      cell.setValue(0);
      this.animatedPosition = cell.position;
    }
    if (cell.value === this.value) {
      const sumVal = cell.value + this.value;
      this.setValue(sumVal);
      cell.setValue(0);
      this.fixed = true;
      this.animatedPosition = cell.position;
    }
  }

  draw() {
    if (this.value === 0) return;

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
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      2 ** this.value,
      this.position.x + this.size / 2,
      this.position.y + this.size / 2,
    );
  }

  animatedMove(timestamp) {
    if (this.animatedPosition === this.position || !this.animatedPosition)
      return;
    console.log(this.position, this.animatedPosition);
    const dx = this.animatedPosition.x - this.position.x;
    const dy = this.animatedPosition.y - this.position.y;

    this.position.setX(this.position.x + dx * this.position.vx);
    this.position.setY(this.position.y + dy * this.position.vy);
  }
}

export default Cell;
