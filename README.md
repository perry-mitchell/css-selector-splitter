# css-selector-splitter
Split CSS selectors by commas or blocks

[![Build Status](https://travis-ci.org/perry-mitchell/css-selector-splitter.svg?branch=master)](https://travis-ci.org/perry-mitchell/css-selector-splitter)

## Compatibility
Node v6 is supported (full ES6).

## Why make this?
_Are their other splitting libraries? Do they do the same thing as yours?_
Yes and somewhat. This library allows for splitting of relationship blocks too: "div > a ~ p". Other libraries that I've tested also don't cater for text within attribute values, so [splitting fails](https://github.com/joakimbeng/split-css-selector/issues/1) if certain characters are encountered within these fields.

## Usage
Simply require the main function:

```
const splitSelector = require("css-selector-splitter");

let selectors = splitSelector("div#gallery, div.slide"); // ["div#gallery", "div.slide"]
```

This library also supports the splitting of relationship blocks:

```
const splitSelectorBlocks = require("css-selector-splitter").splitSelectorBlocks;

let items = splitSelectorBlocks("div.level1 div#level2 > span.level3 ~ p");
// returns:
// {
//   selectors: [
//     "div.level1",
//     "div#level2",
//     "span.level3",
//     "p"
//   ],
//   joiners: [
//     " ",
//     ">",
//     "~"
//   ]
// }
```

You can join selectors as well:

```
const joinSelector = require("css-selector-splitter").joinSelector;

let selector = joinSelector(["div.a", "div.b"], [">"]); // this can also be output from 'splitSelectorBlocks'
// returns: "div.a > div.b"
```
