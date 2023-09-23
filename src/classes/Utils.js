class Utils {
  //   static createArrayWithRandomInt(min = 1, max = 16, length = 2) {
  //     const randomArray = [];

  //     if (length > max - min + 1) {
  //       throw new Error('Insufficient array length!');
  //     }

  //     while (randomArray.length < length) {
  //       const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

  //       if (!randomArray.includes(randomValue)) {
  //         randomArray.push(randomValue);
  //       }
  //     }

  //     return randomArray;
  //   }

  static createArrayWithRandomInt(min = 0, max = 15, length = 2) {
    const randomArray = new Array(max - min + 1)
      .fill()
      .map((_i, i) => i + min)
      .sort(() => Math.random() - 0.5)
      .filter((_i, i) => i < length);

    return randomArray;
  }

  // static rotate90Counterсlockwise(matrix) {
  //   return matrix[0].map((_, i) => matrix.map((subArray) => subArray[i]));
  // }

  static rotate90Counterсlockwise(matrix) {
    const transformedMatrix = [];
    const lengthRows = matrix.length;
    const lengthCols = matrix[0].length;

    for (let i = 0; i < lengthCols; i++) {
      const group = [];
      for (let j = 0; j < lengthRows; j++) {
        group.push(matrix[j][i]);
      }
      transformedMatrix.push(group);
    }

    return transformedMatrix;
  }

  static flipVertically(matrix) {
    return matrix.map((subarray) => subarray.toReversed());
  }
}

export default Utils;