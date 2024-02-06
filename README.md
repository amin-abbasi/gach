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

log(`<<< ${gach('').color('magenta').bold().text} >>> <-- Empty String!`)
log(`<<< ${gach('My LIGHT BLUE color').color(COLOR_NAMES.LIGHT_BLUE).text} >>>`)
log(`<<< ${gach('My BOLD string').bold().text} >>>`)
log(`<<< ${gach('My RGB color - code: [118, 38, 113]').rgb(118, 38, 113).text} >>>`)
log(`<<< ${gach('My HEX color - code: #FF7733').hex('#FF7733').text} >>>`)
log(`<<< ${gach('My NESTED bold underlined green').underline().bold().color('green').text} >>>`)
log(`<<< ${gach('My normal text without changes').underline().bold().color(COLOR_NAMES.RED).reset().text} >>>`)

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
