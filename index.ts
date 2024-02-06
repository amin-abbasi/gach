import { BACKGROUND_COLOR_CODES, COLOR_CODES, COLOR_NAMES, Colors } from './types'

export * from './types'

const COLOR_END = '\u001B[39m'
const STYLE_END = '\x1b[0m'

interface RGB {
  r: number
  g: number
  b: number
}

class Gach {
  #originalText: string
  #modifiedText: string

  constructor(text: string) {
    this.#originalText = text
    this.#modifiedText = text
  }

  get text() {
    return this.#modifiedText
  }

  #hexToRgb(hex: string): RGB | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  reset() {
    this.#modifiedText = this.#originalText
    return this
  }

  // ------------ Color Methods ------------
  color(color: Colors) {
    const colorCode = COLOR_CODES[color].valueOf()
    if (colorCode) {
      this.#modifiedText = `\u001B[${colorCode}m${this.#modifiedText}${COLOR_END}`
    }
    return this
  }

  bgColor(bgColor: Colors) {
    const colorCode = BACKGROUND_COLOR_CODES[bgColor].valueOf()
    if (!colorCode) return this
    this.#modifiedText = `\u001B[${BACKGROUND_COLOR_CODES[bgColor]}m${this.#modifiedText}${COLOR_END}`
    return this
  }

  rgb(red: number, green: number, blue: number) {
    if (red > 255) red -= 256
    if (green > 255) green -= 256
    if (blue > 255) blue -= 256

    this.#modifiedText = `\u001B[${38};2;${red};${green};${blue}m${
      this.#modifiedText
    }${COLOR_END}`
    return this
  }

  hex(hex: string) {
    const rgb = this.#hexToRgb(hex)
    if (!rgb) return this
    this.#modifiedText = `\u001B[${38};2;${rgb.r};${rgb.g};${rgb.b}m${
      this.#modifiedText
    }${COLOR_END}`
    return this
  }

  // ------------ Styling Methods ------------
  underline() {
    this.#modifiedText = `\u001B[4m${this.#modifiedText}${STYLE_END}`
    return this
  }

  bold() {
    this.#modifiedText = `\x1b[1m${this.#modifiedText}${STYLE_END}`
    return this
  }

  italic() {
    this.#modifiedText = `\u001B[3m${this.#modifiedText}${STYLE_END}`
    return this
  }

  inverse() {
    this.#modifiedText = `\u001B[7m${this.#modifiedText}${STYLE_END}`
    return this
  }

  strikethrough() {
    this.#modifiedText = `\u001B[9m${this.#modifiedText}${STYLE_END}`
    return this
  }
}

function gach(text: string): Gach {
  return new Gach(text)
}

export default gach
