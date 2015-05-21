const test  = require('tape')
const Flags = require('./')

test('gl-flags', t => {
  const canvas = document.createElement('canvas')
  const gl     = canvas.getContext('webgl', { stencil: true })
  const flags  = Flags(gl)

  Object.keys(flags).forEach(function(name) {
    t.equal(flags[name], name === 'DITHER', `gl.${name} default value is correct`)

    t.equal(gl.getParameter(gl[name]), flags[name], `gl.${name} matches flag value`)

    flags[name] = true
    t.equal(true, flags[name], `flags.${name} is true`)
    t.equal(gl.getParameter(gl[name]), flags[name], `gl.${name} matches flag value`)

    flags[name] = false
    t.equal(false, flags[name], `flags.${name} is false`)
    t.equal(gl.getParameter(gl[name]), flags[name], `gl.${name} matches flag value`)

    flags[name] = true
    t.equal(true, flags[name], `flags.${name} is true`)
    t.equal(gl.getParameter(gl[name]), flags[name], `gl.${name} matches flag value`)

    gl.disable(gl[name])
    t.equal(false, flags[name], `flags.${name} is false after gl.disable(gl.${name})`)

    gl.enable(gl[name])
    t.equal(true, flags[name], `flags.${name} is false after gl.enable(gl.${name})`)
  })

  t.end()
})
