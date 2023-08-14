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
var Post_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Post = exports.Post = Post_1 = class Post extends sequelize_typescript_1.Model {
};
Post.POST_TABLE_NAME = "posts";
Post.POST_ID = "post_id";
Post.USER_EMAIL = "user_email";
Post.POST_TEXT = "post_text";
Post.POST_NAME = "post_name";
Post.POST_LIKES = "post_likes";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Post_1.POST_ID,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Post_1.POST_TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Post_1.USER_EMAIL,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "userEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Post_1.POST_NAME,
    }),
    __metadata("design:type", String)
], Post.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Post_1.POST_LIKES,
    }),
    __metadata("design:type", Number)
], Post.prototype, "likes", void 0);
exports.Post = Post = Post_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Post_1.POST_TABLE_NAME
    })
], Post);
