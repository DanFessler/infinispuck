import Behavior from "../behavior";
import Vector2 from "../vector2";

const g = 2500;

class SpriteRenderer extends Behavior {
  constructor(image) {
    super();
    this.image = image;
  }

  start() {}

  update = () => {};

  draw = (ctx) => {
    ctx.drawImage(this.image, 0, 0, 16, 16, 0, 0, 16, 16);
  };
}

export default SpriteRenderer;
