# css-selector-splitter
Split CSS selectors by commas or blocks

[![Build Status](https://travis-ci.org/perry-mitchell/css-selector-splitter.svg?branch=master)](https://travis-ci.org/perry-mitchell/css-selector-splitter)

## Compatibility
Node v6 is supported (full ES6).

## Usage
Simply require the main function:

```
const splitSelector = require("css-selector-splitter");

let selectors = splitSelector("div#gallery, div.slide"); // ["div#gallery", "div.slide"]
```

This library also supports the splitting of relationship blocks:

```
const extractBlocks = require("css-selector-splitter").extractBlocks;

let items = extractBlocks("div.level1 div#level2 > span.level3 ~ p");
// returns:
// [
//   "div.level1",
//   "div#level2",
//   "span.level3",
//   "p"
// ]
```
