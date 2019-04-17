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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var rnd = function () { return parseInt(("" + Math.random()).substr(2)).toString(36); };
var id = function () { return ("" + rnd() + rnd()).padStart(22, 'x'); };
var newMeta = function () { return ({
    id: id()
}); };
var SIG_ALL_NAME = '*';
exports.createDomain = function (domainFlow, opts) {
    if (opts === void 0) { opts = {}; }
    var outMessages = new events_1.EventEmitter();
    var outMessagesAll = new events_1.EventEmitter();
    var inMessages = new events_1.EventEmitter();
    var inMessagesAll = new events_1.EventEmitter();
    var messageOut = function (msgName, message, meta) {
        if (meta === void 0) { meta = newMeta(); }
        if ('string' !== typeof msgName) {
            throw "messageOut : Only string msgNames - msgName:" + msgName + " message:" + message;
        }
        var target = outMessages;
        var targetAll = outMessagesAll;
        if (opts.shortCircuit) {
            if ('boolean' === typeof opts.shortCircuit || opts.shortCircuit.find(function (_) { return msgName === _; })) {
                target = inMessages;
                targetAll = inMessagesAll;
            }
        }
        targetAll.emit(SIG_ALL_NAME, msgName, message, meta);
        target.emit(msgName, message, meta);
    };
    var messageIn = function (msgName, message, meta) {
        if (meta === void 0) { meta = newMeta(); }
        if ('string' !== typeof msgName) {
            throw "messageIn : Only string msgNames - msgName:" + msgName + " message:" + message;
        }
        inMessagesAll.emit(SIG_ALL_NAME, msgName, message, meta);
        inMessages.emit(msgName, message, meta);
    };
    var probeFor = function (emitter) {
        return function (msgName, probe) {
            if ('string' !== typeof msgName) {
                throw "probeFor : Only string msgNames - msgName:" + msgName;
            }
            var handler = function (message, meta) {
                probe(message, meta);
            };
            emitter.on(msgName, handler);
            return function () { return emitter.off(msgName, handler); };
        };
    };
    var probeForAll = function (emitterAll) {
        return function (probe) {
            var handler = function (msgName, message, meta) {
                probe(msgName, message, meta);
            };
            emitterAll.on(SIG_ALL_NAME, handler);
            return function () { return emitterAll.off(SIG_ALL_NAME, handler); };
        };
    };
    var probeIn = probeFor(inMessages);
    var probeOut = probeFor(outMessages);
    var probeInAll = probeForAll(inMessagesAll);
    var probeOutAll = probeForAll(outMessagesAll);
    var msgNames = Object.keys(domainFlow);
    var unsubscribe = msgNames.reduce(function (unsubs, msgName) {
        var _a;
        var handler = function (message, meta) { return __awaiter(_this, void 0, void 0, function () {
            var domainFlowNode, follows;
            return __generator(this, function (_a) {
                domainFlowNode = domainFlow[msgName];
                follows = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (args.length !== 0) {
                        var _a = __read(args, 2), fwMsgName = _a[0], message_1 = _a[1];
                        messageOut(fwMsgName, message_1, meta);
                    }
                };
                domainFlowNode(message, follows);
                return [2 /*return*/];
            });
        }); };
        inMessages.on(msgName, handler);
        return Object.assign(unsubs, (_a = {},
            _a[msgName] = function () { return inMessages.off(msgName, handler); },
            _a));
    }, {});
    return {
        probeIn: probeIn,
        probeOut: probeOut,
        probeInAll: probeInAll,
        probeOutAll: probeOutAll,
        messageOut: messageOut,
        messageIn: messageIn,
        unsubscribe: unsubscribe
    };
};
//# sourceMappingURL=ChannelsEE.js.map