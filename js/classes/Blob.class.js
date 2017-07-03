import game from "../game";
import Enemy from "./Enemy.class";
import Item from "./Item.class";

export default class Blob extends Enemy {

    constructor(sprite, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.sound = this.game.add.audio('mobHit');
        this.animations.add("live", [0, 1], 10, true);
        this.animations.add("die", [2, 3, 4, 5, 6], 10, true);
        this.animations.add("blink", [7, 0], 10);
        this.scale.setTo(1, 2);
        this.maxHealth = 125;
        this.damageOnContact = 125;
        this.carrying = false;
        this.exp = 75;
        this.speed = 120;
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.animations.play("live", 2);
        if (Math.random() < 0.5) {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
    };
}