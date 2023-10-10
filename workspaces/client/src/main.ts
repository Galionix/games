import { DisplayMode, Engine, Vector } from "excalibur";

import { Player } from "./actors/player/player";
import { loader, Resources } from "./resources";
import { LevelOne } from "./scenes/level-one/level-one";

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  private levelOne: LevelOne;

  constructor() {
    super({ displayMode: DisplayMode.FitScreen });
  }

  public start() {
    // Create new scene with a player
    this.levelOne = new LevelOne();
    // this.player = new Player();
    // this.levelOne.add(this.player);

    game.add("levelOne", this.levelOne);
    // Resources.scene1Map.convertPath = (tmxLocation, relativePath) => {
    //   const resourceName = relativePath.split("/").at(-1)?.split(".")[0];
    //   // for each linked tileset
    //   if (tileset.includes(resourceName)) {
    //     return tileset;
    //   }
    // };
    // Automatically load all default resources
    // const loader = new Loader(Object.values(Resources));
    // Resources.Map.ti
    loader.suppressPlayButton = true;

    // game.currentScene.camera.zoom = 2;

    return super.start(loader);
  }
}

const game = new Game();

// Only necessary for parcel v2 rearranging assets at the root
// or if you have a build system that moves resources linked by the .tmx
// tiledMapResource.convertPath = (tmxLocation, relativePath) => {
//   const resourceName = relativePath.split("/").at(-1)?.split(".")[0];
//   // for each linked tileset
//   if (tileset.includes(resourceName)) {
//     return tileset;
//   }
// };
// const loader = new Loader([tiledMapResource]);

// game.toggleDebug();
game.start().then(() => {
  // tiledMapResource.addTiledMapToScene(game.currentScene);
  // game.currentScene.camera.zoom = 2;
  game.goToScene("levelOne");
  // const map = Resources.Map.getTileMap();

  console.log("Resources: ", Resources);
  const objects = Resources.Map.data.getObjectLayerByName("objects");
  const camera = objects.getObjectByName("Camera");
  if (camera) {
    game.currentScene.camera.pos = new Vector(camera.x, camera.y);
    game.currentScene.camera.zoom =
      camera.getProperty<number>("zoom")?.value ?? 1.0;
  }
  const player = objects.getObjectByName("Player");
  if (player) {
    const playerActor = new Player(new Vector(player.x, player.y));
    game.currentScene.add(playerActor);
    playerActor.z = 100;
  }

  // game.add(map);
  Resources.Map.addTiledMapToScene(game.currentScene);
});
