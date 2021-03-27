import Engine from "../engine/Engine";
import Entity from "../engine/entity";
import ShipBehavior from "./behaviors/ship";
import Tilemap from "../engine/behaviors/tilemap";
import RigidBody from "../engine/behaviors/rigidbody";
import Renderer from "../engine/behaviors/renderer";
import TilemapRenderer from "../engine/behaviors/tilemapRenderer";
import tilesUrl from "../images/tiles.png";
import MapGenerator from "./behaviors/mapGenerator";

const tiles = new Image();
tiles.src = tilesUrl;
const game = new Engine(240, 240, 1, "game", "black");

let ship = new Entity(
  game.width / 2,
  game.height / 2,

  [new Renderer(12, "#1188ff"), new RigidBody(), new ShipBehavior()],
  [
    new Entity(-4, -12, [new Renderer(6, "red")]),
    new Entity(-4, 12, [new Renderer(6, "red")]),
  ]
);
let poop = new Entity(0, 0, null);

let map = new Entity(0, 0, [
  new Tilemap(100, 100),
  new TilemapRenderer(tiles),
  new MapGenerator(),
]);

Engine.game.addGameObject(map);
Engine.game.addGameObject(ship);
Engine.game.run();
