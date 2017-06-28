import game from "../game";

const SoundEngine = {}
const Preload = {
    preload: function () {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        game.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'maps/tilea2.png');
        game.load.image('treasure', 'maps/pixel_treasure_chest.png');
        game.load.image('coin', 'sprites/coin.png');
        game.load.image('bullet', 'sprites/bullet.png');
        game.load.image('heavyBullet', 'sprites/heavyBullet.png');
        game.load.image('blobby', 'sprites/blobby.png');
        game.load.image('background001', 'sprites/bg001.png');
        game.load.image('avatar', 'sprites/avatar.png');
        game.load.image('buff_havoc', 'sprites/buffs/buff.havoc.png');
        game.load.image('buff_enrage', 'sprites/buffs/buff.enrage.png');
        game.load.image('icon_basic', 'sprites/icons/icon-001.png');
        game.load.image('icon_heavy', 'sprites/icons/icon-002.png');
        game.load.spritesheet('hero', 'sprites/hero.png', 110, 160);
        game.load.spritesheet('blast', 'sprites/explosion_5.png', 91, 91, 20);
        game.load.spritesheet('blob-ani', 'sprites/mob-ani01.png', 32, 32);
        game.load.audio('mobHit', 'sounds/mob_hit.wav');
        game.load.audio('gunShot', 'sounds/gun_shot.mp3');
        game.load.audio('shotHeavy', 'sounds/shotHeavy.mp3');
        game.load.audio('ricochet', 'sounds/ricochet.wav');
        game.load.audio('trackRumble', 'sounds/Rumble.mp3');
    },
    create: function () {
        SoundEngine.gunShot = game.add.audio('gunShot');
        SoundEngine.heavyShot = game.add.audio('shotHeavy');
        SoundEngine.heavyShot.volume = 0.2;
        SoundEngine.mobHit = game.add.audio('mobHit');
        SoundEngine.mobHit.volume = 0.5;
        SoundEngine.ricochet = game.add.audio('ricochet');
        SoundEngine.trackRumble = game.add.audio('trackRumble');
        SoundEngine.trackRumble.volume = 0;
        SoundEngine.gunShot.allowMultiple = true;
        SoundEngine.gunShot.volume = 0.1;
        SoundEngine.mobHit.allowMultiple = true;
        SoundEngine.ricochet.allowMultiple = true;
        SoundEngine.ricochet.volume = 0.5;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;
        game.state.start("Level");
    },
    update: function () {}
}

export {
    Preload,
    SoundEngine
}
