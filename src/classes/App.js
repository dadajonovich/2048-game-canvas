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

  startPosition;

  endPosition;

  isGameOver = false;

  constructor() {
    super();

    document.documentElement.style.touchAction = 'none';
    document.documentElement.style.userSelect = 'none';
    document.documentElement.setAttribute('ondragstart', 'return false;');

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

    this.scoreElement = document.querySelector('.counter__score');
    if (!this.scoreElement) {
      throw new Error('Score missing!');
    } else this.scoreElement.textContent = 0;

    this.loadFromLocalStorage();

    window.requestAnimationFrame(this.tick.bind(this));

    this.sizeSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.updateGridSize();
      this.restart();
    });
    window.addEventListener('resize', this.resizeCanvasHandler.bind(this));
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.body.addEventListener(
      'pointerdown',
      this.mouseDownHandler.bind(this),
    );
    document.body.addEventListener('pointerup', this.mouseUpHandler.bind(this));

    this.resizeCanvasHandler();
  }

  draw() {
    this.ctx.clearRect(0, 0, Drawable.board.width, Drawable.board.height);

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
        this.move(Direction.up);
        break;
      case 'ArrowLeft':
        this.move(Direction.left);
        break;
      case 'ArrowDown':
        this.move(Direction.down);
        break;
      case 'ArrowRight':
        this.move(Direction.right);
        break;
      default:
        break;
    }
  }

  mouseUpHandler(event) {
    this.endPosition = new Vector2(event.clientX, event.clientY);
    const directionMouseMove = this.calcMouseMove();
    if (!directionMouseMove) return;
    this.move(directionMouseMove);
  }

  mouseDownHandler(event) {
    this.startPosition = new Vector2(event.clientX, event.clientY);
  }

  calcMouseMove() {
    let direction;
    const offset = new Vector2(
      Math.abs(this.startPosition.x - this.endPosition.x),
      Math.abs(this.startPosition.y - this.endPosition.y),
    );

    if (offset.length < 1) return null;
    if (offset.x > offset.y) {
      direction =
        this.startPosition.x > this.endPosition.x
          ? Direction.left
          : Direction.right;
    } else {
      direction =
        this.startPosition.y > this.endPosition.y
          ? Direction.up
          : Direction.down;
    }
    return direction;
  }

  move(direction) {
    if (this.isAnimated) return false;
    const groups = this.getGroups(direction);
    let isChanged = false;
    Utils.forEach(groups, (current, i, j) => {
      if (j === 0) return;
      if (current.value === 0) return;
      for (let k = j; k >= 0; k--) {
        const prevObserved = groups[i][k];

        if (k === 0) {
          prevObserved.mergeWith(current, this.isTesting);
          break;
        }

        const observed = groups[i][k - 1];
        if (observed.value === 0) {
          isChanged = true;
          continue;
        }

        if (observed.value !== current.value || observed.fixed) {
          prevObserved.mergeWith(current, this.isTesting);
          break;
        }
        const mergeValue = observed.mergeWith(current, this.isTesting);
        if (!this.isTesting) {
          this.score += mergeValue;
          if (mergeValue === 2048) {
            this.isGameOver = true;
          }
        }
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
      if (this.isGameOver) {
        alert('Уровень пройден');
        this.restart();
        return;
      }

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
    this.isGameOver = false;
    this.resizeCanvasHandler();
  }

  loadFromLocalStorage() {
    const prevValues = localStorage.getItem('values');

    if (prevValues) {
      this.rows = Utils.createMatrix(this.gridSize, () => new Cell());
      const itemFromLocalStorage = JSON.parse(prevValues);
      this.score = Number(localStorage.getItem('score'));
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
