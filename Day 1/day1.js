
const fs = require('fs');

const file = 'input.txt';

try {
  const file_content = fs.readFileSync(file, 'utf-8');

  const lines = file_content.split('\n');

  var total_calibration_value = 0

  lines.forEach(function (line) {
    var first_digit
    var found_first_digit = false
    var last_digit
    var found_last_digit = false

    for (i = 0; i < line.length && (!found_first_digit || !found_last_digit); i++) {
      if (!found_first_digit) {
        char1 = line[i]
        if (char1 >= '0' && char1 <= '9') {
          first_digit = char1
          found_first_digit = true
        }
      }

      if (!found_last_digit) {
        char2 = line[line.length - i - 1]
        if (char2 >= '0' && char2 <= '9') {
          last_digit = char2
          found_last_digit = true
        }
      }

      if (found_first_digit && found_last_digit) {
        total_calibration_value += Number(first_digit + last_digit)
      }
    }
  });

  console.log(total_calibration_value)
} catch (error) {
  console.error('Error reading file:', error);
}
