import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Unique, Index } from "sequelize-typescript";


@Table({
    indexes: [
        {
            name: Like.UNIQUE_CONSTRAINT_POST_USEREMAIL,
            unique: true,
            fields: [Like.POST_ID, Like.USER_EMAIL]
        },],
    tableName: Like.TABLE_NAME
})

export class Like extends Model {
    public static TABLE_NAME = "likes" as string;
    public static ID = "like_id" as string;
    public static POST_ID = "post_id" as string;
    public static USER_EMAIL = "user_email" as string;
    public static UNIQUE_CONSTRAINT_POST_USEREMAIL = "unique_constraint_post_userEmail" as string;



    @Column({
        type: DataType.INTEGER,
        field: Like.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;


    @Column({
        type: DataType.INTEGER,
        field: Like.POST_ID,
        allowNull: false,
        references: { model: 'posts', key: 'post_id' }
    })
    postId!: number;

    @Column({
        type: DataType.STRING,
        field: Like.USER_EMAIL,
        allowNull: false,
        references: { model: 'users', key: 'user_email' },
    })
    userEmail!: string;




}
