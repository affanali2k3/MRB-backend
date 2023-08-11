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
var Like_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Like = exports.Like = Like_1 = class Like extends sequelize_typescript_1.Model {
};
Like.TABLE_NAME = "likes";
Like.ID = "like_id";
Like.POST_ID = "post_id";
Like.USER_EMAIL = "user_email";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Like_1.ID,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Like.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Like_1.POST_ID,
        allowNull: false,
        unique: true,
        references: { model: 'posts', key: 'post_id' }
    }),
    __metadata("design:type", Number)
], Like.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Like_1.USER_EMAIL,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'user_email' },
    }),
    __metadata("design:type", String)
], Like.prototype, "userEmail", void 0);
exports.Like = Like = Like_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Like_1.TABLE_NAME
    })
], Like);
