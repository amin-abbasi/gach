import gach from '..'

const log = console.log

log(`<<< ${gach('My LIGHT BLUE color').color('lightBlue').text} >>>`)
log(`<<< ${gach('My BOLD string').bold().text} >>>`)
log(`<<< ${gach('My RGB color - code: [118, 38, 113]').rgb(118, 38, 113).text} >>>`)
log(`<<< ${gach('My HEX color - code: #FF7733').hex('#FF7733').text} >>>`)
log(`<<< ${gach('My NESTED bold underlined green').underline().bold().color('green').text} >>>`)
