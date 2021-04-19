
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
