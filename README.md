# cader
Facade your cascade.

```
npm install cader
```

```js
const cader = require("cader")
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
  "Circle": cade.bond("Box radii-circle"),
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
- `atoms` is a space-separated string of saved atoms only
- throws error if attempting to fuse unsaved atoms
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
- `atoms` is a space-separated string of saved atoms or foreign particles
- foreign particles are included as is
- `@return string`

```js
const cade = new cader

cade.save({
  "Box": "border-box m0 p0 border-none",
  "ViewportSize": "w-100vw h-100vh"
})

cade.bond("Box ViewportSize p2")  // border-box m0 p0 border-none w-100vw h-100vh p2
```

### `.freeze()`

- freeze mapping to prevent new atoms from being saved
- facilitates immutability
- `@return this` for chaining

```js
const cade = new cader
cade.freeze()
cade.save({ "Unable": "example" }) // throws Error
```

### `.clone()`

- clone instance
- useful for extending frozen instances without mutating them
- `@return` new instance with cloned mapping

```js
const library = new cader
library.save({/* ... */}).freeze() // save library atoms and then freeze export
const feature = library.clone() // new instance has access to atoms from library
feature.save({/* ... */})  // can save more atoms if unique from library atoms
```

### `.help()`

- log [helpful info](https://github.com/ryanve/cader/pull/22) about an instance including the atoms and the methods
- useful for inspection, debugging, learning
- `@return this` for chaining

## Compatibility
- ES5+
- CommonJS
- Node
- Web via `webpack` | `rollup` | `browserify`
