# gach
**gach** is a package designed to add color and style to your terminal text messages.

## Features
- Pre-defined system font & background colors (red, green, ...).
- Font color using `rgb` and `hex` values.
- Font styles (bold, italic, underline, strikethrough, inverse).
- Nested functions for chaining styles.
- Reset function to revert text to its original state.


## Install
You can install **gach** using npm:
```bash
npm i gach
```

## Usage
You can use this package like this in both Javascript and Typescript:
```js
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
