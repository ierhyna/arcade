import game from "../game";
import Text from "../text.plugin";

export default class Enemy extends Phaser.Sprite {
    constructor(sprite) {
        super(game, 0, 0, sprite);
        this.game = game;
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
        this.body.immovable = false;
        this.maxHealth = 1;
        this.damageOnContact = 1;
        this.alive = false;
        this.exp = 1;
        this.speed = 100;
    };

    classReset(x, y) {
        this.reset(x, y);
        this.health = this.maxHealth;
        this.alive = true;
        this.carrying = false;
        this.exists = true;
        this.body.bounce.setTo(1, 0);
    };

    hit(projectile, player) {
        if (!this.alive) return;
        projectile.kill();
        this.animations.play("blink", 20);
        this.health -= projectile.damage;
        this.sound.play();
        const event = projectile.critical ? "crit" : "hit";
        Text.combat(this, projectile.damage, event);
        if (this.health <= 0) {
            player.experience += this.exp;
            this.die();
        };
    }

    hitPlayer(player) {
        if (!this.alive) return;
        player.health -= this.damageOnContact;        
        Text.combat(player, -this.damageOnContact, "playerHit");
        if (player.health <= 0) {
            player.health = 0;
            player.alive = false;
            player.kill();
        }
        this.die();
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

    die() {
        this.body.velocity.x = 0;
        this.alive = false;
        this.play("die", 6, false, true);
        Text.combat(this, this.exp + " exp", "info");
    }
}