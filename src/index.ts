import { BACKGROUND_COLOR_CODES, COLOR_CODES, COLOR_NAMES, Colors, HEX_PATTERN, HexColorString, STYLE_END, StyleOptions } from './types';
export * from './types';

/** The ANSI codes of the text styles. */
const STYLE_CODES = { bold: '1', italic: '3', underline: '4', inverse: '7', strikethrough: '9' } as const;
type Style = keyof typeof STYLE_CODES;

/** An extra ANSI (SGR) code `customStyle` accepts, such as `'38;5;208'` for colour 208 of the 256. */
const SGR_PATTERN = /^\d{1,3}(;\d{1,3})*$/;

/**
 * Whether colours are on. As in Node.js, `FORCE_COLOR` decides when set (`0` or `false` turn colours off, anything
 * else on); otherwise a non-empty `NO_COLOR` turns them off (https://no-color.org). Read on every call, and always on
 * where there is no `process` (browsers).
 */
function colorsEnabled(): boolean {
    const env = typeof process === 'undefined' ? undefined : process.env;
    if (!env) return true;
    if (env.FORCE_COLOR !== undefined) return env.FORCE_COLOR !== '0' && env.FORCE_COLOR.toLowerCase() !== 'false';
    return !env.NO_COLOR;
}

/**
 * A class for styling and coloring text using ANSI escape codes.
 */
class Gach {
    /** The original text provided to the instance. */
    #originalText: string;

    /** The modified text with applied styles. */
    #modifiedText: string;

    /** The colours (ANSI parameters such as `'31'` or `'38;2;255;119;51'`), the styles in the order given, and extra codes. */
    #state: { color?: string; bgColor?: string; styles: Style[]; codes: string[] };

    /**
     * Creates a new `Gach` instance.
     * @param text - The text to be styled or colored.
     */
    constructor(text: string) {
        this.#originalText = text;
        this.#modifiedText = text;
        this.#state = { styles: [], codes: [] };
    }

    /**
     * Gets the styled or colored text.
     */
    get text() {
        return this.#modifiedText;
    }

