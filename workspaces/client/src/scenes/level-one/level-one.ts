import { Engine, Scene } from 'excalibur';

import { TPlayer } from "../../actors/player/player";

/**
 * Managed scene
 */
export class LevelOne extends Scene {
  player!: TPlayer;
  constructor() {
    super();
  }
  public onInitialize(engine: Engine) {
    // this.camera.strategy.elasticToActor(this.player, 0.2, 0.1);
  }
  public onActivate() {}
  public onDeactivate() {}
}