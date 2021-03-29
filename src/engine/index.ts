import Engine from "./Engine";
export default Engine;

export { default as Entity } from "./Entity";
export { default as Vector2 } from "./Vector2";
export { default as Behavior } from "./Behavior";

// default behaviors
import Renderer from "./behaviors/renderer";
import RigidBody from "./behaviors/rigidbody";
import SpriteRenderer from "./behaviors/spriteRenderer";
import Tilemap from "./behaviors/tilemap";
import TilemapRenderer from "./behaviors/tilemapRenderer";
export { Renderer, RigidBody, SpriteRenderer, Tilemap, TilemapRenderer };
