import Engine from "../../engine/Engine";
import Behavior from "../../engine/behavior";
import Tilemap from "../../engine/behaviors/tilemap";

class MapGenerator extends Behavior {
  start = () => {
    const map: Tilemap = this.entity.Tilemap;
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        map.data.set(x, y, Math.floor(Math.random() * 3));
      }
    }
  };

  update = () => {};
}

export default MapGenerator;
