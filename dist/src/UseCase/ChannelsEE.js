"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var rnd = function () { return parseInt(("" + Math.random()).substr(2)).toString(36); };
var id = function () { return ("" + rnd() + rnd()).padStart(22, 'x'); };
var newMeta = function () { return ({
    id: id()
}); };
var SIG_ALL_NAME = '*';
exports.createDomain = function (useCase, opts) {
    if (opts === void 0) { opts = {}; }
    var outSignals = new events_1.EventEmitter();
    var outSignalsAll = new events_1.EventEmitter();
    var inSignals = new events_1.EventEmitter();
    var inSignalsAll = new events_1.EventEmitter();
    var signalOut = function (sigName, signal, meta) {
        if (meta === void 0) { meta = newMeta(); }
        if ('string' !== typeof sigName) {
            throw "signalOut : Only string sigNames - sigName:" + sigName + " signal:" + signal;
        }
        var target = outSignals;
        var targetAll = outSignalsAll;
        if (opts.shortCircuit) {
            if ('boolean' === typeof opts.shortCircuit || opts.shortCircuit.find(function (_) { return sigName === _; })) {
                target = inSignals;
                targetAll = inSignalsAll;
            }
        }
        targetAll.emit(SIG_ALL_NAME, sigName, signal, meta);
        target.emit(sigName, signal, meta);
    };
    var signalIn = function (sigName, signal, meta) {
        if (meta === void 0) { meta = newMeta(); }
        if ('string' !== typeof sigName) {
            throw "signalIn : Only string sigNames - sigName:" + sigName + " signal:" + signal;
        }
        inSignalsAll.emit(SIG_ALL_NAME, sigName, signal, meta);
        inSignals.emit(sigName, signal, meta);
    };
    var probeFor = function (emitter) {
        return function (sigName, probe) {
            if ('string' !== typeof sigName) {
                throw "probeFor : Only string sigNames - sigName:" + sigName;
            }
            var handler = function (signal, meta) {
                probe(signal, meta);
            };
            emitter.on(sigName, handler);
            return function () { return emitter.off(sigName, handler); };
        };
    };
    var probeForAll = function (emitterAll) {
        return function (probe) {
            var handler = function (sigName, signal, meta) {
                probe(sigName, signal, meta);
            };
            emitterAll.on(SIG_ALL_NAME, handler);
            return function () { return emitterAll.off(SIG_ALL_NAME, handler); };
        };
    };
    var probeIn = probeFor(inSignals);
    var probeOut = probeFor(outSignals);
    var probeInAll = probeForAll(inSignalsAll);
    var probeOutAll = probeForAll(outSignalsAll);
    var sigNames = Object.keys(useCase);
    var unsubscribe = sigNames.reduce(function (unsubs, sigName) {
        var _a;
        var handler = function (signal, meta) {
            //inSignalsAll.emit(SIG_ALL_NAME, sigName, signal, meta)
            var useCaseNode = useCase[sigName];
            var followUp = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (args.length !== 0) {
                    var fwSigName = args[0], signal_1 = args[1];
                    signalOut(fwSigName, signal_1, meta);
                }
            };
            useCaseNode(signal, followUp);
        };
        inSignals.on(sigName, handler);
        return __assign({}, unsubs, (_a = {}, _a[sigName] = function () { return inSignals.off(sigName, handler); }, _a));
    }, {});
    return {
        probeIn: probeIn,
        probeOut: probeOut,
        probeInAll: probeInAll,
        probeOutAll: probeOutAll,
        signalOut: signalOut,
        signalIn: signalIn,
        unsubscribe: unsubscribe
    };
};
//# sourceMappingURL=ChannelsEE.js.map