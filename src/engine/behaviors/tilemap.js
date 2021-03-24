import Behavior from "../behavior";

class Tilemap extends Behavior {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    // this.x = -4;
    // this.y = 0;
  }
  start() {}

  update = () => {
    this.entity.position.y = (this.entity.position.y - 1) % (16 * 25);
  };

  addForce = (v) => {};
}

export default Tilemap;
