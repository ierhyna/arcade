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
        this.critical = this.game.rnd.integerInRange(0, 100) <= this.baseCrit;
        const multplier = this.critical ? this.criticalMultiplier : 1;
        this.damage = game.rnd.integerInRange(Math.floor(this.baseDamage - this.baseDamage / 5), Math.floor(this.baseDamage + this.baseDamage / 5)) * multplier;
    };

    hit(object) {

    }

    update() {
        this.game.physics.arcade.collide(this, this.game.walls, () => this.kill());
    }
}