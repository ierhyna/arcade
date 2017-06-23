import game from "../game";
import Text from "../text.plugin";

import {
  Weapon,
  Creature
} from "../../config";

let walls,
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

    const map = game.add.tilemap('level1');
    map.addTilesetImage('tilea2', 'tileset');
    const bg = game.add.sprite(0, 0, 'background001');
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
    player.critCombo = 0;

    cursors = game.input.keyboard.createCursorKeys();
    fire = game.input.keyboard.addKey(Phaser.KeyCode.ONE);

    enemyGroup.blobs = game.add.group();
    prepareEnemyGroup(enemyGroup.blobs, 'blob-ani');

    prepareBullets();
    prepareSounds();
    launchEnemy();
    Text.level("Wave 1", "#ffffff");
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
    enemy.reset(600, 20);
    enemy.body.velocity.x = creature.speed * (waveCounter % 2 ? 1 : -1);
    enemy.health = creature.health;
    enemy.damageOnImpact = creature.damageOnImpact;
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.bounce.setTo(1, 0);
    enemy.scale.setTo(1, 2)
    enemy.animations.add("live", [0, 1], 10, true);
    enemy.animations.add("die", [2, 3, 4, 5, 6], 10, true);
    enemy.animations.add("blink", [7, 0], 10);
    enemy.animations.play("live", 2);
    enemy.active = true;
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
  game.physics.arcade.collide(bullets, verticalWalls, bullet => {    
    bullet.body.x += bullet.body.velocity.x / 20
    bullet.body.velocity.x = -bullet.speed;
    bullet.body.velocity.y = bullet.speed;
    sound.ricochet.play();
  });
    game.physics.arcade.collide(bullets, walls, bullet => {
    bullet.kill();
    sound.ricochet.play();
  });

  game.physics.arcade.overlap(bullets, enemyGroup.blobs, (bullet, enemy) => {
    if (!enemy.active) return
    bullet.kill();
    if (player.havoc) bullet.damage *=2;
    Text.combat(enemy, bullet);
    if (bullet.crit) player.critCombo++;
    if (player.critCombo > 2) {
      Text.level("HAVOC!", "#ff0000");
      player.havoc = true;
      game.time.events.add(200, () => {
        player.havoc = false
      });
      player.critCombo = 0
    }
    enemy.health -= bullet.damage;
    if (enemy.health <= 0) {
      enemy.body.velocity.x = 0;
      enemy.active = false;
      return enemy.animations.play("die", 6, false, true);
    }
    sound.mobHit.play();
    enemy.alive && enemy.animations.play("blink", 20);
  });

  game.physics.arcade.overlap(enemyGroup.blobs, player, (player, enemy) => {
    if (enemy.active) player.health -= enemy.damageOnImpact;
    Text.life(player, enemy);
    player.health <= 0 && player.kill();
    enemy.body.velocity.x = 0;
    enemy.active = false;
    enemy.animations.play("die", 6, false, true);

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
    player.body.velocity.y = -520;
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
      bullet.speed = bullet.body.velocity.x
      bullet.body.allowGravity = false;
      bullet.damage = bullet.crit ? w.damage * w.multiplier : w.damage;
      bullet.damage = game.rnd.integerInRange(Math.floor(bullet.damage - bullet.damage / 5), Math.floor(bullet.damage + bullet.damage / 5))
      timer.basicBullet = game.time.now + w.spacing;
      sound.gunShot.play();
    }
  }
}

function prepareEnemyGroup(e, sprite) {
  e.enableBody = true;
  e.physicsBodyType = Phaser.Physics.ARCADE;
  e.createMultiple(50, sprite);
  e.setAll('anchor.x', 0.5);
  e.setAll('anchor.y', 0.5);
  e.setAll('outOfBoundsKill', true);
  e.setAll('checkWorldBounds', true);
}
