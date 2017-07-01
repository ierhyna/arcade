import game from "../game";
import Projectile from "./Projectile.class";


export default class BasicBullet extends Projectile {

    constructor(game, data = {}) {
        super(game, "bullet");
        this.game = game;
    };

    spawn(x, y) {
        this.classReset(x, y);
        this.damage
    };
}