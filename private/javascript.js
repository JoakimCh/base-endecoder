
const charsetMap = { // better performance with xToBase10 (decoding)
  base32_rfc464: charsetToMap(charset.base32_rfc464),
  base64:        charsetToMap(charset.base64),
  base64_url:    charsetToMap(charset.base64_url),
}

export function charsetToMap(charset) {
  const charsetMap = new Map()
  for (let i=0; i<charset.length; i++) {
    charsetMap.set(charset[i], i)
  }
  return charsetMap
}

