import {
  Actor,
  CollisionType,
  Color,
  ElasticToActorStrategy,
  Engine,
  Vector,
} from "excalibur";

import { DirectionQueue } from "../../classes/DirectionQueue";
import { EDirection } from "../../constants";
import { onPreUpdateMovement } from "../../input/moving.controller";
import { Resources } from "../../resources";

type onInitialize = Actor["onInitialize"];

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
  }
  directionQueue: DirectionQueue;
  speed = 160;
  facing = EDirection.down;
  onInitialize(engine: Engine) {
    this.graphics.use(Resources.Sword.toSprite());
    const cameraStrategy = new ElasticToActorStrategy(this, 0.2, 0.1);
    engine.currentScene.camera.addStrategy(cameraStrategy);
  }

  public onPreUpdate: Actor["onPreUpdate"] = (engine, delta) => {
    onPreUpdateMovement(engine, delta, this);
  };
}

export type TPlayer = Player;
