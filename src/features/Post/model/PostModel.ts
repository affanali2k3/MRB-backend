import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    tableName: Post.POST_TABLE_NAME
})
export class Post extends Model {
    // Define the table name for the Post model
    public static POST_TABLE_NAME = "posts" as string;

    // Define the column names for various attributes
    public static POST_ID = "post_id" as string;
    public static USER_ID = "user_id" as string;
    public static POST_TEXT = "post_text" as string;
    public static POST_NAME = "post_name" as string;
    public static POST_LIKES = "post_likes" as string;
    public static POST_COMMENTS = "post_comments" as string;

    // Define a column for the primary key (auto-incremented)
    @Column({
        type: DataType.INTEGER,
        field: Post.POST_ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    // Define a column for the post's text content
    @Column({
        type: DataType.STRING,
        field: Post.POST_TEXT,
        allowNull: false,
    })
    text!: string;

    // Define a column for the user's email associated with the post
    @Column({
        type: DataType.INTEGER,
        field: Post.USER_ID,
        allowNull: false,
    })
    userId!: number;

    // Define a column for the post's name
    @Column({
        type: DataType.STRING,
        field: Post.POST_NAME,
    })
    name!: string;

    // Define a column for the number of likes the post has received
    @Column({
        type: DataType.INTEGER,
        field: Post.POST_LIKES,
    })
    likes!: number;

    // Define a column for the number of likes the post has received
    @Column({
        type: DataType.INTEGER,
        field: Post.POST_COMMENTS,
    })
    comments!: number;
}
