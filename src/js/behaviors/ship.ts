import Engine from "../../engine/Engine";
import Entity from "../../engine/entity";
import Behavior from "../../engine/behavior";
import Vector2 from "../../engine/vector2";
import Renderer from "../../engine/behaviors/renderer";
import RigidBody from "../../engine/behaviors/rigidbody";
import Bullet from "./bullet";
import shootSFX from "../../audio/shoot.wav";

class bulletPrefab extends Entity {
  constructor(x: number, y: number) {
    super(x, y, [new Renderer(3, "#11ff88"), new RigidBody(), new Bullet()]);
  }
}

class Ship extends Behavior {
  delay: number;
  lastShot: number;
  burst: boolean;
  keys: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    space: boolean;
  };

  start = () => {
    this.entity.RigidBody.velocity.x = 0;
    this.delay = 100;
    this.lastShot = Date.now();

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
    };

    this.burst = false;

    addEventListener("keydown", (e) => {
      if (e.keyCode == 32 && this.burst == false) {
        this.keys.space = true;
        this.burst = true;
      }
      if (e.keyCode == 40) {
        this.keys.down = true;
      }
      if (e.keyCode == 38) {
        this.keys.up = true;
      }
      if (e.keyCode == 37) {
        this.keys.left = true;
      }
      if (e.keyCode == 39) {
        this.keys.right = true;
      }
    });

    addEventListener("keyup", (e) => {
      if (e.keyCode == 32) {
        this.keys.space = false;
        this.burst = false;
      }
      if (e.keyCode == 40) {
        this.keys.down = false;
      }
      if (e.keyCode == 38) {
        this.keys.up = false;
      }
      if (e.keyCode == 37) {
        this.keys.left = false;
      }
      if (e.keyCode == 39) {
        this.keys.right = false;
      }
    });
  };

  update = () => {
    let self = this.entity;
    self.RigidBody.velocity = self.RigidBody.velocity.mult(0.95);
    self.RigidBody.angularVelocity *= 0.9;

    if (this.keys.space && this.lastShot + this.delay < Date.now()) {
      this.shoot();
      this.lastShot = Date.now();
      let force = -0.1;
      self.RigidBody.addForce({
        x: Math.cos(self.angle) * force,
        y: Math.sin(self.angle) * force,
      });
    }

    if (this.keys.up) {
      let force = 0.2;
      self.RigidBody.addForce({
        x: Math.cos(self.angle) * force,
        y: Math.sin(self.angle) * force,
      });
    }

    if (this.keys.down) {
      let force = -0.1;
      self.RigidBody.addForce({
        x: Math.cos(self.angle) * force,
        y: Math.sin(self.angle) * force,
      });
    }

    if (this.keys.left) {
      self.RigidBody.angularVelocity -= 0.0075;
    }

    if (this.keys.right) {
      self.RigidBody.angularVelocity += 0.0075;
    }
  };

  shoot = () => {
    let self = this.entity;
    let sound = new Audio(shootSFX);
    sound.volume = 0.25;
    sound.play();
    this.spawnBullet(
      self.position.x + Math.cos(self.angle) * 16,
      self.position.y + Math.sin(self.angle) * 16,
      self.angle + (Math.random() - 0.5) / 10
    );
    this.spawnBullet(
      self.position.x + Math.cos(self.angle + Math.PI / 2) * 16,
      self.position.y + Math.sin(self.angle + Math.PI / 2) * 16,
      self.angle + 0.1 + (Math.random() - 0.5) / 5
    );
    this.spawnBullet(
      self.position.x + Math.cos(self.angle - Math.PI / 2) * 16,
      self.position.y + Math.sin(self.angle - Math.PI / 2) * 16,
      self.angle - 0.1 + (Math.random() - 0.5) / 5
    );
  };

  spawnBullet = (x: number, y: number, angle: number) => {
    let self = this.entity;
    let bullet = Engine.game.addGameObject(new bulletPrefab(x, y), self.parent);

    bullet.RigidBody.velocity = new Vector2(Math.cos(angle), Math.sin(angle))
      .mult(6)
      .add(self.RigidBody.velocity);
  };
}

export default Ship;
