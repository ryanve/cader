
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
  "ButtonTallRaised": cade.bond("Tap PadTall Raised")
  "ButtonWideRaised": cade.bond("Tap PadWide Raised"),
  "Circle": cade.concat("Box", "radii-circle"),
  "Sharp": cade.diff("Circle", "radii-circle"),
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

cade.bond("Box") // border-box m0 p0 border-none
cade.bond("Contain") // clearfix relative
cade.bond("Box Contain") // border-box m0 p0 border-none clearfix relative
// cade.?("Box another") // border-box m0 p0 border-none another
```

### `.bond(atoms)`

- bond the expanded value for key(s)
- `key` is a space-separated string
- `@return string`

```js
const cade = new cader
cade.save({
  "Box": "border-box m0 p0 border-none",
  "ViewportSize": "w-100vw h-100vh"
}).save({
  "ViewportBox": cade.bond("Box ViewportSize")
})

cade.bond("ViewportBox")  // border-box m0 p0 border-none w-100vw h-100vh
```
