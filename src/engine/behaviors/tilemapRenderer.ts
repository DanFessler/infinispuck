import Behavior from "../behavior";

class TilemapRenderer extends Behavior {
  image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    super();
    this.image = image;
  }

  start = () => {};

  update = () => {};

  draw = (ctx: CanvasRenderingContext2D) => {
    const self = this.entity;
    // ctx.drawImage(this.image, 0, 0, 16, 16, 0, 0, 16, 16);
    ctx.globalAlpha = 0.05;
    for (let y = 0; y < self.Tilemap.height; y++) {
      for (let x = 0; x < self.Tilemap.width; x++) {
        ctx.drawImage(this.image, 0, 0, 16, 16, x * 16, y * 16, 16, 16);
      }
    }
    ctx.globalAlpha = 1;
  };
}

export default TilemapRenderer;
