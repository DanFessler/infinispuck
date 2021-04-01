import { Entity, Behavior, Renderer, Vector2 } from "../../engine";
import player from "./player";
import map from "./map";

class CameraTarget extends Behavior {
  player: Entity = player;

  constructor() {
    super();
  }

  start() {
    let x = this.entity.game.width / 2;
    let y = this.entity.game.height / 2;
    this.entity.position = new Vector2(x, y);
    this.entity.game.cameraPos = new Vector2(x, y);
  }

  update() {
    const self = this.entity;
    self.position = new Vector2(
      self.position.x,
      Math.min(this.player.position.y, self.position.y)
    );
    self.game.cameraPos = self.game.cameraPos.lerp(self.position, 0.1);

    if (self.game.cameraPos.y - self.game.height / 2 < map.position.y) {
      // map.position.y -= 16 * 15;
      map.MapGenerator.shift();
    }
  }
}

export default new Entity(0, 0, [new CameraTarget()]);
