import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Post } from "../../Post/model/PostModel"; // Import the Post model

// Define a Sequelize model for the "comments" table
@Table({
    tableName: Comment.TABLE_NAME // Set the table name to "comments"
})
export class Comment extends Model {
    public static TABLE_NAME = "comments" as string; // Define the table name as a static property
    public static ID = "comment_id" as string; // Define the column name for the comment ID
    public static POST_ID = "post_id" as string; // Define the column name for the post ID
    public static USER_ID = "user_id" as string; // Define the column name for the user's email
    public static TEXT = "text" as string; // Define the column name for the comment text

    @Column({
        type: DataType.INTEGER,
        field: Comment.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number; // Define the comment ID column

    @Column({
        type: DataType.INTEGER,
        field: Comment.POST_ID,
        allowNull: false,
        references: { model: Post.POST_TABLE_NAME, key: Post.POST_ID } // Set up a foreign key relationship with the "posts" table
    })
    postId!: number; // Define the post ID column

    @Column({
        type: DataType.INTEGER,
        field: Comment.USER_ID,
        allowNull: false,
        references: { model: 'users', key: 'user_id' }, // Set up a foreign key relationship with the "users" table
    })
    userId!: number; // Define the user's email column

    @Column({
        type: DataType.TEXT,
        field: Comment.TEXT,
    })
    text!: string; // Define the comment text column
}
