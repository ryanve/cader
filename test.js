const assert = require("assert");
const cader = require("./")
// const ssv = require("ssv")
const model = cader.prototype
const c1 = new cader
const c2 = new cader

assert.ok(!!model, true)
assert.ok(c1 instanceof cader)
assert.ok(c1 !== c2)

assert.strictEqual(typeof model.bond, "function")
assert.strictEqual(typeof model.clone, "function")
assert.strictEqual(typeof model.freeze, "function")
assert.strictEqual(typeof model.save, "function")

assert.strictEqual(typeof c1.bond, "function")
assert.strictEqual(typeof c1.clone, "function")
assert.strictEqual(typeof c1.freeze, "function")
assert.strictEqual(typeof c1.save, "function")

c1.save({
  "Gold": "1st save-test value",
  "Silver": "2nd save-test value",
  "Bronze": "3rd save-test value",
}).save({
  "Podium": c1.bond("Gold Silver Bronze"),
  "Odd": c1.bond("Gold Bronze"),
// }).mix({
//   "TallPodium": c1.union("Podium", "px2 py4"),
//   "WidePodium": c1.union("Podium", "px4 py2"),
})

assert.strictEqual(c1.bond("Gold"), "1st save-test value")
assert.strictEqual(c1.bond("Podium"), "1st save-test value 2nd 3rd")

assert.strictEqual(c1.freeze(), c1)
assert.ok(c1.clone() instanceof cader)
assert.strictEqual(c1.clone().bond("Gold"), c1.bond("Gold"))
assert.strictEqual(c1.clone().bond("Podium"), c1.bond("Podium"))

c2.save({
  "Gold": "1st save-test value",
  "Silver": "2nd save-test value",
  "Bronze": "3rd save-test value",
}).save({
  "Podium": c2.bond("Gold Silver Bronze"),
  "Odd": c2.bond("Gold Bronze"),
// }).mix({
//   "TallPodium": c2.union("Podium px2 py4"),
//   "WidePodium": c2.union(Podium px4 py2"),
})

console.log("Methods:", Object.keys(model))
console.log("Tests passed =)")
