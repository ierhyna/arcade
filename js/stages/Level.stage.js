/*
Player buffs: last 3 seconds, can not happen more than once per 3 seconds
- Havoc — after performing 3 crits in a row increase damage by 100%
- Enrage — after killing an enemy increase damage by 20%

Buffs are applied in the aforementioned order
*/

import game from "../game";
import Text from "../text.plugin";
import {
  HealthBar
} from "../bar.plugin";
import {
  SoundEngine
} from "./Preload.stage";
import {
  ConstructGroup
} from "../constructors";

import {
  Weapon,
  Creature
} from "../../config";

let walls,
  verticalWalls,
  fire,
  fireHeavy,
  player,
  blast,
  cursors,
  bullets,
  heavyBullets,
  healthBar,
  skillIcons = {},
  buffIcons = {},
  expBar,
  levelText,
  playerDirection = 1,
  waveCounter = 40;

const enemyGroup = {};
const buffs = []

const timer = {
  basicBullet: 0,
  heavyBullet: 0,
  jump: 0
}

let maxPlayerHp = 350
let expToLevel = 650;

export const Level = {

  create: function () {
    const map = game.add.tilemap('level1');
    map.addTilesetImage('tilea2', 'tileset');
    const bg = game.add.sprite(0, 0, 'background001');
    bg.width = game.width;
    bg.height = 640;
    walls = map.createLayer('walls');
    verticalWalls = map.createLayer('vertical');
    map.setCollision([49, 63, 109], true, walls);
    map.setCollision([55], true, verticalWalls);

    buffIcons['havoc'] = game.add.sprite(-500, -500, 'buff_havoc');
    buffIcons['enrage'] = game.add.sprite(-500, -500, 'buff_enrage');

    skillIcons['basic'] = game.add.sprite(540, 670, 'icon_basic');
    skillIcons['heavy'] = game.add.sprite(604, 670, 'icon_heavy');
    game.add.text(564, 737, "1", {
      font: "16px Press Start 2P",
      fill: "#fff",
      align: "center"
    })
    game.add.text(628, 737, "2", {
      font: "16px Press Start 2P",
      fill: "#fff",
      align: "center"
    })

    player = game.add.sprite(32, 32, 'hero');
    player.animations.add('move', [0, 1, 2, 3], 10, true);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.scale.setTo(0.2, 0.2);
    player.health = 350;
    player.critCombo = 0;
    player.frame = 0;
    player.exp = 0;
    player.level = 1;

    expBar = new HealthBar(game, {
      width: 400,
      height: 12,
      x: 330,
      y: 716,
      bg: {
        color: '#ccc'
      },
      bar: {
        color: '#f00'
      },
      animationDuration: 200,
      flipped: false
    });
    expBar.setPercent(0);
    healthBar = new HealthBar(game, {
      width: 400,
      height: 12,
      x: 330,
      y: 738,
      bg: {
        color: '#651828'
      },
      bar: {
        color: '#FEFF03'
      },
      animationDuration: 100,
      flipped: false
    });

    healthBar.setPercent(350 / player.health);
    const avatar = game.add.sprite(10, 650, "avatar");
    avatar.scale.setTo(0.5, 0.5);
    game.add.text(130, 650, "Jackson Martinez", {
      font: "20px Arial",
      fill: "#888",
      align: "left"
    });
    levelText = game.add.text(130, 680, `Level ${player.level} Soldier`, {
      font: "18px Arial",
      fill: "#bbb",
      align: "left"
    });

    cursors = game.input.keyboard.createCursorKeys();
    fire = game.input.keyboard.addKey(Phaser.KeyCode.ONE);
    fireHeavy = game.input.keyboard.addKey(Phaser.KeyCode.TWO);

    enemyGroup.blobs = game.add.group();
    ConstructGroup(enemyGroup.blobs, {
      number: 50,
      sprite: 'blob-ani',
      scale: 0.5
    });

    bullets = game.add.group();
    ConstructGroup(bullets, {
      number: 50,
      sprite: 'bullet',
      scale: 0.5
    });

    heavyBullets = game.add.group();
    ConstructGroup(heavyBullets, {
      number: 20,
      sprite: 'heavyBullet',
      scale: 1.25
    });

    SoundEngine.trackRumble.play();
    launchEnemy();
    Text.level("Wave 1", "#ffffff");
  },

  update: function () {

    if (player.health < maxPlayerHp && player.alive) {
      player.health += 0.1;
      if (player.health > maxPlayerHp) player.health = maxPlayerHp;
    }
    healthBar.setPercent(player.health / 350 * 100);
    expBar.setPercent(player.exp / expToLevel * 100);
    if (player.exp >= expToLevel) {
      player.exp = 0;
      player.level++;
      expToLevel *= 2;
      Text.level(`Gained level ${player.level}!`, "#ff0");
      levelText.text = `Level ${player.level} Soldier`;
    }
    player.body.velocity.x = 0;
    checkCollisions();
    checkControls();
    renderBuffs();
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
    enemy.exp = creature.exp;
  }
  game.time.events.add(spacing, launchEnemy);
}

