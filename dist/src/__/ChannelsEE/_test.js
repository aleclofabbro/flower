"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var x = _1.channelsFor();
console.log(x('n', 0));
var n = x('n', function (_, __) { console.log('n', _, __); });
var s = x('s', function (_) { console.log('s', _); });
console.log(x('n', 1));
console.log(x('s', 'one'));
n();
console.log(x('n', 2));
console.log(x('s', 'two'));
s();
console.log(x('n', 3));
console.log(x('s', 'three'));
//# sourceMappingURL=_test.js.map