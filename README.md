Creating pools:
```$xslt
const myPool = new Pool(Class type, // class name 
{
    sprite: String name,
    size: Integer numberOfInstances,
    data: Item data //optional
});

myPool.create(Integer x, Integer y); // spawns one instance
```

Creating spawner:

```$xslt
const mySpawner = new Spawner({
    pool: Pool myPool,
    spacing: Integer milliseconds,
    size: Integer numberOfInstances,
    name: "my baddies" // just for reference, optional
});

mySpawner.launch(x,y);

```

Creating non-interactive game object:
```
new GameObject(String sprite).classSpawnOne(Integer x, Integer y);
```
_physics is disabled by default_  

Creating player:

```$xslt
const player = new Player(String sprite, Stringname);
```
