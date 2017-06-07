# Options

## Defaults
```js
offset: document.documentElement.clientHeight,
retina: false
```

## Retina
Highest screen density you're willing to support. Plugin checks screen density, and based on results decides what suffix to add.

```js
// Enabled retina
retina: true

// Disabled retina
retina: false

// Custom retina, up to @3x
retina: 3
```

## Offset
The distance in pixels out of the viewport, before which to start loading the images.

```js
// Fixed offset
offset: 1000

// Dynamic offset, based on document height
offset: document.documentElement.clientHeight

// Disabled offset, will load images on demand
offset: false
```
