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
var PostImages_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostImages = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let PostImages = exports.PostImages = PostImages_1 = class PostImages extends sequelize_typescript_1.Model {
};
PostImages.POST_IMAGES_TABLE_NAME = "post_images";
PostImages.POST_ID = "post_id";
PostImages.POST_IMAGE = "image_name";
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: PostImages_1.POST_ID,
        references: { model: 'posts', key: 'post_id' }
    }),
    __metadata("design:type", Number)
], PostImages.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: PostImages_1.POST_IMAGE,
    }),
    __metadata("design:type", String)
], PostImages.prototype, "image_name", void 0);
exports.PostImages = PostImages = PostImages_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: PostImages_1.POST_IMAGES_TABLE_NAME
    })
], PostImages);
