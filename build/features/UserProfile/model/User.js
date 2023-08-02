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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let User = exports.User = User_1 = class User extends sequelize_typescript_1.Model {
};
User.USER_TABLE_NAME = "users";
User.USER_SSN = "user_ssn";
User.USER_EMAIL = "user_email";
User.USER_NAME = "user_name";
User.USER_LICENSE = "user_licence";
User.USER_PHOTO = "user_photo";
User.USER_PHONE = "user_phone";
User.USER_OCCUPATION = "user_occupation";
User.USER_GENDER = "user_gender";
User.USER_ADDRESS = "user_address";
User.USER_LICENCE_STATE = "user_licence_state";
User.USER_LICENCE_NUMBER = "user_licence_number";
User.USER_YEAR_LICENCED = "user_year_licenced";
User.USER_COMPLETED_DEALS = "user_completed_deals";
User.USER_PREVIOUS_DEALS = "user_previous_deals";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        primaryKey: true,
        field: User_1.USER_EMAIL
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_SSN
    }),
    __metadata("design:type", String)
], User.prototype, "ssn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_NAME
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_LICENSE
    }),
    __metadata("design:type", String)
], User.prototype, "licence", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_LICENCE_NUMBER
    }),
    __metadata("design:type", String)
], User.prototype, "licenceNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_LICENCE_STATE
    }),
    __metadata("design:type", String)
], User.prototype, "licenceState", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_YEAR_LICENCED
    }),
    __metadata("design:type", String)
], User.prototype, "yearLicenced", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_ADDRESS
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_COMPLETED_DEALS
    }),
    __metadata("design:type", String)
], User.prototype, "completedDeals", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        field: User_1.USER_PREVIOUS_DEALS
    }),
    __metadata("design:type", String)
], User.prototype, "previousDeals", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_PHOTO
    }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_PHONE
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_OCCUPATION
    }),
    __metadata("design:type", String)
], User.prototype, "occupation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_GENDER
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
exports.User = User = User_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: User_1.USER_TABLE_NAME
    })
], User);
