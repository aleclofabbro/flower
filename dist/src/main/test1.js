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
var mongo_1 = __importDefault(require("../EmailConfirm/tasks/mongo"));
var mongodb_1 = require("mongodb");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var mongoClient, db, coll, tasks, resp, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return __generator(this, function (_u) {
        switch (_u.label) {
            case 0:
                mongoClient = new mongodb_1.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
                return [4 /*yield*/, mongoClient.connect()];
            case 1:
                _u.sent();
                db = mongoClient.db('App');
                return [4 /*yield*/, db.dropCollection('EmailConfirmation')];
            case 2:
                _u.sent();
                coll = db.collection('EmailConfirmation');
                db.createIndex('EmailConfirmation', '_id', {
                    unique: true,
                    name: '_id'
                });
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
                //@ts-ignore
                global.tasks = tasks;
                //@ts-ignore
                global.call = function (_, __) { return tasks[_](__).then(console.log, console.error); };
                return [4 /*yield*/, tasks.takeInCharge({ email: 'e', userName: 'u' })];
            case 3:
                resp = _u.sent();
                console.log(resp);
                if (!(resp.t == 'InCharge')) return [3 /*break*/, 13];
                // console.log(await tasks.checkEmailConfirmation({ email: '', id: '' }))
                // console.log(await tasks.checkEmailConfirmation({ email: '', id: resp.p.id }))
                _b = (_a = console).log;
                return [4 /*yield*/, tasks.checkEmailConfirmation({ email: 'e', id: resp.p.id })];
            case 4:
                // console.log(await tasks.checkEmailConfirmation({ email: '', id: '' }))
                // console.log(await tasks.checkEmailConfirmation({ email: '', id: resp.p.id }))
                _b.apply(_a, [_u.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, tasks.shouldConfirmationProcessStart({ id: resp.p.id })];
            case 5:
                _d.apply(_c, [_u.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, tasks.shouldConfirmationProcessStart({ id: resp.p.id })];
            case 6:
                _f.apply(_e, [_u.sent()]);
                _h = (_g = console).log;
                return [4 /*yield*/, tasks.shouldConfirmationProcessStart({ id: resp.p.id })];
            case 7:
                _h.apply(_g, [_u.sent()]);
                _k = (_j = console).log;
                return [4 /*yield*/, tasks.shouldConfirmationProcessStart({ id: resp.p.id })];
            case 8:
                _k.apply(_j, [_u.sent()]);
                _m = (_l = console).log;
                return [4 /*yield*/, tasks.checkEmailConfirmation({ email: 'e', id: resp.p.id })];
            case 9:
                _m.apply(_l, [_u.sent()]);
                _p = (_o = console).log;
                return [4 /*yield*/, tasks.takeInCharge({ email: '-e', userName: 'u' })];
            case 10:
                _p.apply(_o, [_u.sent()]);
                _r = (_q = console).log;
                return [4 /*yield*/, tasks.takeInCharge({ email: 'e', userName: 'u-' })];
            case 11:
                _r.apply(_q, [_u.sent()]);
                _t = (_s = console).log;
                return [4 /*yield*/, tasks.takeInCharge({ email: 'e', userName: 'u' })];
            case 12:
                _t.apply(_s, [_u.sent()]);
                _u.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test1.js.map