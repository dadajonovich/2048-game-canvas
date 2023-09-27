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

  animatedPosition;

  animated = false;

  fixed = false;

  size = 0;

  value = 0;

  speed = 0.1;

  constructor(value = 0) {
    super();
    this.value = value;
  }

  setPosition(position) {
    this.position = position;
    this.animatedPosition = position;
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
      // cell.animatedPosition = this.position;
    }
    if (cell.value === this.value) {
      const sumVal = 1 + this.value;
      this.setValue(sumVal);
      cell.setValue(0);
      this.fixed = true;
      this.animatedPosition = cell.position;
      // cell.animatedPosition = this.position;
    }
    // console.log('Position:', this.position);
    // console.log('Animated position:', this.animatedPosition);
  }

  draw(i, j) {
    if (this.value === 0) return;

    const position = this.animatedPosition;

    Drawable.ctx.fillStyle = Cell.colors[this.value];
    Drawable.ctx.fillRect(position.x, position.y, this.size, this.size);
    Drawable.ctx.strokeRect(position.x, position.y, this.size, this.size);
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      2 ** this.value,
      // `${this.fixed}`,
      // `${this.value}/${this.animatedPosition.x}/${this.animatedPosition.y}`,
      // `${i} / ${j}`,
      position.x + this.size / 2,
      position.y + this.size / 2,
    );
  }

  animatedMove(timestamp) {
    const offset = new Vector2(
      // this.animatedPosition.x - this.position.x,
      // this.animatedPosition.y - this.position.y,
      this.position.x - this.animatedPosition.x,
      this.position.y - this.animatedPosition.y,
    );

    if (offset.length < 1 || this.value === 0) {
      this.animated = false;
      this.animatedPosition = this.position;
      // this.animatedPosition = null;
      // console.log('finish!');
      return;
    }

    this.animated = true;

    this.animatedPosition = new Vector2(
      this.animatedPosition.x + offset.x * this.speed,
      this.animatedPosition.y + offset.y * this.speed,
    );
  }
}

export default Cell;
