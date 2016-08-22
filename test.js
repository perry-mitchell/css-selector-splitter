const splitSelector = require("./index.js");
const extractBlocks = splitSelector.extractBlocks;

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

	}

};
