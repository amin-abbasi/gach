import gach, { COLOR_NAMES } from '../src/index'

const log = console.log

log(`<<< ${gach('').color('magenta').bold().text} >>> <-- Empty String!`)
log(`<<< ${gach('My LIGHT BLUE color').color(COLOR_NAMES.LIGHT_BLUE).text} >>>`)
log(`<<< ${gach('My BOLD string with red background').bgColor(COLOR_NAMES.RED).bold().text} >>>`)
log(`<<< ${gach('My RGB color - code: [118, 38, 113]').rgb(118, 38, 113).text} >>>`)
log(`<<< ${gach('My HEX color - code: #FF7733').hex('#FF7733').text} >>>`)
log(`<<< ${gach('My NESTED BOLD underlined green').underline().bold().color('green').text} >>>`)
log(`<<< ${gach('My normal text without changes').underline().bold().color(COLOR_NAMES.RED).reset().text} >>>`)
