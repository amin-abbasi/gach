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
  return `\u001B[${COLORS[color]}m${text}${COLOR_END}`
}

/**
 * Colorize your string text background
 * @param   {backColors}    color   selected color [`red`, `blue`, ... ]
 * @returns returns your text with colorized background
 */
function colorBack(text: string, color: backColors): string {
  return `\u001B[${BACKGROUND_COLORS[color]}m${text}${COLOR_END}`
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
  return `\x1b[1m${text}${STYLE_END}`
}

/**
 * String style will be italic
 * @param   {string}    text   given string text
 * @returns returns your text as italic
 */
function italic(text: string): string {
  return `\u001B[3m${text}${STYLE_END}`
}

/**
 * String style will be underlined
 * @param   {string}    text   given string text
 * @returns returns your text with underline
 */
function underline(text: string): string {
  return `\u001B[4m${text}${STYLE_END}`
}

/**
 * Inverse your string
 * @param   {string}    text   given string text
 * @returns returns your text as inverse
 */
function inverse(text: string): string {
  return `\u001B[7m${text}${STYLE_END}`
}

/**
 * String style will be strikethrough
 * @param   {string}    text   given string text
 * @returns returns your text as strikethrough
 */
function strikethrough(text: string): string {
  return `\u001B[9m${text}${STYLE_END}`
}

export default {
  color, colorBack, bold, italic, inverse, strikethrough, underline
}
