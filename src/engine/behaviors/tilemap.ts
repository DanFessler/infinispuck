import Behavior from "../behavior";

class Tilemap extends Behavior {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  start() {}

  update = () => {
    // this.entity.position.y = (this.entity.position.y - 1) % (16 * 25);
  };

  addForce = (v: number) => {};
}

export default Tilemap;
