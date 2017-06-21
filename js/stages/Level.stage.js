import game from "../game";
import {
  CombatText
} from "../combatText";
import {
  Weapon,
  Creature
} from "../../config";

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

let waveCounter = 40;

const enemyGroup = {};

const timer = {
  basicBullet: 0,
  jump: 0
}

const sound = {};

export const Level = {

  preload: function () {
    game.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'maps/tilea2.png');
    game.load.image('bullet', 'sprites/bullet.png');
    game.load.image('blobby', 'sprites/blobby.png');
    game.load.image('background001', 'sprites/bg001.png');
    game.load.spritesheet('hero', 'sprites/hero.png', 110, 160);
    game.load.audio('mobHit', 'sounds/mob_hit.wav');
    game.load.audio('gunShot', 'sounds/gun_shot.mp3');
    game.load.audio('ricochet', 'sounds/ricochet.wav');
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('level1');
    map.addTilesetImage('tilea2', 'tileset');
    bg = game.add.sprite(0, 0, 'background001');
    bg.width = game.width;
    bg.height = game.height
    walls = map.createLayer('walls');
    verticalWalls = map.createLayer('vertical');
    map.setCollision([49, 63, 109], true, walls);
    map.setCollision([55], true, verticalWalls);
    //bg.resizeWorld();

    game.physics.arcade.gravity.y = 1000;

    player = game.add.sprite(32, 32, 'hero');
    player.frame = 0;
    player.animations.add('move', [0, 1, 2, 3], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.scale.setTo(0.2, 0.2);
    player.health = 350;

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

    sound.gunShot = game.add.audio('gunShot');
    sound.mobHit = game.add.audio('mobHit');
    sound.ricochet = game.add.audio('ricochet');
    sound.gunShot.allowMultiple = true;
    sound.mobHit.allowMultiple = true;
    sound.ricochet.allowMultiple = true;

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
    const waveText = game.add.text(game.width / 2, game.height / 2, "Wave 1", {
      font: "30px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: '#000000',
      strokeThickness: 4
    });
    waveText.anchor.set(0.5);
    
    game.add.tween(waveText.scale).to({
      x: 2,
      y: 2
    }, 1000, "Linear", true);
    const waveTextTween = game.add.tween(waveText).to({alpha: 0}, 2000, "Linear", true)
  },

  update: function () {

    game.physics.arcade.collide(enemyGroup.blobs, walls);
    game.physics.arcade.collide(enemyGroup.blobs, verticalWalls);

    game.physics.arcade.collide(player, [walls, verticalWalls]);
    game.physics.arcade.collide(bullets, [walls, verticalWalls], function (bullet) {
      bullet.kill();
      sound.ricochet.play();
    });

    game.physics.arcade.overlap(bullets, enemyGroup.blobs, (bullet, enemy) => {
      bullet.kill();
      CombatText(game, enemy, bullet);
      enemy.health -= bullet.damage;
      if (enemy.health <= 0) {
        enemy.kill();
      }
      sound.mobHit.play();
    });

    game.physics.arcade.overlap(enemyGroup.blobs, player, (player, enemy) => {
      enemy.kill();
      player.health -= enemy.damageOnImpact;
      if (player.health <= 0) player.kill();
    });

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      playerDirection = -1;
      player.body.velocity.x = -220;
      player.scale.x = playerDirection * 0.2;
      player.animations.play('move');
    } else if (cursors.right.isDown) {
      playerDirection = 1;
      player.scale.x = playerDirection * 0.2;
      player.body.velocity.x = 220;
      player.animations.play('move');
    } else {
      player.animations.stop();
      player.frame = 1;
    }

    if (cursors.up.isDown && player.body.onFloor() && game.time.now > timer.jump) {
      player.body.velocity.y = -480;
      timer.jump = game.time.now + 750;
    }
    if (fire.isDown) {
      this.fireBasicWeapon();
    }
  },

  fireBasicWeapon: function () {
    if (!player.alive) return;
    if (game.time.now > timer.basicBullet) {
      const BULLET_SPEED = Weapon.basic.speed;
      const BULLET_SPACING = Weapon.basic.spacing;
      const bullet = bullets.getFirstExists(false);
      if (bullet) {
        const w = Weapon.basic;
        bullet.crit = game.rnd.integerInRange(0, 100) <= w.crit;
        bullet.reset(player.x + 16, player.y + 16);
        bullet.body.velocity.x = BULLET_SPEED * playerDirection;
        bullet.body.allowGravity = false;
        bullet.damage = bullet.crit ? w.damage * w.multiplier : w.damage;
        timer.basicBullet = game.time.now + BULLET_SPACING;
        sound.gunShot.play();
      }
    }
  }
};

function launchEnemy() {
  const spacing = 1800;

  waveCounter -= 1;
  if (waveCounter === 0) return;

  let enemy = enemyGroup.blobs.getFirstExists(false);
  if (enemy) {
    const creature = Creature.basic;
    enemy.reset(600, 50);
    enemy.body.velocity.x = creature.speed * (waveCounter % 2 ? 1 : -1);
    enemy.health = creature.health;
    enemy.damageOnImpact = creature.damageOnImpact;
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.bounce.setTo(1, 0)
  }
  game.time.events.add(spacing, launchEnemy)
}