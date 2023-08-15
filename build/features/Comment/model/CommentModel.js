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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const PostModel_1 = require("../../Post/model/PostModel");
let Comment = exports.Comment = Comment_1 = class Comment extends sequelize_typescript_1.Model {
};
Comment.TABLE_NAME = "comments";
Comment.ID = "comment_id";
Comment.POST_ID = "post_id";
Comment.USER_EMAIL = "user_email";
Comment.TEXT = "text";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Comment_1.ID,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Comment_1.POST_ID,
        allowNull: false,
        references: { model: PostModel_1.Post.POST_TABLE_NAME, key: PostModel_1.Post.POST_ID }
    }),
    __metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Comment_1.USER_EMAIL,
        allowNull: false,
        references: { model: 'users', key: 'user_email' },
    }),
    __metadata("design:type", String)
], Comment.prototype, "userEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        field: Comment_1.TEXT,
    }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
exports.Comment = Comment = Comment_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Comment_1.TABLE_NAME
    })
], Comment);
