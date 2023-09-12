import { Model, Table, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";

// Define the model and its associated table name
@Table({
    tableName: PostShare.TABLE_NAME
})
export class PostShare extends Model {
    // Define the table name for the PostShare model
    public static TABLE_NAME = "post_shares" as string;

    // Define the column names for foreign keys
    public static POST_ID = "post_id" as string;
    public static USER_ID = "user_id" as string;

    // Define the postId column with foreign key to posts table
    @Column({
        type: DataType.INTEGER,
        field: PostShare.POST_ID,
        references: { model: 'posts', key: 'post_id' }, // Establish the relationship with the 'posts' table
        allowNull: false,
    })
    postId!: number;

    // Define the userEmail column with foreign key to users table
    @Column({
        type: DataType.STRING,
        field: PostShare.USER_ID,
        references: { model: 'users', key: 'user_id' }, // Establish the relationship with the 'users' table
        allowNull: false,
    })
    userId!: string;
}
