# qol

Are you tired of making the same module in every project? Not a problem! Qol has your back.

This is a suite of random but useful functions that are aimed at giving you easy access to those functions in any project. The current features are as follows:

# Importing

```javascript
// ES6 Module
import * as qol from "@techtronics/qol";

// ES6 Destructuring
import { randomColour } from "@techtronics/qol";

// ES5 Module
const qol = require("@techtronics/qol");

// ES5 Destructuring
const { randomColour } = require("@techtronics/qol");
```

# Functions

## randomColour

Get a random colour; For those scenarios where you couldn't care less!

Returns a `string`

```javascript
const c = randomColour();
const cRGB = randomColour("rgb");
const cCMYK = randomColour("cmyk");
const cHSV = randomColour("hsv");
const cHSL = randomColour("hsl");

console.log(c, cRGB, cCMYK, cHSV, cHSL);
// #f7f7f7, rgb(247,247,247), cmyk(0%,0%,0%,3%), hsv(0,0%,97%), hsl(0,0%,97%)
```

<details>
<summary><strong>Params</strong></summary>

| Parameter | Default Setting | Required? | Definition                                 | Options                            |
| --------- | --------------- | --------- | ------------------------------------------ | ---------------------------------- |
| setting   | `hex`           | No        | The type of colour you would like returned | `hex`, `rgb`, `cmyk`, `hsv`, `hsl` |

</details>

# Changelog

## v0.1.x

<details open>
<summary><strong>v0.1.1</strong></summary>

- Type hint updates
- README restructuring
- Source resturing
- Update to `randomColour()`
  - Get the colour as a hex, rgb, cmyk, hsv, or hsl string
- Parse date funtion (WIP)

</details>

<details>
<summary><strong>v0.1.0</strong></summary>

- Initial release
- Sentence casing, title casing, and abrreviations added and typed

</details>
