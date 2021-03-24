export default class Engine {
  static game = null;

  constructor(width, height, scale, rootId, backgroundColor) {
    const canvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width * scale + "px";
    canvas.style.height = height * scale + "px";
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

  addGameObject = (obj, parent) => {
    obj.game = this;
    if (!parent) this.objects.push(obj);
    else {
      parent.children.push(obj);
    }
    obj.init();
    return obj;
  };

  run = () => {
    this.objects.forEach((object) => {
      object.init();
    });
    this.tick();
  };

  tick = () => {
    // update each game object
    this.objects.forEach((object) => {
      object.update();
    });

    // draw each renderable game object
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.objects.forEach((object) => {
      object.draw(this.ctx);
    });

    // loop
    requestAnimationFrame(this.tick);
  };

  destroy = (target) => {
    this.objects = this.objects.filter((obj) => obj !== target);
  };

  findObjectByType = (type) => {
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
