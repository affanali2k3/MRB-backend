import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Post } from "./PostModel";


@Table({
    tableName: PostImages.POST_IMAGES_TABLE_NAME
})

export class PostImages extends Model {
    public static POST_IMAGES_TABLE_NAME = "post_images" as string;
    public static POST_ID = "post_id" as string;
    public static POST_IMAGE = "image_name" as string;

    @Column({
        field: PostImages.POST_ID,
        references: { model: 'posts', key: 'post_id' }
    })
    postId!: number;

    @Column({
        type: DataType.STRING,
        field: PostImages.POST_IMAGE,
    })
    image_name!: string;
}

