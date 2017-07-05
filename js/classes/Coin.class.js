import game, { Text } from "../game";
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
        this.game.physics.arcade.overlap(this, game.player, () => {
            console.log("ate coin worth of " + this.value);
            Text.combat(this, `+${this.value} gold`, "info");
            this.kill();
        });
    };

    spawnOne(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;
        this.scale.setTo(0.25, 0.25);
        this.exists = true;
        this.game.add.existing(this);
    }
}