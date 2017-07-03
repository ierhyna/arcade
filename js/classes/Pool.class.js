import game from "../game";
export default class Pool extends Phaser.Group {
    constructor(spriteType, sprite, instances, data) {
        super(game, game.world);
        this.game = game;
        this.spriteType = spriteType;
        this.sprite = sprite;
        this.data =data;
        this.instances = instances;
        if (instances) {
            let sprite;
            for (var i = 0; i < instances; i++) {
                sprite = this.add(new spriteType(this.sprite, data));
            }
        }
        return this;
    }

    count() {
      return this.instances;
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
