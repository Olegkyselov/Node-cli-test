const { Board } = require("./Board")
const inquirer = require("inquirer")

const pattern = /^[a-hA-H][1-8]$/

// Validate position
const validatePosition = async (value) => {
  if (pattern.test(value)) {
    return true
  }

  return "Input position from A1 to H8"
}

// Collect ship position
const collectShipPosition = async (playerName) => {
  const prompts = [
    {
      type: 'input',
      name: 'type',
      message: `${playerName} ship  direction, V/H: `,
      default: 'V',
      validate(value) {
        if (value.length) {
          if (
            value.toLowerCase() === 'v' || value.toLowerCase() === 'h'
          ) {
            return true;
          }
          return "Value should be V or H";
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'position',
      message: `Ship ${playerName}, A1-H8: `,
      validate(value) {
        return validatePosition(value)
      }
    }
  ];

  return await inquirer.prompt(prompts);
};

// Collect shot position
const collectShot = async (playerName, step) => {
  const prompts = [
    {
      type: 'input',
      name: 'position',
      message: `Turn ${step} - ${playerName}, A1-H8: `,
      validate(value) {
        return validatePosition(value)
      }
    }
  ];

  return await inquirer.prompt(prompts);
};

const main = async () => {
  const board1 = new Board('Player1')
  const board2 = new Board('Player2')

  var step = 1;
  board1.setPosition(await collectShipPosition(board1.name));
  board2.setPosition(await collectShipPosition(board2.name));

  let status1 = board1.getStatus()
  let status2 = board2.getStatus()

  while (status1 > 0 && status2 > 0) {
    const inputs1 = await collectShot(board1.name, step);
    const res2 = board2.shot(inputs1)
    console.log(res2);
    status2 = board2.getStatus()

    // Quit if 1st player won
    if (status2 === 0) break

    const inputs2 = await collectShot(board2.name, step);
    const res1 = board1.shot(inputs2)
    status1 = board1.getStatus()
    console.log(res1);

    step++;
  }

  if (status1 === 0) {
    console.log(`${board2.name} sunk battleship of ${board1.name}`)
  }
  if (status2 === 0) {
    console.log(`${board1.name} sunk battleship of ${board2.name}`)
  }
};

main();