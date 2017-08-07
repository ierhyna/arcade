import game from "../game";

export class Preload {
    preload() {
        /* Enabling dev mode */
        game.devMode = true;

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        game.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'maps/wallmap.png');
        game.load.image('treasure', 'sprites/chest.png');
        game.load.image('coin', 'sprites/coin.png');
        game.load.image('bullet', 'sprites/bullet.png');
        game.load.image('heavyBullet', 'sprites/bullet-heavy.png');
        game.load.image('background001', 'sprites/bg001.png');
        game.load.image('avatar', 'sprites/avatar.png');
        game.load.image('achiBg', 'sprites/achi_bg.png');
        game.load.image('buff_havoc', 'sprites/buffs/buff.havoc.png');
        game.load.image('buff_enrage', 'sprites/buffs/buff.enrage.png');
        game.load.image('icon_basic', 'sprites/icons/icon-001.png');
        game.load.image('icon_heavy', 'sprites/icons/icon-002.png');
        game.load.spritesheet('hero', 'sprites/hero.png', 40, 48);
        game.load.spritesheet('blob', 'sprites/blob-ani.png', 32, 32);
        game.load.spritesheet('coin-ani', 'sprites/coin-ani.png', 32, 32);
        game.load.audio('coinPickUp', 'sounds/coinPickUp.wav');
        game.load.audio('mobHit', 'sounds/mob_hit.wav');
        game.load.audio('blip', 'sounds/blip.wav');
        game.load.audio('achievement', 'sounds/achievement.wav');
        game.load.audio('gunShot', 'sounds/gun_shot.mp3');
        game.load.audio('shotHeavy', 'sounds/shotHeavy.mp3');
        game.load.audio('music_01', 'sounds/rutgermuller.mp3');
    }

    create() {
        const cursors = game.input.keyboard.createCursorKeys();
        const one = game.input.keyboard.addKey(Phaser.KeyCode.ONE);
        const two = game.input.keyboard.addKey(Phaser.KeyCode.TWO);
        const three = game.input.keyboard.addKey(Phaser.KeyCode.THREE);
        game.Key = {cursors, one, two, three};
        game.songs = {music_01: game.add.audio('music_01')};
        game.songs.music_01.volume = 0.5;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;
        game.songs.music_01.play();
        game.songs.music_01.loopFull();
        game.projectiles = [];
        game.walls = [];
        game.state.start("Level");
        game.log = (message) => game.devMode && console.log(message);
    }

}
