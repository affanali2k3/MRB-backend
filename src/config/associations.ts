import { PostImages } from "../features/Post/model/PostImages";
import { Post } from "../features/Post/model/PostModel";
import { User } from "../features/UserProfile/model/User";

export function associations() {
    User.hasMany(Post, {
        foreignKey: 'user_email'
    });

    Post.belongsTo(User, {
        foreignKey: 'userEmail',
    });


}