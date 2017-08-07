Creating pools:
```$xslt
const myPool = new Pool(type, //class name 
{
    sprite: "name",
    size: 50,
    data: {}
});
```

Creating spawner:

```$xslt
const mySpawner = new Spawner({
    pool: myPool,
    spacing: 2000 // ms,
    size: 60,
    name: "my baddies" // just for reference
});

mySpawner.launch(x,y);

```