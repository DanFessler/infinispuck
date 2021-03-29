import Entity from "./Entity";

export default class Behavior {
  entity: Entity;
  name: string;

  start() {}

  update() {}

  render() {}

  draw(ctx: CanvasRenderingContext2D) {}
}
