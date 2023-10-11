import { ImageFiltering, ImageSource, Loader } from 'excalibur';

import { TiledMapResource } from '@excaliburjs/plugin-tiled';

import { pathsPlainObject } from '../assets/maps';

// collect maps from folders

console.log("pathsPlainObject: ", pathsPlainObject);

const maps = Object.entries(pathsPlainObject).reduce(
  (acc, [key, value]) => {
    acc[key] = new TiledMapResource(value);
    acc[key].convertPath = function (originPath, relativePath) {
      // convert images for tileset paths
      if (relativePath.includes("tileset.")) {
        const filename = relativePath.split("/").pop();
        return "./img/" + filename;
      }
      // convert tsj path
      if (relativePath.includes(".tsj")) {
        const filename = relativePath.split("/").pop();
        return "./assets/maps/" + filename;
      }
      console.log("relativePath: ", relativePath);
      console.log("originPath: ", originPath);
      return relativePath;
    };
    return acc;
  },
  {} as Record<keyof typeof pathsPlainObject, TiledMapResource>,
);
console.log("maps: ", maps);
/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
export const Resources = {
  Sword: new ImageSource("../img/sword.png", false, ImageFiltering.Pixel),
  // Map: maps.VillageRoderikHouseBasement,
  // Map: new TiledMapResource("../assets/maps/map1/tilemap.tmx"),
  ...maps,
  // const tiledMapResource = new tiled.TiledMapResource(residenceMap);
  //   scene1Map: new tiled.TiledMapResource(residenceMap),
};

export const loader = new Loader();
for (const resource of Object.values(Resources)) {
  loader.addResource(resource);
}
