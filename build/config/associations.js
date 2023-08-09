"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associations = void 0;
const PostImages_1 = require("../features/Post/model/PostImages");
const PostModel_1 = require("../features/Post/model/PostModel");
const User_1 = require("../features/UserProfile/model/User");
function associations() {
    User_1.User.hasMany(PostModel_1.Post, {
        foreignKey: 'user_email'
    });
    PostModel_1.Post.belongsTo(User_1.User, {
        foreignKey: 'user_email',
    });
    PostModel_1.Post.hasMany(PostImages_1.PostImages, {
        foreignKey: 'post_id'
    });
    PostImages_1.PostImages.belongsTo(PostModel_1.Post, {
        foreignKey: 'post_id'
    });
}
exports.associations = associations;
