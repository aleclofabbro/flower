"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelsEE_1 = require("./ChannelsEE");
var tuc = {
    a: function (message, followup) {
        console.log('\n---\n', 'a', message, '\n---\n');
        setTimeout(function () { return followup('b', message + " is " + (message % 2 ? 'odd' : 'even')); }, 1100);
    },
    b: function (message, followup) {
        console.log('\n---\n', 'b', message, '\n---\n');
        setTimeout(function () { return followup('c', message.indexOf('odd') === -1); }, 1200);
        setTimeout(function () { return followup('a', parseInt(message) + 1); }, 1200);
    },
    c: function (message, followup) {
        console.log('\n---\n', 'c', message, '\n---\n');
        setTimeout(function () { return followup('a', message ? 1 : 0); }, 1400);
    },
};
exports.domain = ChannelsEE_1.createDomain(tuc, { shortCircuit: true }); //['a', 'b'] })
exports.domain.probeInAll(console.log.bind(null, '\n\nprobeInAll'));
exports.domain.probeOutAll(console.log.bind(null, '\n\nprobeOutAll'));
exports.domain.messageIn('a', 1);
setTimeout(function () { return exports.domain.messageIn('a', 1001); }, 1000);
//# sourceMappingURL=_test.js.map