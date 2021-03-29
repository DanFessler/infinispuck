import Behavior from "../Behavior";
import Vector2 from "../Vector2";

const g = 2500;

class SpriteRenderer extends Behavior {
  image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    super();
    this.image = image;
  }

  start() {}

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, 0, 16, 16, 0, 0, 16, 16);
  }
}

export default SpriteRenderer;
