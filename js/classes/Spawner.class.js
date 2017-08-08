import game from "../game";

export default class Spawner {
    constructor(props) {
        try {
            this.game = game;
            this.enemyCounter = 0;
            this.pool = props.pool;
            this.size = props.size || 32768;
            this.infinite = !props.size ? true : false;
            this.spacing = props.spacing || 1000;
            this.name = props.name || "unnamed group";
        }
        catch (e) {
            console.warn(`You forgot to set the mandatory params for the Spawner`);
            throw new Error(e.message);
        }
        game.log(`Creating a new group of ${this.size} ${this.name} with a spacing of ${this.spacing}ms`);
        if (this.size > this.pool.children.length && !this.infinite) {
            game.log(`Spawner warning: size of Spawner ${this.name} is larger than pool size by ${this.size - this.pool.children.length} elements`)
            game.log("This can be okay if you manually destroy objects from your Pool");
        }
        if (this.infinite){
            game.log(`Creating an infnite Spawner - ${this.name}. Make sure you handle Pools properly`);
        }
    };

    launch(x, y) {
        this.pool.create(x, y);
        this.enemyCounter++;
        if (this.enemyCounter < this.size) {
            this.game.time.events.add(this.spacing, () => this.launch(x, y));
        }
    };
}