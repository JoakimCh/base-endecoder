
import {compareData} from 'whichever-data'
import {encode_base32, decode_base32} from '../source/baseEndecoder.js'
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

const base32org = 'KRUGKIDROVUWG2ZAMJZG653OEBTG66BANJ2W24DTEBXXMZLSEB2GQZJANRQXU6JAMRXWOLQ='
const text = dataToText(decode_base32(base32org))
assert(text, "The quick brown fox jumps over the lazy dog.")
const base32 = encode_base32(textToData(text), true)
assert(base32, base32org)
// try with random data
for (let i=0; i<10_000; i++) {
  const numBytes = Math.floor(Math.random() * 100) + 1
  const orgData = crypto.getRandomValues(new Uint8Array(numBytes))
  const base32 = encode_base32(orgData, true)
  const decodedData = decode_base32(base32)
  assert(compareData(decodedData, orgData), true)
}
