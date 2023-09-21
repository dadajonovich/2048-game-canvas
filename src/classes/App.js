import Cell from './Cell';
import Drawable from './Drawable';
import Vector2 from './Vector2';

class App extends Drawable {
  rows = [];

  gap = Drawable.board.width / 10;

  score = document.getElementById('score');

  constructor() {
    super();
    if (!this.score) {
      throw new Error('Score missing!');
    }

    const startValues = [
      // Math.floor(Math.random() * 16),
      // Math.floor(Math.random() * 16),
    ];

    const addRandomNums = (array) => {
      const randomNum = null;
      Math.floor(Math.random() * 16);
    };

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
    document.addEventListener('keydown', (e) => console.log(e));
    this.resizeCanvasHandler();
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

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const sizeCell = (Drawable.board.width - this.gap) / 4;
        this.rows[j][i].setPosition(
          new Vector2(j * sizeCell + this.gap, i * sizeCell + this.gap),
        );
        this.rows[j][i].setSize(sizeCell - this.gap);
      }
    }

    this.draw();
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
