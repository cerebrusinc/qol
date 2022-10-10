# qol

Are you tired of making the same module in every project? Not a problem! Qol has your back.

This is a suite of random but useful functions that are aimed at giving you easy access to those functions in any project. The current features are as follows:

- Random Colour Generator
  - Currently returns colour as a hex

# Importing

```javascript
// ES6 Module
import * as qol from "@techtronics/qol";

// ES6 Destructing
import { randomColour } from "@techtronics/qol";

// ES5 Module
const qol = require("@techtronics/qol");

// ES5 Destructing
const { randomColour } = require("@techtronics/qol");
```

# Usage

```javascript
const c = randomColour();

console.log(c);
// #fcba03
```
