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
  if (!(this instanceof cader)) return new cader
  defineSkip(this, "hash", Object.create(null))
  return this
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


function port(object) {
  if (object === vacant) throw new Error("Won't serialize: " + object)
  var serial = JSON.stringify(object)
  if (serial === vacant) throw new Error("Couldn't serialize: " + object)
  return JSON.parse(serial)
}

function save(hash, incoming) {
  var fresh = port(incoming)
  Object.keys(fresh).forEach(function(key) {
    var value = fresh[key]
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

function skim(hash, key) {
  var value = hash[key]
  if (value === vacant) return key
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

function fusion(fission, cb) {
  var atom = ""
  var l = fission.length
  var i = 0
  while (i < l) atom += " " + cb(fission[i++])
  return format(atom)
}

function fuse(hash, atoms) {
  return fusion(ssv.split(atoms), function(tron) {
    return read(hash, tron)
  })
}

function bond(hash, atoms) {
  return fusion(ssv.split(atoms), function(tron) {
    return skim(hash, tron)
  })
}

defineEnum(model, "fuse", result(fuse))
defineEnum(model, "clone", result(clone))
defineEnum(model, "freeze", chain(freeze))
defineEnum(model, "bond", result(bond))
defineEnum(model, "has", result(has))
defineEnum(model, "port", result(port))
defineEnum(model, "save", chain(save))

Object.seal(model);
module.exports = Object.seal(cader);
