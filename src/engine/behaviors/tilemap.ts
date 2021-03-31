import Behavior from "../behavior";

class Tilemap extends Behavior {
  width: number;
  height: number;
  data: number[][];

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.fill(width, height);
  }

  fill(width: number, height: number, initialValue?: number | null) {
    this.data = [...new Array(height)].map(() =>
      new Array(width).fill(initialValue === undefined ? null : initialValue)
    );
  }

  set(x: number, y: number, value: number | null) {
    this.data[y][x] = value;
  }

  get(x: number, y: number): number {
    return this.data[y][x];
  }
}

export default Tilemap;
