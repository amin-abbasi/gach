declare global {
  interface String {

    color(id: colors): string;
    backColor(id: backColors): string;

    bold(): string;
    italic(): string;
    underline(): string;
    strikethrough(): string;
    inverse(): string;
  }
}

type colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'gray' |
  'lightRed' | 'lightGreen' | 'lightYellow' | 'lightBlue' | 'lightMagenta' | 'lightCyan'

export enum COLORS {
  black   = '30',
  red     = '31',
  green   = '32',
  yellow  = '33',
  blue    = '34',
  magenta = '35',
  cyan    = '36',
  gray    = '90',
  lightRed     = '91',
  lightGreen   = '92',
  lightYellow  = '93',
  lightBlue    = '94',
  lightMagenta = '95',
  lightCyan    = '96',
}


type backColors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' |
   'cyan' | 'gray' | 'lightRed' | 'lightGreen' | 'lightYellow' | 'lightBlue' |
    'lightMagenta' | 'lightCyan' | 'lightBlack' | 'lightGray'

export enum BACKGROUND_COLORS {
  black   = '40',
  red     = '41',
  green   = '42',
  yellow  = '43',
  blue    = '44',
  magenta = '45',
  cyan    = '46',
  gray    = '47',
  lightBlack   = '100',
  lightRed     = '101',
  lightGreen   = '102',
  lightYellow  = '103',
  lightBlue    = '104',
  lightMagenta = '105',
  lightCyan    = '106',
  lightGray    = '107',
}

// --------------------------------------------
// ---------------- FONT COLORS ---------------
// --------------------------------------------
String.prototype.color = function(id: colors): string {
  return `\x1b[${COLORS[id]}m${this}\x1b[0m`
}

String.prototype.backColor = function(id: backColors): string {
  return `\x1b[${BACKGROUND_COLORS[id]}m${this}\x1b[0m`
}


// --------------------------------------------
// --------------- FONT ACTIONS ---------------
// --------------------------------------------
String.prototype.bold = function(): string {
  return `\x1b[1m${this}\x1b[0m`
}

String.prototype.italic = function(): string {
  return `\x1b[3m${this}\x1b[0m`
}

String.prototype.underline = function(): string {
  return `\x1b[4m${this}\x1b[0m`
}

String.prototype.inverse = function(): string {
  return `\x1b[7m${this}\x1b[0m`
}

String.prototype.strikethrough = function(): string {
  return `\x1b[9m${this}\x1b[0m`
}
