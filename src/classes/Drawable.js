class Drawable {
  static ctx;
  static board;

  constructor() {
    if (Drawable.ctx) return;
    Drawable.board = document.getElementById('board');
    if (!Drawable.board) {
      throw new Error('Error board');
    }

    Drawable.ctx = Drawable.board.getContext('2d');
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.resizeCanvas();
  }

  draw() {
    throw new Error('The draw method is not implemented');
  }

  resizeCanvas() {
    Drawable.ctx.canvas.width = document.documentElement.clientWidth;
    Drawable.ctx.canvas.height = Drawable.ctx.canvas.width;
  }
}

export default Drawable;
