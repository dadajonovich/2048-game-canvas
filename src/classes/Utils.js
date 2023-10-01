class Utils {
  static rotate90Counterсlockwise(matrix) {
    return matrix[0].map((_, i) => matrix.map((subArray) => subArray[i]));
  }

  static flipVertically(matrix) {
    return matrix.map((subarray) => subarray.toReversed());
  }

  static forEach(matrix, callback) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const currentCell = matrix[i][j];
        callback(currentCell, i, j);
      }
    }
  }

  static createArray(length, createItem) {
    return new Array(length)
      .fill(undefined)
      .map((_i, index) => createItem(index));
  }

  static createMatrix(size, createItem) {
    return Utils.createArray(size.y, (rowIndex) =>
      Utils.createArray(size.x, (columnIndex) => {
        return createItem(rowIndex, columnIndex);
      }),
    );
  }

  static saveOnLocalStorage(nameField, obj) {
    localStorage.setItem(nameField, JSON.stringify(obj));
  }
}

export default Utils;
