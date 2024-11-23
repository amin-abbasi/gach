import gach, { COLOR_NAMES } from '../src/index';

const log = console.log;

// Styling Examples:

// 1. Empty text test:
log(`<<< ${gach('').color('magenta').bold().text} >>> <-- Warning: Received an Empty String!`);

// 2. Text styled with Light Blue color:
log(`<<< ${gach('Text styled with LIGHT BLUE').color(COLOR_NAMES.LIGHT_BLUE).text} >>>`);

// 3. Text with a red background and bold style:
log(`<<< ${gach('Important message with a red background').bgColor(COLOR_NAMES.RED).bold().text} >>>`);

// 4. Custom RGB color [118, 38, 113]:
log(`<<< ${gach('Text styled with custom RGB color [118, 38, 113]').rgb(118, 38, 113).text} >>>`);

// 5. Styled with HEX color code #FF7733:
log(`<<< ${gach('Styled with HEX color code #FF7733').hex('#FF7733').text} >>>`);

// 6. Bold, underline, and green text:
log(`<<< ${gach('Emphasized with bold, underline, and green text').underline().bold().color('green').text} >>>`);

// 7. Reset text formatting to normal:
log(`<<< ${gach('Reset text formatting to normal').underline().bold().color(COLOR_NAMES.RED).reset().text} >>>`);

// 8. Styled with red text and yellow background:
log(`<<< ${gach('Styled with red text and yellow background').bgColor(COLOR_NAMES.LIGHT_YELLOW).color(COLOR_NAMES.RED).bold().underline().text} >>>`);

// 9. Success message (green, bold):
log(`<<< ${gach("Success message: Operation successful").success().text} >>>`);

// 10. Error message (red, bold, underlined):
log(`<<< ${gach("Error message: Something went wrong!").error().text} >>>`);

// 11. Warning message (yellow, bold, italic):
log(`<<< ${gach("Warning message: Be cautious!").warning().text} >>>`);

// 12. Rainbow effect (multicolored text):
log(`<<< ${gach("Rainbow effect: Colorful Text!").rainbow().text} >>>`);

// 13. Custom styled message with specific colors, background, and strikethrough:
log(`<<< ${gach('This is a custom styled message').customStyle({ color: COLOR_NAMES.MAGENTA, bgColor: COLOR_NAMES.LIGHT_BLUE, strikethrough: true }).text} >>>`);

