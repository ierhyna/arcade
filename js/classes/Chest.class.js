import game from "../game";
import GameObject from "./Object.class";
import Item from "./Item.class";

export default class Chest extends GameObject {

    constructor(sprite, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.game.physics.enable(this);        
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.resetEverything();
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls)
    };

    spawnOne(x, y, goldAmount) {
        this.classSpawnOne(x, y);
        this.resetEverything();
    };

    updateGoldAmount() {
        if (this.totalGold >= this.goldToDrop) {
            this.totalGold -= this.goldToDrop;
        } else {
            this.totalGold = 0;
            this.kill();
        }
        console.log(this.totalGold);
    };

    resetEverything() {
        this.body.allowGravity = true;
        this.goldToDrop = 12; // amount of gold to give to receiver
        this.totalGold = 50; // total gold in the chest
    }
}