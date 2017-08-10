import game from "../game";
import GameObject from "./Object.class";
import {Item} from './index';

export default class Flag extends GameObject {
    constructor(sprite, levelParams = {}, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.goldCounter = 0;
        this.enemyCounter = 0;
        this.goldCounterMax = levelParams.gold || 250;
        this.enemyCounterMax = levelParams.enemy || 20;
        this.active = true;
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
        game.log(`Flag set with failure conditions: lose ${this.goldCounterMax} gold or let ${this.enemyCounterMax} enemies escape `);
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls);
    };

    reactToEnemy(enemy) {
        if (!this.active) return;
        enemy.escape();
        this.enemyCounter++;
        this.goldCounter += enemy.gold;
        game.log(`${this.enemyCounter}/${this.enemyCounterMax} enemies escaped with ${this.goldCounter}/${this.goldCounterMax} gold`);
        if (this.enemyCounter >= this.enemyCounterMax
            || this.goldCounter >= this.goldCounterMax) {
            game.log(`Lose conditions met`);
            this.active = false;
            this.visible = false;
        }
    };

    updateRules(levelParams = {}){
        this.goldCounterMax = levelParams.gold;
        this.enemyCounterMax = levelParams.enemy;
    };

}