import game from "../game";
import Text from "../text.plugin";

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
  blast,
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

  create: function () {

    map = game.add.tilemap('level1');
    map.addTilesetImage('tilea2', 'tileset');
    bg = game.add.sprite(0, 0, 'background001');
    bg.width = game.width;
    bg.height = game.height
    walls = map.createLayer('walls');
    verticalWalls = map.createLayer('vertical');
    map.setCollision([49, 63, 109], true, walls);
    map.setCollision([55], true, verticalWalls);

    player = game.add.sprite(32, 32, 'hero');
    player.frame = 0;
    player.animations.add('move', [0, 1, 2, 3], 10, true);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.scale.setTo(0.2, 0.2);
    player.health = 350;

    prepareBullets();
    prepareSounds();

    cursors = game.input.keyboard.createCursorKeys();
    fire = game.input.keyboard.addKey(Phaser.KeyCode.ONE);

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
    Text.level("Wave 1");
  },

  update: function () {
    player.body.velocity.x = 0;
    checkCollisions();
    checkControls();
  }
};

// HELPERS
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

function prepareBullets() {
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
}

function prepareSounds() {
  sound.gunShot = game.add.audio('gunShot');
  sound.mobHit = game.add.audio('mobHit');
  sound.ricochet = game.add.audio('ricochet');
  sound.trackRumble = game.add.audio('trackRumble');
  sound.trackRumble.volume = 0.1;
  sound.gunShot.allowMultiple = true;
  sound.gunShot.volume = 0.5;
  sound.mobHit.allowMultiple = true;
  sound.ricochet.allowMultiple = true;
  sound.trackRumble.play();
}

function checkCollisions() {
  game.physics.arcade.collide(enemyGroup.blobs, walls);
  game.physics.arcade.collide(enemyGroup.blobs, verticalWalls);
  game.physics.arcade.collide(player, [walls, verticalWalls]);
  game.physics.arcade.collide(bullets, [walls, verticalWalls], function (bullet) {
    bullet.kill();
    sound.ricochet.play();
  });

  game.physics.arcade.overlap(bullets, enemyGroup.blobs, (bullet, enemy) => {
    bullet.kill();
    Text.combat(enemy, bullet);
    enemy.health -= bullet.damage;
    if (enemy.health <= 0) {
      let explosion = game.add.sprite(enemy.body.x, enemy.body.y, "blast");
      explosion.scale.setTo(0.5);
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add("blast");
      explosion.animations.play("blast", 20, false, true);
      enemy.kill();
    }
    sound.mobHit.play();
  });

  game.physics.arcade.overlap(enemyGroup.blobs, player, (player, enemy) => {
    enemy.kill();
    player.health -= enemy.damageOnImpact;
    if (player.health <= 0) player.kill();
  });
}

function checkControls() {
  if (cursors.left.isDown) {
    playerDirection = -1;
    player.body.velocity.x = -220;
    player.scale.x = playerDirection * 0.2;
    if (player.body.onFloor()) {
      player.animations.play('move');
    } else {
      player.animations.stop();
      player.frame = 2;
    }
  } else if (cursors.right.isDown) {
    playerDirection = 1;
    player.scale.x = playerDirection * 0.2;
    player.body.velocity.x = 220;
    if (player.body.onFloor()) {
      player.animations.play('move');
    } else {
      player.animations.stop();
      player.frame = 2;
    }
  } else {
    player.animations.stop();
    player.frame = 1;
  }

  if (cursors.up.isDown && player.body.onFloor() && game.time.now > timer.jump) {
    player.body.velocity.y = -480;
    timer.jump = game.time.now + 750;
  }
  if (fire.isDown) {
    fireBasicWeapon();
  }
}

function fireBasicWeapon() {
  if (!player.alive) return;
  if (game.time.now > timer.basicBullet) {   
    const bullet = bullets.getFirstExists(false);
    if (bullet) {
      const w = Weapon.basic;
      bullet.crit = game.rnd.integerInRange(0, 100) <= w.crit;
      bullet.reset(player.x + 16, player.y + 16);
      bullet.body.velocity.x = w.speed * playerDirection;
      bullet.body.allowGravity = false;
      bullet.damage = bullet.crit ? w.damage * w.multiplier : w.damage;
      bullet.damage = game.rnd.integerInRange(Math.floor(bullet.damage - bullet.damage / 5), Math.floor(bullet.damage + bullet.damage / 5))
      timer.basicBullet = game.time.now + w.spacing;
      sound.gunShot.play();
    }
  }
}