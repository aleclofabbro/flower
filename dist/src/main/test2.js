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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var amqplib_1 = __importDefault(require("amqplib"));
var mongo_1 = __importDefault(require("../EmailConfirm/tasks/mongo"));
var mongodb_1 = require("mongodb");
var amqp_1 = require("../lib/Task/adapter/amqp");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var mongoClient, db, coll, tasks, conn, channel, adapters, _a;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                mongoClient = new mongodb_1.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
                return [4 /*yield*/, mongoClient.connect()];
            case 1:
                _b.sent();
                db = mongoClient.db('App');
                return [4 /*yield*/, db.dropCollection('EmailConfirmation').catch(function () { })];
            case 2:
                _b.sent();
                coll = db.collection('EmailConfirmation');
                db.createIndex('EmailConfirmation', 'userName', {
                    unique: true,
                    name: 'userName'
                });
                db.createIndex('EmailConfirmation', 'email', {
                    unique: true,
                    name: 'email'
                });
                tasks = mongo_1.default({
                    base: {
                        maxAttempts: 3,
                        waitHours: 10
                    },
                    coll: coll
                });
                return [4 /*yield*/, amqplib_1.default.connect({})];
            case 3:
                conn = _b.sent();
                return [4 /*yield*/, conn.createChannel()];
            case 4:
                channel = _b.sent();
                _a = {};
                return [4 /*yield*/, amqp_1.adapt(channel, 'checkEmailConfirmation')];
            case 5:
                _a.checkEmailConfirmation = _b.sent();
                return [4 /*yield*/, amqp_1.adapt(channel, 'shouldConfirmationProcessStart')];
            case 6:
                _a.shouldConfirmationProcessStart = _b.sent();
                return [4 /*yield*/, amqp_1.adapt(channel, 'takeInCharge')];
            case 7:
                adapters = (_a.takeInCharge = _b.sent(),
                    _a);
                return [4 /*yield*/, adapters.takeInCharge.probe(function (_) { return console.log('.takeInCharge', _); })];
            case 8:
                _b.sent();
                return [4 /*yield*/, adapters.checkEmailConfirmation.probe(function (_) { return console.log('.checkEmailConfirmation', _); })];
            case 9:
                _b.sent();
                return [4 /*yield*/, adapters.shouldConfirmationProcessStart.probe(function (_) { return console.log('.shouldConfirmationProcessStart', _); })];
            case 10:
                _b.sent();
                return [4 /*yield*/, adapters.checkEmailConfirmation.consume(tasks.checkEmailConfirmation)];
            case 11:
                _b.sent();
                return [4 /*yield*/, adapters.shouldConfirmationProcessStart.consume(tasks.shouldConfirmationProcessStart)];
            case 12:
                _b.sent();
                return [4 /*yield*/, adapters.takeInCharge.consume(tasks.takeInCharge)];
            case 13:
                _b.sent();
                return [4 /*yield*/, adapters.takeInCharge.probe(function (_) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('[InCharge]', _);
                                    return [4 /*yield*/, adapters.checkEmailConfirmation.triggerTask({ email: 'e', id: _.p.id })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, {
                        types: ['InCharge']
                    })];
            case 14:
                _b.sent();
                return [4 /*yield*/, adapters.shouldConfirmationProcessStart.probe(function (_) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('[ShouldStart]', _);
                                    // await adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })
                                    return [4 /*yield*/, adapters.checkEmailConfirmation.triggerTask({ email: 'e', id: _.p.id })];
                                case 1:
                                    // await adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, {
                        types: ['ShouldStart']
                    })];
            case 15:
                _b.sent();
                return [4 /*yield*/, adapters.takeInCharge.triggerTask({ email: 'e', userName: 'u' })];
            case 16:
                _b.sent();
                return [4 /*yield*/, adapters.takeInCharge.triggerTask({ email: 'e', userName: 'ua' })];
            case 17:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test2.js.map