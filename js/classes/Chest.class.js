import game from "../game";
import Object from "./Object.class";
import Item from "./Item.class";

export default class Chest extends Object {

    constructor(game, data = {}) {
        super(game, "treasure");
        this.game = game;
        this.item = new Item(data);
    };

    spawn(x, y) {
        this.classReset(x, y);
    };

    spawnOne(x, y, goldAmount) {
        this.goldAmount = goldAmount;
        this.scale.setTo(0.25, 0.25);
        this.game.add.existing(this);
    }
}