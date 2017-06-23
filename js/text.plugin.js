import game from "./game";

const Text = {
    level: function (t) {
        const text = game.add.text(game.width / 2, game.height / 2, t, {
            font: "30px Arial",
            fill: "#ffffff",
            align: "center",
            stroke: '#000000',
            strokeThickness: 4
        });
        text.anchor.set(0.5);
        game.add.tween(text.scale).to({
            x: 2,
            y: 2
        }, 1000, "Linear", true);
        const textTween = game.add.tween(text).to({
            alpha: 0
        }, 2000, "Linear", true);
    },

    combat: function (object, bullet) {
        let x = object.body.x
        let y = object.body.y
        const style = bullet.crit ? {
            font: "30px Arial",
            fill: "#ff0000",
            align: "center",
            stroke: '#000000',
            strokeThickness: 6
        } : {
            font: "20px Arial",
            fill: "#ffffff",
            align: "center",
            stroke: '#000000',
            strokeThickness: 3
        }
        const text = game.add.text(x, y, bullet.damage, style);
        const tween = game.add.tween(text).to({
            y: y - 100,
            alpha: 0
        }, 1000, "Linear", true);
        tween.onComplete.addOnce(() => text.destroy());
    }
}

export default Text;