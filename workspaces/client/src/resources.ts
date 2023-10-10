import { ImageFiltering, ImageSource, Loader } from "excalibur";

import { TiledMapResource } from "@excaliburjs/plugin-tiled";

// import sword from "../img/sword.png";

// console.log("sword: ", sword);

// const tiled = require("../assets/maps/map1/tileset.json");
/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
export const Resources = {
  Sword: new ImageSource("../img/sword.png", false, ImageFiltering.Pixel),
  Map: new TiledMapResource("../assets/maps/map1/tilemap.tmx"),
  // const tiledMapResource = new tiled.TiledMapResource(residenceMap);
  //   scene1Map: new tiled.TiledMapResource(residenceMap),
};

export const loader = new Loader();
for (const resource of Object.values(Resources)) {
  loader.addResource(resource);
}
