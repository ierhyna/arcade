import game from "../game";
import Enemy from "./Enemy.class";
import Item from "./Item.class";

export default class Blob extends Enemy {

    constructor(game) {
        super(game);
        this.game = game;
        this.item = new Item();
    }

    spawn(x, y) {
        this.classReset(x, y);
        if (Math.random() < 0.5) {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
    }

    update() {
        this.game.physics.arcade.collide(this, this.game.walls);
        if (this.body.blocked.right) {
            this.scale.x = -1;
            this.body.velocity.x = -this.speed;
        } else if (this.body.blocked.left) {
            this.scale.x = 1;
            this.body.velocity.x = this.speed;
        }
    }
}