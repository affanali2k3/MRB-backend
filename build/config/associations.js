"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associations = void 0;
const PostModel_1 = require("../features/Post/model/PostModel");
const User_1 = require("../features/UserProfile/model/User");
function associations() {
    User_1.User.hasMany(PostModel_1.Post, {
        foreignKey: 'user_email'
    });
    PostModel_1.Post.belongsTo(User_1.User, {
        foreignKey: 'userEmail',
    });
}
exports.associations = associations;
