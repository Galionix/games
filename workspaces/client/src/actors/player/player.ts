import {
  Actor,
  Color,
  ElasticToActorStrategy,
  Engine,
  Vector,
} from "excalibur";

import { DirectionQueue } from "../../classes/DirectionQueue";
import { EDirection } from "../../constants";
import { onPreUpdateMovement } from "../../input/moving.controller";
// import { inputController } from "../../input/moving.controller";
// import { movingController } from "../../input/moving.controller";
import { Resources } from "../../resources";

type onInitialize = Actor["onInitialize"];

export class Player extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      width: 25,
      height: 25,
      color: new Color(255, 255, 255),
    });
    this.directionQueue = new DirectionQueue();
  }
  directionQueue: DirectionQueue;
  speed = 160;
  facing = EDirection.down;
  onInitialize(engine: Engine) {
    this.graphics.use(Resources.Sword.toSprite());
    console.log("this: ", this.center);
    const cameraStrategy = new ElasticToActorStrategy(this, 0.2, 0.1);
    // console.log("playerActor: ", playerActor.center);
    // game.levelOne.camera.addStrategy(cameraStrategy);
    // inputController({ engine, player: this });
    engine.currentScene.camera.addStrategy(cameraStrategy);
  }
  // public update: Actor["update"] = (engine, delta) => {
  //   // inputController({ engine, player: this, delta });
  // };
  public onPreUpdate: Actor["onPreUpdate"] = (engine, delta) => {
    // console.log("engine: ", engine);
    onPreUpdateMovement(engine, delta, this);
  };
}

export type TPlayer = Player;
