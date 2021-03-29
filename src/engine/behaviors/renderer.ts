import Behavior from "../Behavior";

class Renderer extends Behavior {
  radius: number;
  color: string;

  constructor(radius: number, color: string) {
    super();
    this.radius = radius;
    this.color = color;
  }

  start() {}

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.radius, 0);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

export default Renderer;
