import game from "../game";
import Enemy from "./Enemy.class";
import Item from "./Item.class";

export default class Blob extends Enemy {

    constructor(game, data = {}) {
        super(game, "blobby");
        this.game = game;
        this.item = new Item(data);
    };

    spawn(x, y) {
        this.classReset(x, y);
        if (Math.random() < 0.5) {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
    };
}