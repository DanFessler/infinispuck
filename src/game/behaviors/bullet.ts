import Engine from "../../engine/Engine";
import Behavior from "../../engine/Behavior";

class Bullet extends Behavior {
  lifespan = 200;
  time: number;

  start = () => {
    this.time = Date.now();
  };

  update = () => {
    let self = this.entity;
    if (this.time + this.lifespan < Date.now()) {
      self.RigidBody.velocity = self.RigidBody.velocity.scale(0.85);
      self.Renderer.radius = self.Renderer.radius * 0.9;
    }
    if (self.Renderer.radius < 0.25) {
      Engine.game.destroy(self);
    }
  };
}

export default Bullet;
