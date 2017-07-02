import game, { Store } from "../game";
import Text from "../text.plugin";
import { HealthBar } from "../bar.plugin";
import { SoundEngine } from "./Preload.stage";

import { Pool, Blob, BasicBullet, HeavyBullet, Chest, Player } from "../classes";

let player,
    cursors,
    blobbyGroup,
    basicBulletGroup,
    heavyBulletGroup,
    healthBar,
    skillIcons = {},
    barsText = {},
    InfoText = {},
    expBar,
    levelText
//playerDirection = 1;

const EVENTS = {
    PLAYER_HIT: "playerHit",
    HIT: "hit",
    INFO: "info",
    CRIT: "crit"
}

const timer = {
    jump: 0
}

let maxPlayerHp = 350
let totalExpForLevel = 650;
let totalGoldForLevel = 500;

export const Level = {
    create: function() {

        const cursors = game.input.keyboard.createCursorKeys();
        const one = game.input.keyboard.addKey(Phaser.KeyCode.ONE);
        const two = game.input.keyboard.addKey(Phaser.KeyCode.TWO);
        const three = game.input.keyboard.addKey(Phaser.KeyCode.THREE);

        game.Key = { cursors: cursors, one: one, two: two, three: three }

        Store.wave = 1;
        Store.enemiesInWave = 40;
        Store.currentEnemy = 1;

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

        skillIcons['basic'] = game.add.sprite(540, 670, 'icon_basic');
        skillIcons['heavy'] = game.add.sprite(604, 670, 'icon_heavy');
        for (let i = 1; i <= Object.keys(skillIcons).length; i++) {
            game.add.text(500 + 64 * i, 737, i, {
                font: "16px Press Start 2P",
                fill: "#fff",
                align: "center"
            });
        };

        player = new Player(game);
        player.create(64, 64);

        prepareBars();
        prepareInterFaceText();

        const avatar = game.add.sprite(10, 650, "avatar");
        avatar.scale.setTo(0.5, 0.5);

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

        blobbyGroup = new Pool(game, Blob, 50, { title: "Blob", description: "Tiny blob" });
        spawnEnenmy(blobbyGroup, { x: 600, y: 5, spacing: 2500, quantity: Store.enemiesInWave });

        game.projectiles = [];
        basicBulletGroup = new Pool(game, BasicBullet, 50);
        heavyBulletGroup = new Pool(game, HeavyBullet, 10);
        game.projectiles.push(basicBulletGroup, heavyBulletGroup);
    },

    update: function() {
        player.body.velocity.x = 0;
        renderInterfaceText();

        game.physics.arcade.collide(player, game.walls);
        game.physics.arcade.overlap(game.projectiles, blobbyGroup, (bullet, enemy) => enemy.hit(bullet));
        game.physics.arcade.overlap(blobbyGroup, player, (player, enemy) => enemy.hitPlayer(player));

        checkControls();
    }
}

function spawnEnenmy(group, data) {
    if (Store.currentEnemy > data.quantity) return;
    group.create(data.x, data.y);
    game.time.events.add(data.spacing, () => spawnEnenmy(group, data));
}

function checkControls() {
    if (game.Key.cursors.left.isDown) {
        player.direction = -1;
        player.body.velocity.x = -220;
        player.scale.x = player.direction * 0.2;
        if (player.body.onFloor()) {
            player.animations.play('move');
        } else {
            player.animations.stop();
            player.frame = 2;
        }
    } else if (game.Key.cursors.right.isDown) {
        player.direction = 1;
        player.scale.x = player.direction * 0.2;
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

    if (game.Key.cursors.up.isDown && player.body.onFloor() && game.time.now > timer.jump) {
        player.body.velocity.y = -520;
        timer.jump = game.time.now + 750;
    }
    if (game.Key.one.isDown) {
        player.fire(basicBulletGroup);
    }
    if (game.Key.two.isDown) {
        player.fire(heavyBulletGroup);
    }
}

function renderInterfaceText() {
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
}

function prepareBars() {
    expBar = new HealthBar(game, {
        width: 300,
        height: 12,
        x: 280,
        y: 716,
        bg: { color: '#ccc' },
        bar: { color: '#f00' },
        animationDuration: 200,
        flipped: false
    });
    expBar.setPercent(0);

    healthBar = new HealthBar(game, {
        width: 300,
        height: 12,
        x: 280,
        y: 738,
        bg: { color: '#651828' },
        bar: { color: '#FEFF03' },
        animationDuration: 100,
        flipped: false
    });
    healthBar.setPercent(350 / player.health);
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