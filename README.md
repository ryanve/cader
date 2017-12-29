# cader
Facade your cascade.


```js
const cade = new cader

cade.raw({
  "Box": "border-box m0 p0 border-none",
  "Fit": "width-fit height-fit",
  "Tap": "preset-tap font-control",
  "PadWide": "px2 py1",
  "PadTall": "px1 py2",
  "Raised": "shadow-raised",
}).mix({
  "ButtonTallRaised": "Tap PadTall Raised"
  "ButtonWideRaised": "Tap PadWide Raised",
  "Circle": "Box radii-circle",
}).mix({
  "ButtonCircleRaised": "Tap Circle Raised p1"
})
```

## API

### `.raw(mapping)`

- Define and save raw mapping(s) to the instance.
- `mapping` object values are static strings.
- `@return this` for chaining.

```js
const cade = new cader
cade.raw({
  "Box": "border-box m0 p0 border-none",
  "Contain": "clearfix relative",
})

cade.bond("Box") // border-box m0 p0 border-none
cade.bond("Contain") // clearfix relative
cade.bond("Box Contain") // border-box m0 p0 border-none clearfix relative
cade.bond("Box another") // border-box m0 p0 border-none another
```

### `.mix(mapping)`

- Define and save mixed mapping(s) to the instance.
- `mapping` object values are dynamic strings. Values predefined via `.raw` are expanded on entry.
- `@return this` for chaining.

```js
const classing = new cader

classing.raw({
  "Box": "border-box m0 p0 border-none",
}).mix({
  "Viewport": "Box w-100vw h-100vh",
})

classing.bond("Viewport")  // border-box m0 p0 border-none w-100vw h-100vh
```

### `.bond(key)`

- bond the expanded value for key(s)
- `key` is a space-separated string
- `@return string`

```js
const cade = new cader
cade.raw({
  "Box": "border-box m0 p0 border-none",
}).mix({
  "Viewport": "Box w-100vw h-100vh",
})

cade.bond("Viewport")  // border-box m0 p0 border-none w-100vw h-100vh
```
