"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Message_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Message = exports.Message = Message_1 = class Message extends sequelize_typescript_1.Model {
};
Message.MESSAGE_TABLE_NAME = 'chat';
Message.MESSAGE_ID = 'message_id';
Message.SENDER_EMAIL = 'sender_email';
Message.RECEIVER_EMAIL = 'receiver_email';
Message.MESSAGE = 'message';
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Message_1.MESSAGE_ID,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Message.prototype, "message_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Message_1.SENDER_EMAIL
    }),
    __metadata("design:type", String)
], Message.prototype, "senderEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Message_1.RECEIVER_EMAIL
    }),
    __metadata("design:type", String)
], Message.prototype, "receiverEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        field: Message_1.MESSAGE
    }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
exports.Message = Message = Message_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Message_1.MESSAGE_TABLE_NAME
    })
], Message);
