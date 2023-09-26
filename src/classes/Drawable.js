class Drawable {
  /** @type {CanvasRenderingContext2D} */

  static board;

  static setCanvasSize(size) {
    Drawable.board.width = size;
    Drawable.board.height = size;
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
}

export default Drawable;
