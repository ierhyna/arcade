import game from "../game";
import Text from "../text.plugin";

export default class Enemy extends Phaser.Sprite {
    constructor(game, sprite) {
        super(game, 0, 0, sprite);
        this.game = game;
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
        this.body.immovable = false;
        this.maxHealth = 150;
        this.damageOnContact = 125;
        this.carrying = false;
        this.alive = false;
        this.exp = 68;
        this.speed = 120;
    };

    classReset(x, y) {
        this.reset(x, y);
        this.health = this.maxHealth;
        this.alive = true;
        this.carrying = false;
        this.exists = true;
        this.body.bounce.setTo(1, 0);
    };

    hit(projectile) {
        if (!this.alive) return;        
        this.health -= projectile.damage;
        const event = projectile.crit ? "crit" : "hit";
        Text.combat(this, projectile.damage, event);
        if (this.health <= 0) {
            this.body.velocity.x = 0;
            this.alive = false;
            this.kill();
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