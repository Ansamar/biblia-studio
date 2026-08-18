import {
  hebrewsSeed,jamesSeed,firstPeterSeed,secondPeterSeed,firstJohnSeed,secondJohnSeed,thirdJohnSeed,judeSeed,revelationSeed,
} from './general-letters-revelation.mjs'

const firstPeterReady={...firstPeterSeed,sharedEntities:[...firstPeterSeed.sharedEntities,{id:'rome-nt'}]}
const firstJohnReady={...firstJohnSeed,sharedEntities:[...firstJohnSeed.sharedEntities,{id:'jesus-historical-memory'}]}

export const generalSeeds={
  ebrei:[hebrewsSeed,'Ebrei'],
  giacomo:[jamesSeed,'Giacomo'],
  '1-pietro':[firstPeterReady,'1 Pietro'],
  '2-pietro':[secondPeterSeed,'2 Pietro'],
  '1-giovanni':[firstJohnReady,'1 Giovanni'],
  '2-giovanni':[secondJohnSeed,'2 Giovanni'],
  '3-giovanni':[thirdJohnSeed,'3 Giovanni'],
  giuda:[judeSeed,'Giuda'],
  apocalisse:[revelationSeed,'Apocalisse'],
}
