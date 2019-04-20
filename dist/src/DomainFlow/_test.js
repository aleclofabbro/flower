"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelsEE_1 = require("./ChannelsEE");
exports.tuc = {
    a: function (message, followup) {
        console.log('\n---\n', 'a', message, '\n---\n');
        setTimeout(function () { return followup('b', message + " is " + (message % 2 ? 'odd' : 'even')); }, 1100);
    },
    b: function (message, followup) {
        console.log('\n---\n', 'b', message, '\n---\n');
        setTimeout(function () { return followup('c', message.indexOf('odd') === -1); }, 1200);
    },
    c: function (message, followup) {
        console.log('\n---\n', 'c', message, '\n---\n');
        setTimeout(function () { return followup('a', message ? 1 : 0); }, 1400);
    },
};
exports.domain = ChannelsEE_1.createDomain(exports.tuc, {
    shortCircuit: false
    // shortCircuit: true
    // shortCircuit: ['a', 'b']
});
exports.send = function () {
    exports.domain.input.all(function (_, _meta) {
        if (_.msgName === 'a') {
            _.msg;
        }
        else if (_.msgName === 'b') {
            _.msg;
        }
        else if (_.msgName === 'c') {
            _.msg;
        }
    });
    exports.domain.input.on('a', function (_msg, _mta) { });
    exports.domain.input.all(console.log.bind(null, '\n\neeIn'));
    exports.domain.output.all(console.log.bind(null, '\n\neeOut'));
    exports.domain.input.emit('a', 1);
    // setTimeout(() => domain.output.emit('b', '1001'), 1000)
    // setTimeout(() => domain.output.emit('c', true), 1000)
};
//# sourceMappingURL=_test.js.map