import gach, { COLOR_NAMES } from '../src/index';

const log = console.log;

log(`<<< ${gach('').color('magenta').bold().text} >>> <-- Warning: Received an Empty String!`);
log(`<<< ${gach('INFO: Text styled with LIGHT BLUE').color(COLOR_NAMES.LIGHT_BLUE).text} >>>`);
log(`<<< ${gach('ALERT: Important message with a red background').bgColor(COLOR_NAMES.RED).bold().text} >>>`);
log(`<<< ${gach('NOTE: Text styled with custom RGB color [118, 38, 113]').rgb(118, 38, 113).text} >>>`);
log(`<<< ${gach('INFO: Styled with HEX color code #FF7733').hex('#FF7733').text} >>>`);
log(`<<< ${gach('CAUTION: Emphasized with bold, underline, and green text').underline().bold().color('green').text} >>>`);
log(`<<< ${gach('DEBUG: Reset text formatting to normal').underline().bold().color(COLOR_NAMES.RED).reset().text} >>>`);
log(`<<< ${gach('SUCCESS: Styled with red text and yellow background').bgColor(COLOR_NAMES.LIGHT_YELLOW).color(COLOR_NAMES.RED).bold().underline().text} >>>`);
log(`<<< ${gach('Custom Styled Text').customStyle({ color: COLOR_NAMES.MAGENTA, bgColor: COLOR_NAMES.LIGHT_BLUE, strikethrough: true }).text} >>>`);
