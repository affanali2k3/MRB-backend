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
var UserAssociates_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAssociates = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let UserAssociates = exports.UserAssociates = UserAssociates_1 = class UserAssociates extends sequelize_typescript_1.Model {
};
UserAssociates.USER_ASSOCIATES_TABLE_NAME = "user_associates";
UserAssociates.USER_EMAIL = "user_email";
UserAssociates.ASSOCIATE_EMAIL = "associate_email";
UserAssociates.ASSOCIATION_STATUS = "association_status";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: UserAssociates_1.USER_EMAIL,
        primaryKey: true
    }),
    __metadata("design:type", String)
], UserAssociates.prototype, "userEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: UserAssociates_1.ASSOCIATE_EMAIL,
        primaryKey: true
    }),
    __metadata("design:type", String)
], UserAssociates.prototype, "associateEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: UserAssociates_1.ASSOCIATION_STATUS
    }),
    __metadata("design:type", String)
], UserAssociates.prototype, "status", void 0);
exports.UserAssociates = UserAssociates = UserAssociates_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: UserAssociates_1.USER_ASSOCIATES_TABLE_NAME
    })
], UserAssociates);
