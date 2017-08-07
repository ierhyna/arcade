Creating pools:
```$xslt
const myPool = new Pool(Class type, // class name 
{
    sprites: String[] names,
    size: Integer numberOfInstances,
    data: Item data //optional
});

myPool.create(Integer x, Integer y); // spawns one instance
```
_even if you provide only one sprite image you should pass it as an array_
_if you provide multiple sprite images they will be randomly picked during creation phase_   

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

```$xslt
const player = new Player(String sprite, String name);
player.create(Integer x, Integer y);
```
_physics is enabled by default_


Log to console by `game.log(String message);`

to make this work turn dev mode in Preload class: `game.devMode = true;`   
_dev mode is enabled by default_
