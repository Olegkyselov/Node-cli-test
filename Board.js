const BOARD_SIZE = 8
const SHIP_LENGTH = 3
const EMPTY = 0
const SHIP = 1
const MISSED = 2
const HIT = 3
const VERTICAL = 'v'
const HORIZONTAL = 'h'

class Board {
  position = {}
  name = ''
  data = []
  type = ''

  constructor(name) {
    this.name = name;
    this.data = Array(BOARD_SIZE).fill(EMPTY).map(() => Array(BOARD_SIZE).fill(EMPTY))
  }

  setPosition(data) {
    const {type, position} = data
    this.position = this.parsePosition(position)

    if (!this.position) return

    this.type = type.toLowerCase() === VERTICAL ? VERTICAL : HORIZONTAL

    if (this.type === VERTICAL) {
      if (this.position.y > BOARD_SIZE - SHIP_LENGTH) {
        this.position.y = BOARD_SIZE - SHIP_LENGTH
      }

      for(let n=0; n < SHIP_LENGTH; n++) {
        this.data[this.position.x - 1][this.position.y + n - 1] = SHIP
      }
    } else {
      if (this.position.x > BOARD_SIZE - SHIP_LENGTH) {
        this.position.x = BOARD_SIZE - SHIP_LENGTH
      }

      for(let n=0; n < SHIP_LENGTH; n++) {
        this.data[this.position.x + n - 1][this.position.y - 1] = SHIP
      }
    }
  }

  shot(data) {
    const { position } = data
    const positionValue = this.parsePosition(position)

    if (!positionValue) return

    const currentValue = this.data[positionValue.x - 1][positionValue.y - 1]
    if (currentValue === EMPTY) {
      this.data[positionValue.x - 1][positionValue.y - 1] = MISSED
      return 'Missed'
    } else if (currentValue === SHIP) {
      this.data[positionValue.x - 1][positionValue.y - 1] = HIT
      return 'Hit'
    } else {
      return 'Duplicate'
    }
  }

  parsePosition(position) {
    if (position && position.length === 2) {
      const positionValue = position.toLowerCase()
      const x = positionValue.charCodeAt(0) - 96
      const y = parseInt(positionValue.substr(1,1))
      return {x, y}
    }
    return null
  }

  getStatus() {
    let ships = 0;

    for(let n=0; n < BOARD_SIZE; n++) {
      for(let m=0; m < BOARD_SIZE; m++) {
        if (this.data[n][m] === SHIP) {
          ships++
        }
      }
    }

    return ships
  }
}

exports.Board = Board