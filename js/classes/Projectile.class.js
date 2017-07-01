import game from "../game";
export default class Projectile extends Phaser.Sprite {
    constructor(game, sprite) {
        super(game, 0, 0, sprite);
        this.game = game;
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = false;
    };

    classReset(x, y) {
        this.reset(x, y);
        this.exists = true;
    };

    hit(object) {

    }

    update() {
        this.game.physics.arcade.collide(this, this.game.walls, () => this.kill());
    }
}