"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelsEE_1 = require("./ChannelsEE");
var tuc = {
    a: function (signal, followup) {
        console.log('\n---\n', 'a', signal, '\n---\n');
        setTimeout(function () { return followup('b', signal + " is " + (signal % 2 ? 'odd' : 'even')); }, 1100);
    },
    b: function (signal, followup) {
        console.log('\n---\n', 'b', signal, '\n---\n');
        setTimeout(function () { return followup('c', signal.indexOf('odd') === -1); }, 1200);
        setTimeout(function () { return followup('a', parseInt(signal) + 1); }, 1200);
    },
    c: function (signal, followup) {
        console.log('\n---\n', 'c', signal, '\n---\n');
        setTimeout(function () { return followup('a', signal ? 1 : 0); }, 1400);
    },
};
exports.domain = ChannelsEE_1.createDomain(tuc, { shortCircuit: ['a', 'b'] });
exports.domain.probeInAll(console.log.bind(null, '\n\nprobeInAll'));
exports.domain.probeOutAll(console.log.bind(null, '\n\nprobeOutAll'));
exports.domain.signalIn('a', 1);
setTimeout(function () { return exports.domain.signalIn('a', 1001); }, 1000);
//# sourceMappingURL=_test.js.map