    // The text is always built from the original and the whole state, so every colour and style is kept whatever the order
    #applyStyles(): this {
        const { color, bgColor, styles, codes } = this.#state;
        if (!colorsEnabled()) {
            this.#modifiedText = this.#originalText;
            return this;
        }
        const colors = [color, bgColor].filter(Boolean);
        const coloringCode = colors.length > 0 ? `\u001B[${colors.join(';')}m` : '';
        const styleCodes = [...styles.map((style) => STYLE_CODES[style]), ...codes].map((code) => `\u001B[${code}m`).join('');
        this.#modifiedText = `${coloringCode}${styleCodes}${this.#originalText}${STYLE_END}`;
        return this;
    }

    #addStyle(style: Style): this {
        if (!this.#state.styles.includes(style)) this.#state.styles.push(style);
        return this.#applyStyles();
    }

    // Helper method to validate RGB values (must be integers between 0 and 255)
    #validateRgb(r: number, g: number, b: number): boolean {
        return [r, g, b].every((val) => Number.isInteger(val) && val >= 0 && val <= 255);
    }

    #isValidHexColor(hex: string): hex is HexColorString {
        return HEX_PATTERN.test(hex);
    }

    /**
     * Converts a hexadecimal color to RGB.
     * @param hex - The hexadecimal color string.
     * @returns An `RGB` object.
     */
    #hexToRgb(hex: string): { r: number; g: number; b: number } {
        const hexValue = hex.slice(1);
        const full = hexValue.length === 3 ? [...hexValue].map((digit) => digit + digit).join('') : hexValue;
        return { r: parseInt(full.slice(0, 2), 16), g: parseInt(full.slice(2, 4), 16), b: parseInt(full.slice(4, 6), 16) };
    }

    /**
     * Resets the text to its original form.
     * @returns The current `Gach` instance for chaining.
     */
    reset(): this {
        this.#state = { styles: [], codes: [] };
        this.#modifiedText = this.#originalText;
        return this;
    }

    /**
     * Applies a text color. An unknown name is reported and leaves the text as it was.
     * @param color - The color name.
     * @returns The current `Gach` instance for chaining.
     */
    color(color: Colors | COLOR_NAMES): this {
        const colorCode: string | undefined = COLOR_CODES[color as Colors];
        if (!colorCode) {
            console.error(`Invalid color name: ${color}.`);
            return this;
        }
        this.#state.color = colorCode;
        return this.#applyStyles();
    }

    /**
     * Applies a background color. An unknown name is reported and leaves the text as it was.
     * @param bgColor - The background color name.
     * @returns The current `Gach` instance for chaining.
     */
    bgColor(bgColor: Colors | COLOR_NAMES): this {
        const colorCode: string | undefined = BACKGROUND_COLOR_CODES[bgColor as Colors];
        if (!colorCode) {
            console.error(`Invalid background color name: ${bgColor}.`);
            return this;
        }
        this.#state.bgColor = colorCode;
        return this.#applyStyles();
    }

    /**
     * Applies an RGB color to the text; it stays when other styles follow.
     * @param red - The red component (0-255).
     * @param green - The green component (0-255).
     * @param blue - The blue component (0-255).
     * @returns The current `Gach` instance for chaining.
     */
    rgb(red: number, green: number, blue: number): this {
        if (!this.#validateRgb(red, green, blue)) {
            console.error(`Invalid RGB values: [${red}, ${green}, ${blue}]. Each value must be an integer between 0 and 255.`);
            return this;
        }
        this.#state.color = `38;2;${red};${green};${blue}`;
        return this.#applyStyles();
    }

    /**
     * Applies a color using a hexadecimal code; it stays when other styles follow.
     * @param hex - The hexadecimal color string.
     * @returns The current `Gach` instance for chaining.
     */
    hex(hex: string): this {
        if (!this.#isValidHexColor(hex)) {
            console.error(`Invalid HEX color code: ${hex}. Ensure the HEX value is in the format #RRGGBB or #RGB.`);
            return this;
        }
        const { r, g, b } = this.#hexToRgb(hex);
        return this.rgb(r, g, b);
    }

    /**
     * Underlines the text.
     * @returns The current `Gach` instance for chaining.
     */
    underline(): this {
        return this.#addStyle('underline');
    }

    /**
     * Makes the text bold.
     * @returns The current `Gach` instance for chaining.
     */
    bold(): this {
        return this.#addStyle('bold');
    }

    /**
     * Makes the text italic.
     * @returns The current `Gach` instance for chaining.
     */
    italic(): this {
        return this.#addStyle('italic');
    }

    /**
     * Swaps the text and background colors.
     * @returns The current `Gach` instance for chaining.
     */
    inverse(): this {
        return this.#addStyle('inverse');
    }

    /**
     * Strikes the text through.
     * @returns The current `Gach` instance for chaining.
     */
    strikethrough(): this {
        return this.#addStyle('strikethrough');
    }

    /**
     * Applies several styles at once. Besides the named options, any other option whose value is an ANSI code
     * (such as `{ orange: '38;5;208' }`) is applied too; other values are ignored.
     * @param styles - The style options.
     * @returns The current `Gach` instance for chaining.
     */
    customStyle(styles: StyleOptions): this {
        if (styles.color) {
            const colorCode: string | undefined = COLOR_CODES[styles.color as Colors];
            if (colorCode) this.#state.color = colorCode;
        }
        if (styles.bgColor) {
            const bgColorCode: string | undefined = BACKGROUND_COLOR_CODES[styles.bgColor as Colors];
            if (bgColorCode) this.#state.bgColor = bgColorCode;
        }
        // The styles in this order, as before 1.8.0, so the codes come out the same
        for (const style of ['bold', 'underline', 'italic', 'inverse', 'strikethrough'] as const) {
            if (styles[style] && !this.#state.styles.includes(style)) this.#state.styles.push(style);
        }
        for (const [key, value] of Object.entries(styles)) {
            if (key !== 'color' && key !== 'bgColor' && !(key in STYLE_CODES) && typeof value === 'string' && SGR_PATTERN.test(value) && !this.#state.codes.includes(value)) {
                this.#state.codes.push(value);
            }
        }
        return this.#applyStyles();
    }

    // ------------ Convenience Methods ------------

    /** Green and bold. */
    success(): this {
        return this.color(COLOR_NAMES.GREEN).bold();
    }

    /** Red, bold and underlined. */
    error(): this {
        return this.color(COLOR_NAMES.RED).bold().underline();
    }

    /** Yellow, bold and italic. */
    warning(): this {
        return this.color(COLOR_NAMES.YELLOW).bold().italic();
    }

    /** Each character in the next color of the rainbow. */
    rainbow(): this {
        const rainbowColors: Colors[] = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
        this.#modifiedText = [...this.#originalText].map((character, i) => gach(character).color(rainbowColors[i % rainbowColors.length]).text).join('');
        return this;
    }
}

function gach(text: string): Gach {
    return new Gach(text);
}

export default gach;
