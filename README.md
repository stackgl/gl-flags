# gl-flags

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Easily change and access your WebGL flags set by `gl.enable`/`gl.disable` with
minimised overhead. This package transparently adds a caching layer to these
functions, providing a more convenient API, smoothly interoperating with
other libraries unaware of `gl-flags`, and only requiring to read from the GPU
once for each parameter on creation.

## Usage

[![NPM](https://nodei.co/npm/gl-flags.png)](https://nodei.co/npm/gl-flags/)

### `flags = glFlags(gl)`

Creates a new `flags` instance attached to `gl`, which is a
`WebGLRenderingContext`.

### `flags.FLAG_NAME`

Returns a boolean value reflecting whether `gl.FLAG_NAME` is enabled or not.
For example, the following:

``` javascript
var flags = require('gl-flags')(gl)

flags.BLEND = true
flags.CULL_FACE = true
```

Is equivalent to this:

``` javascript
gl.enable(gl.BLEND)
gl.disable(gl.CULL_FACE)
```

You can access each property without needing to hit the GPU either, so you can
easily toggle flags temporarily without effecting global state like so:

``` javascript
var previousBlend = flags.BLEND

flags.BLEND = true
// drawing API
flags.BLEND = previousBlend
```

Parameters are only changed if their state has changed.

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/gl-flags/blob/master/LICENSE.md) for details.
