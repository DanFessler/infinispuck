import { Vector2 } from "..";
import Behavior from "../Behavior";
import Tilemap from "./tilemap";

type rect = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

class TilemapRenderer extends Behavior {
  image: HTMLImageElement;
  tilemap: Tilemap;

  constructor(image: HTMLImageElement) {
    super();
    this.image = image;
  }

  start = () => {
    this.tilemap = this.entity.Tilemap;
  };

  update = () => {};

  getCameraTileBounds(): rect {
    const cameraPos = Vector2.Subtract(this.entity.game.cameraPos, {
      x: this.entity.game.width / 2,
      y: this.entity.game.height / 2,
    });
    const relativePos = Vector2.Subtract(cameraPos, this.entity.position);

    let x1 = Math.floor(relativePos.x / 16);
    let y1 = Math.floor(relativePos.y / 16);
    let x2 = Math.floor((relativePos.x + this.entity.game.width) / 16) + 1;
    let y2 = Math.floor((relativePos.y + this.entity.game.height) / 16) + 1;

    // clamp values to map bounds
    x1 = Math.min(Math.max(x1, 0), this.tilemap.width - 1);
    y1 = Math.min(Math.max(y1, 0), this.tilemap.height - 1);
    x2 = Math.min(Math.max(x2, 0), this.tilemap.width - 1);
    y2 = Math.min(Math.max(y2, 0), this.tilemap.height - 1);

    return {
      x1,
      y1,
      x2,
      y2,
    };
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    const self = this.entity;

    const map: Tilemap = self.Tilemap;

    let bounds = this.getCameraTileBounds();
    for (let y = bounds.y1; y <= bounds.y2; y++) {
      for (let x = bounds.x1; x <= bounds.x2; x++) {
        const tileIndex = this.tilemap.data.get(x, y);
        if (tileIndex !== null) {
          ctx.drawImage(
            this.image,
            tileIndex * 16,
            0,
            16,
            16,
            x * 16,
            y * 16,
            16,
            16
          );
        }
      }
    }
  };
}

export default TilemapRenderer;
