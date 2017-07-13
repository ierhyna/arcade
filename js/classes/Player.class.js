import game, { Text, HealthBar } from "../game";
import Achievement from "./Achievement.class";

export default class Player extends Phaser.Sprite {
    constructor(sprite, name) {
        super(game, 0, 0, sprite);
        this.game = game;
        this.achievementTracker = new Achievement();
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.allowGravity = true;
        this.body.immovable = false;
        this.animations.add('move', [1, 2], 10, true);
        this.maxHealth = 500;
        this.speed = 100;
        this.level = 1;
        this.experience = 0;
        this.name = name;
        this.playerId = 1;
        this.direction = 1;
        this.regenRate = 0.1;
        this.jumpVelocity = -520
        this.timer = {};
        this.totalExpForLevel = 650;
        this.stats = {
            enemyCounter: 0,
            critCounter: 0,
            goldRecoverCounter: 0
        };
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
        this.createBars();
        this.game.add.existing(this);
    };

    update() {
        if (this.health < this.maxHealth && this.alive) {
            this.health += this.regenRate;
            if (this.health > this.maxHealth) this.health = this.maxHealth;
        }
        if (this.experience > this.totalExpForLevel) {
            this.totalExpForLevel *= 2;
            this.level++;
            this.experience = 0;
            Text.level(`Level ${this.level}`, "gold");
        }
        this.healthBar.setPercent(this.health / this.maxHealth * 100);
        this.expBar.setPercent(this.experience / this.totalExpForLevel * 100);
        this.barsExp.text = `${this.experience}/${this.totalExpForLevel}`;
        this.barsHp.text = `${this.health.toFixed()}/${ this.maxHealth}`;

        this.checkAchievements();
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
                this.scale.x = this.direction;
                if (this.body.onFloor()) {
                    this.animations.play('move');
                } else {
                    this.animations.stop();
                    this.frame = 0;
                }
                break;

            case "right":
                this.direction = 1;
                this.scale.x = this.direction;
                this.body.velocity.x = 220;
                if (this.body.onFloor()) {
                    this.animations.play('move');
                } else {
                    this.animations.stop();
                    this.frame = 0;
                }
                break;

            case "jump":
                if (this.body.onFloor()) this.body.velocity.y = this.jumpVelocity;
                break;

            case "stop":
                this.body.velocity.x = 0;
                this.animations.stop();
                this.frame = 0;
                break;
        }
    };

    fire(weapon) {
        if (!this.alive) return;
        if (game.time.now > (this.timer[weapon] || 0)) {
            const weaponName = weapon.spriteType.name;
            if (this.ammo[weaponName] > 0) {
                const bullet = weapon.create(this.x + 16 * this.direction, this.y - 6);
                bullet.body.velocity.x = bullet.baseSpeed * this.direction;
                this.timer[weapon] = game.time.now + bullet.spacing;
                this.ammo[weaponName] -= 1;
            }
        }
    };

    createBars() {
        this.expBar = new HealthBar(game, {
            width: 300,
            height: 12,
            x: 280,
            y: 716,
            bg: { color: '#ccc' },
            bar: { color: '#f00' },
            animationDuration: 200
        });
        this.healthBar = new HealthBar(game, {
            width: 300,
            height: 12,
            x: 280,
            y: 738,
            bg: { color: '#651828' },
            bar: { color: '#FEFF03' },
            animationDuration: 100
        });
        this.barsExp = this.game.add.text(440, 710, "", Text.styles.basic);
        this.barsHp = this.game.add.text(440, 730, "", Text.styles.basic);
    }

    checkAchievements() {
        if (this.stats.enemyCounter === 5 && !this.stats.enemyCounter5Earned) {
            this.achievementTracker.show("Kill 5 enemies!");
            this.stats.enemyCounter5Earned = true;
        }
        if (this.stats.enemyCounter === 10 && !this.stats.enemyCounter10Earned) {
            this.achievementTracker.show("Kill 10 enemies!");
            this.stats.enemyCounter10Earned = true;
        }
        if (this.stats.enemyCounter === 25 && !this.stats.enemyCounter25Earned) {
            this.achievementTracker.show("Kill 25 enemies!");
            this.stats.enemyCounter25Earned = true;
        }
        if (this.level === 2 && !this.stats.earnLevel2) {
            this.achievementTracker.show("Your first level up!");
            this.stats.earnLevel2 = true;
        }
        if (this.stats.critCounter === 25 && !this.stats.crit25Earned) {
            this.achievementTracker.show("Score 25 crits!");
            this.stats.crit25Earned = true;
        }
        if (this.stats.goldRecoverCounter >= 50 && !this.stats.goldRecovered50) {
            this.achievementTracker.show("Recover 50 gold!");
            this.stats.goldRecovered50 = true;
        }
        if (this.y < 0 && !this.stats.jumpedAbove) {
            this.achievementTracker.show("Reach for the stars!");
            this.stats.jumpedAbove = true;
        }
    }
}