import game from "../game";

export default class Spawner {
    constructor(props) {
        this.game = game;
        this.enemyCounter = 0;
        this.pool = props.pool;
        this.size = props.size || 50;
        this.spacing = props.spacing || 2000;
        this.name = props.name || "unnamed group";
        game.log(`Creating a new group of ${this.size} ${this.name} with a spacing of ${this.spacing}ms`);
        if (this.size > this.pool.children.length) {
            game.log(`Spawner warning: size of Spawner ${this.name} is larger than pool size by ${this.size - this.pool.children.length} elements`)
            game.log("This can be okay if you manually destroy objects from your Pool");
        }
    }

    launch(x, y) {
        this.pool.create(x, y);
        this.enemyCounter++;
        if (this.enemyCounter < this.size) {
            this.game.time.events.add(this.spacing, () => this.launch(x, y));
        }
    }
}