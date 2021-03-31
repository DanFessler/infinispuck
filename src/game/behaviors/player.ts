import Behavior from "../../engine/behavior";

class Player extends Behavior {
  radius: number = 16;
  color: string = "red";
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

  start() {
    this.entity.position = {
      x: this.entity.game.width / 2,
      y: this.entity.game.height / 2,
    };

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
  }

  update() {
    let self = this.entity;

    if (this.keys.space) {
    }

    if (this.keys.up) {
      this.entity.position.y -= 1;
    }

    if (this.keys.down) {
      this.entity.position.y += 1;
    }

    if (this.keys.left) {
      this.entity.position.x -= 1;
    }

    if (this.keys.right) {
      this.entity.position.x += 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    drawRect(ctx, -12, -12, 24, 12);
    ctx.stroke();
    ctx.closePath();
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
