/*
Player buffs: last 3 seconds, can not happen more than once per 3 seconds
- Havoc — after performing 3 crits in a row increase damage by 100%
- Enrage — after killing an enemy increase damage by 20%

Buffs are applied in the aforementioned order
*/

import game from "../game";
import Text from "../text.plugin";
import { HealthBar } from "../bar.plugin";
import { SoundEngine } from "./Preload.stage";
import { ConstructGroup } from "../constructors";

import { Weapon, Creature } from "../../config";

import { Pool, Blob } from "../classes";

let Key = {},
    player,
    cursors,
    blobbyGroup,
    basicWeapon,
    heavyWeapon,
    healthBar,
    skillIcons = {},
    buffIcons = {},
    barsText = {},
    InfoText = {},
    expBar,
    levelText,
    playerDirection = 1,
    waveCounter = 40,
    treasures,
    coins;

const enemyGroup = {};
const buffs = [];

let blobGroup;

let Armory = {}

const timer = {
    basicWeapon: 0,
    heavyWeapon: 0,
    jump: 0
}

let maxPlayerHp = 350
let totalExpForLevel = 650;
let totalGoldForLevel = 500;

export const Level = {

    create: function() {
        Armory = {
            'basicWeapon': {
                count: 420,
                sound: SoundEngine.gunShot
            },
            'heavyWeapon': {
                count: 35,
                sound: SoundEngine.heavyShot
            }
        }
        const map = game.add.tilemap('level1');
        map.addTilesetImage('tilea2', 'tileset');
        const bg = game.add.sprite(0, 0, 'background001');
        bg.width = game.width;
        bg.height = 640;

        let walls = map.createLayer('walls')
        let verticalWalls = map.createLayer('vertical')

        map.setCollision([49, 63, 109], true, walls);
        map.setCollision([55], true, verticalWalls);
        game.walls = []
        game.walls.push(walls, verticalWalls);

        buffIcons['havoc'] = game.add.sprite(-500, -500, 'buff_havoc');
        buffIcons['enrage'] = game.add.sprite(-500, -500, 'buff_enrage');

        skillIcons['basic'] = game.add.sprite(540, 670, 'icon_basic');
        skillIcons['heavy'] = game.add.sprite(604, 670, 'icon_heavy');
        for (let i = 1; i <= Object.keys(skillIcons).length; i++) {
            game.add.text(500 + 64 * i, 737, i, {
                font: "16px Press Start 2P",
                fill: "#fff",
                align: "center"
            });
        };


        player = game.add.sprite(32, 32, 'hero');
        player.animations.add('move', [0, 1, 2, 3], 10, true);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.scale.setTo(0.2, 0.2);
        initializeNewPlayer();

        prepareBars();
        prepareInterFaceText();

        const avatar = game.add.sprite(10, 650, "avatar");
        avatar.scale.setTo(0.5, 0.5);

        cursors = game.input.keyboard.createCursorKeys();
        Key.one = game.input.keyboard.addKey(Phaser.KeyCode.ONE);
        Key.two = game.input.keyboard.addKey(Phaser.KeyCode.TWO);

        prepareGroups();
        setupTreasures();
        launchEnemy(Creature.basic);
        Text.level("Wave 1", "#ffffff");
        SoundEngine.trackRumble.play();

        InfoText.gold = game.add.text(48, 16, `Gold: ${totalGoldForLevel}`, {
            font: "Press Start 2P",
            fontSize: "20px",
            fill: "gold",
            align: "center",
            stroke: '#000000',
            strokeThickness: 4
        });


        blobGroup = game.add.group()
        for (let i = 0; i < 10; i++) {
            blobGroup.add(new Blob(game));
        }

        blobbyGroup = new Pool(game, Blob, 50, { title: "Blob", description: "Tiny blob" });
        let blobby = blobbyGroup.create(100, 100);
        blobby.item.props({ value: 3 })
        console.log(blobby.item.props());
        spawnEnenmy(blobbyGroup, 600, 50, 2500);
    },

    update: function() {

        if (player.health < maxPlayerHp && player.alive) {
            player.health += 0.1;
            if (player.health > maxPlayerHp) player.health = maxPlayerHp;
        }
        player.body.velocity.x = 0;

        checkCollisions();
        checkControls();
        renderBuffs();
        renderInterfaceText();
    }
}

// HELPERS
function spawnEnenmy(group, x, y, spacing) {
    group.create(x, y);
    game.time.events.add(spacing, () => spawnEnenmy(group, x, y, spacing));
}

