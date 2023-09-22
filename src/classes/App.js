import Cell from './Cell';
import Drawable from './Drawable';
// import Grid from './Grid';
import Utils from './Utils';
import Vector2 from './Vector2';

class App extends Drawable {
  rows = [];

  gap = 0;

  score = document.getElementById('score');

  constructor() {
    super();
    if (!this.score) {
      throw new Error('Score missing!');
    }

    const startValues = Utils.createArrayWithRandomInt();

    for (let i = 0; i < 4; i++) {
      const cells = [];
      for (let j = 0; j < 4; j++) {
        const currentIndex = i * 4 + j;

        if (startValues.includes(currentIndex)) {
          cells.push(new Cell(1));
        } else {
          cells.push(new Cell(0));
        }
      }
      this.rows.push(cells);
    }

    window.addEventListener('resize', this.resizeCanvasHandler.bind(this));
    document.addEventListener('keydown', (e) => this.swap(e));
    this.resizeCanvasHandler();
    // console.log(this.rows);
  }

  draw() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.rows[j][i].draw();
      }
    }
  }

  resizeCanvasHandler() {
    Drawable.setCanvasSize(Math.min(document.documentElement.clientWidth, 500));
    this.gap = Drawable.board.width * 0.05;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const sizeCellGrid = (Drawable.board.width - this.gap) / 4;
        this.rows[j][i].setPosition(
          new Vector2(j * sizeCellGrid + this.gap, i * sizeCellGrid + this.gap),
        );
        this.rows[j][i].setSize(sizeCellGrid - this.gap);
      }
    }

    this.draw();
  }

  swap(event) {
    console.log(event);
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
