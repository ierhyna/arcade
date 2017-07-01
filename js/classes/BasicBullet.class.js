import game from "../game";
import Projectile from "./Projectile.class";


export default class BasicBullet extends Projectile {

    constructor(game, data = {}) {
        super(game, "bullet");
        this.game = game;
        this.baseCrit = 25;
        this.baseDamage = 7;
        this.baseSpeed = 500;
    };

    spawn(x, y) {
        this.classReset(x, y);        
    };
}