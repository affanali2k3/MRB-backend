import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Post } from "../../Post/model/PostModel";


@Table({
    tableName: Comment.TABLE_NAME
})

export class Comment extends Model {
    public static TABLE_NAME = "comments" as string;
    public static ID = "comment_id" as string;
    public static POST_ID = "post_id" as string;
    public static USER_EMAIL = "user_email" as string;
    public static TEXT = "text" as string;



    @Column({
        type: DataType.INTEGER,
        field: Comment.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;


    @Column({
        type: DataType.INTEGER,
        field: Comment.POST_ID,
        allowNull: false,
        references: { model: Post.POST_TABLE_NAME, key: Post.POST_ID }
    })
    postId!: number;

    @Column({
        type: DataType.STRING,
        field: Comment.USER_EMAIL,
        allowNull: false,
        references: { model: 'users', key: 'user_email' },
    })
    userEmail!: string;

    @Column({
        type: DataType.TEXT,
        field: Comment.TEXT,
    })
    text!: string;

}
