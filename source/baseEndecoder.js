/**
 * An ES module providing functions for converting (encoding and decoding) numbers and data to/from any base (input any charset). Works in Node.js, Deno and the browser. Includes functions for base32, base64 and base64url.
 * @module base-endecoder
 * @typicalname baseEndecoder
 */
/**
 * @typedef {ArrayBufferView} Buffer
 * @ignore
 * Node.js's Buffer (a subclass of JavaScript's Uint8Array).
 */
import {BitConsumer} from 'bit-consumer'
import {dataToTypedArray} from 'whichever-data'

const charset = {
  base32_rfc464: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  base64:        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  base64_url:    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
}

function pow2ceil(value) { // from: https://stackoverflow.com/a/35111029/4216153
  let p = 2
  while (value >>= 1) p <<= 1
  return p
}
function pow2floor(value) {
  return 1 << 31 - Math.clz32(value)
}

function errorNotPowerOfTwo(value) {
  return 'The base (charset.length) has to be a "power of two" for it to be convertible between a string of that base and any binary data.'+` You should instead decrease the charset length to ${pow2floor(value)} or increase it to ${pow2ceil(value)}.`
}

/**
 * Convert base X (as in any base) to base 10 (our number system).
 * @param {string} number Base X as a string using the supplied charset.
 * @param {string} charset The charset used by this base. E.g. "01" for base 2 (binary) or "0123456789ABCDEF" for base 16 (hex).
 * @returns {number} The number as base 10.
 */
export function xToBase10(number, charset) {
  if (typeof charset != 'string' || charset.length < 2)
    throw Error('Invalid charset for base conversion: '+charset)
  let base10 = 0
  for (let i=0; i<number.length; i++) {
    base10 += charset.indexOf(number[number.length-1 - i]) * Math.pow(charset.length, i)
  }
  return base10
}

/**
 * Convert a base 10 number (our number system) to base X (as in any base).
 * @param {number} number The number to convert.
 * @param {string} charset The charset defining the base to use. E.g. "01" for base 2 (binary).
 * @returns {string} The number as the base defined in the charset.
 */
export function xFromBase10(number, charset) {
  if (typeof charset != 'string' || charset.length < 2)
    throw Error('Invalid charset for base conversion: '+charset)
  const base = charset.length
  let result = '', val = number
  do {
    const res = Math.floor(val / base)
    const rem = val % base
    val = res
    result = charset[rem] + result
  } while (val > 0)
  return result
}

/**
 * Decodes a string of data in the base defined in the charset into binary data. This is only possible when the base is a power of two. An optional padding character can be supplied if used in the encoding of the string.
 * @param {string} string The string with data stored using this base's charset.
 * @param {string} charset The charset which defines the base to use.
 * @param {string} [paddingChar] An optional padding character to supply if the encoding scheme makes use of it.
 * @returns {Uint8Array} A Uint8Array array containing the data.
 */
export function decode_baseX(string, charset, paddingChar = undefined) {
  if (Math.log2(charset.length) % 1) throw Error(errorNotPowerOfTwo(charset.length))
  const bitsPerCharacter = Math.ceil(Math.log2(charset.length))
  const bc = new BitConsumer(8), result = []
  bc.onIntegerReady = value => result.push(value)
  for (const char of string) {
    if (char == paddingChar) break
    bc.consumeBitsFromInteger(xToBase10(char, charset), bitsPerCharacter)
  }
  return new Uint8Array(result)
}

/**
 * Encodes any binary data into a string of the base defined in the charset. This is only possible when the base is a power of two. An optional padding character can be applied to the output if the string length is not aligned to the supplied `groupSize`. 
 * @param {(ArrayBuffer|ArrayBufferView|Buffer|number[])} data The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes.
 * @param {string} charset The charset which defines the base to use.
 * @param {string} [paddingChar] An optional padding character.
 * @param {number} [groupSize] Use the padding character if the string length is not aligned to this value.
 * @returns {string} A string where the data is converted to this base.
 */
export function encode_baseX(data, charset, paddingChar = undefined, groupSize = undefined) {
  if (Math.log2(charset.length) % 1) throw Error(errorNotPowerOfTwo(charset.length))
  const bytes = dataToTypedArray(data, Uint8Array)
  const bitsPerCharacter = Math.ceil(Math.log2(charset.length))
  const bc = new BitConsumer(bitsPerCharacter)
  let result = ''
  bc.onIntegerReady = value => result += xFromBase10(value, charset)
  for (const byte of bytes) bc.consumeBitsFromInteger(byte, 8)
  const value = bc.integerFromRemains()
  if (value != null) result += xFromBase10(value, charset)
  if (paddingChar && groupSize) result += paddingChar.repeat((groupSize - result.length % groupSize) % groupSize)
  return result
}

