const assert = require("assert");
const cader = require("./")
// const ssv = require("ssv")
const model = cader.prototype
const c1 = new cader
const c2 = new cader
const c3 = cader()
const c4 = cader()
const batch = Object.freeze({
  "a1": "a one",
  "b2": "b two",
})
const c5 = cader().save({ A: "a" })
const c6 = cader().save({ A: "a" })
const c7 = cader().save({ B: "b" })
const c8 = cader().save({ C: "c" })

assert.ok(!!model, true)
assert.ok(c1 instanceof cader)
assert.ok(c1 !== c2)
assert.ok(c3 instanceof cader)
assert.ok(c3 !== c4)

assert.strictEqual(typeof model.bond, "function")
assert.strictEqual(typeof model.fuse, "function")
assert.strictEqual(typeof model.help, "function")
assert.strictEqual(typeof model.clone, "function")
assert.strictEqual(typeof model.freeze, "function")
assert.strictEqual(typeof model.save, "function")

assert.strictEqual(typeof c1.bond, "function")
assert.strictEqual(typeof c1.fuse, "function")
assert.strictEqual(typeof c1.help, "function")
assert.strictEqual(typeof c1.clone, "function")
assert.strictEqual(typeof c1.freeze, "function")
assert.strictEqual(typeof c1.save, "function")

c1.save({
  "Gold": "1st save-test value",
  "Silver": "2nd save-test value",
  "Bronze": "3rd save-test value",
}).save({
  "Podium": c1.fuse("Gold Silver Bronze"),
  "Odd": c1.fuse("Gold Bronze"),
}).save({
  "TallPodium": c1.bond("Podium px2 py4"),
  "WidePodium": c1.bond("Podium px4 py2"),
  "Tied1233": c1.bond("Gold Silver tie tie"),
})

assert.strictEqual(c1.has(""), false)
assert.strictEqual(c1.has("Coal"), false)
assert.strictEqual(c1.has("Gold"), true)
assert.strictEqual(c1.has(" Gold "), false)

assert.throws(() => c1.fuse("Gold m1"))
assert.strictEqual(c1.fuse(""), "")
assert.strictEqual(c1.fuse("Gold"), "1st save-test value")
assert.strictEqual(c1.fuse("Podium"), "1st save-test value 2nd 3rd")
assert.strictEqual(c1.fuse("Tied1233"), "1st save-test value 2nd tie")

assert.strictEqual(c1.freeze(), c1)
assert.ok(c1.clone() instanceof cader)
assert.strictEqual(c1.clone().fuse("Gold"), c1.fuse("Gold"))
assert.strictEqual(c1.clone().fuse("Podium"), c1.fuse("Podium"))

assert.throws(() => c5.pair(c6))
assert.strictEqual(c5.pair(c7).fuse("A"), c5.fuse("A"))
assert.strictEqual(c5.pair(c7).fuse("B"), c7.fuse("B"))
assert.deepEqual(
  c5.pair(c7).pair(c8).port(),
  Object.assign(c5.port(), c7.port(), c8.port())
)

c2.save({
  "Gold": "1st save-test value",
  "Silver": "2nd save-test value",
  "Bronze": "3rd save-test value",
}).save({
  "Podium": c2.fuse("Gold Silver Bronze"),
  "Odd": c2.fuse("Gold Bronze"),
}).save({
  "TallPodium": c2.bond("Podium px2 py4"),
  "WidePodium": c2.bond("Podium px4 py2"),
})

assert.deepEqual((new cader).port(), {})
assert.deepEqual((new cader).save(batch).port(), batch)

// Demo help
c1.help()

console.log("Tests passed =)")
