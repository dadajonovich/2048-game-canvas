import Drawable from './Drawable';

class Cell extends Drawable {
  position;
  value = '';

  constructor(position, value) {
    super();
    this.position = position;
    this.value = value;
  }

  draw() {
    const size = Drawable.ctx.canvas.width / 4;
    Drawable.ctx.beginPath();
    Drawable.ctx.fillStyle = 'red';
    Drawable.ctx.fillRect(
      this.position.x * size,
      this.position.y * size,
      size - 10,
      size - 10
    );
    Drawable.ctx.closePath();
  }
}

export default Cell;

const pizda = 'suka';
pizda = 'blyat';
