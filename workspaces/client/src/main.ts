import { DisplayMode, Engine, Vector } from 'excalibur';

// import { DevTool } from '@excaliburjs/dev-tools';
import { EMapsEnum, pathsNullValues, pathsPlainObject, TMapNames } from '../assets/maps/maps';
import { Player } from './actors/player/player';
import { loader, Resources } from './resources';
import { Level } from './scenes/generalMap';

const initialLevelName = EMapsEnum.VillageRoderikHouseBasement;
const initialEntryId = "1";

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  // portals: Record<string, TiledObject> = {};
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

        return acc;
      },
      {} as Record<TMapNames, Level>,
    );

    for (const level of Object.values(this.levels)) {
      game.add(level.name, level);
    }

    loader.suppressPlayButton = true;

    return super.start(loader);
  }
}

const game = new Game();

game.start().then(() => {
  loadLevel(initialLevelName, initialEntryId);
});

game.on("initialize", () => {});

game.showDebug(true);
// const devtool = new DevTool(game);

export function loadLevel(name: TMapNames, entryId: string) {
  game.currentScene?.clear();
  game.goToScene(name);
  const objects = Resources[name].data.getObjectLayerByName("objects");
  const camera = objects.getObjectByName("Camera");
  const entry = objects
    .getObjectsByName("entry")
    .filter((e) => e.getProperty("id")?.value == entryId)[0];

  if (camera) {
    game.currentScene.camera.pos = new Vector(camera.x, camera.y);
    game.currentScene.camera.zoom =
      camera.getProperty<number>("zoom")?.value ?? 1.0;
  }
  const player = objects.getObjectByName("Player");
  if (player) {
    const playerActor = new Player(new Vector(entry.x, entry.y));
    game.currentScene.add(playerActor);
    playerActor.z = 100;
  }
  Resources[name].addTiledMapToScene(game.currentScene);
}