import Cell from './Cell';
import Drawable from './Drawable';
// import Grid from './Grid';
import Utils from './Utils';
import Vector2 from './Vector2';

// enum
const Direction = {
  up: Symbol('id'),
  right: Symbol('id'),
  down: Symbol('id'),
  left: Symbol('id'),
};

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
          cells.push(new Cell(1));
        }
      }
      this.rows.push(cells);
    }

    window.addEventListener('resize', this.resizeCanvasHandler.bind(this));
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
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
        const cell = this.rows[i][j];
        const sizeCellGrid = (Drawable.board.width - this.gap) / 4;
        cell.setPosition(
          new Vector2(j * sizeCellGrid + this.gap, i * sizeCellGrid + this.gap),
        );
        cell.setSize(sizeCellGrid - this.gap);
      }
    }

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

  move(direction) {
    const groups = this.getGroups(direction);
  }

  keyDownHandler(event) {
    switch (event.key) {
      case 'ArrowUp':
        // console.log('Click ArrowUp!');
        return this.move(Direction.up);
      case 'ArrowLeft':
        // console.log('Click ArrowLeft!');
        this.moveLeft();
        // return this.move(Direction.left);
        break;
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

  moveLeft() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (this.rows[i][j].value !== 0) {
          let curent = j;
          while (curent - 1 >= 0) {
            if (this.rows[i][curent - 1].value === 0) {
              this.rows[i][curent - 1].value = this.rows[i][curent].value;
              this.rows[i][curent].value = 0;
            } else if (
              this.rows[i][curent].value === this.rows[i][curent - 1].value
            ) {
              this.rows[i][curent - 1].value += 1;
              // this.score.innerText += this.rows[i][curent - 1].value;
              this.rows[i][curent].value = 0;
              break;
            }
            curent--;
          }
        }
      }
    }
    this.resizeCanvasHandler();
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
