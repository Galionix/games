import { DisplayMode, Engine, Vector } from "excalibur";

import { DevTool } from "@excaliburjs/dev-tools";

import { Player } from "./actors/player/player";
// import { Player_CameraStrategy } from "./classes/Player_CameraStrategy";
import { loader, Resources } from "./resources";
import { LevelOne } from "./scenes/level-one/level-one";

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  levelOne: LevelOne;

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
  const colliders = Resources.Map.getCollidersForGid(32);
  console.log("colliders: ", colliders);
  const camera = objects.getObjectByName("Camera");
  if (camera) {
    game.currentScene.camera.pos = new Vector(camera.x, camera.y);
    game.currentScene.camera.zoom =
      camera.getProperty<number>("zoom")?.value ?? 1.0;
  }
  const player = objects.getObjectByName("Player");
  if (player) {
    const playerActor = new Player(new Vector(player.x, player.y));
    console.log("playerActor: ", playerActor);
    game.currentScene.add(playerActor);
    playerActor.z = 100;
    // const cameraStrategy = new LockCameraToActorStrategy(playerActor);
    // console.log("playerActor: ", playerActor.center);
    // // game.levelOne.camera.addStrategy(cameraStrategy);
    // game.on("initialize", () => {
    //   // game.currentScene.camera.strategy.elasticToActor(playerActor, 0.2, 0.1);
    //   // Add custom Camera behavior, following player and being limited to the map bounds
    //   // console.log("playerActor: ", playerActor);
    //   // const cameraStrategy = new Player_CameraStrategy(
    //   //   playerActor,
    //   //   Resources.Map,
    //   // );

    // });
  }

  // game.add(map);
  Resources.Map.addTiledMapToScene(game.currentScene);
});

game.on("initialize", () => {});
// Add custom Camera behavior, following player and being limited to the map bounds
// const cameraStrategy = new Player_CameraStrategy(player);
// game.currentScene.camera.addStrategy(cameraStrategy);

// Set up ability to query for certain actors on the fly
// game.currentScene.world.queryManager.createQuery([TAG_ANY_PLAYER]);
// game.currentScene.world.queryManager.createQuery([TAG_MOBLIN_ROAM_POINT]);

// // Create player state list and network listener
// new NetworkActorsMap(game);
// const peer = new NetworkClient(game);

// // When one of my nodes updates, send it to all peers
// game.on(EVENT_SEND_PLAYER_UPDATE, (update) => {
//   peer.sendUpdate(update);
// });
// game.on(EVENT_SEND_MOBLIN_UPDATE, (update) => {
//   peer.sendUpdate(update);
// });
// });
const devtool = new DevTool(game);
