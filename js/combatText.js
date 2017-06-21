function CombatText(origin, object, bullet) {
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