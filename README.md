# gach
This is a package to colorize your terminal text messages.

## Install
You can install it by:
`npm i gach`

## Usage
You can use this package like this:
```js
import gach from '..'

console.log(`<<< ${gach('My LIGHT BLUE color').color('lightBlue').text} >>>`)
console.log(`<<< ${gach('My BOLD string').bold().text} >>>`)
console.log(`<<< ${gach('My RGB color - code: [118, 38, 113]').rgb(118, 38, 113).text} >>>`)
console.log(`<<< ${gach('My HEX color - code: #FF7733').hex('#FF7733').text} >>>`)
console.log(`<<< ${gach('My NESTED bold underlined green').underline().bold().color('green').text} >>>`)
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
