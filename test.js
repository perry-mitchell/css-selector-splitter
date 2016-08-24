const splitSelector = require("./index.js");
const splitSelectorBlocks = splitSelector.splitSelectorBlocks;
const joinSelector = splitSelector.joinSelector;

module.exports = {

    splitSelector: {

        splitsByComma: function(test) {
            let selectors = splitSelector("div.someClass, a.another");
            test.strictEqual(selectors[0], "div.someClass");
            test.strictEqual(selectors[1], "a.another");
            test.done();
        },

        recognisesOnlyOutterCommas: function(test) {
            let selectors = splitSelector("a#item span , p[alt^='test , text']");
            test.strictEqual(selectors[0], "a#item span");
            test.strictEqual(selectors[1], "p[alt^='test , text']");
            test.done();
        }

    },

    splitSelectorBlocks: {

        returnsSelectorsAndJoiners: function(test) {
            let split = splitSelectorBlocks("a#item p[alt^='test , text']");
            test.ok(split.selectors, "Selectors should be defined");
            test.ok(split.joiners, "Joiners should be defined");
            test.done();
        },

        returnsCorrectSelectorsAndJoiners: function(test) {
            let split = splitSelectorBlocks("a#item p[alt^='test , text'] ~ span"),
                selectors = split.selectors,
                joiners = split.joiners;
            test.strictEqual(selectors[0], "a#item");
            test.strictEqual(selectors[1], "p[alt^='test , text']");
            test.strictEqual(selectors[2], "span");
            test.strictEqual(joiners[0], " ");
            test.strictEqual(joiners[1], "~");
            test.done();
        },

        understandsSpaceCombinations: function(test) {
            let split = splitSelectorBlocks("div.entry-content > p > img"),
                selectors = split.selectors,
                joiners = split.joiners;
            test.strictEqual(selectors[0], "div.entry-content");
            test.strictEqual(selectors[1], "p");
            test.strictEqual(selectors[2], "img");
            test.strictEqual(selectors.length, 3);
            test.strictEqual(joiners[0], ">");
            test.strictEqual(joiners[1], ">");
            test.strictEqual(joiners.length, 2);
            test.done();
        }

    },

    joinSelector: {

        joinsCorrectly: function(test) {
            let selector = joinSelector(
                [ "#part1", ".part2", "[part3]" ],
                [ " ", ">" ]
            );
            test.strictEqual(selector, "#part1 .part2 > [part3]");
            test.done();
        }

    }

};
