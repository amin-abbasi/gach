import gach from '..'

console.log(`\n  <<< ${gach('My LIGHT BLUE color').color('lightBlue').text} >>>\n`)
console.log(`\n  <<< ${gach('My BOLD string').bold().text} >>>\n`)
console.log(`\n  <<< ${gach('My RGB color - code: [118, 38, 113]').rgb(118, 38, 113).text} >>>\n`)
console.log(`\n  <<< ${gach('My HEX color - code: #FF7733').hex('#FF7733').text} >>>\n`)
console.log(`\n  <<< ${gach('My NESTED bold underlined green').underline().bold().color('green').text} >>>\n`)
