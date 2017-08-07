import game, {Text} from "../game";
import GameObject from "./Object.class";
import Item from "./Item.class";

export default class Coin extends GameObject {

    constructor(sprite, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
        this.animations.add("spin", [0, 1, 2, 3, 4, 3, 2, 1], 6, true);
        this.sound = game.add.audio("coinPickUp");
        this.active = true;
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.resetEverything();
    };

    update() {
        if (!this.active) return;
        this.game.physics.arcade.collide(this, game.walls);
        this.game.physics.arcade.overlap(this, game.player, () => {
            this.sound.play();
            Text.combat(this, `+${this.value} gold`, "info");
            game.player.stats.goldRecoverCounter += this.value;
            this.die();
        });
    };

    spawnOne(x, y) {
        this.classSpawnOne(x, y);
        this.resetEverything();
    }

    die() {
        this.active = false;
        const direction = {y: this.y - 150, alpha: 0};
        const tween = game.add.tween(this).to(direction, 1000, "Linear", true);
        tween.onComplete.addOnce(() => this.kill());
        game.log(`coin picked up by a player`);
    }

    resetEverything() {
        this.body.allowGravity = true;
        this.isCarried = false;
        this.value = 0;
        this.dropped = false;
    }
}