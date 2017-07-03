import game from "../game";
import Text from "../text.plugin";

export default class Player extends Phaser.Sprite {
    constructor(sprite) {
        super(game, 0, 0, sprite);
        this.game = game;
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
        this.body.immovable = false;
        this.animations.add('move', [0, 1, 2, 3], 10, true);
        this.scale.setTo(0.2, 0.2);
        this.maxHealth = 500;
        this.speed = 100;
        this.level = 1;
        this.experience = 0;
        this.name = "Player One";
        this.playerId = 1;
        this.direction = 1;
        this.jumpVelocity = -520
        this.timer = {};
        this.totalExpForLevel = 650;
        this.ammo = {
            BasicBullet: 500,
            HeavyBullet: 100,
        };
    };

    create(x, y) {
        this.x = x;
        this.y = y;
        this.health = 500;
        this.alive = true;
        this.exists = true;
        this.frame = 1;
        this.game.add.existing(this)
    };

    update() {
        if (this.health < this.maxHealth && this.alive) {
            this.health += 0.1;
            if (this.health > this.maxHealth) this.health = this.maxHealth;
        }
        if (this.experience > this.totalExpForLevel) {
            this.totalExpForLevel *= 2;
            this.level++;
            this.experience = 0;
        }
    };

    die() {
        this.body.velocity.x = 0;
        this.health = 0;
        this.alive = false;
        Text.level("WASTED!", "red");
        this.kill();
    };

    move(direction) {
        switch (direction) {
            case "left":
                this.direction = -1;
                this.body.velocity.x = -220;
                this.scale.x = this.direction * 0.2;
                if (this.body.onFloor()) {
                    this.animations.play('move');
                } else {
                    this.animations.stop();
                    this.frame = 2;
                }
                break;

            case "right":
                this.direction = 1;
                this.scale.x = this.direction * 0.2;
                this.body.velocity.x = 220;
                if (this.body.onFloor()) {
                    this.animations.play('move');
                } else {
                    this.animations.stop();
                    this.frame = 2;
                }
                break;

            case "jump":
                if (this.body.onFloor()) this.body.velocity.y = this.jumpVelocity;
                break;
            case "stop":
                this.animations.stop();
                this.frame = 1;
                break;
        }

    }

    fire(weapon) {
        if (!this.alive) return;
        if (game.time.now > (this.timer[weapon] || 0)) {
            const weaponName = weapon.spriteType.name;
            if (this.ammo[weaponName] > 0) {
                const bullet = weapon.create(this.x, this.y);
                bullet.body.velocity.x = bullet.baseSpeed * this.direction;
                this.timer[weapon] = game.time.now + bullet.spacing;
                this.ammo[weaponName] -= 1;
            }
        }
    };
}