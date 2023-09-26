import Cell from './Cell';
import Drawable from './Drawable';
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

    this.rows = Utils.createMatrix(this.gridSize, () => new Cell());

    for (let i = 0; i < 2; i++) {
      this.getAnyEmptyCell().setValue(1);
    }

    window.requestAnimationFrame(this.tick.bind(this));

    window.addEventListener('resize', this.resizeCanvasHandler.bind(this));
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    this.resizeCanvasHandler();
  }

  draw() {
    this.ctx.clearRect(0, 0, Drawable.board.width, Drawable.board.height);
    Utils.forEach(this.rows, (cell) => {
      cell.draw();
    });
  }

  resizeCanvasHandler() {
    Drawable.setCanvasSize(Math.min(document.documentElement.clientWidth, 500));
    this.gap = Drawable.board.width * 0.05;

    Utils.forEach(this.rows, (cell, i, j) => {
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
    Utils.forEach(groups, (cell, i, j) => {
      if (j === 0) return;
      if (groups[i][j].value === 0) return;
      for (let k = j; k - 1 >= 0; k--) {
        const currentCell = groups[i][k];
        const prevCell = groups[i][k - 1];
        if (prevCell.mergeWith(currentCell)) {
          break;
        }
      }
    });

    this.getAnyEmptyCell().setValue(Math.random() < 0.1 ? 2 : 1);
    this.draw();
  }

  getAnyEmptyCell() {
    const emptyCells = [];

    Utils.forEach(this.rows, (cell, i, j) => {
      if (cell.value === 0) {
        emptyCells.push(cell);
      }
    });

    if (emptyCells.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }

  tick(timestamp) {
    console.log(timestamp);
    window.requestAnimationFrame(this.tick.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
