declare global {
  interface String {
    color(id: colors): string;
    backColor(id: colors): string;
    bold(): string;
  }
}

type colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'gray'

export enum COLORS {
  black   = '30',
  red     = '31',
  green   = '32',
  yellow  = '33',
  blue    = '34',
  magenta = '35',
  cyan    = '36',
  gray    = '2',
}

export enum BACKGROUND_COLORS {
  black   = '40',
  red     = '41',
  green   = '42',
  yellow  = '43',
  blue    = '44',
  magenta = '45',
  cyan    = '46',
  gray    = '47',
}

String.prototype.color = function(id: colors): string {
  return `\x1b[${COLORS[id]}m${this}\x1b[0m`
}

String.prototype.backColor = function(id: colors): string {
  return `\x1b[${COLORS[id]}m${this}\x1b[0m`
}

String.prototype.bold = function(): string {
  return `\x1b[1m${this}\x1b[0m`
}

