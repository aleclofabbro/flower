"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelsEE_1 = require("./ChannelsEE");
var tuc = {
    a: function (signal, followup) {
        console.log('\n---\n', 'a', signal, '\n---\n');
        followup('b', signal.toFixed(10));
    },
    b: function (signal, followup) {
        console.log('\n---\n', 'b', signal, '\n---\n');
        followup('c', signal.length === 0);
    },
    c: function (signal, followup) {
        console.log('\n---\n', 'c', signal, '\n---\n');
        followup('a', signal ? 1 : 0);
    },
};
exports.domain = ChannelsEE_1.createDomain(tuc, { shortCircuit: ['a', 'b'] });
exports.domain.probeInAll(console.log.bind(null, '\n\nprobeInAll'));
exports.domain.probeOutAll(console.log.bind(null, '\n\nprobeOutAll'));
exports.domain.signalIn('a', 1);
//# sourceMappingURL=_test.js.map