import game from "../game";

export function ConstructGroup(enemy, param) {
    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;
    enemy.createMultiple(param.number || 50, param.sprite);
    enemy.setAll('anchor.x', param.scale || 0.5);
    enemy.setAll('anchor.y', param.scale || 0.5);
    enemy.setAll('outOfBoundsKill', true);
    enemy.setAll('checkWorldBounds', true);
}