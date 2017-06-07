# Quick start

## Download
**Download**

[imlazy.pkgd.js](https://unpkg.com/imlazy.js@2)

**CDN**

```html
<script src="https://unpkg.com/imlazy.js@2"></script>
```

**Package managers**

```bash
// npm
npm install imlazy.js --save

// yarn
yarn add imlazy.js
```

## Include JavaScript file

```html
<script src="/path/to/imlazy.pkgd.js"></script>
```

## Initialise plugin

```js
window.addEventListener('load', function() {
  var imlzy = new Imlazy();
}, false);
```

## Alter your HTML code
Imlazy needs to be told what images to lazyload in first place, to do so, add `data-imlazy` data attribute to your element.

**image** element

```html
<img src="placeholder.gif" data-imlazy='{ "0": "image-a.jpg", "450": "image-b.jpg", "900": "image-c.jpg" }' />
```
> **Note:** Will be set in `src` attribute.

**HTML** element
```html
<div data-imlazy='{ "0": "image-a.jpg", "600": "image-b.png" }'></div>
```
> **Note:** Will be set as `background-image` property.
