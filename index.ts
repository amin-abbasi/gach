/**
 * Supported color names for text and background.
 */
export type Colors =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'gray'
  | 'lightRed'
  | 'lightGreen'
  | 'lightYellow'
  | 'lightBlue'
  | 'lightMagenta'
  | 'lightCyan'

/**
 * Enum representing color names.
 */
export enum COLOR_NAMES {
  BLACK = 'black',
  RED = 'red',
  GREEN = 'green',
  YELLOW = 'yellow',
  BLUE = 'blue',
  MAGENTA = 'magenta',
  CYAN = 'cyan',
  GRAY = 'gray',
  LIGHT_RED = 'lightRed',
  LIGHT_GREEN = 'lightGreen',
  LIGHT_YELLOW = 'lightYellow',
  LIGHT_BLUE = 'lightBlue',
  LIGHT_MAGENTA = 'lightMagenta',
  LIGHT_CYAN = 'lightCyan',
}

/**
 * Enum mapping text color names to ANSI color codes.
 */
export enum COLOR_CODES {
  black = '30',
  red = '31',
  green = '32',
  yellow = '33',
  blue = '34',
  magenta = '35',
  cyan = '36',
  gray = '90',
  lightRed = '91',
  lightGreen = '92',
  lightYellow = '93',
  lightBlue = '94',
  lightMagenta = '95',
  lightCyan = '96',
}

/**
 * Enum mapping background color names to ANSI color codes.
 */
export enum BACKGROUND_COLOR_CODES {
  black = '40',
  red = '41',
  green = '42',
  yellow = '43',
  blue = '44',
  magenta = '45',
  cyan = '46',
  gray = '47',
  lightBlack = '100',
  lightRed = '101',
  lightGreen = '102',
  lightYellow = '103',
  lightBlue = '104',
  lightMagenta = '105',
  lightCyan = '106',
  lightGray = '107',
}

const COLOR_END = '\u001B[39m'
const STYLE_END = '\x1b[0m'

/**
 * Represents an RGB color.
 */
interface RGB {
  r: number
  g: number
  b: number
}

/**
 * A class for styling and coloring text using ANSI escape codes.
 */
class Gach {
  /** The original text provided to the instance. */
  #originalText: string

  /** The modified text with applied styles. */
  #modifiedText: string

  /**
   * Creates a new `Gach` instance.
   * @param text - The text to be styled or colored.
   */
  constructor(text: string) {
    this.#originalText = text
    this.#modifiedText = text
  }

  /**
   * Gets the styled or colored text.
   */
  get text() {
    return this.#modifiedText
  }

  /**
   * Converts a hexadecimal color to RGB.
   * @param hex - The hexadecimal color string.
   * @returns An `RGB` object or `null` if the input is invalid.
   */
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

  /**
   * Resets the text to its original form.
   * @returns The current `Gach` instance for chaining.
   */
  reset() {
    this.#modifiedText = this.#originalText
    return this
  }

  /**
   * Applies a text color.
   * @param color - The color name.
   * @returns The current `Gach` instance for chaining.
   */
  color(color: Colors | COLOR_NAMES) {
    const colorCode = COLOR_CODES[color].valueOf()
    if (!colorCode) return this
    this.#modifiedText = `\u001B[${colorCode}m${this.#modifiedText}${COLOR_END}`
    return this
  }

  /**
   * Applies a background color.
   * @param bgColor - The background color name.
   * @returns The current `Gach` instance for chaining.
   */
  bgColor(bgColor: Colors | COLOR_NAMES) {
    const colorCode = BACKGROUND_COLOR_CODES[bgColor].valueOf()
    if (!colorCode) return this
    this.#modifiedText = `\u001B[${colorCode}m${this.#modifiedText}${COLOR_END}`
    return this
  }

  /**
   * Applies an RGB color to the text.
   * @param red - The red component (0-255).
   * @param green - The green component (0-255).
   * @param blue - The blue component (0-255).
   * @returns The current `Gach` instance for chaining.
   */
  rgb(red: number, green: number, blue: number) {
    if (red > 255) red -= 256
    if (green > 255) green -= 256
    if (blue > 255) blue -= 256

    this.#modifiedText = `\u001B[38;2;${red};${green};${blue}m${this.#modifiedText}${COLOR_END}`
    return this
  }

  /**
   * Applies a color using a hexadecimal code.
   * @param hex - The hexadecimal color string.
   * @returns The current `Gach` instance for chaining.
   */
  hex(hex: string) {
    const rgb = this.#hexToRgb(hex)
    if (!rgb) return this
    this.#modifiedText = `\u001B[38;2;${rgb.r};${rgb.g};${rgb.b}m${this.#modifiedText}${COLOR_END}`
    return this
  }

  /**
   * Underlines the text.
   * @returns The current `Gach` instance for chaining.
   */
  underline() {
    this.#modifiedText = `\u001B[4m${this.#modifiedText}${STYLE_END}`
    return this
  }

  /**
   * Makes the text bold.
   * @returns The current `Gach` instance for chaining.
   */
  bold() {
    this.#modifiedText = `\x1b[1m${this.#modifiedText}${STYLE_END}`
    return this
  }

  /**
   * Makes the text italic.
   * @returns The current `Gach` instance for chaining.
   */
  italic() {
    this.#modifiedText = `\u001B[3m${this.#modifiedText}${STYLE_END}`
    return this
  }

  /**
   * Inverts the text colors.
   * @returns The current `Gach` instance for chaining.
   */
  inverse() {
    this.#modifiedText = `\u001B[7m${this.#modifiedText}${STYLE_END}`
    return this
  }

  /**
   * Applies a strikethrough effect to the text.
   * @returns The current `Gach` instance for chaining.
   */
  strikethrough() {
    this.#modifiedText = `\u001B[9m${this.#modifiedText}${STYLE_END}`
    return this
  }
}

/**
 * A helper function to create a `Gach` instance.
 * @param text - The text to be styled or colored.
 * @returns A new `Gach` instance.
 */
function gach(text: string): Gach {
  return new Gach(text)
}

export default gach
