!function(e){function __webpack_require__(i){if(t[i])return t[i].exports;var n=t[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,__webpack_require__),n.loaded=!0,n.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.p="/bin/",__webpack_require__(0)}([function(e,t,i){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&defineProperties(e.prototype,t),i&&defineProperties(e,i),e}}();i(1);var o=0,a={},r=function(){function Imlazy(e){_classCallCheck(this,Imlazy),this.config=Object.assign({offset:document.documentElement.clientHeight,retina:!1},e),this.events={},this.guid=o++,a[this.guid]=this,this.onChange=this.debounce(this.onChange,100),this.addEventListeners(),this.fetch()}return n(Imlazy,[{key:"fetch",value:function(){var e=this;this.windowWidth=document.documentElement.clientWidth,this.windowHeight=document.documentElement.clientHeight,this.imageList=document.querySelectorAll("[data-imlazy]"),[].forEach.call(this.imageList,function(t){t.imlazyGUID=e.guid,e.isElementVisible(t)&&e.load(t)})}},{key:"addEventListeners",value:function(){window.addEventListener("resize",this.onChange),window.addEventListener("scroll",this.onChange),document.body.addEventListener("scroll",this.onChange)}},{key:"onChange",value:function(){var e=this;this.windowWidth=document.documentElement.clientWidth,this.windowHeight=document.documentElement.clientHeight,[].forEach.call(this.imageList,function(t){e.isElementVisible(t)&&e.load(t)})}},{key:"load",value:function(e){var t=this,i=e.getAttribute("data-imlazy"),n=void 0;try{n=JSON.parse(i)}catch(e){return void console.error("[imlazy] JSON.parse: %s",e)}var o=void 0;for(var a in n){var r=parseInt(a,10);r<=this.windowWidth&&(o=r)}var s=n[o];if(this.config.retina&&this.isHighDensity()){var l=this.getDevicePixelRation();l=Math.round(l),1!==l&&(s=l>this.config.retina&&"boolean"!=typeof this.config.retina?this.setRetinaSuffix(s,this.config.retina):this.setRetinaSuffix(s,l))}if(e instanceof HTMLImageElement){if(e.getAttribute("src")===s)return;e.setAttribute("src",s),e.onload=function(i){e.classList.add("is-loaded"),t.dispatchEvent("loaded",[i,e])},e.onerror=function(i){console.error("[imlazy] A resource failed to load: %s",s),t.dispatchEvent("loaded",[i,e])}}else{if(e.style.backgroundImage.slice(4,-1).replace(/"/g,"")===s)return;var c=new Image;c.setAttribute("src",s),e.style.backgroundImage="url("+s+")",c.onload=function(i){e.classList.add("is-loaded"),t.dispatchEvent("loaded",[null,e])},c.onerror=function(i){console.error("[imlazy] A resource failed to load: %s",s),t.dispatchEvent("loaded",[null,e])}}}},{key:"setRetinaSuffix",value:function(e,t){return e.substring(0,e.lastIndexOf("."))+"@"+t+"x"+e.substring(e.lastIndexOf("."))}},{key:"isHighDensity",value:function(){if(window.matchMedia){var e=window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");return e&&e.matches||window.devicePixelRatio>1}return!1}},{key:"isElementVisible",value:function(e){var t=e.getBoundingClientRect().top,i=e.getBoundingClientRect().bottom;return this.config.offset?i>0-this.config.offset&&t<this.windowHeight+this.config.offset:i>0&&t<this.windowHeight}},{key:"getDevicePixelRation",value:function(){return window.devicePixelRatio||(window.devicePixelRatio=1),window.devicePixelRatio}},{key:"on",value:function(e,t){this.events.hasOwnProperty(e)?this.events[e].push(t):this.events[e]=[t]}},{key:"off",value:function(e,t){if(this.events.hasOwnProperty(e)){var i=this.events[e].indexOf(t);i!==-1&&this.events[e].splice(i,1)}}},{key:"dispatchEvent",value:function(e,t){if(this.events.hasOwnProperty(e)){t&&t.length||(t=[]);for(var i=this.events[e],n=0,o=i.length;n<o;n++)i[n].apply(null,t)}}},{key:"imagesLoaded",value:function(e,t){var i=0;this.on("loaded",function(n,o){[].forEach.call(e,function(n){n===o&&(i++,e.length===i&&(t.apply(null,[e]),i=0))})})}},{key:"debounce",value:function(e,t,i){var n=arguments,o=this,a=void 0;return function(){var r=n,s=i&&!a;clearTimeout(a),a=setTimeout(function(){a=null,i||e.apply(o,r)},t),s&&e.apply(o,r)}}}]),Imlazy}();r.data=function(e){if(null!==e){var t=e.imlazyGUID;return a[t]}console.error("[imlazy] could not get Imlazy instance from %s",e)},window.Imlazy=r,t.default=r},function(e,t){"use strict";"assign"in Object||(Object.assign=function(e,t){for(var i,n,o=1;o<arguments.length;++o){n=arguments[o];for(i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e})}]);
//# sourceMappingURL=imlazy.pkgd.js.map