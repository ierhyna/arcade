import game from "../game";

let map,
    bg,
    walls,
    player,
    cursors,
    jumpTimer = 0;

export const Level = {

    preload: function () {
      game.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tileset', 'maps/tilea2.png');
      game.load.spritesheet('hero', 'sprites/char.gif');
    },

    create: function () {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      map = game.add.tilemap('level1');
      map.addTilesetImage('tilea2', 'tileset');
      bg = map.createLayer('bg');
      walls = map.createLayer('walls');
      map.setCollision([ 49, 63, 109 ], true, walls);
      // walls.debug = true;
      bg.resizeWorld();

      game.physics.arcade.gravity.y = 500;

      player = game.add.sprite(32, 32, 'hero');
      game.physics.enable(player, Phaser.Physics.ARCADE);

      player.body.collideWorldBounds = true;
      player.body.bounce.y = 0.25;
      player.scale.setTo(0.4, 0.4);

      cursors = game.input.keyboard.createCursorKeys();
    },

    update: function () {
      game.physics.arcade.collide(player, walls);
      player.body.velocity.x = 0;

      if (cursors.left.isDown) {
        player.body.velocity.x = -150;
      } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        console.log(game.time.now)
      }

      if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
        player.body.velocity.y = -410;
        jumpTimer = game.time.now + 750;
      }
    },

    render: function () {
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);
    }
};
