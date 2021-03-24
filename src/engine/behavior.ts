import Entity from "./entity";

export default class Behavior {
  entity: Entity;
  name: string;

  constructor() {
    let constructor: any = this.constructor;
    this.name = constructor.name;
  }

  start() {}

  update() {}

  render() {}

  draw(ctx: CanvasRenderingContext2D) {}
}
