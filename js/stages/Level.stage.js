import game from "../game";

let map,
  bg,
  walls,
  verticalWalls,
  fire,
  player,
  cursors,
  bullets,
  playerDirection = 1,
  jumpTimer = 0;

const enemyGroup = {};

const timer = {
  basicBullet: 0,
  jump: 0
}

export const Level = {

  preload: function () {
    game.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'maps/tilea2.png');
    game.load.image('bullet', 'sprites/bullet.png');
    game.load.image('blobby', 'sprites/blobby.png');
    game.load.spritesheet('hero', 'sprites/char.gif');
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('level1');
    map.addTilesetImage('tilea2', 'tileset');
    bg = map.createLayer('bg');
    walls = map.createLayer('walls');
    verticalWalls = map.createLayer('vertical');
    map.setCollision([49, 63, 109], true, walls);
    map.setCollision([55], true, verticalWalls);
    bg.resizeWorld();

    game.physics.arcade.gravity.y = 1000;

    player = game.add.sprite(32, 32, 'hero');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.25;
    player.scale.setTo(0.4, 0.4);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    cursors = game.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Phaser.KeyCode.ONE);

    
    enemyGroup.blobs = game.add.group();
    let e = enemyGroup.blobs;
    e.enableBody = true;
    e.physicsBodyType = Phaser.Physics.ARCADE;
    e.createMultiple(50, 'blobby');
    e.setAll('anchor.x', 0.5);
    e.setAll('anchor.y', 0.5);
    e.setAll('outOfBoundsKill', true);
    e.setAll('checkWorldBounds', true);

    launchEnemy();
  },

  update: function () {
    game.physics.arcade.collide(enemyGroup.blobs, walls);
    game.physics.arcade.collide(enemyGroup.blobs, verticalWalls);
    
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(bullets, walls, function (bullet) {
      bullet.kill()
    });
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      playerDirection = -1;
      player.body.velocity.x = -220;
    } else if (cursors.right.isDown) {
      playerDirection = 1;
      player.body.velocity.x = 220;
    }
    if (cursors.up.isDown && player.body.onFloor() && game.time.now > timer.jump) {
      player.body.velocity.y = -580;
      timer.jump = game.time.now + 750;
    }
    if (fire.isDown) {
      this.fireBasicWeapon();
    }
  },

  fireBasicWeapon: function () {
    if (game.time.now > timer.basicBullet) {
      const BULLET_SPEED = 600;
      const BULLET_SPACING = 250;
      const bullet = bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(player.x + 16, player.y + 16);
        bullet.body.velocity.x = BULLET_SPEED * playerDirection;
        bullet.body.allowGravity = false;
        timer.basicBullet = game.time.now + BULLET_SPACING;
      }
    }
  }
};

function launchEnemy() {
  const spacing = 1400;
  const speed = 80;

  let enemy = enemyGroup.blobs.getFirstExists(false);
  if (enemy){
    enemy.reset(600, 100);
    enemy.body.velocity.x = speed;
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.bounce.setTo(1, 0)
  }
  game.time.events.add(spacing, launchEnemy)
}