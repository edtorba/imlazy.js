# Events

## Loaded
Triggered after each image has been loaded.

```js
imlzy.on('loaded', function(evt, target) {
 console.log('Event: ', evt);
 console.log('Target: ', target);
});
```

> **Note:** `evt` is returned as `null` on all elements apart from `img`.

**Add event listener**
```js
imlzy.on('loaded', callback);
```

**Remove event listener**
```js
imlzy.off('loaded', callback);
```
