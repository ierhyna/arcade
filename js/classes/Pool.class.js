import game from "../game";

export default class Pool extends Phaser.Group {
    constructor(type, props) {
        super(game, game.world);
        if (!type || !props.sprites) {
            console.warn("Pool: You must provide base class and a sprites array");
            throw new Error("Error creating Pool");
        }
        this.game = game;
        this.spriteType = type;
        this.sprites = props.sprites;
        this.data = props.data;
        this.size = props.size;
        this.name = props.name || "with no name";
        if (props.size) {
            let sprite;
            for (let i = 0; i < props.size; i++) {
                sprite = this.add(new type(this.getRandomSprite(), props.data));
            }
        }
        game.log(`creating new pool ${this.name} of ${props.size} elements`);
        return this;
    };

    create(x, y, options) {

        let obj = this.getFirstExists(false);
        if (!obj) {
            obj = new this.spriteType(this.getRandomSprite(), this.data);
            this.add(obj, true);
        }
        obj.spawn(x, y, options);
        return obj;
    };

    getRandomSprite() {
        return this.sprites[Math.floor(Math.random() * this.sprites.length)];
    };
}
