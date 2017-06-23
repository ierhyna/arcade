import game from "../game";

export const Preload = {
    preload: function () {
        game.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'maps/tilea2.png');
        game.load.image('bullet', 'sprites/bullet.png');
        game.load.image('blobby', 'sprites/blobby.png');
        game.load.image('background001', 'sprites/bg001.png');
        game.load.spritesheet('hero', 'sprites/hero.png', 110, 160);
        game.load.spritesheet('blast', 'sprites/explosion_5.png', 91, 91, 20);
        game.load.audio('mobHit', 'sounds/mob_hit.wav');
        game.load.audio('gunShot', 'sounds/gun_shot.mp3');
        game.load.audio('ricochet', 'sounds/ricochet.wav');
        game.load.audio('trackRumble', 'sounds/Rumble.mp3');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;
        game.state.start("Level");
    },
    update: function () {}
}