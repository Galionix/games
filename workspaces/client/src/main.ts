import { DisplayMode, Engine, Vector } from 'excalibur';

import { DevTool } from '@excaliburjs/dev-tools';

import {
    EMapsEnum, fullPaths, pathsNullValues, pathsObject, pathsPlainObject, TMapNames
} from '../assets/maps';
import { Player } from './actors/player/player';
import { loader, Resources } from './resources';
import { Level } from './scenes/generalMap';

console.log("prefixedPaths: ", fullPaths);
console.log("pathsObject: ", pathsObject);

const initialLevelName = EMapsEnum.VillageRoderikHouseBasement;

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  levels: Record<TMapNames, Level> = pathsNullValues;
  // levelOne: LevelOne;

  constructor() {
    super({ displayMode: DisplayMode.FitScreen });
  }

  public start() {
    // this.levelOne = new LevelOne();

    // game.add("levelOne", this.levelOne);

    this.levels = Object.entries(pathsPlainObject).reduce(
      (acc, [key, value]) => {
        const level = new Level({
          name: key,
          map: Resources[key as TMapNames],
        });

        acc[key as TMapNames] = level;
        console.log("key, level: ", key, level);
        return acc;
      },
      {} as Record<TMapNames, Level>,
    );

    for (const level of Object.values(this.levels)) {
      console.log("level: ", level);
      game.add(level.name, level);
    }

    loader.suppressPlayButton = true;

    return super.start(loader);
  }
}

const game = new Game();

game.start().then(() => {
  game.goToScene(initialLevelName);
  const objects =
    Resources[initialLevelName].data.getObjectLayerByName("objects");
  console.log("objects: ", objects);
  // const colliders = Resources[initialLevelName].getCollidersForGid(32);
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
  Resources[initialLevelName].addTiledMapToScene(game.currentScene);
});

game.on("initialize", () => {});

// game.showDebug(true);
const devtool = new DevTool(game);
