Creating pools:
```$xslt
const myPool = new Pool(Class type, // class name 
{
    sprites: String[] names,
    size: Integer numberOfInstances,
    data: Item data //optional,
    name: String name // just for reference, optional
});

myPool.create(Integer x, Integer y, Object options); // spawns one instance
```
_even if you provide only one sprite image you should pass it as an array_
_if you provide multiple sprite images they will be randomly picked during creation phase_
**options** is the param you use to pass to class instance's `create()` method. You can use it to set up a spawning object.
It is up to you how you process those options.

Creating spawner:

```$xslt
const mySpawner = new Spawner({
    pool: Pool variable,
    spacing: Integer milliseconds,
    size: Integer numberOfInstances,
    name: String name // just for reference, optional
});

mySpawner.launch(Integer x, Integer y);

```

Creating non-interactive game object:
```
new GameObject(String sprite).classSpawnOne(Integer x, Integer y);
```
_physics is disabled by default_  

Creating player:

```
const player = new Player(String sprite, String name);
player.create(Integer x, Integer y);
```
_physics is enabled by default_

Creating Chest:

both **Pool** and **GameObject** spawns (`chest.create(x, y, options) / chest.spawnOne(x, y, options)`) utilize options data:
`{drop: Integer, total: Integer}` which set amount of gold inside and amount of coins picked up

Setting up Flag (level lose conditions):
```
flag = new Flag(String sprite, {gold?: Integer val, enemy?: Integer val});
flag.spawnOne(Integer x, Integer y);
```
Sets amount of gold stolen or enemies escaped to lose the level.
If no paramateres are provided then they are defaulted to gold: 250 / enemy: 20  
You can dynamically update the level conditions:
```
flag.updateRules({gold: Integer val, enemy: Integer val});
```

Log to console by `game.log(String message);`

to make this work turn dev mode in Preload class: `game.devMode = true;`   
_dev mode is enabled by default_
