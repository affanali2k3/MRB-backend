import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Post } from "./PostModel";


@Table({
    tableName: PostImages.POST_IMAGES_TABLE_NAME
})

export class PostImages extends Model {
    public static POST_IMAGES_TABLE_NAME = "post_images" as string;
    public static POST_ID = "post_id" as string;
    public static POST_IMAGE = "post_image" as string;

    @Column({
        type: DataType.NUMBER,
        field: PostImages.POST_ID,
    })
    postId!: string;

    @Column({
        type: DataType.STRING,
        field: PostImages.POST_IMAGE,
    })
    imagePath!: string;
}

