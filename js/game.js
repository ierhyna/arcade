import "pixi";
import "p2";
import Phaser from "phaser";
import { Level } from "./stages";

const game = new Phaser.Game(
    1280,
    960,
    Phaser.AUTO,
    document.getElementById("game")
);
game.state.add("Level", Level);
game.state.start("Level");

export default game;
