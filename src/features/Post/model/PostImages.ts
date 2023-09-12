import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Post } from "./PostModel";

@Table({
    tableName: PostImages.POST_IMAGES_TABLE_NAME
})
export class PostImages extends Model {
    // Define the table name for the PostImages model
    public static POST_IMAGES_TABLE_NAME = "post_images" as string;

    // Define the column names for foreign key and image name
    public static POST_ID = "post_id" as string;
    public static POST_IMAGE = "image_name" as string;

    // Define a column for the foreign key (references the posts table's post_id)
    @Column({
        field: PostImages.POST_ID,
        references: { model: 'posts', key: 'post_id' }
    })
    postId!: number;

    // Define a column for the image name
    @Column({
        type: DataType.STRING,
        field: PostImages.POST_IMAGE,
    })
    image_name!: string;
}
