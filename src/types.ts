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
    | 'lightCyan';

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

export const COLOR_END = '\u001B[39m';
export const STYLE_END = '\x1b[0m';

/**
 * Represents an RGB color.
 */
export interface RGB {
    r: number;
    g: number;
    b: number;
}
