import { backColors, BACKGROUND_COLORS, COLORS, colors } from './config'

const COLOR_END = '\u001B[39m'
const STYLE_END = '\x1b[0m'

// Hex To RGB Converter
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Modify text with coloring and styles
 * @param text Your given text to modify
 * @returns returns the modified text based on your filter
 */
function gach(text: string) {

  const originalText = text

  return {

    /** Original Text */
    originalText,

    /** Modified Text */
    text,

    /** Reset All Changes
     * @returns returns your original string text
     */
    reset() {
      this.text = this.originalText
      return this
    },

    // ----------------------------------------------------------------------
    // ----------------------------- FONT COLORS ----------------------------
    // ----------------------------------------------------------------------

    /**
     * Colorize your string text
     * @param   {colors}    color   selected color [`red`, `blue`, ... ]
     * @returns returns your colorized string
     */
    color(color: colors) {
      if(!this.text || this.text === '') return this
      const colorCode = COLORS[color].valueOf()
      if(!colorCode) return this
      this.text = `\u001B[${colorCode}m${this.text}${COLOR_END}`
      return this
    },

    /**
     * Colorize your string text background
     * @param   {backColors}    color   selected color [`red`, `blue`, ... ]
     * @returns returns your text with colorized background
     */
    colorBack(color: backColors) {
      if(!this.text || this.text === '') return this
      const colorCode = BACKGROUND_COLORS[color].valueOf()
      if(!colorCode) return this
      this.text = `\u001B[${BACKGROUND_COLORS[color]}m${this.text}${COLOR_END}`
      return this
    },

    /**
     * Colorize your string text using RGB code
     * @param   {number}    red     red code number
     * @param   {number}    green   green code number
     * @param   {number}    blue    blue code number
     * @returns returns your colorized string using rgb code
     */
    rgb(red: number, green: number, blue: number) {
      if(!this.text || this.text === '') return this

      // Fix RGB values
      if(red > 255) red -= 256
      if(green > 255) green -= 256
      if(blue > 255) blue -= 256

      this.text = `\u001B[${38};2;${red};${green};${blue}m${this.text}${COLOR_END}`
      return this
    },

    /**
     * Colorize your string text hex code
     * @param   {string}    hex   hex code
     * @returns returns your colorized text using hex code
     */
    hex(hex: string) {
      if(!this.text || this.text === '') return this
      const rgb = hexToRgb(hex)
      if(!rgb) return this
      this.text = `\u001B[${38};2;${rgb.r};${rgb.g};${rgb.b}m${this.text}${COLOR_END}`
      return this
    },


    // ----------------------------------------------------------------------
    // ---------------------------- FONT STYLES -----------------------------
    // ----------------------------------------------------------------------

    /**
     * String style will be bold
     * @param   {string}    text   given string text
     * @returns returns your text as bold
     */
    bold() {
      if(!this.text || this.text === '') return this
      this.text = `\x1b[1m${this.text}${STYLE_END}`
      return this
    },

    /**
     * String style will be italic
     * @param   {string}    text   given string text
     * @returns returns your text as italic
     */
    italic() {
      if(!this.text || this.text === '') return this
      this.text = `\u001B[3m${this.text}${STYLE_END}`
      return this
    },

    /**
     * String style will be underlined
     * @param   {string}    text   given string text
     * @returns returns your text with underline
     */
    underline() {
      if(!this.text || this.text === '') return this
      this.text = `\u001B[4m${this.text}${STYLE_END}`
      return this
    },

    /**
     * Inverse your string
     * @param   {string}    text   given string text
     * @returns returns your text as inverse
     */
    inverse() {
      if(!this.text || this.text === '') return this
      this.text = `\u001B[7m${this.text}${STYLE_END}`
      return this
    },

    /**
     * String style will be strikethrough
     * @param   {string}    text   given string text
     * @returns returns your text as strikethrough
     */
    strikethrough() {
      if(!this.text || this.text === '') return this
      this.text = `\u001B[9m${this.text}${STYLE_END}`
      return this
    },

  }
}

export default gach
