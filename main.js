// Create constant containing an array of arrays. These arrays will represent
// the characters necessary for translating a number into the scannable
// representation. Since the account numbers can be in the range of
// 0 - 9, we actually need to be able to translate 10 digits, not 9.
const numberTranslation = [
  [' _ ','   ',' _ ',' _ ','   ',' _ ',' _ ',' _ ',' _ ',' _ '],
  ['| |',' | ',' _|',' _|','|_|','|_ ','|_ ','  |','|_|','|_|'],
  ['|_|',' | ','|_ ',' _|','  |',' _|','|_|','  |','|_|',' _|'],
  ['   ','   ','   ','   ','   ','   ','   ','   ','   ','   ']
]
