
import {compareData} from 'whichever-data'
import {encode_base64_slow, decode_base64_slow} from '../source/baseEndecoder.js'
import {assert, nodejs} from './shared.js'
await (async function init() {
  if (nodejs && nodejs >= 'v15.0.0') {
    const {webcrypto} = await import('crypto')
    globalThis.crypto = webcrypto
  }
})() // the module loading waits until this has completed (top level async)

function textToData(text) {
  return new TextEncoder().encode(text)
}
function dataToText(data) {
  return new TextDecoder().decode(data)
}

const base64org = 'SSBob3BlIHRoaXMgd29ya3MhIFRvIG1ha2UgdGhpcyBzdHJpbmcgbG9uZyBJJ2xsIHdyaXRlIGEgYnVuY2ggb2Ygbm9uc2Vuc2UsIG5vbnNlbnNlLCBub25zZW5zZSwgbm9uc2Vuc2UuLi4='
const text = dataToText(decode_base64_slow(base64org))
assert(text, "I hope this works! To make this string long I'll write a bunch of nonsense, nonsense, nonsense, nonsense...")
const base64 = encode_base64_slow(textToData(text), true)
assert(base64, base64org)
if (nodejs) {
  // compare against Node.js's encoder/decoder
  for (let i=0; i<10_000; i++) {
    const numBytes = Math.floor(Math.random() * 100) + 1
    const bytes = crypto.getRandomValues(new Uint8Array(numBytes))
    const base64 = encode_base64_slow(bytes, true)
    assert(base64, Buffer.from(bytes).toString('base64'))
    assert(Buffer.compare(decode_base64_slow(base64), Buffer.from(base64, 'base64')), 0)
    // log(encode_base64_slow(bytes, true))
  }
} else {
  // try with random data
  for (let i=0; i<10_000; i++) {
    const numBytes = Math.floor(Math.random() * 100) + 1
    const orgData = crypto.getRandomValues(new Uint8Array(numBytes))
    const base64 = encode_base64_slow(orgData, true)
    const decodedData = decode_base64_slow(base64)
    assert(compareData(decodedData, orgData), true)
  }
}
