import game from "../game";
import GameObject from "./Object.class";
import {Item} from "./index";

export default class Chest extends GameObject {
    constructor(sprite, data) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
    };

    spawn(x, y, gold = {}) {
        this.classReset(x, y);
        this.goldToDrop = gold.drop || 12;
        this.totalGold = gold.total || 250;
        this.resetEverything();
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls)
    };

    spawnOne(x, y, gold = {}) {
        this.classSpawnOne(x, y);
        this.goldToDrop = gold.drop || 12;
        this.totalGold = gold.total || 250;
        this.resetEverything();
    };

    updateGoldAmount() {
        if (this.totalGold >= this.goldToDrop) {
            this.totalGold -= this.goldToDrop;
        } else {
            this.totalGold = 0;
            const direction = {y: this.y - 150, alpha: 0};
            const tween = game.add.tween(this).to(direction, 1000, "Linear", true);
            tween.onComplete.addOnce(() => this.kill());
        }
    };

    resetEverything() {
        this.body.allowGravity = true;
        game.log(`spawning a chest of ${this.totalGold} gold than drops ${this.goldToDrop} coins`);

    };
}