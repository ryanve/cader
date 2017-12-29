var vacant
var ssv = require("ssv")
var format = ssv.uniq
var model = cader.prototype

function defineSkip(object, key, value) {
  Object.defineProperty(object, key, {
    value: value
  })
}

function defineEnum(object, key, value) {
  Object.defineProperty(object, key, {
    enumerable: true,
    value: value
  })
}

function cader() {
  var cade = this instanceof cader ? this : new cader
  var hash = Object.create(null)
  defineSkip(cade, "hash", hash)
  return cade
}

function result(fn) {
  return function(solo) {
    return fn(this.hash, solo)
  }
}

function chain(fn) {
  return function(solo) {
    fn(this.hash, solo)
    return this
  }
}

function copy(object) {
  if (object === vacant) throw new Error("Won't serialize: " + object)
  var serial = JSON.stringify(object)
  if (serial === vacant) throw new Error("Couldn't serialize: " + object)
  return JSON.parse(serial)
}

function raw(hash, incoming) {
  var copied = copy(incoming)
  Object.keys(copied).forEach(function(key) {
    var value = copied[key]
    value = sure(value)
    value = format(value)
    set(hash, key, value)
  })
}

function mix(hash, incoming) {
  var copied = copy(incoming)
  Object.keys(copied).forEach(function(key) {
    var value = copied[key]
    value = sure(value)
    value = bond(hash, value)
    set(hash, key, value)
  })
}

function or(hash, key, fallback) {
  var value = hash[key]
  if (value === vacant) return sure(fallback)
  return value
}

function has(hash, key) {
  return hash[key] !== vacant
}

function freeze(hash) {
  return Object.freeze(hash)
}

function clone(hash) {
  return (new cader).raw(hash)
}

function sure(value) {
  if (typeof value != "string") throw new TypeError("Values must be strings")
  return value
}

function set(hash, key, value) {
  if (ssv.split(key).length !== 1) throw new Error("Key must be a single token")
  if (has(hash, key)) throw new Error("Already set: " + key)
  if (Object.isFrozen(hash)) throw new Error("Frozen. Consider: .clone()")
  defineEnum(hash, key, sure(value))
}

function fuse(comps, cb) {
  var atoms = ""
  var l = comps.length
  var i = 0
  while (i < l) atoms += " " + cb(comps[i++])
  return format(atoms)
}

function bond(hash, composition) {
  return fuse(ssv.split(composition), function(key) {
    return or(hash, key, key)
  })
}

defineEnum(model, "bond", result(bond))
defineEnum(model, "clone", result(clone))
defineEnum(model, "freeze", chain(freeze))
defineEnum(model, "has", result(has))
defineEnum(model, "mix", chain(mix))
defineEnum(model, "raw", chain(raw))

Object.seal(model);
module.exports = Object.seal(cader);
