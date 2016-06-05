## Imlazy.js
`imlazy.js` is a lightweight vanilla js plugin to lazy load responsive images.

## Usage
imlazy.js has no dependencies, so all you'll have to do is include `.js` file and you'll be ready to go.

1. Download `imlazy.pkgd.js`  or `imlazy.pkgd.min.js`.
2. Add imlazy `.js` file to your site.
`<script src="/path/to/imlazy.pkgd.min.js"></script>`
3. Alter your `img` or ***any other*** tags, e.g. `div`. URL of the images with the breakpoints must be put into `data-imlazy` attribute. Options set in HTML must be valid **JSON**. Keys need to be quoted, for example `"600":`. Add specific class to your tags, this way you'll be able to easily control which images will be lazyloaded.
4. ***Optional:*** Add a placeholder image in the `src` attribute - to display something while the original image loads.
5. Initialise imlazy. The `Imlazy()` constructor accepts one argument: the class selector.
```
window.addEventListener('load', function() {
  new Imlazy('.js-imlazy');
}, false);
```

## Examples
`img` tag example:
```
<img src="placeholder.jpg" class="js-imlazy" data-imlazy='{ "0": "images/100x100.png", "600": "images/600x600.png", "900": "images/900x900.png" }' />
```
`div` tag example:
```
<div class="js-imlazy" data-imlazy='{ "0": "images/100x100.png", "600": "images/600x600.png" }'></div>
```

If you would like to add a polyfill for users without enabled JavaScript, simply include the original image inside a `<noscript>` tag:
```
<noscript>
  <img src="myimage.jpg" />
</noscript>
```

## Contributors
Feel free to contribute in any way you can whether that be reporting issues, making suggestions or sending PRs.

## License
MIT License (MIT).
