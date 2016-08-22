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
                // we're not inside another block, so we can split using the comma
                selectors.push(currentSelector.trim());
                currentSelector = "";
            } else {
                // we're inside another block, so ignore the comma
                currentSelector += char;
            }
        } else {
            // just add this character
            currentSelector += char;
        }
    }
    selectors.push(currentSelector.trim());
    return selectors.filter((cssSelector) => cssSelector.length > 0);
}

function extractSelectorBlocks(selector) {
    return splitSelector(selector, ["+", "~", ">", " "]);
}

splitSelector.extractBlocks = extractSelectorBlocks;

module.exports = splitSelector;
