import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";


@Table({
    tableName: Post.POST_TABLE_NAME
})

export class Post extends Model {
    public static POST_TABLE_NAME = "posts" as string;
    public static POST_ID = "post_id" as string;
    public static USER_EMAIL = "user_email" as string;
    public static POST_TEXT = "post_text" as string;
    public static POST_NAME = "post_name" as string;
    public static POST_LIKES = "post_likes" as string;


    @Column({
        type: DataType.INTEGER,
        field: Post.POST_ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;


    @Column({
        type: DataType.STRING,
        field: Post.POST_TEXT,
        allowNull: false,
    })
    text!: string;

    @Column({
        type: DataType.STRING,
        field: Post.USER_EMAIL,
        allowNull: false,
    })
    userEmail!: string;

    @Column({
        type: DataType.STRING,
        field: Post.POST_NAME,
    })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        field: Post.POST_LIKES,
    })
    likes!: number;


}
