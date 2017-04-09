## Changelog
### `v2.0.2`
* Readme update.
* Added option to `data` method to provide either selector or node list.
* Added option to `imagesLoaded` method to provide either selector or node list.

### `v2.0.1`
* Readme update.

### `v2.0.0`
* Full rewrite in ES6.
* `preload` renamed to `offset`.
* `offset` default value changed to `document.documentElement.clientHeight` from `0`.
* `lazyload` event renamed to `loaded`.
* Added support for retina devices.
* Added `data` method, to get instance via it's element.
* Added `imagesLoaded` method, to detect when certain images have been loaded.
