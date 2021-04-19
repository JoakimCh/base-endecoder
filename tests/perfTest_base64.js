
import {
  encode_base64_slow, 
  decode_base64_slow, 
  encode_base64_fast, 
  decode_base64_fast} from '../source/baseEndecoder.js'
import {assert, nodejs} from './shared.js'
import {compareData} from 'whichever-data'
await (async function init() {
  if (nodejs && nodejs >= 'v15.0.0') {
    const {webcrypto} = await import('crypto')
    globalThis.crypto = webcrypto
  }
})() // the module loading waits until this has completed (top level async)

const data = crypto.getRandomValues(new Uint8Array(65536)) //randomFillSync(new Uint8Array(100_000))
const base64 = encode_base64_fast(data, true)
const iterations = 100

console.time('fast encode')
for (let i=0; i<iterations; i++) {
  assert(base64, encode_base64_fast(data, true))
}
console.timeEnd('fast encode')
console.time('fast decode')
for (let i=0; i<iterations; i++) {
  // please note that compareData slows this down
  assert(compareData(data, decode_base64_fast(base64)), true)
}
console.timeEnd('fast decode')
console.time('encode')
for (let i=0; i<iterations; i++) {
  assert(base64, encode_base64_slow(data, true))
}
console.timeEnd('encode')
console.time('decode')
for (let i=0; i<iterations; i++) {
  assert(compareData(data, decode_base64_slow(base64)), true)
}
console.timeEnd('decode')
