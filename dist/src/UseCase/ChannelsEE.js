"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
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
        var handler = function (signal, meta) { return __awaiter(_this, void 0, void 0, function () {
            var useCaseNode, followUp, followups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        useCaseNode = useCase[sigName];
                        followUp = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (args.length !== 0) {
                                var _a = __read(args, 2), fwSigName = _a[0], signal_1 = _a[1];
                                signalOut(fwSigName, signal_1, meta);
                            }
                        };
                        return [4 /*yield*/, useCaseNode(signal, followUp)];
                    case 1:
                        followups = _a.sent();
                        if (followups) {
                            followups.forEach(function (followup) { return followUp.apply(void 0, __spread(followup)); });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        inSignals.on(sigName, handler);
        return Object.assign(unsubs, (_a = {},
            _a[sigName] = function () { return inSignals.off(sigName, handler); },
            _a));
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