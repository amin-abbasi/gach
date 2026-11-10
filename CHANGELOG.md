# Changelog

## 1.8.1

The first release with these changes (1.8.0 was not published).

### Fixed

- An `rgb()` or `hex()` color was lost when another style followed it (`gach('x').hex('#f73').bold()` was bold only).
- `customStyle()` collected extra ANSI codes but never applied them; codes such as `'38;5;208'` now apply, and other values are ignored.
- An unknown color name (from JavaScript, or a cast in TypeScript) threw a `TypeError`; it is now reported on the console and ignored, as invalid RGB and HEX values already were.
- The `gray` background was white (code 47); it is now gray (100), matching the `gray` text color (90).
- `rainbow()` no longer splits characters outside the basic plane (emoji) in two.
- The npm package held the sources and the README pictures (451 KB); it now holds `dist` only (28 KB).

### Added

- `NO_COLOR` turns colors off and `FORCE_COLOR` overrides it, as in Node.js (see "Turning colors off" in the README).
- Tests (`pnpm test`, with `node:test`) and pinned development tools, installed with pnpm (`pnpm-lock.yaml`); the old visual check is `examples/demo.ts`.

Every color and style that worked before produces exactly the same escape codes.
