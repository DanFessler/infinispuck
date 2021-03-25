import Vector2 from "./vector2";
import Behavior from "./behavior";

const TAU = Math.PI * 2;

interface LooseObject {
  [key: string]: any;
}

export default class Entity {
  parent: Entity;
  position: { x: number; y: number };
  angle: number;
  game: any;
  behaviors: Behavior[];
  children: Entity[];
  [key: string]: any;

  constructor(x: number, y: number);
  constructor(x: number, y: number, behaviors: Behavior[]);
  constructor(x: number, y: number, behaviors: Behavior[], children: Entity[]);
  constructor(
    x: number,
    y: number,
    behaviors?: Behavior[],
    children?: Entity[]
  ) {
    this.parent = null;
    this.position = new Vector2(x, y);
    this.angle = 0;

    this.game = null;

    this.behaviors = [];
    if (behaviors && behaviors.length) {
      behaviors.forEach((behavior) => {
        behavior.entity = this;
        this.behaviors.push(behavior);
        this[behavior.constructor.name] = behavior;
      });
    }

    this.children = [];
    if (children && children.length) {
      children.forEach((child) => {
        child.parent = this;
        this.children.push(child);
      });
    }
  }

  init = () => {
    this.behaviors.forEach((behavior) => {
      behavior.start();
    });
    this.children.forEach((child) => {
      child.init();
    });
  };

  update = () => {
    this.behaviors.forEach((behavior) => {
      behavior.update();
    });
    this.children.forEach((child) => {
      child.update();
    });
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);
    this.behaviors
      // .filter((behavior) => behavior.draw !== undefined)
      .forEach((behavior) => {
        behavior.draw(ctx);
      });
    this.children.forEach((child) => {
      child.draw(ctx);
    });
    ctx.restore();
  };
}
