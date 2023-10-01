class Drawable {
  /** @type {CanvasRenderingContext2D} */

  static board;

  static setCanvasSize(width, height, max = 500) {
    const ratio = width / height;

    if (width >= height) {
      Drawable.board.width = Math.min(
        document.documentElement.clientWidth,
        max,
      );
      Drawable.board.height = Drawable.board.width / ratio;
    } else {
      Drawable.board.height = Math.min(
        document.documentElement.clientWidth,
        max,
      );
      Drawable.board.width = Drawable.board.height * ratio;
    }
  }

  static ctx;

  get ctx() {
    return Drawable.ctx;
  }

  constructor() {
    if (Drawable.ctx) return;
    Drawable.board = document.getElementById('board');
    if (!Drawable.board) {
      throw new Error('Board missing!');
    }

    Drawable.ctx = Drawable.board.getContext('2d');
  }

  draw() {
    throw new Error('The draw method is not implemented');
  }

  drawRoundedRect(position, size, radius) {
    radius = Math.max(radius, 0);
    const { x: left, y: top } = position;
    const { x: width, y: height } = size;
    const right = left + width;
    const bottom = top + height;
    this.ctx.beginPath();
    this.ctx.moveTo(left, top + radius);
    this.ctx.arcTo(left, bottom, left + radius, bottom, radius);
    this.ctx.arcTo(right, bottom, right, bottom - radius, radius);
    this.ctx.arcTo(right, top, right - radius, top, radius);
    this.ctx.arcTo(left, top, left, top + radius, radius);
    this.ctx.fill();
  }
}

export default Drawable;
