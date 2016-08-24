"use strict";

const BRACES = {
    "(": ")",
    "[": "]",
    '"': '"',
    "'": "'"
};

const CLOSING_BRACES = {
    ")": "(",
    "]": "["
};

function splitSelector(selector, splitCharacters = [","]) {
    let currentBraces = [],
        selectorLen = selector.length,
        selectors = [],
        joiners = [],
        currentSelector = "",
        closingBraces = {};
    for (var i = 0; i < selectorLen; i += 1) {
        let char = selector[i];
        if (BRACES.hasOwnProperty(char)) {
            if (currentBraces.length === 0) {
                currentBraces.push(char);
            } else {
                let lastBrace = currentBraces[currentBraces.length - 1];
                if (lastBrace === "\"" || lastBrace === "'") {
                    // within quotes
                    if (char === lastBrace) {
                        // closing quote
                        currentBraces.pop();
                    }
                } else {
                    // inside brackets or square brackets
                    currentBraces.push(char);
                }
            }
            currentSelector += char;
        } else if (CLOSING_BRACES.hasOwnProperty(char)) {
            let lastBrace = currentBraces[currentBraces.length - 1],
                matchingOpener = CLOSING_BRACES[char];
            if (lastBrace === matchingOpener) {
                currentBraces.pop();
            }
            currentSelector += char;
        } else if (splitCharacters.indexOf(char) >= 0) {
            if (currentBraces.length <= 0) {
                // we're not inside another block, so we can split using the comma/splitter
                let lastJoiner = joiners[joiners.length - 1];
                if (lastJoiner === " " && currentSelector.length <= 0) {
                    // we just split by a space, but there seems to be another split character, so use
                    // this new one instead of the previous space
                    joiners[joiners.length - 1] = char;
                } else if (currentSelector.length <= 0) {
                    // skip this character, as it's just padding
                } else {
                    // split by this character
                    let newLength = selectors.push(currentSelector.trim());
                    joiners[newLength - 1] = char;
                    currentSelector = "";
                }
            } else {
                // we're inside another block, so ignore the comma/splitter
                currentSelector += char;
            }
        } else {
            // just add this character
            currentSelector += char;
        }
    }
    selectors.push(currentSelector.trim());
    return {
        selectors: selectors.filter((cssSelector) => cssSelector.length > 0),
        joiners: joiners
    };
}

// output:

function extractSelectors(selector, splitChars) {
    let split = splitSelector(selector, splitChars);
    return split.selectors;
}

function extractSelectorBlocks(selector) {
    return splitSelector(selector, ["+", "~", ">", " "]);
}

function joinParts(selectors, joiners) {
    let selector = "",
        selectorCount = selectors.length;
    selectors.forEach(function(part, index) {
        let suffix = joiners[index];
        if (!suffix) {
            if ((selectorCount - 1) === index) {
                suffix = "";
            } else {
                throw new Error(`No joiner for index: ${index}`);
            }
        } else {
            if (suffix !== " ") {
                suffix = ` ${suffix} `;
            }
        }
        selector += part + suffix;
    });
    return selector;
}

extractSelectors.splitSelectorBlocks = extractSelectorBlocks;

extractSelectors.joinSelector = joinParts;

module.exports = extractSelectors;
