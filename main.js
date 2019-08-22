// Create constant containing an array of arrays. These arrays will represent
// the characters necessary for translating a number into the scannable
// representation. Since the account numbers can be in the range of
// 0 - 9, we actually need to be able to translate 10 digits, not 9.
const numberTranslation = [
  [' _ ','   ',' _ ',' _ ','   ',' _ ',' _ ',' _ ',' _ ',' _ '],
  ['| |',' | ',' _|',' _|','|_|','|_ ','|_ ','  |','|_|','|_|'],
  ['|_|',' | ','|_ ',' _|','  |',' _|','|_|','  |','|_|',' _|'],
  ['   ','   ','   ','   ','   ','   ','   ','   ','   ','   ']
];

const illegalCharactersRegex = /\D/g;

let accountNumberTranslation = [
  [],
  [],
  [],
  []
];

// ####### Story 1 Scan account number and digest
// recursive function. i = 0..8 or 9 digit account number length.
// each loop through the function will increment the iterator by 1.
function accountNumberScan(accountNumber, i=0) {
  if (i < 9) {
    // this should create an array of stringified numbers based on the account number.
    // split the account number into an array of numbers.
    let account_number_digest = splitAccountNumber(accountNumber);
    // numberTranslation has 4 objects. Do this 4 times.
    numberTranslation.forEach(function(translation, index) {
      // send the account number at position[i], the index of our loop,
      // and the position of i to the digestNumber function.
      digestNumber(account_number_digest[i], index, i);
      // iterate the i counter by 1.
      i++;
      // call the function recursively.
      accountNumberScan(accountNumber, i);
    });
  } else {
    // when the iterator hits 9, return the translated account number
    return accountNumberTranslation;
  }
  return;
}

// function to take each number of an account number and digest it into
// the represented string for translation.
function digestNumber(number, level, position) {
  console.dir(number);
  console.dir(level);
  console.dir(position);
  console.dir(numberTranslation);
  console.dir(accountNumberTranslation);
  // initialize the iterator.
  let i;
  // until the iterator is equal to the length of the numberTranslation (4 - 1) array
  // loop through and set the values respectively.
  for(i = 0; i < numberTranslation.length - 1; i++) {
    // set the value of the accountNumberTranslation to the respective value.
    // position = (0..8), i = (0..3), level = depth of array (0..3)
    // number - 1 = position of the numberTranslation array
    accountNumberTranslation[position][i] = numberTranslation[level][number - 1];
  }
  return;
}

// ####### Story 2 Validate and Checksum && Story 3 Print out results
// ******* Limitation to this program: Cannot have account numbers with leading 0's *******
function validateAccountNumber(accountNumber) {
  if(accountNumber.match(illegalCharactersRegex)) {
    return String(accountNumber + " ILL");
  } else {
    let accountNumberArray = splitAccountNumber(accountNumber);
    let accountNumberValid = false;
    accountNumberValid = checkSumAccountNumber(accountNumberArray);
    if(accountNumberValid) {
      return accountNumber;
    } else {
      // return String(accountNumber + " ERR"); // I've commented this out so we can move on to Story 4
      analyzeAccountError(accountNumberArray);
    }
  }
}

function splitAccountNumber(accountNumber) {
  // take the number, split it as a string, parse each number and map them into a new array.
  let numberArray = (accountNumber).toString(10).split("").map(function(num){ return parseInt(num) });
  // return the new array of numbers.
  return numberArray;
}

function checkSumAccounNumber(acct) {
  let acctLen = acct.length - 1;
  checksum = ((acct[acctLen] * 3) + (acct[acctLen - 1] * 7) + (acct[acctLen - 2] * 1) + (acct[acctLen - 3] * 3) + (acct[acctLen - 4] * 7) + (acct[acctLen - 5] * 1) + (acct[acctLen - 6] * 3) + (acct[acctLen - 7] * 7) + (acct[acctLen - 8] * 1))%11 == 0;
  return checksum;
}

// ####### Story 4 Check if error account numbers were improperly scanned

// if account number returned an error, it means the checkSum failed
// Need to check each 1, 5, 9, or 0 to see if they should actually be
// a 7, [6,9], 8, 8. Find the first instance of 1 and change it to a 7,
// then run the checksum again. If it doesn't return true, rinse and repeat.

function analyzeAccountError(accountNumberArray, i = 0) {
  if (i <= 3) {
    // list out all possible matches
    let possibleMatches = [1, 5, 9, 0];
    // set the accountNumberArray aside for mutation
    let acctNumArray = accountNumberArray;
    let r = null;
    // loop through the acctNumArray and compare each number to each the possibleMatches[i]
    for (r = 0; r < (acctNumArray.length - 1); r++) {
      // if we have a match, run the checkSum against the mutated array
      if (acctNumArray[r] == possibleMatches[i]) {
        acctNumArray[r] = possibleMatches[i];
        if (checkSumAccounNumber(acctNumArray)) {
          // if checkSum is true, return the mutated account number
          return acctNumArray.join();
        }
      }
    }
    // if the botched account number doesn't contain possibleMatches[i], iterate and check the next possbile match.
    i++;
    // call the function recursively
    analyzeAccountError(accountNumberArray, i);
  } else {
    // if there were no matches, just return the original account number with ERR
    return String(accountNumberArray.join() + " ERR");
  }

}
