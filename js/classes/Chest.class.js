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
        this.goldToDrop = 12;
        this.totalGold = 50;
    };

    spawn(x, y) {
        this.classReset(x, y);
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls)
    }

    spawnOne(x, y, goldAmount) {
        this.goldAmount = goldAmount;
        this.scale.setTo(0.25, 0.25);
        this.game.add.existing(this);
    }

    updateGoldAmount() {
      if (this.totalGold >= this.goldToDrop) {
        this.totalGold -= this.goldToDrop;
      } else {
        this.totalGold = 0;
      }
      console.log(this.totalGold);
    }
}
