import Cell from './Cell';
import Drawable from './Drawable';
import Utils from './Utils';
import Vector2 from './Vector2';
import Direction from './Direction';

class App extends Drawable {
  rows = [];

  gap;

  shouldAddCell = false;

  isAnimated = false;

  gridSize;

  scoreElement;

  score = 0;

  heightElement;

  widthElement;

  sizeSubmit;

  isTesting = false;

  constructor() {
    super();

    this.heightElement = document.getElementById('height');
    this.widthElement = document.getElementById('width');
    this.sizeSubmit = document.getElementById('sumbit');

    if (
      !(this.heightElement instanceof HTMLInputElement) ||
      !(this.widthElement instanceof HTMLInputElement) ||
      !(this.sizeSubmit instanceof HTMLButtonElement)
    ) {
      throw new Error('Inputs element missing!');
    }

    this.updateGridSize();

    this.sizeSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.updateGridSize();
      this.restart();
    });

    this.scoreElement = document.querySelector('.counter__score');
    if (!this.scoreElement) {
      throw new Error('Score missing!');
    } else this.scoreElement.textContent = 0;

    this.loadFromLocalStorage();

    // this.rows[0][0].setValue(2);
    // this.setValues([
    //   [32, 4],
    //   [8, 4],
    // ]);

    window.requestAnimationFrame(this.tick.bind(this));

    window.addEventListener('resize', this.resizeCanvasHandler.bind(this));
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    this.resizeCanvasHandler();
  }

  draw() {
    const position = new Vector2(0, 0);
    const size = new Vector2(Drawable.board.width, Drawable.board.height);
    const borderRadius = this.size / 7;

    this.ctx.fillStyle = '#cfc0af';
    // this.drawRoundedRect(position, size, borderRadius);
    this.ctx.fillRect(0, 0, Drawable.board.width, Drawable.board.height);
    this.ctx.lineWidth = 15;
    this.ctx.strokeStyle = '#9e9e9e';
    this.ctx.strokeRect(0, 0, Drawable.board.width, Drawable.board.height);

    Utils.forEach(this.rows, (cell) => {
      cell.draw();
    });
  }

  resizeCanvasHandler() {
    Drawable.setCanvasSize(this.gridSize.x, this.gridSize.y);
    this.gap = Math.min(
      Drawable.board.width * 0.05,
      Drawable.board.height * 0.05,
    );

    Utils.forEach(this.rows, (cell, i, j) => {
      const sizeCellGrid =
        (Math.min(Drawable.board.width, Drawable.board.height) - this.gap) /
        Math.min(this.gridSize.x, this.gridSize.y);
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
    // console.log(direction);
    if (this.isAnimated) return false;
    const groups = this.getGroups(direction);
    let isChanged = false;
    Utils.forEach(groups, (current, i, j) => {
      if (j === 0) return;
      if (current.value === 0) return;
      // console.log(current.value);
      for (let k = j; k >= 0; k--) {
        const prevObserved = groups[i][k];

        if (k === 0) {
          // console.log('Wall');
          prevObserved.mergeWith(current, this.isTesting);
          break;
        }

        const observed = groups[i][k - 1];
        if (observed.value === 0) {
          // console.log('Observed === 0');
          isChanged = true;
          continue;
        }

        if (observed.value !== current.value || observed.fixed) {
          // console.log('observed.value !== current.value || observed.fixed');
          prevObserved.mergeWith(current, this.isTesting);
          break;
        }
        const mergeValue = observed.mergeWith(current, this.isTesting);
        if (!this.isTesting) this.score += mergeValue;
        // console.log('Merged!');
        isChanged = true;
        break;
      }
    });
    Utils.forEach(this.rows, (cell) => cell.unfix());
    if (!this.isTesting && isChanged) this.shouldAddCell = true;

    return isChanged;
  }

  getAnyEmptyCell() {
    const emptyCells = [];

    Utils.forEach(this.rows, (cell) => {
      if (cell.value === 0) {
        emptyCells.push(cell);
      }
    });

    if (emptyCells.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }

  tick() {
    // console.log(timestamp);
    this.update();
    this.draw();
    window.requestAnimationFrame(this.tick.bind(this));
  }

  update() {
    this.scoreElement.textContent = this.score;
    this.isAnimated = false;

    Utils.forEach(this.rows, (cell) => {
      cell.animatedMove();
      if (cell.isAnimated) {
        this.isAnimated = true;
      }
    });

    if (this.shouldAddCell && !this.isAnimated) {
      this.shouldAddCell = false;
      this.getAnyEmptyCell().setValue(Math.random() < 0.1 ? 4 : 2);

      const values = this.getValues();
      Utils.saveOnLocalStorage('values', values);
      Utils.saveOnLocalStorage('score', this.score);

      this.checkGameOver();
    }
  }

  restart() {
    localStorage.clear();
    this.score = 0;
    this.rows = Utils.createMatrix(this.gridSize, () => new Cell());
    for (let i = 0; i < 2; i++) {
      this.getAnyEmptyCell().setValue(2);
    }
    this.resizeCanvasHandler();
  }

  loadFromLocalStorage() {
    const prevValues = localStorage.getItem('values');

    if (prevValues) {
      this.rows = Utils.createMatrix(this.gridSize, () => new Cell());
      const itemFromLocalStorage = JSON.parse(prevValues);
      this.score = Number(localStorage.getItem('score'));
      // console.log(itemFromLocalStorage);
      this.setValues(itemFromLocalStorage);
    } else {
      this.restart();
    }
  }

  updateGridSize() {
    this.gridSize = new Vector2(
      Math.max(2, Math.min(Number(this.widthElement.value), 10)),
      Math.max(2, Math.min(Number(this.heightElement.value), 10)),
    );
  }

  canMove(direction) {
    this.isTesting = true;
    const values = this.getValues();

    const moved = this.move(direction);

    this.setValues(values);
    this.isTesting = false;

    return moved;
  }

  getValues() {
    return this.rows.map((row) => row.map((cell) => cell.value));
  }

  setValues(values) {
    Utils.forEach(this.rows, (cell, i, j) => {
      cell.setValue(values[i][j]);
    });

    if (!this.isTesting) {
      this.checkGameOver();
    }
  }

  checkGameOver() {
    if (
      !Object.values(Direction).find((direction) => this.canMove(direction))
    ) {
      setTimeout(() => {
        alert('Нельзя сделать ход');
        this.restart();
      }, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
