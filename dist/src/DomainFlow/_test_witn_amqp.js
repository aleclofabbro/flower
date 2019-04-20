"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var amqp_1 = require("./adapter/amqp");
var _test_1 = require("./_test");
var amqplib_1 = __importDefault(require("amqplib"));
amqplib_1.default.connect({})
    .then(function (conn) { return conn.createChannel(); })
    .then(function (channel) { return amqp_1.adapt(_test_1.domain, channel); })
    .then(_test_1.send);
//# sourceMappingURL=_test_witn_amqp.js.map