function checkCollisions() {
  game.physics.arcade.collide(enemyGroup.blobs, [walls, verticalWalls]);
  game.physics.arcade.collide(player, [walls, verticalWalls]);
  game.physics.arcade.collide(bullets, [walls, verticalWalls], bullet => {
    bullet.kill();
  });

  game.physics.arcade.overlap([bullets, heavyBullets], enemyGroup.blobs, (bullet, enemy) => {
    if (!enemy.active) return
    bullet.kill();

    // Damage calculation
    if (player.havoc) bullet.damage *= 2;
    if (player.enrage) bullet.damage = (bullet.damage * 1.2).toFixed();


    const event = bullet.crit ? EVENTS.CRIT : EVENTS.HIT;
    Text.combat(enemy, bullet.damage, event);
    if (bullet.crit) {
      player.critCombo++
    } else {
      player.critCombo = 0
    };
    if (player.critCombo > 1) {
      Text.level("HAVOC!", "#ff0000");

      if (!buffs.hasOwnProperty('havoc')) {
        Object.assign(buffs, {
          'havoc': true
        });
        player.havoc = true;
        game.time.events.add(3000, () => {
          player.havoc = false;
          delete buffs['havoc'];
        });
      }
      player.critCombo = 0;
    }
    enemy.health -= bullet.damage;
    if (enemy.health <= 0) {
      Text.combat(enemy, enemy.exp + " exp", EVENTS.INFO);
      player.exp += enemy.exp;
      enemy.body.velocity.x = 0;
      enemy.active = false;
      player.enrage = true;
      if (!buffs.hasOwnProperty('enrage')) {
        Object.assign(buffs, {
          'enrage': true
        });
        game.time.events.add(3000, () => {
          player.enrage = false;
          delete buffs['enrage'];
        });
      };


      return enemy.animations.play("die", 6, false, true);
    }
    SoundEngine.mobHit.play();
    enemy.alive && enemy.animations.play("blink", 20);
  });

  game.physics.arcade.overlap(enemyGroup.blobs, player, (player, enemy) => {
    if (enemy.active) {
      player.health -= enemy.damageOnImpact;
      Text.combat(player, -enemy.damageOnImpact, EVENTS.PLAYER_HIT);
    }
    if (player.health <= 0) {
      Text.level("WASTED!", "#ffaa00");
      player.kill()
    };

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
    player.frame = 0;
  }

  if (cursors.up.isDown && player.body.onFloor() && game.time.now > timer.jump) {
    player.body.velocity.y = -520;
    timer.jump = game.time.now + 750;
  }
  if (fire.isDown) {
    fireBasicWeapon();
  }
  if (fireHeavy.isDown) {
    fireHeavyWeapon();
  }
}

function fireBasicWeapon() {
  if (!player.alive) return;
  if (game.time.now > timer.basicBullet) {
    const bullet = bullets.getFirstExists(false);
    if (bullet) {
      const w = Weapon.basic;
      bullet.crit = game.rnd.integerInRange(0, 100) <= w.crit;
      bullet.reset(player.x, player.y + 16);
      bullet.body.velocity.x = w.speed * playerDirection;
      bullet.body.allowGravity = false;
      bullet.damage = bullet.crit ? w.damage * w.multiplier : w.damage;
      bullet.damage = game.rnd.integerInRange(Math.floor(bullet.damage - bullet.damage / 5), Math.floor(bullet.damage + bullet.damage / 5))
      timer.basicBullet = game.time.now + w.spacing;
      SoundEngine.gunShot.play();
    }
  }
}

function fireHeavyWeapon() {

  if (!player.alive) return;
  console.log(111)
  if (game.time.now > timer.heavyBullet) {
    const bullet = heavyBullets.getFirstExists(false);

    if (bullet) {
      const w = Weapon.heavy;
      bullet.crit = game.rnd.integerInRange(0, 100) <= w.crit;
      bullet.reset(player.x, player.y + 16);
      bullet.body.velocity.x = w.speed * playerDirection;
      bullet.body.allowGravity = false;
      bullet.damage = bullet.crit ? w.damage * w.multiplier : w.damage;
      bullet.damage = game.rnd.integerInRange(Math.floor(bullet.damage - bullet.damage / 5), Math.floor(bullet.damage + bullet.damage / 5))
      timer.heavyBullet = game.time.now + w.spacing;
      SoundEngine.heavyShot.play();
    }
  }
}

function renderBuffs() {
  Object.keys(buffIcons).forEach(icon => {
    buffIcons[icon].x = -500;
    buffIcons[icon].y -= 500
  });
  if (Object.keys(buffs).length) {
    let position = 0;
    Object.keys(buffs).forEach(buff => {
      position++;
      buffIcons[buff].x = 1120 - position * 32;
      buffIcons[buff].y = 16;
    });
  }
}

// Combat text event
const EVENTS = {
  PLAYER_HIT: "playerHit",
  HIT: "hit",
  INFO: "info",
  CRIT: "crit"
}