import Engine from "../../engine/Engine";
import Behavior from "../../engine/behavior";

class Bullet extends Behavior {
  lifespan = 600;
  time: number;

  start = () => {
    this.time = Date.now();
  };

  update = () => {
    let self = this.entity;
    self.RigidBody.velocity = self.RigidBody.velocity.mult(0.95);
    if (this.time + this.lifespan < Date.now()) {
      self.Renderer.radius = self.Renderer.radius * 0.95;
    }
    if (self.RigidBody.velocity.length() < 0.25) {
      Engine.game.destroy(self);
    }
  };
}

export default Bullet;
