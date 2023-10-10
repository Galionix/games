// import * as ex from "excalibur";

// import { Vector } from "excalibur";

// import { TiledMapResource } from "@excaliburjs/plugin-tiled";

// import { TPlayer } from "../actors/player/player.js";
// import { SCALE } from "../constants";

// export class Player_CameraStrategy {
//   position: ex.Vector;
//   target: TPlayer;
//   map: TiledMapResource;
//   constructor(target: TPlayer, map: TiledMapResource) {
//     this.target = target;
//     this.position = new Vector(this.target.pos.x, this.target.pos.y);
//     this.map = map;
//   }

//   action(target, camera, engine, delta) {
//     const SPEED = 0.08;

//     const distance = this.position.distance(this.target.pos);
//     if (distance > 2) {
//       this.position.x = lerp(this.position.x, this.target.pos.x, SPEED);
//       this.position.y = lerp(this.position.y, this.target.pos.y, SPEED);
//     }

//     // Limits
//     const R_LIMIT = this.map.data.tileWidth * SCALE * 16 - 7 * SCALE * 16;
//     this.position.x = this.position.x > R_LIMIT ? R_LIMIT : this.position.x;

//     const L_LIMIT = 8 * SCALE * 16;
//     this.position.x = this.position.x < L_LIMIT ? L_LIMIT : this.position.x;

//     const D_LIMIT = this.map.data.tileHeight * SCALE * 16 - 5 * SCALE * 16;
//     this.position.y = this.position.y > D_LIMIT ? D_LIMIT : this.position.y;

//     const U_LIMIT = 7 * SCALE * 16;
//     this.position.y = this.position.y < U_LIMIT ? U_LIMIT : this.position.y;

//     return this.position;
//   }
// }

// function lerp(currentValue, destinationValue, time) {
//   return currentValue * (1 - time) + destinationValue * time;
// }