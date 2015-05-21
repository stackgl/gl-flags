var Symbol = global.Symbol || require('es6-symbol')
var CACHE  = Symbol('gl-flags:cache')

module.exports = Flags

var minor = 1 // bump this value on increasing the minor or major versions
var flags = [
  'BLEND',
  'CULL_FACE',
  'DEPTH_TEST',
  'DITHER',
  'POLYGON_OFFSET_FILL',
  'SCISSOR_TEST',
  'STENCIL_TEST'
]

function Flags(gl) {
  var cache = gl[CACHE] = gl[CACHE] || {}
  if (cache[minor]) return cache[minor]

  var toggler  = cache[minor] = {}
  var _enable  = gl.enable
  var _disable = gl.disable
  var state    = {}
  var index    = {}

  for (var i = 0; i < flags.length; i++) (function(i) {
    var name = flags[i]
    var id   = gl[name]

    index[id]   = name
    var param   = gl.getParameter(id)
    state[name] = !!gl.getParameter(id)

    Object.defineProperty(toggler, name, {
      enumerable: true,
      get: function() { return !!state[name] },
      set: function(value) {
        if (value) {
          gl.enable(id)
        } else {
          gl.disable(id)
        }
      }
    })
  })(i)

  gl.enable = function(capabilityId) {
    var name = index[capabilityId]
    if (state[name]) return

    state[name] = true
    return _enable.call(this, capabilityId)
  }

  gl.disable = function(capabilityId) {
    var name = index[capabilityId]
    if (!state[name]) return

    state[name] = false
    return _disable.call(this, capabilityId)
  }

  return toggler
}
