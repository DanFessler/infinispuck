import { Entity, Renderer, RigidBody } from "../../engine";
import PlayerBehavior from "../behaviors/player";

const ship = new Entity(0, 0, [new RigidBody(), new PlayerBehavior()]);

export default ship;
