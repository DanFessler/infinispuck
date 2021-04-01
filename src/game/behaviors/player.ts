import { RigidBody, Tilemap, Vector2 } from "../../engine";
import Behavior from "../../engine/behavior";
import map from "../entities/map";

const tilesize = 16;

class Player extends Behavior {
  radius = 16;
  color = "red";
  rigidBody: RigidBody;
  map: Tilemap;
  velocity: Vector2 = new Vector2(3, 0);
  gravity = 0.2;
  jumping = true;
  jumpForce = 4.5;

  keys: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    space: boolean;
  };

  start() {
    this.rigidBody = this.entity.RigidBody;
    this.map = map.Tilemap;

    this.entity.position = new Vector2(
      this.entity.game.width / 2,
      this.entity.game.height / 2
    );

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
    };

    addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        this.keys.space = true;
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
        if (this.jumping) this.velocity.y *= 0.5;
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

    addEventListener("pointerdown", (e) => {
      this.keys.space = true;
    });
    addEventListener("pointerup", (e) => {
      this.keys.space = false;
      if (this.jumping) this.velocity.y *= 0.5;
    });

    // this.rigidBody.addForce({ x: 1, y: 0 });
  }

  update() {
    let self = this.entity;

    // let delta: Vector2 = new Vector2();

    if (this.keys.space && !this.jumping) {
      console.log("Space");
      this.velocity.y = -this.jumpForce;
      this.jumping = true;
    }

    if (this.keys.up) {
      this.velocity.y -= 0.5;
    }

    if (this.keys.down) {
      this.velocity.y += 0.1;
    }

    if (this.keys.left) {
      this.velocity.x -= 0.1;
    }

    if (this.keys.right) {
      this.velocity.x += 0.1;
    }

    this.velocity.y += this.gravity;

    this.resolveMapCollisions(this.velocity);
  }

  resolveMapCollisions(delta: Vector2) {
    this.getMapCoords(this.map, this.entity.position);

    if (delta.y) {
      this.entity.position.y += delta.y;
      // Up
      if (
        this.checkCollision(this.map, [
          { x: this.entity.position.x - 12, y: this.entity.position.y - 12 },
          {
            x: this.entity.position.x + 12 - 1,
            y: this.entity.position.y - 12,
          },
        ])
      ) {
        // console.log("up");
        this.entity.position.y =
          Math.floor(this.entity.position.y / tilesize) * tilesize + 12;

        this.velocity.y *= -0.5;
      }

      // Down
      if (
        this.checkCollision(this.map, [
          { x: this.entity.position.x - 12, y: this.entity.position.y - 1 },
          { x: this.entity.position.x + 12 - 1, y: this.entity.position.y - 1 },
        ])
      ) {
        // console.log("down");
        this.entity.position.y =
          Math.floor(this.entity.position.y / tilesize) * tilesize;

        this.velocity.y = 0;
        this.jumping = false;
      }
    }

    if (delta.x) {
      this.entity.position.x += delta.x;
      // right
      if (
        this.checkCollision(this.map, [
          { x: this.entity.position.x + 12 - 1, y: this.entity.position.y - 1 },
          {
            x: this.entity.position.x + 12 - 1,
            y: this.entity.position.y - 12,
          },
        ])
      ) {
        // console.log("right");
        this.entity.position.x =
          (Math.floor(this.entity.position.x / tilesize) + 1) * tilesize - 12;

        this.velocity.x *= -1;
        this.jumping = false;
      }

      // left
      if (
        this.checkCollision(this.map, [
          { x: this.entity.position.x - 12, y: this.entity.position.y - 1 },
          { x: this.entity.position.x - 12, y: this.entity.position.y - 12 },
        ])
      ) {
        // console.log("left");
        this.entity.position.x =
          Math.floor(this.entity.position.x / tilesize) * tilesize + 12;

        this.velocity.x *= -1;
        this.jumping = false;
      }
    }
  }

  checkCollision(map: Tilemap, points: { x: number; y: number }[]) {
    let collision = false;
    points.forEach((point) => {
      let tpos = this.getMapCoords(map, point);
      if (map.data[tpos.y][tpos.x] !== 0) collision = true;
    });
    return collision;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    drawRect(ctx, -12, -12, 24, 12);
    ctx.stroke();
    ctx.closePath();
  }

  getMapCoords(map: Tilemap, pos: { x: number; y: number }): Vector2 {
    const mapPos = map.entity.position;
    let playerTilePos = {
      x: Math.floor((pos.x - mapPos.x) / tilesize),
      y: Math.floor((pos.y - mapPos.y) / tilesize),
    };
    return new Vector2(playerTilePos.x, playerTilePos.y);
  }
}

function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.rect(x + 0.5, y + 0.5, w - 1, h - 1);
}

export default Player;
