import game from "../game";
import GameObject from "./Object.class";
import Item from "./Item.class";

export default class Coin extends GameObject {

    constructor(sprite, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
    };

    spawn(x, y) {
        this.classReset(x, y);
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls)
    }

    spawnOne(x, y) {
        this.x = x;
        this.y = y;
        this.scale.setTo(0.25, 0.25);
        this.exists = true;
        this.game.add.existing(this);        
    }
}