/**
 * Encode data to base32 using the `encode_baseX` function in this module.
 * @param {(ArrayBuffer|ArrayBufferView|Buffer|number[])} data The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes.
 * @param {boolean} [padding=true] Whether to use the standard padding scheme or not.
 * @returns {string} base32.
 */
export function encode_base32(data, padding = true) {
  return encode_baseX(data, charset.base32_rfc464,
    ...padding ? ['=', 8] : []
  )
}
/**
 * Encode data to base64 using the `encode_baseX` function in this module. This is not recommended when it comes to performance since your platform have faster native functions for working with base64. Hence I also provide `encode_base64_fast` which uses the faster native function on your platform. This function is mostly provided as an example on how to use `encode_baseX` and also to be able to test it on base64 to see that it works as expected.
 * @param {(ArrayBuffer|ArrayBufferView|Buffer|number[])} data The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes.
 * @param {boolean} [padding=true] Whether to use padding or not, it's standard to use it.
 * @returns {string} base64.
 */
export function encode_base64_slow(data, padding = true) {
  return encode_baseX(data, charset.base64,
    ...padding ? ['=', 4] : []
  )
}
/**
 * Encode data to base64url using the `encode_baseX` function in this module.
 * @param {(ArrayBuffer|ArrayBufferView|Buffer|number[])} data The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes.
 * @param {boolean} [padding=true] Whether to use the standard padding scheme or not.
 * @returns {string} base64url.
 */
export function encode_base64url(data, padding = true) {
  return encode_baseX(data, charset.base64_url,
    ...padding ? ['=', 4] : []
  )
}

/**
 * Decode base32 to binary data using the `decode_baseX` function in this module.
 * @param {string} base32 The base32 string to decode.
 * @returns {Uint8Array} A Uint8Array array containing the data.
 */
export function decode_base32(base32) {
  return decode_baseX(base32, charset.base32_rfc464, '=')
}
/**
 * Decode base64 to binary data using the `decode_baseX` function in this module. This is not recommended when it comes to performance since your platform have faster native functions for working with base64. Hence I also provide `decode_base64_fast` which uses the faster native function on your platform. This function is mostly provided as an example on how to use `decode_baseX` and also to be able to test it on base64 to see that it works as expected.
 * @param {string} base64 The base64 string to decode.
 * @returns {Uint8Array} A Uint8Array array containing the data.
 */
export function decode_base64_slow(base64) {
  return decode_baseX(base64, charset.base64, '=')
}
/**
 * Decode base64url to binary data using the `decode_baseX` function in this module.
 * @param {string} base64url The base64url string to decode.
 * @returns {Uint8Array} A Uint8Array array containing the data.
 */
export function decode_base64url(base64url) {
  return decode_baseX(base64url, charset.base64_url, '=')
}

const nodejs = (globalThis.Buffer && globalThis.process) ? process.version : undefined

/** Encode data to base64 using the native function for that on your platform. In Deno and the browser this is `btoa`, in Node.js this is `Buffer.from(data).toString('base64')`. 
 * @param {(ArrayBuffer|ArrayBufferView|Buffer|number[])} data The data to convert, an ArrayBuffer, TypedArray, DataView, Node.js Buffer or an Array with unsigned bytes.
 * @returns {string} base64.
*/
export function encode_base64_fast(data) {
  if (nodejs) return Buffer.from(data).toString('base64')
  // see: https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
  data = dataToTypedArray(data, Uint8Array)
  const chunksize = 0xFFFF, binStringArr = new Array(Math.ceil(data.length/chunksize))
  for (let i=0; i*chunksize < data.length; i++) {
    binStringArr.push(String.fromCharCode.apply(null, data.subarray(i * chunksize, (i+1) * chunksize)))
  }
  return btoa(binStringArr.join(''))
}

/** Decode base64 to binary data using the native function for that on your platform. In Deno and the browser this is `atob`, in Node.js this is `Buffer.from(base64, 'base64')`.
 * @param {string} base64 The base64 string to decode.
 * @returns {Uint8Array} A Uint8Array array containing the data.
*/
export function decode_base64_fast(base64) {
  if (nodejs) return Buffer.from(base64, 'base64')
  return Uint8Array.from(atob(base64), char => char.charCodeAt(0))
  // hmm, I whish atob could be faster...
}
