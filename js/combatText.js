function CombatText(origin, object, bullet) {
    let x = object.body.x
    let y = object.body.y
    const style = bullet.crit ? {
        font: "30px Arial",
        fill: "#ff0000",
        align: "center"
    } : {
        font: "20px Arial",
        fill: "#ffffff",
        align: "center"
    }
    const text = origin.add.text(x, y, bullet.damage, style);
    const tween = origin.add.tween(text).to({
        y: y - 100,
        alpha: 0
    }, 1000, "Linear", true);
    tween.onComplete.addOnce(() => text.destroy());
}

export {
    CombatText
}