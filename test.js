const assert = require("assert");
const cader = require("./")
const model = cader.prototype
const c1 = new cader
const c2 = new cader

assert.ok(!!model, true)
assert.ok(c1 instanceof cader)
assert.ok(c1 !== c2)

assert.strictEqual(typeof model.bond, "function")
assert.strictEqual(typeof model.clone, "function")
assert.strictEqual(typeof model.freeze, "function")
assert.strictEqual(typeof model.mix, "function")
assert.strictEqual(typeof model.raw, "function")

assert.strictEqual(typeof c1.bond, "function")
assert.strictEqual(typeof c1.clone, "function")
assert.strictEqual(typeof c1.freeze, "function")
assert.strictEqual(typeof c1.mix, "function")
assert.strictEqual(typeof c1.raw, "function")

c1.raw({
  "Gold": "1st raw-test value",
  "Silver": "2nd raw-test value",
  "Bronze": "3rd raw-test value",
}).mix({
  "Podium": "Gold Silver Bronze",
  "Odd": "Gold Bronze",
}).mix({
  "TallPodium": "Podium px2 py4",
  "WidePodium": "Podium px4 py2"
})

assert.strictEqual(c1.bond("Gold"), "1st raw-test value")
assert.strictEqual(c1.bond("Podium"), "1st raw-test value 2nd 3rd")

assert.strictEqual(c1.freeze(), c1)
assert.ok(c1.clone() instanceof cader)
assert.strictEqual(c1.clone().bond("Gold"), c1.bond("Gold"))
assert.strictEqual(c1.clone().bond("Podium"), c1.bond("Podium"))

c2.raw({
  "Gold": "1st raw-test value",
  "Silver": "2nd raw-test value",
  "Bronze": "3rd raw-test value",
}).mix({
  "Podium": "Gold Silver Bronze",
  "Odd": "Gold Bronze",
}).mix({
  "TallPodium": "Podium px2 py4",
  "WidePodium": "Podium px4 py2"
})

console.log("Methods:", Object.keys(model))
console.log("Tests passed =)")
