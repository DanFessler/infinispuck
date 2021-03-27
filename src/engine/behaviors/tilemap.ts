import Behavior from "../behavior";

class Array2d<T> {
  arr: T[][];
  constructor(width: number, height: number, initialValue?: T | null) {
    this.arr = [...new Array(height)].map(() =>
      new Array(width).fill(initialValue === undefined ? null : initialValue)
    );
    console.log(this.arr);
  }

  set(x: number, y: number, value: T | null) {
    this.arr[y][x] = value;
  }

  get(x: number, y: number): T {
    return this.arr[y][x];
  }
}

class Tilemap extends Behavior {
  width: number;
  height: number;
  data: Array2d<number>;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.data = new Array2d(width, height);
  }
}

export default Tilemap;
