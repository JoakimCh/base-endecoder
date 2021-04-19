
import {encode_base32, decode_base32} from '../source/baseEndecoder.js'
import {assert} from './shared.js'
import {randomFillSync} from 'crypto'

const data = randomFillSync(new Uint8Array(100_000))
const base32 = encode_base32(data, true)
const iterations = 100
console.time('encode')
for (let i=0; i<iterations; i++) {
  assert(base32, encode_base32(data, true))
}
console.timeEnd('encode')
console.time('decode')
for (let i=0; i<iterations; i++) {
  assert(Buffer.compare(data, decode_base32(base32)), 0)
}
console.timeEnd('decode')
