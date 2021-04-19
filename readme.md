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

<a name="module_base-endecoder"></a>

## base-endecoder
An ES module providing functions for converting (encoding and decoding) numbers and data to/from any base (input any charset). Works in Node.js, Deno and the browser. Includes functions for base32, base64 and base64url.


* [base-endecoder](#module_base-endecoder)
    * [.xToBase10(number, charset)](#module_base-endecoder.xToBase10) ⇒ <code>number</code>
    * [.xFromBase10(number, charset)](#module_base-endecoder.xFromBase10) ⇒ <code>string</code>
    * [.decode_baseX(string, charset, [paddingChar])](#module_base-endecoder.decode_baseX) ⇒ <code>Uint8Array</code>
    * [.encode_baseX(data, charset, [paddingChar], [groupSize])](#module_base-endecoder.encode_baseX) ⇒ <code>string</code>
    * [.encode_base32(data, [padding])](#module_base-endecoder.encode_base32) ⇒ <code>string</code>
    * [.encode_base64_slow(data, [padding])](#module_base-endecoder.encode_base64_slow) ⇒ <code>string</code>
    * [.encode_base64url(data, [padding])](#module_base-endecoder.encode_base64url) ⇒ <code>string</code>
    * [.decode_base32(base32)](#module_base-endecoder.decode_base32) ⇒ <code>Uint8Array</code>
    * [.decode_base64_slow(base64)](#module_base-endecoder.decode_base64_slow) ⇒ <code>Uint8Array</code>
    * [.decode_base64url(base64url)](#module_base-endecoder.decode_base64url) ⇒ <code>Uint8Array</code>
    * [.encode_base64_fast(data)](#module_base-endecoder.encode_base64_fast) ⇒ <code>string</code>
    * [.decode_base64_fast(base64)](#module_base-endecoder.decode_base64_fast) ⇒ <code>Uint8Array</code>

<a name="module_base-endecoder.xToBase10"></a>

### baseEndecoder.xToBase10(number, charset) ⇒ <code>number</code>
Convert base X (as in any base) to base 10 (our number system).

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>number</code> - The number as base 10.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>string</code> | Base X as a string using the supplied charset. |
| charset | <code>string</code> | The charset used by this base. E.g. "01" for base 2 (binary) or "0123456789ABCDEF" for base 16 (hex). |

<a name="module_base-endecoder.xFromBase10"></a>

### baseEndecoder.xFromBase10(number, charset) ⇒ <code>string</code>
Convert a base 10 number (our number system) to base X (as in any base).

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>string</code> - The number as the base defined in the charset.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | The number to convert. |
| charset | <code>string</code> | The charset defining the base to use. E.g. "01" for base 2 (binary). |

<a name="module_base-endecoder.decode_baseX"></a>

### baseEndecoder.decode\_baseX(string, charset, [paddingChar]) ⇒ <code>Uint8Array</code>
Decodes a string of data in the base defined in the charset into binary data. This is only possible when the base is a power of two. An optional padding character can be supplied if used in the encoding of the string.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>Uint8Array</code> - A Uint8Array array containing the data.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string with data stored using this base's charset. |
| charset | <code>string</code> | The charset which defines the base to use. |
| [paddingChar] | <code>string</code> | An optional padding character to supply if the encoding scheme makes use of it. |

<a name="module_base-endecoder.encode_baseX"></a>

### baseEndecoder.encode\_baseX(data, charset, [paddingChar], [groupSize]) ⇒ <code>string</code>
Encodes any binary data into a string of the base defined in the charset. This is only possible when the base is a power of two. An optional padding character can be applied to the output if the string length is not aligned to the supplied `groupSize`.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>string</code> - A string where the data is converted to this base.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>ArrayBuffer</code> \| <code>ArrayBufferView</code> \| <code>Buffer</code> \| <code>Array.&lt;number&gt;</code> | The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes. |
| charset | <code>string</code> | The charset which defines the base to use. |
| [paddingChar] | <code>string</code> | An optional padding character. |
| [groupSize] | <code>number</code> | Use the padding character if the string length is not aligned to this value. |

<a name="module_base-endecoder.encode_base32"></a>

### baseEndecoder.encode\_base32(data, [padding]) ⇒ <code>string</code>
Encode data to base32 using the `encode_baseX` function in this module.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>string</code> - base32.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>ArrayBuffer</code> \| <code>ArrayBufferView</code> \| <code>Buffer</code> \| <code>Array.&lt;number&gt;</code> |  | The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes. |
| [padding] | <code>boolean</code> | <code>true</code> | Whether to use the standard padding scheme or not. |

<a name="module_base-endecoder.encode_base64_slow"></a>

### baseEndecoder.encode\_base64\_slow(data, [padding]) ⇒ <code>string</code>
Encode data to base64 using the `encode_baseX` function in this module. This is not recommended when it comes to performance since your platform have faster native functions for working with base64. Hence I also provide `encode_base64_fast` which uses the faster native function on your platform. This function is mostly provided as an example on how to use `encode_baseX` and also to be able to test it on base64 to see that it works as expected.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>string</code> - base64.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>ArrayBuffer</code> \| <code>ArrayBufferView</code> \| <code>Buffer</code> \| <code>Array.&lt;number&gt;</code> |  | The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes. |
| [padding] | <code>boolean</code> | <code>true</code> | Whether to use padding or not, it's standard to use it. |

<a name="module_base-endecoder.encode_base64url"></a>

### baseEndecoder.encode\_base64url(data, [padding]) ⇒ <code>string</code>
Encode data to base64url using the `encode_baseX` function in this module.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>string</code> - base64url.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>ArrayBuffer</code> \| <code>ArrayBufferView</code> \| <code>Buffer</code> \| <code>Array.&lt;number&gt;</code> |  | The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes. |
| [padding] | <code>boolean</code> | <code>true</code> | Whether to use the standard padding scheme or not. |

<a name="module_base-endecoder.decode_base32"></a>

### baseEndecoder.decode\_base32(base32) ⇒ <code>Uint8Array</code>
Decode base32 to binary data using the `decode_baseX` function in this module.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>Uint8Array</code> - A Uint8Array array containing the data.  

| Param | Type | Description |
| --- | --- | --- |
| base32 | <code>string</code> | The base32 string to decode. |

<a name="module_base-endecoder.decode_base64_slow"></a>

### baseEndecoder.decode\_base64\_slow(base64) ⇒ <code>Uint8Array</code>
Decode base64 to binary data using the `decode_baseX` function in this module. This is not recommended when it comes to performance since your platform have faster native functions for working with base64. Hence I also provide `decode_base64_fast` which uses the faster native function on your platform. This function is mostly provided as an example on how to use `decode_baseX` and also to be able to test it on base64 to see that it works as expected.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>Uint8Array</code> - A Uint8Array array containing the data.  

| Param | Type | Description |
| --- | --- | --- |
| base64 | <code>string</code> | The base64 string to decode. |

<a name="module_base-endecoder.decode_base64url"></a>

### baseEndecoder.decode\_base64url(base64url) ⇒ <code>Uint8Array</code>
Decode base64url to binary data using the `decode_baseX` function in this module.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>Uint8Array</code> - A Uint8Array array containing the data.  

| Param | Type | Description |
| --- | --- | --- |
| base64url | <code>string</code> | The base64url string to decode. |

<a name="module_base-endecoder.encode_base64_fast"></a>

### baseEndecoder.encode\_base64\_fast(data) ⇒ <code>string</code>
Encode data to base64 using the native function for that on your platform. In Deno and the browser this is `btoa`, in Node.js this is `Buffer.from(data).toString('base64')`.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>string</code> - base64.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>ArrayBuffer</code> \| <code>ArrayBufferView</code> \| <code>Buffer</code> \| <code>Array.&lt;number&gt;</code> | The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes. |

<a name="module_base-endecoder.decode_base64_fast"></a>

### baseEndecoder.decode\_base64\_fast(base64) ⇒ <code>Uint8Array</code>
Decode base64 to binary data using the native function for that on your platform. In Deno and the browser this is `atob`, in Node.js this is `Buffer.from(base64, 'base64')`.

**Kind**: static method of [<code>base-endecoder</code>](#module_base-endecoder)  
**Returns**: <code>Uint8Array</code> - A Uint8Array array containing the data.  

| Param | Type | Description |
| --- | --- | --- |
| base64 | <code>string</code> | The base64 string to decode. |


### End of readme

To get back up [click here](#base-endecoder) (only works on GitHub?) or find your own way.
