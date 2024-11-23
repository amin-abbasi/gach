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
/**
 * Interface that defines the style options for text formatting.
 * It includes properties for setting colors, text styles (bold, underline, etc.),
 * and additional custom styles like ANSI escape codes.
 *
 * @interface StyleOptions
 */
export interface StyleOptions {
    /**
     * Defines the foreground color of the text. Can be a predefined color name from `Colors` or `COLOR_NAMES`.
     * For example, 'red', 'blue', or custom defined color values.
     *
     * @example 'red'
     */
    color?: Colors | COLOR_NAMES;

    /**
     * Defines the background color of the text. Can be a predefined color name from `Colors` or `COLOR_NAMES`.
     * For example, 'black', 'yellow', or custom defined color values.
     *
     * @example 'yellow'
     */
    bgColor?: Colors | COLOR_NAMES;

    /**
     * Indicates whether the text should be bold.
     *
     * @example true
     */
    bold?: boolean;

    /**
     * Indicates whether the text should be underlined.
     *
     * @example true
     */
    underline?: boolean;

    /**
     * Indicates whether the text should be italicized.
     *
     * @example true
     */
    italic?: boolean;

    /**
     * Indicates whether the text should have inverse colors (background and text are swapped).
     *
     * @example true
     */
    inverse?: boolean;

    /**
     * Indicates whether the text should have a strikethrough effect.
     *
     * @example true
     */
    strikethrough?: boolean;

    /**
     * Allows for the inclusion of additional custom styles like custom ANSI escape codes.
     *
     * @example { 'customStyle': 'value' }
     */
    [key: string]: any;
}

/**
 * Regular expression pattern to validate HEX color codes in the format of #RRGGBB or #RGB.
 *
 * @constant HEX_PATTERN
 * @example '#FF5733'
 */
export const HEX_PATTERN = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

/**
 * A branded type to ensure that a string is a valid HEX color code.
 * It is used for runtime validation and type safety of HEX color strings.
 *
 * The string type is "branded" to distinguish valid HEX strings from other strings.
 * This helps to ensure only valid HEX color codes are accepted.
 *
 * @type HexColorString
 * @example '#FF5733'
 */
export type HexColorString = string & { __brand: 'HexColor' };
