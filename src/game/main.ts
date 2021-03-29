import Engine from "../engine";

// Entities
import ship from "./entities/ship";
import map from "./entities/map";

const game = new Engine(240, 240, 1, "game", "black");

game.addGameObject(map);
game.addGameObject(ship);
game.run();
