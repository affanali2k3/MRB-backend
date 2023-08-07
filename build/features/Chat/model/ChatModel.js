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
var Chat_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Chat = exports.Chat = Chat_1 = class Chat extends sequelize_typescript_1.Model {
};
Chat.CHAT_TABLE_NAME = "chat";
Chat.USER1_EMAIL = "user1_email";
Chat.USER2_EMAIL = "user2_email";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Chat_1.USER1_EMAIL,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Chat.prototype, "user1Email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Chat_1.USER2_EMAIL,
        primaryKey: true
    }),
    __metadata("design:type", String)
], Chat.prototype, "user2Email", void 0);
exports.Chat = Chat = Chat_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Chat_1.CHAT_TABLE_NAME
    })
], Chat);
