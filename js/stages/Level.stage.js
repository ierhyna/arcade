import game, {Text} from "../game";
import {GameObject, Pool, Blob, BasicBullet, HeavyBullet, Player, Spawner, Chest, Coin} from "../classes";

let player,
    blobbyGroup,
    chestGroup,
    basicWeapon,
    heavyWeapon,
    levelText,
    basicBulletText,
    heavyBulletText;

export const Level = {
    create: function () {
        const map = game.add.tilemap('level1');
        map.addTilesetImage('wallmap', 'tileset');
        game.stage.backgroundColor = "#222";
        let walls = map.createLayer('walls');
        map.setCollision([1, 2], true, walls);
        game.walls.push(walls);

        new GameObject('avatar').classSpawnOne(66, 700);
        new GameObject('icon_basic').classSpawnOne(572, 702);
        new GameObject('icon_heavy').classSpawnOne(636, 702);
        game.add.text(564, 740, 1, Text.styles.basic);
        game.add.text(628, 740, 2, Text.styles.basic);

        player = new Player("hero", "Jackson Martinez");
        player.create(64, 64);

        blobbyGroup = new Pool(Blob, {
            sprite: "blob",
            size: 50,
            data: {}
        });
        const spawner = new Spawner({
            pool: blobbyGroup,
            spacing: 2000,
            size: 60,
            name: "blobs"
        });
        spawner.launch(600, 5);

        basicWeapon = new Pool(BasicBullet, {sprite: "bullet", size: 50});
        heavyWeapon = new Pool(HeavyBullet, {sprite: "heavyBullet", size: 10});
        game.projectiles.push(basicWeapon, heavyWeapon);

        chestGroup = new Pool(Chest, "treasure", 10);
        const chest = chestGroup.create(350, 200);

        game.add.text(130, 656, player.name, Text.styles.basic);
        levelText = game.add.text(130, 676, `Level ${player.level} Soldier`, Text.styles.basic);
        basicBulletText = game.add.text(560, 653, "", Text.styles.basic);
        heavyBulletText = game.add.text(620, 653, "", Text.styles.basic);
        Text.level("Wave 1", "#ffffff");
        game.player = player; // exposing player object to global game object
    },

    update: function () {
        basicBulletText.text = player.ammo.BasicBullet;
        heavyBulletText.text = player.ammo.HeavyBullet;
        levelText.text = `Level ${player.level} Soldier`;
        game.physics.arcade.collide(player, game.walls);
        game.physics.arcade.overlap(game.projectiles, blobbyGroup, (bullet, enemy) => enemy.hit(bullet, player));
        game.physics.arcade.overlap(blobbyGroup, player, (player, enemy) => enemy.hitPlayer(player));
        game.physics.arcade.overlap(blobbyGroup, chestGroup, (enemy, chest) => enemy.pickUp(chest, Coin, "coin-ani"));

        if (game.Key.cursors.left.isDown) {
            player.move("left")
        } else if (game.Key.cursors.right.isDown) {
            player.move("right");
        } else player.move("stop");
        if (game.Key.cursors.up.isDown) player.move("jump");
        if (game.Key.one.isDown) player.fire(basicWeapon);
        if (game.Key.two.isDown) player.fire(heavyWeapon);

        if (!player.alive) {
            this.reset();
        }
    },

    reset: function () {
        game.state.start("Level");
    }
}
