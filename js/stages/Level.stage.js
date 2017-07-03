import game, { Store } from "../game";
import Text from "../text.plugin";
import { HealthBar } from "../bar.plugin";
import { GameObject, Pool, Blob, BasicBullet, HeavyBullet, Chest, Player } from "../classes";

let player,
    blobbyGroup,
    basicBulletGroup,
    heavyBulletGroup,
    healthBar,
    skillIcons = {},
    barsText = {},
    InfoText = {},
    expBar,
    levelText,
    basicBulletText,
    heavyBulletText,
    totalGoldForLevel = 500;

export const Level = {

    create: function() {
        const cursors = game.input.keyboard.createCursorKeys();
        const one = game.input.keyboard.addKey(Phaser.KeyCode.ONE);
        const two = game.input.keyboard.addKey(Phaser.KeyCode.TWO);
        const three = game.input.keyboard.addKey(Phaser.KeyCode.THREE);
        game.Key = { cursors, one, two, three };

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

        skillIcons['basic'] = new GameObject('icon_basic');
        skillIcons['heavy'] = new GameObject('icon_heavy');
        skillIcons['basic'].spawnOne(572, 702);
        skillIcons['heavy'].spawnOne(636, 702);

        for (let i = 1; i <= Object.keys(skillIcons).length; i++) {
            game.add.text(500 + 64 * i, 737, i, {
                font: "16px Press Start 2P",
                fill: "#fff",
                align: "center"
            });
        };

        player = new Player("hero");
        player.create(64, 64);
        const avatar = new GameObject("avatar");
        avatar.spawnOne(66, 700);
        avatar.scale.setTo(0.5, 0.5)

        Text.level("Wave 1", "#ffffff");
        game.songs.trackRumble.play();

        InfoText.gold = game.add.text(48, 16, `Gold: ${totalGoldForLevel}`, {
            font: "Press Start 2P",
            fontSize: "20px",
            fill: "gold",
            align: "center",
            stroke: '#000000',
            strokeThickness: 4
        });

        blobbyGroup = new Pool(Blob, "blob-ani", 50);
        spawnEnenmy(blobbyGroup, { x: 600, y: 5, spacing: 2500, quantity: Store.enemiesInWave });

        game.projectiles = [];
        basicBulletGroup = new Pool(BasicBullet, "bullet", 50);
        heavyBulletGroup = new Pool(HeavyBullet, "heavyBullet", 10);
        game.projectiles.push(basicBulletGroup, heavyBulletGroup);
        prepareBars();
        prepareInterFaceText();
    },

    update: function() {
        player.body.velocity.x = 0;
        renderInterfaceText();
        game.physics.arcade.collide(player, game.walls);
        game.physics.arcade.overlap(game.projectiles, blobbyGroup, (bullet, enemy) => enemy.hit(bullet, player));
        game.physics.arcade.overlap(blobbyGroup, player, (player, enemy) => enemy.hitPlayer(player));
        checkControls();
    }
}

function spawnEnenmy(group, data) {
    Store.currentEnemy++;
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
    if (game.Key.cursors.up.isDown) player.jump();
    if (game.Key.one.isDown) player.fire(basicBulletGroup);
    if (game.Key.two.isDown) player.fire(heavyBulletGroup);
}

function renderInterfaceText() {
    healthBar.setPercent(player.health / player.maxHealth * 100);
    expBar.setPercent(player.experience / player.totalExpForLevel * 100);
    barsText.exp.text = `${player.experience}/${player.totalExpForLevel}`;
    barsText.hp.text = `${player.health.toFixed()}/${ player.maxHealth}`;
    InfoText.gold.text = `Gold: ${totalGoldForLevel}`;
    basicBulletText.text = basicBulletGroup.count();
}

function prepareInterFaceText() {
    const basicTextStyle = {
        font: "12px Press Start 2P",
        fill: "#fff",
        align: "center"
    }
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

    barsText.exp = game.add.text(440, 710, `${player.experience}/${player.totalExpForLevel}`, basicTextStyle);
    barsText.hp = game.add.text(440, 730, `${player.health}/${player.maxHealth}`, basicTextStyle);

    basicBulletText = game.add.text(560, 653, basicBulletGroup.count(), basicTextStyle);
    heavyBulletText = game.add.text(620, 653, heavyBulletGroup.count(), basicTextStyle);
}

function prepareBars() {
    expBar = new HealthBar(game, {
        width: 300,
        height: 12,
        x: 280,
        y: 716,
        bg: { color: '#ccc' },
        bar: { color: '#f00' },
        animationDuration: 200
    });
    expBar.setPercent(0);

    healthBar = new HealthBar(game, {
        width: 300,
        height: 12,
        x: 280,
        y: 738,
        bg: { color: '#651828' },
        bar: { color: '#FEFF03' },
        animationDuration: 100
    });
    healthBar.setPercent(player.maxHealth / player.health);
}