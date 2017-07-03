import game from "../game";
export default class Spawner {
    constructor(group, spacing, amount) {
        this.game = game;
        this.enemyCounter = 0;
        this.group = group;
        this.amount = amount;
        this.spacing = spacing;
    }
    launch(x, y) {
        this.group.create(x, y);
        this.enemyCounter++;
        if (this.enemyCounter < this.amount) {
            this.game.time.events.add(this.spacing, () => this.launch(x, y));
        }
    }
}