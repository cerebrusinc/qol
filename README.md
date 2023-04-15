<p align="center">
    <img src="https://drive.google.com/uc?id=1WYEiPnhOGXQdMsF7L0sFRNDlVvtKOobz" alt="py-qol logo" width="250" height="250" />
</p>

# qol

Are you tired of making the same module in every project? Not a problem! Qol has your back.

A suite of random but useful functions that are aimed at giving you 'piece of cake' level comfortability.

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
<br />

## parseDate

Send in date parameters and receive either an object with their metadata, or a parsed date (e.g `2 Sep 2020`); American formatting is possible (e.g `Sep 2 2020`).

**NOTE:** You do not need to add 1 to the day or month, it will do that for you.

Returns a `string` or `DateObject`

```javascript
const d = new Date();

const dateArr = [d.getDate(), d.getDay(), d.getMonth(), d.getFullYear()];

const pD = parseDate(...dateArr, "nll", true);
const pDfull = parseDate(...dateArr, "lll");

console.log(pD, pDfull);
// October 24 2022, Monday 24th October 2022
```

<details>
<summary><strong>interface</strong></summary>

```ts
interface DateObject {
	day: {
		short: string;
		long: string;
		ordinalMonth: string;
		ordinalWeek: string;
		weekNumber: number;
		monthNumber: number;
	};
	month: {
		short: string;
		long: string;
		ordinal: string;
		number: number;
	};
	year: {
		short: number;
		long: number;
	};
}
```

</details>
<br />

<details>
<summary><strong>Params</strong></summary>

| Parameter | Default Setting | Required? | Definition                                                    | Options                                                                                                       |
| --------- | --------------- | --------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| monthDay  | `none`          | Yes       | The day of the month                                          | type `number`                                                                                                 |
| weekDay   | `none`          | Yes       | The day of the week                                           | type `number`                                                                                                 |
| month     | `none`          | Yes       | The numeric month                                             | type `number`                                                                                                 |
| year      | `none`          | Yes       | The full numeric year                                         | type `number`                                                                                                 |
| format    | `none`          | No        | The date format you would like                                | n = numeric, s = shorthand text, l = full text; `nns`, `nnl`, `sss`, `ssl`, `lll`, `nss`, `nsl`, `nls`, `nll` |
| american  | `false`         | No        | Whether or not you would like the format to be 'Americanised' | `true`, `false`                                                                                               |

</details>
<br />

## numParse

Convert a number into a string as if it's MS Excel!

Returns a `string`

```javascript
const num = numParse(2100.45, "space");
const numEurope = numParse(2100.45, "punct");
const numCustom = numParse(2100.45, "-" as any);

console.log(num, numEurope, numCustom);
// 2 100.45, 2.100,45, 2-100.45)
```

<details>
<summary><strong>Params</strong></summary>

| Parameter | Default Setting | Required? | Definition                       | Options                                                    |
| --------- | --------------- | --------- | -------------------------------- | ---------------------------------------------------------- |
| value     | `undefined`     | Yes       | The number you want to be parsed | `none`                                                     |
| setting   | `comma`         | No        | The delimiter for the number     | `space`, `comma`, `punct`, any other delimiter as a string |

</details>
<br />

# Changelog

## v1.0.x

<details open>
<summary><strong>v1.0.0</strong></summary>

- `numParse()` updates; Breaking change
  - You can now send the value as a `string`
  - To use a custom seperator, you must declare it `as any`
  - The `setting` parameter is now options, it defaults to a comma
  - Parity with our python [qolpy](https://pypi.org/project/qolpy/) package
- Added icon to README

</details>
<br />

## v0.1.x

<details>
<summary><strong>v0.1.3</strong></summary>

- Fully added `numParse()`
  - Add delimiters to your numbers, ideal for frontend

</details>

<details>
<summary><strong>v0.1.2</strong></summary>

- Fully added `parseDate()`
  - Get date params (e.g long text version and numeric verison) in an object or a parsed date as text e.g '2 Sep 2020'
  - Can return in American format eg 'Sep 2 2020'
  - View the param options to see how many different types of date formats you can choose

</details>

<details>
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
