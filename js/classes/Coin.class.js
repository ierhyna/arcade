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
        this.active = true;
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.active = true;
    };

    update() {
        this.game.physics.arcade.collide(this, game.walls)
        this.game.physics.arcade.overlap(this, game.player, () => {
            if (!this.active) return;
            Text.combat(this, `+${this.value} gold`, "info");
            this.die();
        });
    };

    spawnOne(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;
        this.scale.setTo(0.25, 0.25);
        this.exists = true;
        this.active = true;
        this.game.add.existing(this);
    }

    die() {
        this.active = false;
        const direction = { y: this.y - 150, alpha: 0 }
        const tween = game.add.tween(this).to(direction, 1000, "Linear", true);
        tween.onComplete.addOnce(() => this.destroy());
    }
}