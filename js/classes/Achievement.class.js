import game, { Text } from "../game";

export default class Achievement extends Phaser.Sprite {
    constructor() {
        super(game, game.width / 2, 64, "achiBg");
        this.game = game;
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = false;
    };

    show(message) {        
        const title = this.addChild(this.game.add.text(0, -8, "ACHIEVEMENT!", Text.styles.basic));
        const text = this.addChild(this.game.add.text(0, 8, message, Text.styles.basic));
        title.anchor.setTo(0.5, 0.5);
        text.anchor.setTo(0.5, 0.5);
        const tween = game.add.tween(this).to({ y: this.y - 50, alpha: 0 }, 3000, "Linear", true);
        tween.onComplete.addOnce(() => this.kill());
        this.exists = true;            
        this.game.add.existing(this);    
    }

}