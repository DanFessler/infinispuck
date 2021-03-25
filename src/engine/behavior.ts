import Entity from "./entity";

export default class Behavior {
  entity: Entity;
  name: string;

  start() {}

  update() {}

  render() {}

  draw(ctx: CanvasRenderingContext2D) {}
}