function launchEnemy(mob) {
    const spacing = 1800;
    waveCounter -= 1;
    if (waveCounter === 0) return;
    let enemy = enemyGroup.blobs.getFirstExists(false);
    if (enemy) {

        enemy.reset(600, 20);
        enemy.body.velocity.x = mob.speed * (waveCounter % 2 ? 1 : -1);
        enemy.health = mob.health;
        enemy.damageOnImpact = mob.damageOnImpact;
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.bounce.setTo(1, 0);
        enemy.scale.setTo(1, 2)
        enemy.animations.add("live", [0, 1], 10, true);
        enemy.animations.add("die", [2, 3, 4, 5, 6], 10, true);
        enemy.animations.add("blink", [7, 0], 10);
        enemy.animations.play("live", 2);
        enemy.active = true;
        enemy.exp = mob.exp;

    }
    game.time.events.add(spacing, () => launchEnemy(mob));
}

function checkCollisions() {
    game.physics.arcade.collide(enemyGroup.blobs, game.walls);

    game.physics.arcade.collide(player, game.walls);

    game.physics.arcade.overlap(player, coins, (player, coin) => {
        Text.combat(coin, `+${coin.value} gold`, EVENTS.INFO);
        totalGoldForLevel += +coin.value;
        coin.kill();
    });

    game.physics.arcade.collide(treasures, game.walls);

    game.physics.arcade.overlap(enemyGroup.blobs, treasures, (enemy, treasure) => {
        if (!enemy.carryingTreasure) {
            const stealAmount = 10;
            enemy.carryingTreasure = true;
            if (treasure.goldCapacity >= stealAmount) {
                treasure.goldCapacity -= stealAmount;
                enemy.gold = stealAmount;
            } else {
                enemy.gold = treasure.goldCapacity;
                treasure.goldCapacity = 0;
                treasure.kill();
            }
            enemy.coin = enemy.addChild(game.make.sprite(-16, -8, 'coin'));
            enemy.coin.scale.setTo(0.25, 0.125);
            console.log(`enemy stole ${enemy.gold} coins!`);
            Text.combat(enemy, `-${enemy.gold} gold`, EVENTS.INFO);
            totalGoldForLevel -= +enemy.gold;
        }
    });

    game.physics.arcade.collide([basicWeapon, heavyWeapon], game.walls, bullet => {
        bullet.kill();
    });

    game.physics.arcade.overlap([basicWeapon, heavyWeapon], blobbyGroup, (bullet, enemy) => {
        
        enemy.hit(bullet);
        bullet.kill();
    });
    game.physics.arcade.overlap([basicWeapon, heavyWeapon], enemyGroup.blobs, (bullet, enemy) => {
        if (!enemy.active) return;
        bullet.kill();
        // Damage calculation
        if (player.havoc) bullet.damage *= 2;
        if (player.enrage) bullet.damage = (bullet.damage * 1.2).toFixed();

        const event = bullet.crit ? EVENTS.CRIT : EVENTS.HIT;
        Text.combat(enemy, bullet.damage, event);
        if (bullet.crit) {
            if (Number(bullet.damage) > Number(player.critRec)) {
                console.log("previous crit record " + player.critRec);
                player.critRec = Number(bullet.damage);
                console.log(player.critRec + "/" + bullet.damage);
                Text.level(`Crit record ${bullet.damage}!`, "#11ff11");
            }
            player.critCombo++;
        } else {
            player.critCombo = 0;
        };
        if (player.critCombo > 1) {
            activateBuff('havoc', 3000);
            player.critCombo = 0;
        }
        enemy.health -= bullet.damage;
        if (enemy.health <= 0) {
            Text.combat(enemy, enemy.exp + " exp", EVENTS.INFO);
            updateExp(enemy.exp);
            enemy.body.velocity.x = 0;
            if (enemy.carryingTreasure) {
                enemy.carryingTreasure = false;
                enemy.coin.kill();
                dropCoin(enemy);
            }
            enemy.active = false;
            player.enrage = true;
            activateBuff('enrage', 3000)
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
            player.health = 0;
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
        player.frame = 1;
    }

    if (cursors.up.isDown && player.body.onFloor() && game.time.now > timer.jump) {
        player.body.velocity.y = -520;
        timer.jump = game.time.now + 750;
    }
    if (Key.one.isDown) {
        fireWeapon(basicWeapon, "basicWeapon");
    }
    if (Key.two.isDown) {
        fireWeapon(heavyWeapon, "heavyWeapon");
    }
}

function fireWeapon(weapon, name) {
    if (!player.alive || !Armory[name].count) return;
    if (game.time.now > timer[name]) {
        const bullet = weapon.getFirstExists(false);
        if (bullet) {
            const w = Weapon[name];
            bullet.crit = game.rnd.integerInRange(0, 100) <= w.crit;
            bullet.reset(player.x, player.y + 16);
            bullet.body.velocity.x = w.speed * playerDirection;
            bullet.body.allowGravity = false;
            bullet.damage = bullet.crit ? w.damage * w.multiplier : w.damage;
            bullet.damage = game.rnd.integerInRange(Math.floor(bullet.damage - bullet.damage / 5), Math.floor(bullet.damage + bullet.damage / 5))
            timer[name] = game.time.now + w.spacing;
            Armory[name].count--;
            Armory[name].sound.play();
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

function renderInterfaceText() {
    Object.keys(Armory).forEach((e, i) => {
        Armory[e].text.text = Armory[e].count;
    });
    healthBar.setPercent(player.health / 350 * 100);
    expBar.setPercent(player.exp / totalExpForLevel * 100);
    barsText.exp.text = `${player.exp}/${totalExpForLevel}`;
    barsText.hp.text = `${player.health.toFixed()}/${maxPlayerHp}`;
    InfoText.gold.text = `Gold: ${totalGoldForLevel}`;
}

function prepareInterFaceText() {
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

    barsText.exp = game.add.text(440, 710, `${player.exp}/${totalExpForLevel}`, {
        font: "11px Press Start 2P",
        fill: "#fff",
        align: "center"
    });
    barsText.hp = game.add.text(440, 730, `${player.health}/${maxPlayerHp}`, {
        font: "11px Press Start 2P",
        fill: "#fff",
        align: "center"
    });
    Object.keys(Armory).forEach((e, i) => {
        Armory[e].text = game.add.text(564 + i * 64, 652, Armory[e].count, {
            font: "12px Press Start 2P",
            fill: "#fff",
            align: "center"
        })
    });
}

function prepareBars() {
    expBar = new HealthBar(game, {
        width: 300,
        height: 12,
        x: 280,
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
        width: 300,
        height: 12,
        x: 280,
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
}

function prepareGroups() {
    treasures = game.add.group();
    ConstructGroup(treasures, {
        number: 10,
        sprite: "treasure",
        scale: 0.25
    });

    coins = game.add.group();
    ConstructGroup(coins, {
        sprite: "coin",
        scale: 0.25
    });

    enemyGroup.blobs = game.add.group();
    ConstructGroup(enemyGroup.blobs, {
        number: 50,
        sprite: 'blob-ani',
        scale: 0.5
    });

    basicWeapon = game.add.group();
    ConstructGroup(basicWeapon, {
        number: 50,
        sprite: 'bullet',
        scale: 0.5
    });

    heavyWeapon = game.add.group();
    ConstructGroup(heavyWeapon, {
        number: 20,
        sprite: 'heavyBullet',
        scale: 1.25
    });
}

function initializeNewPlayer() {
    return Object.assign(player, {
        health: 350,
        critCombo: 0,
        critRec: 0,
        frame: 0,
        exp: 0,
        level: 1
    });
}

function updateExp(exp) {
    player.exp += exp;
    if (player.exp >= totalExpForLevel) {
        player.exp = 0;
        player.level++;
        totalExpForLevel *= 2;
        Text.level(`Gained level ${player.level}!`, "#ff0");
        levelText.text = `Level ${player.level} Soldier`;
    }
}

function setupTreasures() {
    const treasure = treasures.getFirstExists(false);
    if (treasure) {
        treasure.reset(328, 200);
        treasure.goldCapacity = 87;
    }
}

function dropCoin(enemy) {
    const coin = coins.getFirstExists(false);
    if (coin) {
        coin.reset(enemy.x, enemy.y);
        coin.body.moves = false;
        coin.value = (enemy.gold * 0.8).toFixed();
    }
}

function activateBuff(buff, length) {
    if (!buffs.hasOwnProperty(buff)) {
        Object.assign(buffs, {
            [buff]: true
        });
        player[buff] = true;
        game.time.events.add(length, () => {
            player[buff] = false;
            delete buffs[buff];
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