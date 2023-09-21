import Cell from './Cell';
import Position from './Position';

class App {
  rows = [];

  score = document.getElementById('score');

  constructor() {
    if (!this.score) {
      throw new Error('Score missing!');
    }

    for (let i = 0; i < 4; i++) {
      const cells = [];
      for (let j = 0; j < 4; j++) {
        cells.push(new Cell(new Position(j, i), 0));
      }
      this.rows.push(cells);
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.rows[j][i].draw();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
