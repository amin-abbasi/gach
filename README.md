# gach
This is a package to colorize your terminal text messages.

## Install & Use
You can install it by:
`npm i gach`

Then use it like this:
```js
import 'gach'

const coloredString = 'your string'.color('red')
console.log(`<<<<< ${coloredString} >>>>>`)
```

The result will be like below:

Output:
![alt text](./example.png "Example Result")

## Supported Colors & Font Actions
Supported colors for both font and background are:
- red
- green
- blue
- yellow
- cyan
- magenta
- gray
- black

Supported actions are:
- bold
- italic
- underline
- strikethrough
- inverse