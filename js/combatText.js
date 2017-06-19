function CombatText(origin, object, value) {
    let x = object.body.x
    let y = object.body.y
    const text = origin.add.text(x, y, value, {
        font: "20px Arial",
        fill: "#ffffff",
        align: "center"
    });
    const tween = origin.add.tween(text).to({
        y: y - 100,
        alpha: 0
    }, 1000, "Linear", true);
    tween.onComplete.addOnce(function () {
        text.destroy();
    });
}

export {
    CombatText
}