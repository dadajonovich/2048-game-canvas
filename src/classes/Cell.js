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

  isAnimated = false;

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

  mergeWith(cell, isTesting = false) {
    let mergeValue = 0;
    if (this === cell) return mergeValue;
    if (this.value === 0 && cell.value !== 0) {
      this.setValue(cell.value);
      cell.setValue(0);
      if (!isTesting) {
        this.animatedPosition = cell.position;
      }
      mergeValue = 0;
    }
    if (cell.value === this.value) {
      const sumVal = cell.value + this.value;
      this.setValue(sumVal);
      cell.setValue(0);
      this.fixed = true;
      if (!isTesting) {
        this.animatedPosition = cell.position;
      }
      mergeValue = sumVal;
    }
    return mergeValue;
    // console.log('Position:', this.position);
    // console.log('Animated position:', this.animatedPosition);
  }

  draw() {
    if (this.value === 0) return;

    const position = this.animatedPosition;
    const size = new Vector2(this.size, this.size);
    const borderRadius = this.size / 7;

    this.ctx.lineWidth = 1;
    this.ctx.fillStyle =
      Cell.colors[this.value === 0 ? 0 : Math.round(Math.log2(this.value))];
    this.drawRoundedRect(position, size, borderRadius);
    // this.ctx.fillRect(position.x, position.y, this.size, this.size);
    // this.ctx.strokeStyle = 'transparent';
    // this.ctx.strokeRect(position.x, position.y, this.size, this.size);
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${0.8 * this.size}px sans-serif`;
    this.ctx.fillText(
      this.value,
      // `${this.fixed}`,
      // `${this.value}/${this.animatedPosition.x}/${this.animatedPosition.y}`,
      // `${this.value}/${this.value}`,
      // `${i} / ${j}`,
      position.x + this.size / 2,
      position.y + this.size / 2,
    );
  }

  animatedMove() {
    const offset = new Vector2(
      // this.animatedPosition.x - this.position.x,
      // this.animatedPosition.y - this.position.y,
      this.position.x - this.animatedPosition.x,
      this.position.y - this.animatedPosition.y,
    );

    if (offset.length < 1 || this.value === 0) {
      this.isAnimated = false;
      this.animatedPosition = this.position;
      // this.animatedPosition = null;
      // console.log('finish!');
      return;
    }

    this.isAnimated = true;

    this.animatedPosition = new Vector2(
      this.animatedPosition.x + offset.x * this.speed,
      this.animatedPosition.y + offset.y * this.speed,
    );
  }
}

export default Cell;
