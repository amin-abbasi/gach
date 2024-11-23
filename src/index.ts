import { BACKGROUND_COLOR_CODES, COLOR_CODES, COLOR_END, COLOR_NAMES, Colors, RGB, STYLE_END, StyleOptions } from './types';
export * from './types';

/**
 * A class for styling and coloring text using ANSI escape codes.
 */
class Gach {
    /** The original text provided to the instance. */
    #originalText: string;

    /** The modified text with applied styles. */
    #modifiedText: string;

    #state: { color?: string; bgColor?: string; styles: string[]; customStyles: string[] };

    /**
     * Creates a new `Gach` instance.
     * @param text - The text to be styled or colored.
     */
    constructor(text: string) {
        this.#originalText = text;
        this.#modifiedText = text;
        this.#state = { styles: [], customStyles: [] };
    }

    /**
     * Gets the styled or colored text.
     */
    get text() {
        return this.#modifiedText;
    }

    #applyStyles() {
        const codes = [];
        if (this.#state.color) codes.push(this.#state.color);
        if (this.#state.bgColor) codes.push(this.#state.bgColor);
        const coloringCode = codes.length > 0 ? `\u001B[${codes.join(';')}m` : '';

        const styleCodes = this.#state.styles.join('');
        this.#modifiedText = `${coloringCode}${styleCodes}${this.#originalText}${STYLE_END}`;
        return this;
    }

    /**
     * Converts a hexadecimal color to RGB.
     * @param hex - The hexadecimal color string.
     * @returns An `RGB` object or `null` if the input is invalid.
     */
    #hexToRgb(hex: string): RGB | null {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    }

    /**
     * Resets the text to its original form.
     * @returns The current `Gach` instance for chaining.
     */
    reset() {
        this.#state = { styles: [], customStyles: [] };
        this.#modifiedText = this.#originalText;
        return this;
    }

    /**
     * Applies a text color.
     * @param color - The color name.
     * @returns The current `Gach` instance for chaining.
     */
    color(color: Colors | COLOR_NAMES) {
        const colorCode = COLOR_CODES[color].valueOf();
        // if (!colorCode) return this;
        // this.#modifiedText = `\u001B[${colorCode}m${this.#modifiedText}${COLOR_END}`;
        if (colorCode) {
            this.#state.color = colorCode;
            this.#applyStyles();
        }
        return this;
    }

    /**
     * Applies a background color.
     * @param bgColor - The background color name.
     * @returns The current `Gach` instance for chaining.
     */
    bgColor(bgColor: Colors | COLOR_NAMES) {
        const colorCode = BACKGROUND_COLOR_CODES[bgColor].valueOf();
        // if (!colorCode) return this;
        // this.#modifiedText = `\u001B[${colorCode}m${this.#modifiedText}${COLOR_END}`;
        if (colorCode) {
            this.#state.bgColor = colorCode;
            this.#applyStyles();
        }
        return this;
    }

    /**
     * Applies an RGB color to the text.
     * @param red - The red component (0-255).
     * @param green - The green component (0-255).
     * @param blue - The blue component (0-255).
     * @returns The current `Gach` instance for chaining.
     */
    rgb(red: number, green: number, blue: number) {
        if (red > 255) red -= 256;
        if (green > 255) green -= 256;
        if (blue > 255) blue -= 256;

        this.#modifiedText = `\u001B[38;2;${red};${green};${blue}m${this.#modifiedText}${COLOR_END}`;
        return this;
    }

    /**
     * Applies a color using a hexadecimal code.
     * @param hex - The hexadecimal color string.
     * @returns The current `Gach` instance for chaining.
     */
    hex(hex: string) {
        const rgb = this.#hexToRgb(hex);
        if (!rgb) return this;
        this.#modifiedText = `\u001B[38;2;${rgb.r};${rgb.g};${rgb.b}m${this.#modifiedText}${COLOR_END}`;
        return this;
    }

    /**
     * Underlines the text.
     * @returns The current `Gach` instance for chaining.
     */
    underline() {
        // this.#modifiedText = `\u001B[4m${this.#modifiedText}${STYLE_END}`;
        if (!this.#state.styles.includes('\u001B[4m')) {
            this.#state.styles.push('\u001B[4m');
        }
        this.#applyStyles();
        return this;
    }

    /**
     * Makes the text bold.
     * @returns The current `Gach` instance for chaining.
     */
    bold() {
        // this.#modifiedText = `\x1b[1m${this.#modifiedText}${STYLE_END}`;
        if (!this.#state.styles.includes('\x1b[1m')) {
            this.#state.styles.push('\x1b[1m');
        }
        this.#applyStyles();
        return this;
    }

    /**
     * Makes the text italic.
     * @returns The current `Gach` instance for chaining.
     */
    italic() {
        // this.#modifiedText = `\u001B[3m${this.#modifiedText}${STYLE_END}`;
        if (!this.#state.styles.includes('\u001B[3m')) {
            this.#state.styles.push('\u001B[3m');
        }
        this.#applyStyles();
        return this;
    }

    /**
     * Inverts the text colors.
     * @returns The current `Gach` instance for chaining.
     */
    inverse() {
        // this.#modifiedText = `\u001B[7m${this.#modifiedText}${STYLE_END}`;
        if (!this.#state.styles.includes('\u001B[7m')) {
            this.#state.styles.push('\u001B[7m');
        }
        this.#applyStyles();
        return this;
    }

    /**
     * Applies a strikethrough effect to the text.
     * @returns The current `Gach` instance for chaining.
     */
    strikethrough() {
        // this.#modifiedText = `\u001B[9m${this.#modifiedText}${STYLE_END}`;
        if (!this.#state.styles.includes('\u001B[9m')) {
            this.#state.styles.push('\u001B[9m');
        }
        this.#applyStyles();
        return this;
    }

    /**
     * Applies multiple custom styles using an object with various attributes.
     *
     * @param {StyleOptions} styles - An object containing style properties such as color, bgColor, and other CSS styles.
     * @returns The current instance for method chaining.
     *
     * @example
     * const instance = new Gach();
     * instance.applyStyles({ color: 'red', bgColor: 'blue' });
     */
    customStyle(styles: StyleOptions) {
        if (styles.color) {
            const colorCode = COLOR_CODES[styles.color as Colors].valueOf();
            if (colorCode) this.#state.color = colorCode;
        }

        if (styles.bgColor) {
            const bgColorCode = BACKGROUND_COLOR_CODES[styles.bgColor as Colors].valueOf();
            if (bgColorCode) this.#state.bgColor = bgColorCode;
        }

        if (styles.bold && !this.#state.styles.includes('\x1b[1m')) {
            this.#state.styles.push('\x1b[1m');
        }

        if (styles.underline && !this.#state.styles.includes('\u001B[4m')) {
            this.#state.styles.push('\u001B[4m');
        }

        if (styles.italic && !this.#state.styles.includes('\u001B[3m')) {
            this.#state.styles.push('\u001B[3m');
        }

        if (styles.inverse && !this.#state.styles.includes('\u001B[7m')) {
            this.#state.styles.push('\u001B[7m');
        }

        if (styles.strikethrough && !this.#state.styles.includes('\u001B[9m')) {
            this.#state.styles.push('\u001B[9m');
        }

        // Apply custom styles (e.g., custom ANSI codes like 256 colors)
        Object.keys(styles).forEach((key) => {
            if (key !== 'color' && key !== 'bgColor' && styles[key]) {
                // Assume the value is a valid ANSI code or handle as needed
                this.#state.customStyles.push(styles[key]);
            }
        });

        this.#applyStyles();
        return this;
    }

    // ------------ Convenience Methods ------------

    /**
     * Apply green text and bold style (success message).
     * @returns The current instance for method chaining
     */
    success() {
        this.color(COLOR_NAMES.GREEN).bold();
        this.#applyStyles();
        return this;
    }

    /**
     * Apply red text, bold, and underline style (error message).
     * @returns The current instance for method chaining
     */
    error() {
        this.color(COLOR_NAMES.RED).bold().underline();
        this.#applyStyles();
        return this;
    }

    /**
     * Apply yellow text, bold, and italic style (warning message).
     * @returns The current instance for method chaining
     */
    warning() {
        this.color(COLOR_NAMES.YELLOW).bold().italic();
        this.#applyStyles();
        return this;
    }

    /**
     * Apply rainbow effect with a variety of colors.
     * @returns The current instance for method chaining
     */
    rainbow() {
        const rainbowColors: Colors[] = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
        let rainbowText = '';
        let colorIndex = 0;

        // Split the original text into individual characters and apply rainbow effect
        for (let i = 0; i < this.#originalText.length; i++) {
            rainbowText += gach(this.#originalText[i]).color(rainbowColors[colorIndex]).text;
            colorIndex = (colorIndex + 1) % rainbowColors.length; // Cycle through colors
        }

        this.#modifiedText = rainbowText; // Set the rainbow effect text
        return this;
    }
}

/**
 * A helper function to create a `Gach` instance.
 * @param text - The text to be styled or colored.
 * @returns A new `Gach` instance.
 */
function gach(text: string): Gach {
    return new Gach(text);
}

export default gach;
