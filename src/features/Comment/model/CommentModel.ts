import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Post } from "../../Post/model/PostModel"; // Import the Post model
import { User } from "../../UserProfile/model/User";

// Define a Sequelize model for the "comments" table
@Table({
  tableName: Comment.TABLE_NAME, // Set the table name to "comments"
})
export class Comment extends Model {
  public static TABLE_NAME = "comments" as string; // Define the table name as a static property
  public static ID = "id" as string; // Define the column name for the comment ID
  public static POST_ID = "post_id" as string; // Define the column name for the post ID
  public static USER_ID = "user_id" as string; // Define the column name for the user's email
  public static TEXT = "text" as string; // Define the column name for the comment text

  @Column({
    type: DataType.INTEGER,
    field: Comment.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number; // Define the comment ID column

  @Column({
    type: DataType.INTEGER,
    field: Comment.POST_ID,
    references: { model: Post, key: Post.ID }, // Set up a foreign key relationship with the "posts" table
    allowNull: false,
  })
  postId!: number; // Define the post ID column

  @Column({
    type: DataType.INTEGER,
    field: Comment.USER_ID,
    allowNull: false,
    references: { model: User, key: User.ID }, // Set up a foreign key relationship with the "users" table
  })
  userId!: number; // Define the user's email column

  @Column({
    type: DataType.TEXT,
    field: Comment.TEXT,
  })
  text!: string; // Define the comment text column
}
