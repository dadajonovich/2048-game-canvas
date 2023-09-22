class Utils {
  //   static createArrayWithRandomInt(min = 0, max = 15, length = 2) {
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

  static rotate90Counterclockwise(matrix) {
    return matrix[0].map((_, i) => matrix.map((subArray) => subArray[i]));
  }

  static flipVertically(matrix) {
    return matrix.map((subarray) => subarray.reverse());
  }
}

export default Utils;
