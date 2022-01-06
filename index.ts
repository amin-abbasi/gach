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


// ----------------------------------------------------------------------
// ----------------------------- FONT COLORS ----------------------------
// ----------------------------------------------------------------------

/**
 * Colorize your string text
 * @param   {colors}    color   selected color [`red`, `blue`, ... ]
 * @returns returns your colorized string
 */
function color(text: string, color: colors): string {
  if(!text || text === '') return ''
  return `\u001B[${COLORS[color]}m${text}${COLOR_END}`
}

/**
 * Colorize your string text background
 * @param   {backColors}    color   selected color [`red`, `blue`, ... ]
 * @returns returns your text with colorized background
 */
function colorBack(text: string, color: backColors): string {
  if(!text || text === '') return ''
  return `\u001B[${BACKGROUND_COLORS[color]}m${text}${COLOR_END}`
}

/**
 * Colorize your string text using RGB code
 * @param   {number}    red     red code number
 * @param   {number}    green   green code number
 * @param   {number}    blue    blue code number
 * @returns returns your colorized string using rgb code
 */
function rgb(text: string, red: number, green: number, blue: number): string {
  if(!text || text === '') return ''
  return `\u001B[${38};2;${red};${green};${blue}m${text}${COLOR_END}`
}

/**
 * Colorize your string text hex code
 * @param   {string}    hex   hex code
 * @returns returns your colorized text using hex code
 */
function hex(text: string, hex: string): string {
  if(!text || text === '') return ''
  const rgb = hexToRgb(hex)
  if(!rgb) return text
  return `\u001B[${38};2;${rgb.r};${rgb.g};${rgb.b}m${text}${COLOR_END}`
}


// ----------------------------------------------------------------------
// ---------------------------- FONT STYLES -----------------------------
// ----------------------------------------------------------------------

/**
 * String style will be bold
 * @param   {string}    text   given string text
 * @returns returns your text as bold
 */
function bold(text: string): string {
  if(!text || text === '') return ''
  return `\x1b[1m${text}${STYLE_END}`
}

/**
 * String style will be italic
 * @param   {string}    text   given string text
 * @returns returns your text as italic
 */
function italic(text: string): string {
  if(!text || text === '') return ''
  return `\u001B[3m${text}${STYLE_END}`
}

/**
 * String style will be underlined
 * @param   {string}    text   given string text
 * @returns returns your text with underline
 */
function underline(text: string): string {
  if(!text || text === '') return ''
  return `\u001B[4m${text}${STYLE_END}`
}

/**
 * Inverse your string
 * @param   {string}    text   given string text
 * @returns returns your text as inverse
 */
function inverse(text: string): string {
  if(!text || text === '') return ''
  return `\u001B[7m${text}${STYLE_END}`
}

/**
 * String style will be strikethrough
 * @param   {string}    text   given string text
 * @returns returns your text as strikethrough
 */
function strikethrough(text: string): string {
  if(!text || text === '') return ''
  return `\u001B[9m${text}${STYLE_END}`
}

export default {
  color,
  colorBack,
  hex,
  rgb,
  bold,
  italic,
  inverse,
  strikethrough,
  underline
}
