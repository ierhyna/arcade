import game from "../game";
import GameObject from "./Object.class";
import Item from "./Item.class";

export default class Chest extends GameObject {

    constructor(sprite, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.goldToDrop = 12; // amount of gold to give to receiver
        this.totalGold = 50; // total gold in the chest
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls)
    };

    spawnOne(x, y, goldAmount) {
        this.scale.setTo(0.25, 0.25);
        this.game.add.existing(this);
        this.goldToDrop = 12; // amount of gold to give to receiver
        this.totalGold = 50; // total gold in the chest
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
}