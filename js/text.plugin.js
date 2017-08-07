import game from "./game";

export const Text = {
    level: function (t, color) {
        const text = game.add.text(game.width / 2, game.height / 2, t, {
            font: "Press Start 2P",
            fontSize: "30px",
            fill: color,
            align: "center",
            stroke: '#000000',
            strokeThickness: 4
        });
        text.anchor.set(0.5);
        game.add.tween(text.scale).to({x: 2, y: 2}, 2000, "Linear", true);
        game.add.tween(text).to({alpha: 0}, 2000, "Linear", true);
    },

    combat: function (object, message, event) {
        let style;
        let direction;
        let x = object.body.x;
        let y = object.body.y;
        switch (event) {
            case "crit":
                style = {
                    font: "30px Press Start 2P",
                    fill: "#ff0000",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 6
                };
                direction = {y: y - 160, alpha: 0};
                break;

            case "hit":
                style = {
                    font: "20px Press Start 2P",
                    fill: "#ffffff",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 3
                };
                direction = {y: y - 120, alpha: 0};
                break;

            case "playerHit":
                style = {
                    font: "20px Press Start 2P",
                    fill: "#22ff22",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 3
                };
                direction = {y: y - 100, alpha: 0};
                break;
            case "info":
                style = {
                    font: "30px Press Start 2P",
                    fill: "yellow",
                    align: "center",
                    stroke: '#000000',
                    strokeThickness: 3
                };
                direction = {y: y + 100, alpha: 0};

                break;
        }

        const text = game.add.text(x, y, message, style);
        const tween = game.add.tween(text).to(direction, 1000, "Linear", true);
        tween.onComplete.addOnce(() => text.destroy());
    },
    styles: {
        basic: {font: "12px Press Start 2P", fill: "#fff", align: "center"}
    }
};
