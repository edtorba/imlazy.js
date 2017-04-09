## imlazy.js
A lightweight vanilla JS plugin that lazyloads images and background images.

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version](https://img.shields.io/github/release/edtorba/imlazy.js.svg?style=flat-square)](https://github.com/edtorba/imlazy.js/releases)

## Browser support
IE10+, Edge, Chrome, FireFox, Opera, Safari

## Getting started

### 1. Download.
**Download**

[imlazy.pkgd.js](https://unpkg.com/imlazy.js@2/src/bin/imlazy.pkgd.js)

**CDN**

```html
<script src="https://unpkg.com/imlazy.js@2/src/bin/imlazy.pkgd.js"></script>
```

**Package managers**

```js
npm install imlazy.js --save
```

OR

```js
yarn add imlazy.js
```

### 2. Include javascript file.

```html
<script src="/path/to/imlazy.pkgd.js"></script>
```

### 3. Initialise plugin.

```js
window.addEventListener('load', function() {
  var imlzy = new Imlazy({
    offset: {integer} // Optional, default: document.documentElement.clientHeight
    retina: {boolean/integer} // Optional, default: false
  });
}, false);
```

### 4. Alter your HTML code.
Imlazy needs to be told what images to lazyload in first place, to do so simply add `data-imlazy` data attribute to your element.

**image**

```html
<img src="{placeholder}" data-imlazy='{ "0": "IMAGE_PATH.jpg", "YOUR_BREAKPOINT": "IMAGE_PATH.jpg", "900": "IMAGE_PATH.JPG" }' />
```

**HTML Element**
```html
<div data-imlazy='{ "0": "IMAGE_PATH.jpg", "YOUR_BREAKPOINT": "IMAGE_PATH.png" }'></div>
```

## Options

### Retina
Highest screen density you're willing to support. Plugin checks screen density, and based on results decides what suffix to add.

```js
retina: true
```
```js
retina: {integer}
```

### Offset
The distance in pixels out of the viewport, before which to start loading the images.

```js
offset: document.documentElement.clientHeight | 1000
```

## Events

### Loaded
Triggered after an image has been loaded.

```js
imlzy.on('loaded', function(evt, target) {
 console.log('Event: ', evt);
 console.log('Target: ', target);
});
```

**Note:** On all elements apart from `img`, event is returned as `null`.

**Add event listener**
```js
imlzy.on('loaded', callback);
```

**Remove event listener**
```js
imlzy.off('loaded', callback);
```

## API

### Fetch
Get imlazy DOM nodes, and lazyload images. Useful when images where dynamically added to document body.

```js
imlzy.fetch();
```

### Data
Get imlazy instance via it's element, usefull to access imlazy properties.

```js
var myImage = document.querySelector('.selector'),
imlzy = Imlazy.data(myImage);
```

Or

```js
imlzy = Imlazy.data('.selector');
```

### imagesLoaded
Detect when specific images have been loaded.

```js
var myList = document.querySelectorAll('.selector');

imlzy.imagesLoaded(myList, function(nodeList) {
  console.log('My images loaded ', nodeList);
});
```

Or

```js
imlzy.imagesLoaded('.selector', function(nodeList) {
  console.log('My images loaded ', nodeList);
});
```

## License
[Here](LICENSE.md)

## Changelog
[Here](CHANGELOG.md)

## Contributors
Feel free to contribute in any way you can whether that be reporting issues, making suggestions or sending PRs.

## Credits
[edtorba](https://github.com/edtorba)
