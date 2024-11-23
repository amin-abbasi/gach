# Gach - ANSI Text Styling Library

Gach is a JavaScript library for styling and coloring text using ANSI escape codes. It allows you to easily apply various text styles and colors to your console output.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
  - [Constructor](#constructor)
  - [get text](#get-text)
  - [reset](#reset)
  - [color](#color)
  - [bgColor](#bgcolor)
  - [rgb](#rgb)
  - [hex](#hex)
  - [underline](#underline)
  - [bold](#bold)
  - [italic](#italic)
  - [inverse](#inverse)
  - [strikethrough](#strikethrough)
  - [customStyle](#customstyle)
- [Example](#example)

## Installation
You can install Gach via npm:

```bash
npm install gach
```

## Usage
To use Gach, import it into your JavaScript or TypeScript file and create an instance with the text you want to style.

```ts
import gach from 'gach';

const styledText = gach('Hello, World!')
    .color('red')
    .bgColor('blue')
    .bold()
    .underline()
    .text;

console.log(styledText);
```
This will output the text "Hello, World!" styled with red text on a blue background, bold, and underlined effect.


# gach
**gach** is a package designed to add color and style to your terminal text messages.

## Features
- Pre-defined system font & background colors (red, green, blue, yellow, cyan, magenta, gray, black, and their light variants).
- Font color using `rgb` and `hex` values.
- Support for predefined color names (e.g., `COLOR_NAMES`).
- Font styles (bold, italic, underline, strikethrough, inverse).
- Custom styles can be applied using an object for more flexibility.
- Nested functions for chaining styles.
- Reset function to revert text to its original state.
- Error handling for invalid color inputs (if applicable).

## Install

You can install **gach** using npm:

```bash
npm i gach
```

## Usage Examples
You can use this package like this in both Javascript and Typescript:
```ts
import gach, { COLOR_NAMES } from 'gach'

const log = console.log

log(`<<< ${gach('').color('magenta').bold().text} >>> <-- Warning: Received an Empty String!`);
log(`<<< ${gach('INFO: Text styled with LIGHT BLUE').color(COLOR_NAMES.LIGHT_BLUE).text} >>>`);
log(`<<< ${gach('ALERT: Important message with a red background').bgColor(COLOR_NAMES.RED).bold().text} >>>`);
log(`<<< ${gach('NOTE: Text styled with custom RGB color [118, 38, 113]').rgb(118, 38, 113).text} >>>`);
log(`<<< ${gach('INFO: Styled with HEX color code #FF7733').hex('#FF7733').text} >>>`);
log(`<<< ${gach('CAUTION: Emphasized with bold, underline, and green text').underline().bold().color('green').text} >>>`);
log(`<<< ${gach('DEBUG: Reset text formatting to normal').underline().bold().color(COLOR_NAMES.RED).reset().text} >>>`);
log(`<<< ${gach('SUCCESS: Styled with red text and yellow background').bgColor(COLOR_NAMES.LIGHT_YELLOW).color(COLOR_NAMES.RED).bold().underline().text} >>>`);
log(`<<< ${gach('Custom Styled Text').customStyle({ color: COLOR_NAMES.MAGENTA, bgColor: COLOR_NAMES.LIGHT_BLUE, strikethrough: true }).text} >>>`);

```

The result will be like below:

Output:
![alt text](./example.png "Example Result")

## Supported Colors & Styles
### Colors
Supported colors for both font and background are:
- red
- green
- blue
- yellow
- cyan
- magenta
- gray
- black
- lightRed
- lightGreen
- lightYellow
- lightBlue
- lightMagenta
- lightCyan

### Styles
Supported styles are:
- bold
- italic
- underline
- strikethrough
- inverse
