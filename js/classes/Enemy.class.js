import game, {Text} from "../game";

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
        this.gold = 0;
        this.carrying = false;
        this.cargo = null;
        this.cargoSprite = null;
        this.body.bounce.setTo(1, 0);
    };

    hit(projectile, player) {
        if (!this.alive) return;
        projectile.kill();
        this.animations.play("blink", 20);
        if (projectile.critical) {
            player.stats.critCounter++
        }
        this.health -= projectile.damage;
        this.hitSound.play();
        const event = projectile.critical ? "crit" : "hit";
        Text.combat(this, projectile.damage, event);
        if (this.health <= 0) {
            player.experience += this.exp;
            Text.combat(this, this.exp + " exp", "info");
            player.stats.enemyCounter++;
            game.log(`Enemy death caused by player weapon`);
            this.die();
        }
    };

    hitPlayer(player) {
        if (!this.alive) return;
        player.health -= this.damageOnContact;
        Text.combat(player, -this.damageOnContact, "playerHit");
        if (player.health <= 0) player.die();
        this.hitPlayerSound.play();
        game.log(`Enemy death caused by player collision`);
        this.die();
    };

    update() {
        this.game.physics.arcade.collide(this, this.game.walls);
        if (this.body.blocked.right) {
            this.scale.x = -1;
            this.body.velocity.x = -this.speed;
        } else if (this.body.blocked.left) {
            this.scale.x = 1;
            this.body.velocity.x = this.speed;
        }
    };

    pickUp(chest, type, sprite) {
        if (this.carrying || chest.goldAmount <= 0) return;

        this.carrying = true;
        this.cargo = type; //storing droppable Class
        this.cargoSprite = sprite; //storing droppable sprite

        if (chest.totalGold <= chest.goldToDrop) {
            this.gold += chest.totalGold;
        } else {
            this.gold += chest.goldToDrop;
        }

        chest.updateGoldAmount(); // substracting resourse from the chest
        Text.combat(this, `-${this.gold} gold`, "hit");

        // here we create a new droppable object and bind it to the carrier object
        const droppable = new type(sprite);
        droppable.spawnOne(0, -16);
        droppable.disableGravity();
        this.addChild(droppable);
    };

    die() {
        this.body.velocity.x = 0;
        this.alive = false;
        if (this.carrying) {
            // here we clone the droppable object as a new one 
            // and then we kill carrier and all its children
            const droppable = new this.cargo(this.cargoSprite);
            droppable.spawnOne(this.x, this.y);
            droppable.value = this.gold;
            droppable.play("spin");
            game.log(`Enemy has dropped a cargo`);
        }
        this.children = []; // double check we leave no children alive
        this.play("die", 6, false, true);
    };

    escape(){
        this.body.velocity.x = 0;
        this.alive = false;
        this.children = [];
        this.destroy();

    };
}