import game, { Text, HealthBar } from "../game";
import { GameObject, Pool, Blob, BasicBullet, HeavyBullet, Player, Spawner } from "../classes";

let player,
    blobbyGroup,
    basicWeapon,
    heavyWeapon,
    levelText,
    basicBulletText,
    heavyBulletText;

export const Level = {
    create: function() {
        const map = game.add.tilemap('level1');
        map.addTilesetImage('tilea2', 'tileset');
        const background = game.add.sprite(0, 0, 'background001');
        background.width = game.width;
        background.height = 640;
        let walls = map.createLayer('walls')
        let verticalWalls = map.createLayer('vertical')
        map.setCollision([49, 63, 109], true, walls);
        map.setCollision([55], true, verticalWalls);
        game.walls.push(walls, verticalWalls);

        new GameObject('avatar').spawnOne(66, 700);
        new GameObject('icon_basic').spawnOne(572, 702);
        new GameObject('icon_heavy').spawnOne(636, 702);
        game.add.text(564, 740, 1, Text.styles.basic);
        game.add.text(628, 740, 2, Text.styles.basic);

        player = new Player("hero", "Jackson Martinez");
        player.create(64, 64);        

        blobbyGroup = new Pool(Blob, "blob", 50);
        const spawner = new Spawner(blobbyGroup, 2500, 40).launch(600, 5);

        basicWeapon = new Pool(BasicBullet, "bullet", 50);
        heavyWeapon = new Pool(HeavyBullet, "heavyBullet", 10);
        game.projectiles.push(basicWeapon, heavyWeapon);

        game.add.text(130, 656, player.name, Text.styles.basic);
        levelText = game.add.text(130, 676, `Level ${player.level} Soldier`, Text.styles.basic);
        basicBulletText = game.add.text(560, 653, "", Text.styles.basic);
        heavyBulletText = game.add.text(620, 653, "", Text.styles.basic);
        Text.level("Wave 1", "#ffffff");
    },

    update: function() {
        basicBulletText.text = player.ammo.BasicBullet;
        heavyBulletText.text = player.ammo.HeavyBullet;
        game.physics.arcade.collide(player, game.walls);
        game.physics.arcade.overlap(game.projectiles, blobbyGroup, (bullet, enemy) => enemy.hit(bullet, player));
        game.physics.arcade.overlap(blobbyGroup, player, (player, enemy) => enemy.hitPlayer(player));

        if (game.Key.cursors.left.isDown) {
            player.move("left")
        } else if (game.Key.cursors.right.isDown) {
            player.move("right");
        } else player.move("stop");
        if (game.Key.cursors.up.isDown) player.move("jump");
        if (game.Key.one.isDown) player.fire(basicWeapon);
        if (game.Key.two.isDown) player.fire(heavyWeapon);
    }
}