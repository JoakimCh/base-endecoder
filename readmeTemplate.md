# base-endecoder

### Description
An [ES module](https://flaviocopes.com/es-modules/) providing functions for converting (encoding and decoding) numbers and data to/from any base (input any charset). Works in Node.js, Deno and the browser. Includes functions for base32, base64 and base64url.

But for base64 endecoding your target platform should have a native sollution e.g. the browser's `atob` and `btoa` functions or Node.js's `Buffer.from(bytes).toString('base64')` and `Buffer.from(base64, 'base64')` which will provide much higher performance than these pure JavaScript functions. Especially when working with huge amounts of data, but for shorter strings etc. it doesn't matter much.

Hence I named the pure JavaScript base64 functions `encode_base64_slow` and `decode_base64_slow` to make this pretty clear. But I've also implemented the faster versions which is using the native base64 functions for each platform.

### Example

```js
import * as baseEndecoder from 'base-endecoder'
const log = console.log

function textToData(text) {return new TextEncoder().encode(text)}
function dataToText(data) {return new TextDecoder().decode(data)}

const strangeBase = 'ÆØÅX'
const strangeNumber = baseEndecoder.xFromBase10(123456, strangeBase)
log(strangeNumber)
log(baseEndecoder.xToBase10(strangeNumber, strangeBase))

const strangeDataString = baseEndecoder.encode_baseX(textToData('Hello strange world!'), strangeBase)
log(strangeDataString)
log(dataToText(baseEndecoder.decode_baseX(strangeDataString, strangeBase)))
```
#### Console output from example:
```
ØXÅÆÅØÆÆÆ
123456
ØÆÅÆØÅØØØÅXÆØÅXÆØÅXXÆÅÆÆØXÆXØXØÆØXÆÅØÅÆØØÅXÅØÅØXØÅØØÆÅÆÆØXØXØÅXXØXÆÅØÅXÆØÅØÆÆÅÆØ
Hello strange world!
```

### Supported platforms

* [Node.js](https://nodejs.org)
* [Deno](https://deno.land)
* A proper browser ([Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) based usually) or just [Babel](https://babeljs.io) the shit out of it if you need legacy support.

### How to use

#### Install using [NPM](https://www.npmjs.com/)

```shell
npm i base-endecoder
```

#### Import the ES module into Node.js

```js
import * as baseEndecoder from 'base-endecoder'
```
Got problems using ES modules? [Click here](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js/56350495#56350495) or [read this](https://nodejs.org/api/esm.html).

#### Import the ES module into the browser or Deno

You use the same syntax as above, but for that to work you need to use [import maps](https://github.com/WICG/import-maps#readme).

See [the provided example](https://github.com/JoakimCh/base-endecoder/tree/main/examples/example_1) for a demonstration on how to get it running on all platforms.

### Funding

If you find this useful then please consider helping me out (I'm jobless and sick). For more information visit my [GitHub sponsors page](https://github.com/sponsors/JoakimCh), my [profile](https://github.com/JoakimCh) or my [simple website](https://joakimch.github.io/funding.html).

# Auto-generated API documentation (from JSDoc)

{{>main}}

### End of readme

To get back up [click here](#base-endecoder) (only works on GitHub?) or find your own way.
