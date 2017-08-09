import game from "../game";
import GameObject from "./Object.class";
import {Item} from './index';

export default class Flag extends GameObject {
    constructor(sprite, data) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.resetEverything();
    };

    spawnOne(x, y) {
        this.classSpawnOne(x, y);
        this.resetEverything();
    };

    resetEverything() {
        this.body.allowGravity = true;
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls);
    };

    reactToEnemy(enemy){
        enemy.escape();
    };

}