"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var rnd = function () { return parseInt(("" + Math.random()).substr(2)).toString(36); };
var id = function () { return ("" + rnd() + rnd()).padStart(22, 'x'); };
var MSG_EVENT = 'msg';
exports.channelsFor = function () {
    var emitters = {};
    //@ts-ignore
    var channels = function (msgName, h_or_msg) {
        var ee = (emitters[msgName] = emitters[msgName] || new events_1.EventEmitter());
        if ('function' === typeof h_or_msg) {
            var handler_1 = h_or_msg;
            //@ts-ignore
            ee.on(MSG_EVENT, handler_1);
            //@ts-ignore
            return function () { return ee.off(MSG_EVENT, handler_1); };
        }
        else {
            var msg = h_or_msg;
            var meta = {
                id: id(),
                msgName: "" + msgName
            };
            ee.emit(MSG_EVENT, msg, meta);
            return meta;
        }
    };
    return channels;
};
//# sourceMappingURL=index.js.map