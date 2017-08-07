import game from "../game";

export default class Pool extends Phaser.Group {
    constructor(type, props) {
        super(game, game.world);
        this.game = game;
        this.spriteType = type;
        this.sprite = props.sprite;
        this.data = props.data;
        this.size = props.size;
        if (props.size) {
            let sprite;
            for (let i = 0; i < props.size; i++) {
                sprite = this.add(new type(props.sprite, props.data));
            }
        }
        game.log(`creating new pool of ${props.size} elements with sprite ${props.sprite}`);
        return this;
    }

    create(x, y) {
        let obj = this.getFirstExists(false);
        if (!obj) {
            obj = new this.spriteType(this.sprite, this.data);
            this.add(obj, true);
        }
        obj.spawn(x, y);
        return obj;
    }
}
