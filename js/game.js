import "pixi";
import "p2";
import Phaser from "phaser";
import { Level, Preload } from "./stages";

const game = new Phaser.Game(
    1216,
    760,
    Phaser.AUTO,
    document.getElementById("game")
);

const Store = {};
// const Key = {
//     cursors: game.input.keyboard.createCursorKeys(),
//     one: game.input.keyboard.addKey(Phaser.KeyCode.ONE),
//     two: game.input.keyboard.addKey(Phaser.KeyCode.TWO),
//     three: game.input.keyboard.addKey(Phaser.KeyCode.THREE)
// }

game.state.add("Preload", Preload);
game.state.add("Level", Level);
game.state.start("Preload");

export default game;
export { Store };