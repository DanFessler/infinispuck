import Engine from "../engine";

// Entities
// import ship from "./entities/ship";
import player from "./entities/player";
import map from "./entities/map";
import cameraTarget from "./entities/cameraTarget";

const game = new Engine(240, 240, 1, "game", "black");

game.addGameObject(map);
game.addGameObject(player);
game.addGameObject(cameraTarget);
game.run();
