import game from "./game";

const Text = {
    level: function (t, color) {
        const text = game.add.text(game.width / 2, game.height / 2, t, {
            font: "30px Arial",
            fill: color,
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

    combat: function (object, message, event) {
        let style;
        let direction;
        let x = object.body.x
        let y = object.body.y
        switch (event) {
            case "crit":
                style = {
                    font: "30px Arial",
                    fill: "#ff0000",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 6
                };
                direction = {
                    y: y - 140,
                    alpha: 0
                }
                break;

            case "hit":
                style = {
                    font: "20px Arial",
                    fill: "#ffffff",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 3
                }
                direction = {
                    y: y - 100,
                    alpha: 0
                }
                break;

            case "playerHit":
                style = {
                    font: "20px Arial",
                    fill: "#22ff22",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 3
                };
                direction = {
                    y: y - 100,
                    alpha: 0
                }
                break;
            case "info":
                style = {
                    font: "30px Arial",
                    fill: "yellow",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 3
                };
                direction = {
                    y: y + 100,
                    alpha: 0
                }

                break;
        }

        const text = game.add.text(x, y, message, style);
        const tween = game.add.tween(text).to(direction, 1000, "Linear", true);
        tween.onComplete.addOnce(() => text.destroy());
    }
}

export default Text;