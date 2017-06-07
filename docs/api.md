# API

## Fetch
Get imlazy nodes from document, and lazyload images. Useful when images where dynamically added to document body.

```js
imlzy.fetch();
```

## Data
Get imlazy instance via it's element, useful to access imlazy instance.

```html
<img class="selector" src="..." data-imlazy='{...}' />
```

```js
var myImage = document.querySelector('.selector'),
imlzy = Imlazy.data(myImage);
```

Or

```js
var imlzy = Imlazy.data('.selector');
```

## imagesLoaded
Detect when specific images have been loaded.

```html
<div class="selector">
  <img src="..." data-imlazy='{...}' />
  <img src="..." data-imlazy='{...}' />
  <img src="..." data-imlazy='{...}' />
  <img src="..." data-imlazy='{...}' />
</div>
<img src="..." data-imlazy='{...}' />
```

```js
var myList = document.querySelectorAll('.selector [data-imlazy]');

imlzy.imagesLoaded(myList, function(nodeList) {
  console.log('My images loaded ', nodeList);
});
```

Or

```js
imlzy.imagesLoaded('.selector [data-imlazy]', function(nodeList) {
  console.log('My images loaded ', nodeList);
});
```
