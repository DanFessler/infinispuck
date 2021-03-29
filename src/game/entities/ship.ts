import { Entity, Renderer, RigidBody } from "../../engine";
import ShipBehavior from "../behaviors/ship";

export default new Entity(
  240,
  240,
  [new Renderer(12, "#1188ff"), new RigidBody(), new ShipBehavior()],
  [
    new Entity(-4, -12, [new Renderer(6, "red")]),
    new Entity(-4, 12, [new Renderer(6, "red")]),
  ]
);
