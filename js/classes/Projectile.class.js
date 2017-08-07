import game from "../game";

export default class Projectile extends Phaser.Sprite {
    constructor(sprite) {
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
        this.damage = this.calculateDamage();
        this.sound.volume = 0.1;
        this.sound.play();        
    };

    calculateDamage(){
        return this.randomizedDamage();
    };

    randomizedDamage(){
        const multiplier = this.critical ? this.criticalMultiplier : 1;
        const d = this.baseDamage;
        return game.rnd.integerInRange(Math.floor(d - d / 5), Math.floor(d + d / 5)) * multiplier;
    };

    update() {
        this.game.physics.arcade.collide(this, this.game.walls, () => this.kill());
    };


}