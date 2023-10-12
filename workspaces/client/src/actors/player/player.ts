import {
    Actor, CameraStrategy, CollisionStartEvent, CollisionType, Color, ElasticToActorStrategy,
    Engine, Vector
} from 'excalibur';

import { TMapNames } from '../../../assets/maps/maps';
import { DirectionQueue } from '../../classes/DirectionQueue';
import { EDirection } from '../../constants';
import { onPreUpdateMovement } from '../../input/moving.controller';
import { loadLevel } from '../../main';
import { Resources } from '../../resources';
import { getTiledObjectPropertyValues } from '../../utils/tileUtils';

type onInitialize = Actor["onInitialize"];
type t = Actor["on"];
export class Player extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      width: 32,
      height: 32,
      color: new Color(255, 255, 255),
      collisionType: CollisionType.Active,
    });
    this.directionQueue = new DirectionQueue();
    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }
  directionQueue: DirectionQueue;
  speed = 160;
  engine: Engine;
  facing = EDirection.down;
  cameraStrategy: CameraStrategy<any>;
  onInitialize(engine: Engine) {
    this.engine = engine;
    this.graphics.use(Resources.Sword.toSprite());
    engine.currentScene.camera.clearAllStrategies();
    this.cameraStrategy = new ElasticToActorStrategy(this, 0.2, 0.1);
    engine.currentScene.camera.addStrategy(this.cameraStrategy);
  }

  onCollisionStart(evt: CollisionStartEvent<Actor>) {
    const name = evt.other.name;
    if (name === "portal") {
      const [destination, entry] = getTiledObjectPropertyValues(evt.other, [
        "destination",
        "entry",
      ]) as [TMapNames, string];
      loadLevel(destination, entry);
    }
  }

  public onPreUpdate: Actor["onPreUpdate"] = (engine, delta) => {
    onPreUpdateMovement(engine, delta, this);
  };

  collides(actor: Actor) {
    if (actor instanceof Player) {
      return false;
    }
    // return super.collides(actor);
  }
}

export type TPlayer = Player;
