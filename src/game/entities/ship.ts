import { Entity, Renderer, RigidBody } from "../../engine";
import ShipBehavior from "../behaviors/ship";

const ship = new Entity(
  0,
  0,
  [
    // Behaviors
    new Renderer(12, "#1188ff"),
    new RigidBody(),
    new ShipBehavior(),
  ],
  [
    // Children
    new Entity(-4, -12, [new Renderer(6, "red")]),
    new Entity(-4, 12, [new Renderer(6, "red")]),
  ]
);

export default ship;
