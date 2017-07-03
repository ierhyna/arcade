import game from "../game";

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
        this.alive = false;
        this.kill();
    };

    jump() {
        if (this.body.onFloor()) {
            this.body.velocity.y = this.jumpVelocity;
        }
    };

    fire(weapon) {
        if (!this.alive) return;
        if (game.time.now > (this.timer[weapon] || 0)) {
            const bullet = weapon.create(this.x, this.y);
            bullet.body.velocity.x = bullet.baseSpeed * this.direction;
            this.timer[weapon] = game.time.now + bullet.spacing;
        }
    };
}