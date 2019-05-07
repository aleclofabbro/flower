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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// export interface More<Tsk extends Task<any, any>> {
//   names: Names
// }
// export type Probes = 'trigger' | 'outcome'
var namesFor = function (name) { return ({
    trigger: name + ":trigger",
    queue: name + ":queue",
    outcome: name + ":outcome"
}); };
var rnd = function () { return parseInt(("" + Math.random()).substr(2)).toString(36).padStart(11, '0'); };
var uuid = function () { return "" + rnd() + rnd(); };
exports.adapt = function (channel, name) { return __awaiter(_this, void 0, void 0, function () {
    var names, trigger, outcome, queue, triggerTask, probe, consume;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                names = namesFor(name);
                trigger = names.trigger, outcome = names.outcome, queue = names.queue;
                return [4 /*yield*/, Promise.all([
                        channel.assertExchange(trigger, 'headers', {
                            durable: true
                        }),
                        channel.assertExchange(outcome, 'headers', {
                            durable: true
                        }),
                        channel.assertQueue(queue, {
                            durable: true
                        }),
                        channel.bindQueue(queue, trigger, '')
                    ])];
            case 1:
                _a.sent();
                triggerTask = function (t) { return __awaiter(_this, void 0, void 0, function () {
                    var id;
                    return __generator(this, function (_a) {
                        id = uuid();
                        channel.publish(trigger, '', Buffer.from(JSON.stringify(t)), {
                            correlationId: id
                        });
                        return [2 /*return*/, id];
                    });
                }); };
                probe = function (sink, opts) {
                    if (opts === void 0) { opts = {}; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var _a, types, id, probeName, probeQ, consumerTag, qArgs;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = opts.types, types = _a === void 0 ? [] : _a, id = opts.id, probeName = opts.probeName;
                                    return [4 /*yield*/, channel.assertQueue("probe(" + name + ">" + (probeName || '') + "):" + uuid(), {
                                            exclusive: true
                                        })];
                                case 1:
                                    probeQ = (_b.sent()).queue;
                                    return [4 /*yield*/, channel.consume(probeQ, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                            var msgType, e_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!msg) return [3 /*break*/, 4];
                                                        _a.label = 1;
                                                    case 1:
                                                        _a.trys.push([1, 3, , 4]);
                                                        msgType = msg.properties.headers.outcome;
                                                        return [4 /*yield*/, sink({
                                                                t: msgType,
                                                                p: JSON.parse(msg.content.toString())
                                                            })];
                                                    case 2:
                                                        _a.sent();
                                                        channel.ack(msg);
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        e_1 = _a.sent();
                                                        console.error(e_1);
                                                        channel.nack(msg);
                                                        return [3 /*break*/, 4];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 2:
                                    consumerTag = (_b.sent()).consumerTag;
                                    qArgs = __assign({}, types.length
                                        ? types.reduce(function (args, t) {
                                            var _a;
                                            return (__assign({}, args, (_a = {}, _a[t] = true, _a)));
                                        }, { 'x-match': 'any' })
                                        : {}, id
                                        ? { id: id }
                                        : {});
                                    return [4 /*yield*/, channel.bindQueue(probeQ, outcome, '', qArgs)];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/, function () { return Promise.resolve(channel.cancel(consumerTag)); }];
                            }
                        });
                    });
                };
                consume = function (task) { return __awaiter(_this, void 0, void 0, function () {
                    var consumeQ, consumerTag;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, channel.assertQueue("consumer:" + uuid(), {
                                    exclusive: true
                                })];
                            case 1:
                                consumeQ = (_a.sent()).queue;
                                return [4 /*yield*/, channel.consume(consumeQ, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, triggerArg, _, e_2;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (!msg) return [3 /*break*/, 5];
                                                    _b.label = 1;
                                                case 1:
                                                    _b.trys.push([1, 4, , 5]);
                                                    triggerArg = JSON.parse(msg.content.toString());
                                                    return [4 /*yield*/, task(triggerArg)
                                                        // console.log(`resp:${name}`, _)
                                                        /* const p = */ ];
                                                case 2:
                                                    _ = _b.sent();
                                                    // console.log(`resp:${name}`, _)
                                                    /* const p = */ return [4 /*yield*/, channel.publish(outcome, '', Buffer.from(JSON.stringify(_.p)), {
                                                            correlationId: msg.properties.correlationId,
                                                            headers: (_a = {
                                                                    taskId: msg.properties.correlationId
                                                                },
                                                                _a[_.t] = true,
                                                                _a.outcome = _.t,
                                                                _a)
                                                        })];
                                                case 3:
                                                    // console.log(`resp:${name}`, _)
                                                    /* const p = */ _b.sent();
                                                    channel.ack(msg);
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    e_2 = _b.sent();
                                                    console.error(e_2);
                                                    channel.nack(msg);
                                                    return [3 /*break*/, 5];
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 2:
                                consumerTag = (_a.sent()).consumerTag;
                                channel.bindQueue(consumeQ, trigger, '');
                                return [2 /*return*/, function () { return Promise.resolve(channel.cancel(consumerTag)); }];
                        }
                    });
                }); };
                return [2 /*return*/, {
                        names: names,
                        triggerTask: triggerTask,
                        probe: probe,
                        consume: consume
                    }];
        }
    });
}); };
//# sourceMappingURL=amqp.js.map