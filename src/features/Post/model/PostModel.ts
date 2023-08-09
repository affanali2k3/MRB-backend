import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";


@Table({
    tableName: Post.POST_TABLE_NAME
})

export class Post extends Model {
    public static POST_TABLE_NAME = "post" as string;
    public static POST_ID = "post_id" as string;
    public static USER_EMAIL = "user_email" as string;
    public static POST_TEXT = "post_text" as string;
    public static POST_IMAGE_FOLDER_PATH = "post_image_folder_path" as string;


    @Column({
        type: DataType.INTEGER,
        field: Post.POST_ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: string;


    @Column({
        type: DataType.STRING,
        field: Post.POST_TEXT,
    })
    text!: string;

    @Column({
        type: DataType.STRING,
        field: Post.USER_EMAIL,
    })
    userEmail!: string;

    @Column({
        type: DataType.STRING,
        field: Post.POST_IMAGE_FOLDER_PATH,
    })
    imageFolderPath!: string | null;


}
