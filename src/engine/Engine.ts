import Entity from "./entity";
import Vector2 from "./vector2";

export default class Engine {
  static game: Engine = null;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  objects: Entity[];
  cameraPos: Vector2 = new Vector2();

  constructor(
    width: number,
    height: number,
    scale: number,
    rootId: string,
    backgroundColor: string
  ) {
    const canvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    canvas.width = width;
    canvas.height = height;
    canvas.style.imageRendering = "pixelated";
    canvas.style.backgroundColor = backgroundColor;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    // this.ctx.scale(scale, scale);

    document.getElementById(rootId).appendChild(canvas);

    if (!Engine.game) {
      Engine.game = this;
    }
    this.objects = [];
  }

  addGameObject = (obj: Entity, parent?: Entity) => {
    obj.game = this;
    if (!parent) this.objects.push(obj);
    else {
      parent.children.push(obj);
      obj.parent = parent;
    }
    obj.init();
    return obj;
  };

  run = () => {
    // this.objects.forEach((object) => {
    //   object.init();
    // });
    this.tick();
  };

  tick = () => {
    // update each game object
    this.objects.forEach((object) => {
      object.update();
    });

    // draw each renderable game object
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.ctx.translate(
      Math.floor(-this.cameraPos.x + this.width / 2),
      Math.floor(-this.cameraPos.y + this.height / 2)
    );
    this.objects.forEach((object) => {
      object.draw(this.ctx);
    });
    this.ctx.restore();

    // loop
    requestAnimationFrame(this.tick);
  };

  destroy = (target: Entity) => {
    if (!target.parent) {
      this.objects = this.objects.filter((obj) => obj !== target);
    } else {
      target.parent.children = target.parent.children.filter(
        (obj) => obj !== target
      );
    }
  };

  findObjectByType = (type: string): Entity => {
    let foundObject = null;
    this.objects.forEach((object) => {
      object.behaviors.forEach((behavior) => {
        if (behavior.constructor.name === type) {
          foundObject = behavior;
        }
      });
    });
    return foundObject;
  };
}

export class Input {}
