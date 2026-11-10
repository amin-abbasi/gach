import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import gach, { COLOR_NAMES } from '../src/index';

const ESC = '\u001B[';
const END = '\x1b[0m';

describe('gach', () => {
    // Every test starts with colours on, whatever the environment running the tests says
    const saved = { NO_COLOR: process.env.NO_COLOR, FORCE_COLOR: process.env.FORCE_COLOR };
    beforeEach(() => {
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
    });
    afterEach(() => {
        for (const [key, value] of Object.entries(saved)) {
            if (value === undefined) delete process.env[key];
            else process.env[key] = value;
        }
    });

    it('colours the text and its background in one code, then resets', () => {
        assert.equal(gach('hi').color('red').text, `${ESC}31mhi${END}`);
        assert.equal(gach('hi').color(COLOR_NAMES.LIGHT_BLUE).bgColor('black').text, `${ESC}94;40mhi${END}`);
    });

    it('adds each style once, in the order given, after the colours', () => {
        assert.equal(gach('hi').bold().underline().bold().color('green').text, `${ESC}32m${ESC}1m${ESC}4mhi${END}`);
        assert.equal(gach('hi').italic().inverse().strikethrough().text, `${ESC}3m${ESC}7m${ESC}9mhi${END}`);
    });

    it('keeps an RGB or HEX colour when styles follow', () => {
        assert.equal(gach('hi').rgb(118, 38, 113).bold().text, `${ESC}38;2;118;38;113m${ESC}1mhi${END}`);
        assert.equal(gach('hi').bold().hex('#FF7733').underline().text, `${ESC}38;2;255;119;51m${ESC}1m${ESC}4mhi${END}`);
        assert.equal(gach('hi').hex('#f73').text, `${ESC}38;2;255;119;51mhi${END}`);
    });

    it('reports a wrong colour and leaves the text as it was', (t) => {
        const errors = t.mock.method(console, 'error', () => {});
        assert.equal(gach('hi').rgb(300, 0, 0).text, 'hi');
        assert.equal(gach('hi').hex('#12').text, 'hi');
        assert.equal(gach('hi').color('purple' as never).bold().text, `${ESC}1mhi${END}`);
        assert.equal(gach('hi').bgColor('purple' as never).text, 'hi');
        assert.equal(errors.mock.callCount(), 4);
    });

    it('gives gray a gray background, not a white one', () => {
        assert.equal(gach('hi').bgColor('gray').text, `${ESC}100mhi${END}`);
    });

    it('applies several styles at once, and extra ANSI codes', () => {
        const options = { color: COLOR_NAMES.MAGENTA, bgColor: COLOR_NAMES.LIGHT_BLUE, strikethrough: true, bold: false, orange: '38;5;208', note: 'not a code' };
        assert.equal(gach('hi').customStyle(options).text, `${ESC}35;104m${ESC}9m${ESC}38;5;208mhi${END}`);
    });

    it('resets to the original text', () => {
        assert.equal(gach('hi').color('red').bold().reset().text, 'hi');
        assert.equal(gach('hi').color('red').reset().underline().text, `${ESC}4mhi${END}`);
    });

    it('has success, error, warning and rainbow presets', () => {
        assert.equal(gach('ok').success().text, `${ESC}32m${ESC}1mok${END}`);
        assert.equal(gach('no').error().text, `${ESC}31m${ESC}1m${ESC}4mno${END}`);
        assert.equal(gach('hm').warning().text, `${ESC}33m${ESC}1m${ESC}3mhm${END}`);
        assert.equal(gach('ab').rainbow().text, `${ESC}31ma${END}${ESC}33mb${END}`);
        // A character outside the basic plane stays whole
        assert.equal(gach('😀').rainbow().text, `${ESC}31m😀${END}`);
    });

    it('leaves the text plain with NO_COLOR, unless FORCE_COLOR says otherwise', () => {
        process.env.NO_COLOR = '1';
        assert.equal(gach('hi').color('red').bold().text, 'hi');
        assert.equal(gach('hi').hex('#FF7733').text, 'hi');
        assert.equal(gach('ab').rainbow().text, 'ab');
        process.env.FORCE_COLOR = '1';
        assert.equal(gach('hi').color('red').text, `${ESC}31mhi${END}`);
        process.env.FORCE_COLOR = '0';
        delete process.env.NO_COLOR;
        assert.equal(gach('hi').color('red').text, 'hi');
        // An empty NO_COLOR does not count
        delete process.env.FORCE_COLOR;
        process.env.NO_COLOR = '';
        assert.equal(gach('hi').color('red').text, `${ESC}31mhi${END}`);
    });
});
