
const fs = require('fs');

const file = 'input.txt';

try {
  const fileContent = fs.readFileSync(file, 'utf-8');

  const lines = fileContent.split('\n');

  let total = 0

  function getGameId(inputString) {
    const patron = /Game (\d+): (.+)/;

    const match = inputString.match(patron);

    const gameId = parseInt(match[1], 10);
    const subsets = match[2];

    return { gameId, subsets };
  }

  function checkSet(set, minColors) {
    set = set.trim();

    const cubes = set.split(',')
    for (let cube of cubes) {
      cube = cube.trim()
      const [number, color] = cube.split(' ')
      const toNumber = Number(number)
      if (minColors[color] < toNumber)
        minColors[color] = toNumber

    }
    return minColors

  }

  lines.forEach(function (line) {
    const { gameId, subsets } = getGameId(line)

    let colors = {
      red: 0,
      green: 0,
      blue: 0,
    }

    const sets = subsets.split(';')

    for (const set of sets) {
      colors = checkSet(set, colors)
    }

    const power = colors['red'] * colors['green'] * colors['blue']

    total += power

  })

  console.log(total)
} catch (error) {
  console.error('Error reading file:', error);
}
