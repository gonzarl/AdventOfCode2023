
const fs = require('fs');

const file = 'input.txt';

try {
  const fileContent = fs.readFileSync(file, 'utf-8');

  const lines = fileContent.split('\n');

  let total = 0

  const colorLimits = {
    red: 12,
    green: 13,
    blue: 14,
  };

  function getGameId(inputString) {
    const patron = /Game (\d+): (.+)/;

    const match = inputString.match(patron);

    const gameId = parseInt(match[1], 10);
    const subsets = match[2];

    return { gameId, subsets };
  }

  function checkPossible(number, color) {
    return number <= colorLimits[color];
  }

  function checkSet(set) {
    set = set.trim();
    let isPossible = true
    const cubes = set.split(',')
    for (let cube of cubes) {
      cube = cube.trim()
      const [number, color] = cube.split(' ')
      const revision = checkPossible(number, color)
      if (!revision) {
        isPossible = false
        break
      }
    }
    return isPossible

  }

  lines.forEach(function (line) {
    const { gameId, subsets } = getGameId(line)

    const sets = subsets.split(';')
    let validGame = true

    for (const set of sets) {
      const validSet = checkSet(set)
      if (!validSet) {
        validGame = false
        break
      }
    }

    if (validGame) {
      total += gameId
    }

  })

  console.log(total)
} catch (error) {
  console.error('Error reading file:', error);
}
