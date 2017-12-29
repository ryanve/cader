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

function save(hash, incoming) {
  var copied = copy(incoming)
  Object.keys(copied).forEach(function(key) {
    var value = copied[key]
    value = sure(value)
    value = format(value)
    set(hash, key, value)
  })
}

function read(hash, key) {
  var value = hash[key]
  if (value === vacant) throw new Error("Unsaved atom: " + key)
  return value
}

function has(hash, key) {
  return hash[key] !== vacant
}

function freeze(hash) {
  return Object.freeze(hash)
}

function clone(hash) {
  return (new cader).save(hash)
}

function sure(value) {
  if (typeof value != "string") throw new TypeError("Values must be strings")
  return value
}

function set(hash, key, value) {
  if (ssv.count(key) !== 1) throw new Error("Key must be a single token")
  if (has(hash, key)) throw new Error("Already set: " + key)
  if (Object.isFrozen(hash)) throw new Error("Frozen. Consider: .clone()")
  defineEnum(hash, key, sure(value))
}

function fuse(trons, cb) {
  var atom = ""
  var l = trons.length
  var i = 0
  while (i < l) atom += " " + cb(trons[i++])
  return format(atom)
}

function bond(hash, atoms) {
  return fuse(ssv.split(atoms), function(tron) {
    return read(hash, tron)
  })
}

defineEnum(model, "bond", result(bond))
defineEnum(model, "clone", result(clone))
defineEnum(model, "freeze", chain(freeze))
defineEnum(model, "has", result(has))
defineEnum(model, "save", chain(save))

Object.seal(model);
module.exports = Object.seal(cader);
