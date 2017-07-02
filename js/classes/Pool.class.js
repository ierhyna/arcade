export default class Pool extends Phaser.Group {
    constructor(game, spriteType, instances, data) {
        super(game, game.world);
        this.game = game;
        this.spriteType = spriteType;
        this.instances = instances;
        if (instances) {
            let sprite;
            for (var i = 0; i < instances; i++) {
                sprite = this.add(new spriteType(game, data));
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
            obj = new this.spriteType(this.game);
            this.add(obj, true);
        }
        obj.spawn(x, y);
        return obj;
    }
}
