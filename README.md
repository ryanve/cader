# cader
Facade your cascade.

```js
const cade = new cader

cade.save({
  "Box": "border-box m0 p0 border-none",
  "Fit": "width-fit height-fit",
  "Tap": "preset-tap font-control",
  "PadWide": "px2 py1",
  "PadTall": "px1 py2",
  "Raised": "shadow-raised",
}).save({
  "ButtonTallRaised": cade.fuse("Tap PadTall Raised"),
  "ButtonWideRaised": cade.fuse("Tap PadWide Raised"),
})
```

## API

### `.save(mapping)`

- Save `mapping` to the instance
- `@param {Object} mapping`
- `@return this` for chaining

```js
const cade = new cader

cade.save({
  "Box": "border-box m0 p0 border-none",
  "Contain": "clearfix relative",
})

cade.fuse("Box") // border-box m0 p0 border-none
cade.fuse("Contain") // clearfix relative
cade.fuse("Box Contain") // border-box m0 p0 border-none clearfix relative
cade.bond("Box another") // border-box m0 p0 border-none another
```

### `.fuse(atoms)`

- fuse atoms into string
- `atoms` is a space-separated string
- `@return string`

```js
const cade = new cader

cade.save({
  "Box": "border-box m0 p0 border-none",
  "ViewportSize": "w-100vw h-100vh"
})

cade.fuse("Box ViewportSize")  // border-box m0 p0 border-none w-100vw h-100vh
```

### `.bond(atoms)`

- bond atoms into string
- `atoms` is a space-separated string that may contain foreign particles
- `@return string`

```js
const cade = new cader

cade.save({
  "Box": "border-box m0 p0 border-none",
  "ViewportSize": "w-100vw h-100vh"
})

cade.bond("Box ViewportSize p2")  // border-box m0 p0 border-none w-100vw h-100vh p2
```
