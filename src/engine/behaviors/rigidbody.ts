import Behavior from "../behavior";
import Vector2 from "../vector2";

class RigidBody extends Behavior {
  velocity = new Vector2(0, 0);
  angularVelocity = 0;

  start() {}

  update = () => {
    let entity = this.entity;
    entity.position.x += this.velocity.x;
    entity.position.y += this.velocity.y;
    entity.angle += this.angularVelocity;
  };

  addForce(v: { x: number; y: number }) {
    // this.velocity.x += v.x;
    // this.velocity.y += v.y;
    // console.log(this.velocity.add);
    this.velocity = this.velocity.add(v);
  }
}

export default RigidBody;
