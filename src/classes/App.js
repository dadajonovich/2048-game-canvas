import Cell from './Cell';
import Drawable from './Drawable';
// import Grid from './Grid';
import Utils from './Utils';
import Vector2 from './Vector2';

const Direction = {
  up: Symbol('id'),
  right: Symbol('id'),
  down: Symbol('id'),
  left: Symbol('id'),
};

class App extends Drawable {
  rows = [];

  gap = 0;

  gridSize = 4;

  score = document.getElementById('score');

  constructor() {
    super();
    if (!this.score) {
      throw new Error('Score missing!');
    }

    const startValues = Utils.createArrayWithRandomInt();
    // this.rows = Utils.createMatrix(this.gridSize, () => new Cell());

    for (let i = 0; i < 4; i++) {
      const cells = [];
      for (let j = 0; j < 4; j++) {
        const currentIndex = i * 4 + j;
        if (startValues.includes(currentIndex)) {
          cells.push(new Cell(1));
        } else {
          cells.push(new Cell(1));
        }
      }
      this.rows.push(cells);
    }

    window.addEventListener('resize', this.resizeCanvasHandler.bind(this));
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    this.resizeCanvasHandler();
  }

  draw() {
    this.ctx.clearRect(0, 0, Drawable.board.width, Drawable.board.height);
    Utils.forEach(this.rows, (i, j) => {
      this.rows[i][j].draw();
    });
  }

  resizeCanvasHandler() {
    Drawable.setCanvasSize(Math.min(document.documentElement.clientWidth, 500));
    this.gap = Drawable.board.width * 0.05;

    Utils.forEach(this.rows, (i, j) => {
      const cell = this.rows[i][j];
      const sizeCellGrid = (Drawable.board.width - this.gap) / 4;
      cell.setPosition(
        new Vector2(j * sizeCellGrid + this.gap, i * sizeCellGrid + this.gap),
      );
      cell.setSize(sizeCellGrid - this.gap);
    });

    this.draw();
  }

  getGroups(direction) {
    switch (direction) {
      case Direction.up:
        return Utils.rotate90Counterсlockwise(this.rows);
      case Direction.left:
        return this.rows;
      case Direction.down:
        return Utils.flipVertically(Utils.rotate90Counterсlockwise(this.rows));
      default:
        return Utils.flipVertically(this.rows);
    }
  }

  keyDownHandler(event) {
    switch (event.key) {
      case 'ArrowUp':
        // console.log('Click ArrowUp!');
        return this.move(Direction.up);
      case 'ArrowLeft':
        return this.move(Direction.left);
      case 'ArrowDown':
        // console.log('Click ArrowDown!');
        return this.move(Direction.down);
      case 'ArrowRight':
        // console.log('Click ArrowRight');
        return this.move(Direction.right);
      default:
        return undefined;
    }
  }

  move(direction) {
    const groups = this.getGroups(direction);
    Utils.forEach(groups, (i, j) => {
      if (j === 0) return;
      if (groups[i][j].value !== 0) {
        for (let k = j; k - 1 >= 0; k--) {
          if (groups[i][k - 1].setValueFrom(groups[i][k])) {
            break;
          }
        }
      }
    });

    this.draw();
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
