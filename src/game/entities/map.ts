import { Entity, Tilemap, TilemapRenderer } from "../../engine";
import MapGenerator from "../behaviors/mapGenerator";
import tilesUrl from "../../assets/images/tiles.png";

const tiles = new Image();
tiles.src = tilesUrl;

export default new Entity(0, 0, [
  new Tilemap(100, 100),
  new TilemapRenderer(tiles),
  new MapGenerator(),
]);
