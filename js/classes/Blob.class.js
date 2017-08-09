import game from "../game";
import Enemy from "./Enemy.class";
import Item from "./Item.class";

export default class Blob extends Enemy {

    constructor(sprite, data = {}) {
        super(sprite);
        this.game = game;
        this.item = new Item(data);
        this.hitSound = this.game.add.audio('mobHit');
        this.hitPlayerSound = this.game.add.audio('blip')        ;
        this.hitSound.volume = 0.25;
        this.animations.add("live", [0, 1], 10, true);
        this.animations.add("die", [2, 3, 4, 5, 6], 10, true);
        this.animations.add("blink", [7, 0], 10);        
        this.maxHealth = 25;
        this.damageOnContact = 150;
        this.exp = 75;
        this.speed = 200;
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