import game from "../game";
import Projectile from "./Projectile.class";
import { SoundEngine } from "../stages/Preload.stage";


export default class BasicBullet extends Projectile {

    constructor(game, data = {}) {
        super(game, "bullet");
        this.game = game;
        this.baseCrit = 25;
        this.baseDamage = 7;
        this.baseSpeed = 1200;
        this.critical = false;
        this.criticalMultiplier = 3;
        this.spacing = 100;
        this.sound = game.add.audio('gunShot');
    };

    spawn(x, y) {
        this.classReset(x, y);
    };
}