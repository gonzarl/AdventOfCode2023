const fs = require('fs');

function getDigitFromWord(word) {
  const wordToNumber = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  };

  for (const digitWord in wordToNumber) {
    if (wordToNumber.hasOwnProperty(digitWord) && word.includes(digitWord)) {
      return wordToNumber[digitWord];
    }
  }

  return 'not_found';
}

function processLine(line) {
  let firstDigit;
  let foundFirstDigit = false;
  let lastDigit;
  let currentWord = '';

  for (const char of line) {
    if (!foundFirstDigit) {
      if (char >= '0' && char <= '9') {
        currentWord = '';
        firstDigit = char;
        lastDigit = char;
        foundFirstDigit = true;
      } else {
        currentWord += char;
        const digit = getDigitFromWord(currentWord);
        if (digit !== 'not_found') {
          foundFirstDigit = true;
          firstDigit = digit;
          lastDigit = digit;
          currentWord = currentWord.slice(-1);
        }
      }
    } else {
      if (char >= '0' && char <= '9') {
        currentWord = '';
        lastDigit = char;
      } else {
        currentWord += char;
        const digit = getDigitFromWord(currentWord);
        if (digit !== 'not_found') {
          lastDigit = digit;
          currentWord = currentWord.slice(-1);
        }
      }
    }
  }

  return [Number(firstDigit), Number(lastDigit)];
}

const file = 'input.txt';

try {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const lines = fileContent.split('\n');

  let totalCalibrationValue = 0;

  lines.forEach(function (line) {
    const [firstDigit, lastDigit] = processLine(line);
    totalCalibrationValue += firstDigit * 10 + lastDigit;
  });

  console.log(totalCalibrationValue);
} catch (error) {
  console.error('Error reading or processing file:', error.message);
}
