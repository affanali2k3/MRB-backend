import { PostImages } from "../features/Post/model/PostImages";
import { Post } from "../features/Post/model/PostModel";
import { User } from "../features/UserProfile/model/User";

export function associations() {
    User.hasMany(Post, {
        foreignKey: 'user_email'
    });

    Post.belongsTo(User, {
        foreignKey: 'user_email',
    });

    Post.hasMany(PostImages, {
        foreignKey: 'post_id'
    });

    PostImages.belongsTo(Post, {
        foreignKey: 'post_id'
    })
}