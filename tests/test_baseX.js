
import {encode_baseX, decode_baseX, xFromBase10, xToBase10} from '../source/baseEndecoder.js'
import {assert} from './shared.js'

function textToData(text) {
  return new TextEncoder().encode(text)
}
function dataToText(data) {
  return new TextDecoder().decode(data)
}

const someUsableCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"#¤%&/()=?`,.:-_<>|'
assert(someUsableCharacters.length, [...someUsableCharacters].length)

for (let i=2; i<someUsableCharacters.length; i++) {
  const charset = someUsableCharacters.slice(0,i)
  const num = 10000 + i*someUsableCharacters.length*i
  const x = xFromBase10(num, charset)
  const n = xToBase10(x, charset)
  assert(num, n)
  // console.log(i, x, n)
  if (Math.log2(charset.length) % 1 == 0) { // if "power of two"
    const text = 'Hello wonderful base'+i+' world!'
    const baseX = encode_baseX(textToData(text), charset)
    const decoded = dataToText(decode_baseX(baseX, charset))
    assert(text, decoded)
    // console.log(decoded, baseX)
  }
}
