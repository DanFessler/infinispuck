import Engine from "../engine/Engine";
import Entity from "../engine/entity";
import shipBehavior from "./behaviors/ship";
import Tilemap from "../engine/behaviors/tilemap";
import RigidBody from "../engine/behaviors/rigidbody";
import Renderer from "../engine/behaviors/renderer";
import TilemapRenderer from "../engine/behaviors/tilemapRenderer";
import tilesUrl from "../images/tiles.png";
import test from "./test";

const tiles = new Image();
tiles.src = tilesUrl;
const game = new Engine(216, 384, 2, "game", "black");

let ship = new Entity(
  game.width / 2,
  game.height / 2,

  [new Renderer(16, "#1188ff"), new RigidBody(), new shipBehavior()],
  [
    new Entity(-4, -16, [new Renderer(8, "red")]),
    new Entity(-4, 16, [new Renderer(8, "red")]),
  ]
);

let map = new Entity(
  0,
  0,
  [new Tilemap(14, 25), new TilemapRenderer(tiles)],
  [ship]
);

Engine.game.addGameObject(map);
Engine.game.run();
