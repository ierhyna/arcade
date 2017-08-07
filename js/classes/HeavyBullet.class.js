import game from "../game";
import Projectile from "./Projectile.class";

export default class HeavyBullet extends Projectile {

    constructor(sprite) {
        super(sprite);
        this.game = game;
        this.baseCrit = 20;
        this.baseDamage = 40;
        this.baseSpeed = 600;
        this.critical = false;
        this.criticalMultiplier = 4;
        this.spacing = 550;
        this.sound = this.game.add.audio('shotHeavy');
    };

    spawn(x, y) {
        this.classReset(x, y);
    };
}