import game from "../game";

export default class Spawner {
    constructor(props) {
        this.game = game;
        this.enemyCounter = 0;
        this.group = props.pool;
        this.amount = props.size || 50;
        this.spacing = props.spacing || 2000;
        this.name = props.name || "unnamed group";
        game.devMode && console.log(`Creating a new group of ${this.amount} ${this.name} with a spacing of ${this.spacing}ms`);
    }

    launch(x, y) {
        this.group.create(x, y);
        this.enemyCounter++;
        if (this.enemyCounter < this.amount) {
            game.devMode && console.log(`Launching ${this.enemyCounter} out of ${this.amount} ${this.name}`);
            this.game.time.events.add(this.spacing, () => this.launch(x, y));
        }
    }
}